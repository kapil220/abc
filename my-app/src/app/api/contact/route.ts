import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, phone, email, query } = await req.json();
    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    // Save to database (No changes here)
    const newContact = new Contact({ name, phone, email, query, submissionDate, timestamp });
    await newContact.save();

    // Send Email (Runs in background, does not block form submission)
    sendEmailNotification(name, phone, email, query);

    return NextResponse.json({ message: "Form submitted successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit form", details: error }, { status: 500 });
  }
}

// Email Sending Function (Runs in background)
async function sendEmailNotification(name: string, phone: string, email: string, query: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "recipient@example.com", // Change this to your email
    subject: `New Contact Form Submission from ${name}`,
    text: `
    📌 Name: ${name}
    📞 Phone: ${phone}
    ✉️ Email: ${email}
    💬 Query: ${query}

    Submitted on: ${new Date().toLocaleString()}
    `,
  };

  transporter.sendMail(mailOptions).catch((err) => console.error("Email error:", err));
}
