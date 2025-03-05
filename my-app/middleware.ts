import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    const response = new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*', // Or specific origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
    return response;
  }

  const response = NextResponse.next();

  // Dynamically set CORS headers
  const allowedOrigins = [
    "https://www.theinkpotgroup.com/",
    "http://localhost:3000", // Add development environment
  ];

  const origin = req.headers.get("origin") || "";

  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    // If origin is not allowed, you might want to set a default or not set the header
    response.headers.set("Access-Control-Allow-Origin", "https://www.theinkpotgroup.com/");
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}

export const config = {
  matcher: "/api/:path*",
};