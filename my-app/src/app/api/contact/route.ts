import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

// Maximum execution time for the serverless function
export const maxDuration = 30; // 30 seconds

// CORS configuration
const ALLOWED_ORIGINS = [
  "https://www.theinkpotgroup.com/",
  "http://localhost:3000" // Add for local development
];

// Utility function to create CORS headers
function getCorsHeaders(origin?: string | null) {
  const safeOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-store",
  };
}

// Handle preflight requests
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Validation function
function validateInput(data: {
  name: string, 
  phone: string, 
  email: string, 
  query: string
}) {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  // Phone validation (10 digit check)
  if (!data.phone || !/^\d{10}$/.test(data.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  // Query validation
  if (!data.query || data.query.trim().length < 10) {
    errors.query = "Query must be at least 10 characters long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Email sending function
async function sendEmailNotification(
  name: string, 
  phone: string, 
  email: string, 
  query: string
) {
  // Validate email credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Missing email credentials");
    throw new Error("Email configuration incomplete");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Prepare email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "rajputkapil436@gmail.com", // Replace with your email
    subject: `New Contact Form Submission from ${name}`,
    text: `
    📌 Name: ${name}
    📞 Phone: ${phone}
    ✉️ Email: ${email}
    💬 Query: ${query}

    Submitted on: ${new Date().toLocaleString()}
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
  console.log("📧 Email sent successfully");
}

// Main POST handler - Simplified
export async function POST(req: Request) {
  // Track processing time
  const startTime = Date.now();

  // Get origin for CORS
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    // Parse request body
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

    // Destructure and validate input
    const { 
      name = '', 
      phone = '', 
      email = '', 
      query = '' 
    } = requestBody;

    // Run validation
    const validationResult = validateInput({ 
      name, 
      phone, 
      email, 
      query 
    });

    // Return validation errors if any
    if (!validationResult.isValid) {
      return new NextResponse(
        JSON.stringify({ 
          error: "Validation Failed", 
          details: validationResult.errors 
        }), 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    // Connect to database
    await dbConnect();

    // Prepare submission data
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    // Save to database
    const newContact = new Contact({ 
      name, 
      phone, 
      email, 
      query, 
      submissionDate, 
      timestamp 
    });
    await newContact.save();

    // Send email notification
    await sendEmailNotification(name, phone, email, query);

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