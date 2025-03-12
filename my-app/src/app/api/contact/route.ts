/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import sgMail from '@sendgrid/mail';

// Updated interface with optional query
interface ContactFormData {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  query?: string;
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

  return errors;
}

// CORS preflight handling
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.theinkpotgroup.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Diagnostic function to check SendGrid configuration
async function checkSendGridConfig(): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error("❌ SENDGRID_API_KEY is missing");
    return false;
  }
  
  if (!process.env.FROM_EMAIL) {
    console.error("❌ FROM_EMAIL is missing");
    return false;
  }
  
  if (!process.env.ADMIN_EMAIL) {
    console.error("❌ ADMIN_EMAIL is missing (will use FROM_EMAIL instead)");
    // Not returning false as we'll fall back to FROM_EMAIL
  }
  
  console.log("✅ SendGrid configuration check passed");
  console.log(`📧 From email: ${process.env.FROM_EMAIL}`);
  console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL || process.env.FROM_EMAIL}`);
  console.log(`📧 API Key present: ${process.env.SENDGRID_API_KEY ? "Yes" : "No"}`);
  
  return true;
}

// SendGrid email notification function with enhanced error handling
async function sendEmailNotification(contactData: ContactFormData): Promise<boolean> {
  console.log("🚀 Starting SendGrid email process");
  
  // Check configuration
  const configValid = await checkSendGridConfig();
  if (!configValid) {
    return false;
  }
  
  // Set SendGrid API key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  
  // Get admin email (with fallback)
  const adminEmail = process.env.ADMIN_EMAIL || process.env.FROM_EMAIL;
  const fromEmail = process.env.FROM_EMAIL as string;
  
  try {
    // Format full phone with country code
    const fullPhone = `${contactData.countryCode}${contactData.phone}`;
    
    // Create a simple text version for better deliverability
    const textContent = `
      New Contact Form Submission
      ---------------------------
      Name: ${contactData.name}
      Phone: ${fullPhone}
      Email: ${contactData.email}
      Query: ${contactData.query || "No query provided"}
      Submission Date: ${new Date().toLocaleString()}
    `;

    // Prepare email message
    const msg = {
      to: adminEmail as string,
      from: fromEmail,
      subject: `New Contact Form Submission from ${contactData.name}`,
      text: textContent, // Plain text version
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
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${contactData.query || "No query provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>📅 Submission Date:</strong></td>
              <td style="padding: 10px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
      `,
    };

    console.log(`📧 Attempting to send email from ${fromEmail} to ${adminEmail}`);
    
    // Send email and capture response
    const [response] = await sgMail.send(msg);
    
    console.log(`📧 SendGrid response status: ${response.statusCode}`);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log("✅ Email sent successfully");
      return true;
    } else {
      console.error(`❌ SendGrid returned non-success status code: ${response.statusCode}`);
      console.error("Headers:", JSON.stringify(response.headers));
      return false;
    }
    
  } catch (error: any) {
    console.error("❌ SendGrid email sending failed:");
    
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    
    if (error.response) {
      console.error(`Status code: ${error.response.statusCode}`);
      console.error("Response body:", JSON.stringify(error.response.body));
      
      // Log specific SendGrid errors
      if (error.response.body && error.response.body.errors) {
        error.response.body.errors.forEach((err: any, index: number) => {
          console.error(`SendGrid Error ${index + 1}:`, err.message, `(${err.field})`);
        });
      }
    } else {
      console.error("Error details:", error.message || error);
    }
    
    return false;
  }
}

// Main POST handler with refined email notification handling
export async function POST(req: Request) {
  console.log("📝 Received contact form submission");
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://www.theinkpotgroup.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Parse request body
    let requestData: ContactFormData;
    try {
      requestData = await req.json();
      console.log("📤 Form data received:", JSON.stringify(requestData, null, 2));
    } catch (error) {
      console.error("❌ Failed to parse request body:", error);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate form data
    const validationErrors = validateFormData(requestData);
    if (validationErrors.length > 0) {
      console.log("❌ Validation errors:", validationErrors);
      return NextResponse.json(
        { error: "Validation Failed", details: validationErrors }, 
        { status: 400, headers: corsHeaders }
      );
    }

    // Connect to database
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

    // Destructure validated data
    const { name, countryCode, phone, email, query = "" } = requestData;

    // Prepare submission data
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();
    const fullPhone = `${countryCode}${phone}`;

    // Create new contact record
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

    // Save to database
    await newContact.save();
    console.log("✅ Contact saved to database with ID:", newContact._id);

    // Send email notification (synchronously wait for result)
    let emailSent = false;
    try {
      emailSent = await sendEmailNotification(requestData);
      console.log(`📧 Email notification ${emailSent ? "sent" : "failed"}`);
    } catch (emailError) {
      console.error("❌ Email notification exception:", emailError);
    }

    // Always return success if contact was saved, even if email failed
    return NextResponse.json(
      { 
        message: "Form submitted successfully!", 
        contactId: newContact._id,
        emailSent: emailSent
      }, 
      { 
        status: 201,
        headers: corsHeaders 
      }
    );
 
  } catch (error: unknown) {
    console.error("❌ Form Submission Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}