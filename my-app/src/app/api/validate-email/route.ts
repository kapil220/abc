import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.ABSTRACT_API_KEY; // Make sure this is set
    const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("📩 AbstractAPI Response:", JSON.stringify(data, null, 2)); // Debug API response

    if (!data || !data.deliverability || data.deliverability !== "DELIVERABLE") {
      return NextResponse.json({ valid: false, error: "Invalid email address" }, { status: 400 });
    }

    return NextResponse.json({ valid: true }, { status: 200 });

  } catch (error) {
    console.error("❌ Email validation error:", error);
    return NextResponse.json({ error: "Email validation failed" }, { status: 500 });
  }
}
