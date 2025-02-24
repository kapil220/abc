import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, phone, email, query } = await req.json();
    if (!name || !phone || !email || !query) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submissionDate = new Date().toLocaleDateString();
    const timestamp = new Date().toISOString();

    // Save to the database
    const newContact = new Contact({ name, phone, email, query, submissionDate, timestamp });
    await newContact.save();

    // Send Email (asynchronous, non-blocking)
    sendEmailNotification(name, phone, email, query).catch(console.error);

    return NextResponse.json({ message: "Form submitted successfully!" }, { status: 201 });
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    
    if (error instanceof Error) {
        errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
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
    to: "rajputkapil436@gmail.com", // Change to your email
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
