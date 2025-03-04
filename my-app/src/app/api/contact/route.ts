import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

// Maximum execution time for the serverless function
export const maxDuration = 30; // 30 seconds

// Explicitly handle OPTIONS method
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://theinkpotgroup.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// POST method handler
export async function POST(req: Request) {
  // Start performance tracking
  const startTime = Date.now();
  
  // Comprehensive CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://theinkpotgroup.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };

  try {
    // Validate request method
    if (req.method !== "POST") {
      console.warn(`❌ Invalid method: ${req.method}`);
      return new NextResponse(
        JSON.stringify({ 
          error: "Method Not Allowed", 
          supportedMethods: ["POST"] 
        }), 
        { 
          status: 405,
          headers: corsHeaders 
        }
      );
    }

    // Detailed request logging
    console.log("📌 Request Details:", {
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
    });

    // Database connection with timeout
    const dbConnectStart = Date.now();
    await dbConnect();
    console.log(`✅ Database Connected in ${Date.now() - dbConnectStart}ms`);

    // Parse and validate request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ Request Body Parsing Error:", parseError);
      return new NextResponse(
        JSON.stringify({ 
          error: "Invalid Request Body", 
          message: "Unable to parse request data" 
        }), 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    // Destructure and validate input with more detailed checks
    const { 
      name = '', 
      phone = '', 
      email = '', 
      query = '' 
    } = requestBody;

    // Comprehensive input validation
    const validationErrors: Record<string, string> = {};

    if (!name.trim() || name.length < 2) {
      validationErrors.name = "Name must be at least 2 characters long";
    }

    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      validationErrors.phone = "Phone number must be 10 digits";
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!query.trim() || query.length < 10) {
      validationErrors.query = "Query must be at least 10 characters long";
    }

    // Return validation errors if any
    if (Object.keys(validationErrors).length > 0) {
      return new NextResponse(
        JSON.stringify({ 
          error: "Validation Failed", 
          details: validationErrors 
        }), 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    // Prepare submission data
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    // Save to database
    const dbSaveStart = Date.now();
    const newContact = new Contact({ 
      name, 
      phone, 
      email, 
      query, 
      submissionDate, 
      timestamp 
    });
    await newContact.save();
    console.log(`✅ Data Saved to Database in ${Date.now() - dbSaveStart}ms`);

    // Send email notification
    const emailStart = Date.now();
    await sendEmailNotification(name, phone, email, query);
    console.log(`✅ Email Sent in ${Date.now() - emailStart}ms`);

    // Successful response
    return new NextResponse(
      JSON.stringify({ 
        message: "Form submitted successfully!", 
        processingTime: Date.now() - startTime 
      }), 
      { 
        status: 201,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        }
      }
    );

  } catch (error) {
    // Comprehensive error logging
    console.error('🔴 Critical Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown error type',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    });

    // Determine appropriate error response
    const errorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred during form submission',
    };

    return new NextResponse(
      JSON.stringify(errorResponse), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
}

async function sendEmailNotification(name: string, phone: string, email: string, query: string) {
  // Email sending logic remains the same
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Missing email credentials");
    throw new Error("Email configuration incomplete");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "rajputkapil436@gmail.com",
    subject: `New Contact Form Submission from ${name}`,
    text: `
    📌 Name: ${name}
    📞 Phone: ${phone}
    ✉️ Email: ${email}
    💬 Query: ${query}

    Submitted on: ${new Date().toLocaleString()}
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("📧 Email sent successfully");
}