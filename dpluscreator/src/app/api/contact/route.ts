import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";
import {
  contactSchema,
  neutralizeFormula,
  pruneRateLimits,
  consumeRateLimit,
  getClientIP,
} from "@/lib/contact-validation";

// In-memory rate-limit store. For multi-instance/serverless production, back
// this with Redis or a durable store — per-instance memory does not share state.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const now = Date.now();
    pruneRateLimits(rateLimitMap, now);

    const clientIP = getClientIP(request.headers);
    if (!consumeRateLimit(rateLimitMap, clientIP, now)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Reject non-JSON / malformed bodies instead of throwing.
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      console.error("Missing Google Sheets configuration");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      Timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      Name: neutralizeFormula(data.name),
      Email: neutralizeFormula(data.email),
      Phone: neutralizeFormula(data.phone) || "N/A",
      Company: neutralizeFormula(data.company) || "N/A",
      Service: neutralizeFormula(data.service) || "N/A",
      Date: neutralizeFormula(data.date) || "N/A",
      Time: neutralizeFormula(data.time) || "N/A",
      Message: neutralizeFormula(data.message) || "N/A",
      Type: neutralizeFormula(data.type) || "Contact Form",
    });

    return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
