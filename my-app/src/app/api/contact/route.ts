import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  console.log("📌 Received request:", req.method); // Log request method

  try {
    if (req.method !== "POST") {
      console.log("❌ 405 Error - Method Not Allowed");
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    console.log("✅ Connecting to Database...");
    await dbConnect();
    console.log("✅ Connected to Database");

    const { name, phone, email, query } = await req.json();
    if (!name || !phone || !email || !query) {
      console.log("❌ 400 Error - Missing Fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    const newContact = new Contact({ name, phone, email, query, submissionDate, timestamp });
    await newContact.save();
    console.log("✅ Data Saved to Database");

    sendEmailNotification(name, phone, email, query).catch(console.error);

    return new Response(JSON.stringify({ message: "Form submitted successfully!" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
