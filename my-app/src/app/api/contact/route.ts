import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

// Define interface for form data
interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  query: string;
}

// Validation function with explicit typing
function validateFormData(data: ContactFormData): string[] {
  const errors: string[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Phone validation
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
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

// Email notification function
async function sendEmailNotification(contactData: ContactFormData): Promise<void> {
  // Check for required email credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Missing email credentials");
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

    // Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || "rajputkapil436@gmail.com",
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
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${contactData.phone}</td>
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
    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

// Main POST handler
export async function POST(req: Request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const requestData: ContactFormData = await req.json();

    // Validate form data
    const validationErrors = validateFormData(requestData);
    if (validationErrors.length > 0) {
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

    // Destructure validated data
    const { name, phone, email, query } = requestData;

    // Prepare submission data
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    // Create new contact record
    const newContact = new Contact({ 
      name, 
      phone, 
      email, 
      query, 
      submissionDate, 
      timestamp 
    });

    // Save to database
    await newContact.save();

    // Send email notification (async, non-blocking)
    sendEmailNotification({ name, phone, email, query })
      .catch(err => console.error("Email notification failed:", err));

    // Successful response
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
    // Detailed error logging
    console.error("❌ Form Submission Error:", error);

    // Determine error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected error occurred during form submission";

    // Error response
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