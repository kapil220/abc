import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

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
  // Log the entire request for debugging
  console.log("📌 Received request method:", req.method);
  console.log("📌 Request URL:", req.url);

  // CORS headers for all responses
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };

  try {
    // Validate request method
    if (req.method !== "POST") {
      console.log("❌ 405 Error - Method Not Allowed");
      return new NextResponse(
        JSON.stringify({ error: "Method Not Allowed" }), 
        { 
          status: 405,
          headers: corsHeaders 
        }
      );
    }

    // Database connection
    console.log("✅ Connecting to Database...");
    await dbConnect();
    console.log("✅ Connected to Database");

    // Parse request body
    const requestBody = await req.json();
    const { name, phone, email, query } = requestBody;

    // Validate input
    if (!name || !phone || !email || !query) {
      console.log("❌ 400 Error - Missing Fields");
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }), 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    // Save to database
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    const newContact = new Contact({ 
      name, 
      phone, 
      email, 
      query, 
      submissionDate, 
      timestamp 
    });
    await newContact.save();
    console.log("✅ Data Saved to Database");

    // Send email notification
    await sendEmailNotification(name, phone, email, query);

    // Successful response
    return new NextResponse(
      JSON.stringify({ message: "Form submitted successfully!" }), 
      { 
        status: 201,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        }
      }
    );

  } catch (error) {
    console.error("❌ Server Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }), 
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}

async function sendEmailNotification(name: string, phone: string, email: string, query: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Missing email credentials");
    return;
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