import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

// Updated interface to include countryCode
interface ContactFormData {
  name: string;
  countryCode: string; // Added country code
  phone: string;
  email: string;
  query: string;
}

function validateFormData(data: ContactFormData): string[] {
  const errors: string[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Country code validation
  const countryCodeRegex = /^\+[0-9]{1,4}$/;
  if (!data.countryCode || !countryCodeRegex.test(data.countryCode)) {
    errors.push("Invalid country code");
  }

  // Phone validation - expecting 10 digits from frontend
  const phoneRegex = /^[0-9]{10}$/;
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.push("Invalid phone number");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Invalid email address");
  }

  // Query validation
  if (!data.query || data.query.trim().length < 10) {
    errors.push("Query must be at least 10 characters long");
  }

  return errors;
}

// CORS preflight handling
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // For development; restrict in production
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

// Email notification function with fallback for missing admin email
async function sendEmailNotification(contactData: ContactFormData): Promise<void> {
  // Check for required email credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Missing email credentials");
    return;
  }

  // Default admin email fallback
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  
  if (!adminEmail) {
    console.error("❌ No admin email configured");
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add secure connection settings
      secure: true,
      requireTLS: true,
    });

    // Format full phone with country code
    const fullPhone = `${contactData.countryCode}${contactData.phone}`;

    // Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>📋 New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>📛 Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>📞 Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${fullPhone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>✉️ Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${contactData.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>💬 Query:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${contactData.query}</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>📅 Submission Date:</strong></td>
              <td style="padding: 10px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully to", adminEmail);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

// Main POST handler
export async function POST(req: Request) {
  console.log("📝 Received contact form submission");
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    let requestData: ContactFormData;
    try {
      requestData = await req.json();
      console.log("📤 Received form data:", JSON.stringify(requestData, null, 2));
    } catch (error) {
      console.error("❌ Failed to parse request body:", error);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      await dbConnect();
      console.log("✅ Connected to database");
    } catch (dbError) {
      console.error("❌ Database connection error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500, headers: corsHeaders }
      );
    }

    const validationErrors = validateFormData(requestData);
    if (validationErrors.length > 0) {
      console.log("❌ Validation errors:", validationErrors);
      return NextResponse.json(
        { 
          error: "Validation Failed", 
          details: validationErrors 
        }, 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    const { name, countryCode, phone, email, query } = requestData;
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();
    const fullPhone = `${countryCode}${phone}`;

    const newContact = new Contact({ 
      name, 
      countryCode,
      phone, 
      fullPhone,
      email, 
      query, 
      submissionDate, 
      timestamp 
    });

    try {
      await newContact.save();
      console.log("✅ Contact saved to database with ID:", newContact._id);
    } catch (saveError) {
      console.error("❌ Error saving contact to database:", saveError);
      return NextResponse.json(
        { error: "Failed to save contact" },
        { status: 500, headers: corsHeaders }
      );
    }

    sendEmailNotification({ name, countryCode, phone, email, query })
      .catch(err => console.error("Email notification failed:", err));

    return NextResponse.json(
      { 
        message: "Form submitted successfully!", 
        contactId: newContact._id 
      }, 
      { 
        status: 201,
        headers: corsHeaders 
      }
    );

  } catch (error: unknown) {
    console.error("❌ Form Submission Error:", error);

    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected error occurred during form submission";

    return NextResponse.json(
      { 
        error: errorMessage,
        details: String(error)
      }, 
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}