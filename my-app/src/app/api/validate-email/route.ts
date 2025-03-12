import { NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";

// Convert DNS methods to promises
const resolveMx = promisify(dns.resolveMx);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ valid: false, message: "Email is required" }, { status: 400 });
  }

  try {
    console.log("🔍 Validating email:", email);
    const result = await validateEmail(email);
    
    if (!result.valid) {
      console.log("❌ Email validation failed:", result.message);
      return NextResponse.json({ valid: false, message: result.message }, { status: 400 });
    }

    console.log("✅ Email validation passed for:", email);
    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Email validation error:", error);
    return NextResponse.json({ 
      valid: false, 
      message: "Email validation failed" 
    }, { status: 500 });
  }
}

async function validateEmail(email: string): Promise<{ valid: boolean; message?: string }> {
  // Step 1: Basic format validation using regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Email format is invalid" };
  }

  // Extract domain
  const domain = email.split("@")[1]?.toLowerCase();

  console.log("🔍 Checking email domain:", domain);

  if (!domain) {
    return { valid: false, message: "Invalid email domain" };
  }

  // Step 2: Check for disposable email domains
  if (isDisposableEmail(domain)) {
    return { valid: false, message: "Disposable email addresses are not accepted" };
  }

  // Step 3: Check for role-based emails
  if (isRoleEmail(email.split("@")[0])) {
    return { valid: false, message: "Role-based email addresses are not accepted" };
  }

  // Step 4: Check for common invalid domains
  if (isInvalidDomain(domain)) {
    return { valid: false, message: "Email domain appears to be invalid" };
  }
  
  // Step 5: Verify domain exists (MX records check)
  try {
    const hasMxRecords = await checkMxRecords(domain);
    if (!hasMxRecords) {
      return { valid: false, message: "Email domain does not have valid mail servers" };
    }
  } catch (error) {
    console.error("⚠️ MX Record check error:", error);
    console.log("⚠️ Skipping MX verification due to DNS error");
  }

  return { valid: true };
}

function isDisposableEmail(domain: string): boolean {
  const disposableDomains = [
    "tempmail.com", "mailinator.com", "guerrillamail.com", "10minutemail.com",
    "temp-mail.org", "fake-email.com", "throwawaymail.com", "yopmail.com",
    "sharklasers.com", "trashmail.com", "emailfake.com", "dispostable.com",
    "maildrop.cc", "harakirimail.com", "mailnesia.com", "spamgourmet.com",
    "getairmail.com", "getnada.com", "trash-mail.com", "temporarymail.com",
    "tempemail.net", "spamherelots.com", "mintmail.com", "tempmail.net",
    "tempm.com", "tmpmail.net", "mailcatch.com", "moakt.co", "spam4.me",
    "emailondeck.com", "anonbox.net", "tuamae.com", "keemail.me", "mailsac.com"
  ];

  console.log("🔍 Checking disposable domain:", domain);

  // Check if the domain **ends with** any known disposable domain (handles subdomains)
  return disposableDomains.some(d => domain.endsWith(d));
}

function isRoleEmail(localPart: string): boolean {
  const roleBasedEmails = [
    "admin", "administrator", "billing", "contact", "demo", "help", "info",
    "mail", "noreply", "no-reply", "office", "postmaster", "sales", "support",
    "webmaster", "hello", "abuse", "marketing", "team", "careers", "accounts",
    "hr", "jobs", "service", "test", "finance", "newsletter"
  ];

  console.log("🔍 Checking role-based email:", localPart);

  return roleBasedEmails.includes(localPart.toLowerCase());
}

function isInvalidDomain(domain: string): boolean {
  // Common typos and fake domains
  const invalidDomains = [
    "gmial.com", "gmail.co", "gamil.com", "gmail.cim", "gmal.com",
    "hotmai.com", "hotmail.co", "yaho.com", "yahooo.com", "outlok.com",
    "outloo.com", "protonmai.com", "aol.co", "example.com", "test.com",
    "domain.com", "email.com", "mail.com"
  ];
  
  console.log("🔍 Checking invalid domain:", domain);

  return invalidDomains.includes(domain.toLowerCase());
}

async function checkMxRecords(domain: string): Promise<boolean> {
  try {
    const addresses = await resolveMx(domain);
    console.log("✅ MX Records found:", addresses);
    return addresses && addresses.length > 0;
  } catch (error) {
    console.error("❌ MX lookup error:", error);
    return false;
  }
}
