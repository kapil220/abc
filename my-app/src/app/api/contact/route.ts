import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import nodemailer from "nodemailer";

// Increase timeout
export const maxDuration = 60; // 60 seconds

export async function POST(req: Request) {
  // Detailed logging
  console.log('Received request at:', new Date().toISOString());
  console.log('Request method:', req.method);

  try {
    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await req.json();
      console.log('Parsed request body:', JSON.stringify(requestBody, null, 2));
    } catch (parseError) {
      console.error('❌ Request Body Parsing Error:', parseError);
      return new NextResponse(
        JSON.stringify({ 
          error: "Invalid Request Body", 
          message: "Unable to parse request data" 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://theinkpotgroup.com',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Destructure with default values and type safety
    const { 
      name = '', 
      phone = '', 
      email = '', 
      query = '',
      countryCode = ''
    } = requestBody;

    // Comprehensive validation
    const errors: Record<string, string> = {};

    if (!name || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }

    if (!phone || !/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!query || query.trim().length < 10) {
      errors.query = "Query must be at least 10 characters long";
    }

    // If validation fails, return errors
    if (Object.keys(errors).length > 0) {
      return new NextResponse(
        JSON.stringify({ 
          error: "Validation Failed", 
          details: errors 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://theinkpotgroup.com',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Connect to database with error handling
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database Connection Error:', dbError);
      return new NextResponse(
        JSON.stringify({ 
          error: "Database Connection Failed", 
          message: "Unable to connect to database" 
        }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://theinkpotgroup.com',
          }
        }
      );
    }

    // Prepare submission data
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    // Save to database
    try {
      const newContact = new Contact({ 
        name, 
        phone, 
        email, 
        query, 
        countryCode,
        submissionDate, 
        timestamp 
      });
      await newContact.save();
    } catch (saveError) {
      console.error('Database Save Error:', saveError);
      return new NextResponse(
        JSON.stringify({ 
          error: "Database Save Failed", 
          message: "Unable to save contact information" 
        }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://theinkpotgroup.com',
          }
        }
      );
    }

    // Send email notification (optional)
    try {
      // Your existing email notification logic
      // Consider adding a try-catch block here as well
    } catch (emailError) {
      console.error('Email Notification Error:', emailError);
      // Optionally, you might want to log this but not fail the entire request
    }

    // Successful response
    return new NextResponse(
      JSON.stringify({ 
        message: "Form submitted successfully!", 
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://theinkpotgroup.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );

  } catch (error) {
    // Catch-all error handler
    console.error('🔴 Unhandled Server Error:', error);

    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: 'An unexpected error occurred during form submission'
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://theinkpotgroup.com',
        }
      }
    );
  }
}

// Handle OPTIONS (preflight) requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://theinkpotgroup.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}