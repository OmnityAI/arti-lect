// /app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";
import { appendSubscriberToSheet } from "@/lib/googleSheets";

export const runtime = "nodejs"; // IMPORTANT: googleapis needs Node runtime

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");

    let query = db.select().from(newsletterSubscribers);

    if (search) {
      const term = `%${search.trim()}%`;
      query = query.where(
        or(
          like(newsletterSubscribers.name, term),
          like(newsletterSubscribers.email, term),
        ),
      );
    }

    const subscribers = await query.limit(limit).offset(offset);
    return NextResponse.json(subscribers, { status: 200 });
  } catch (error) {
    console.error("GET newsletter_subscribers error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "DATABASE_ERROR" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!name?.trim())
      return NextResponse.json(
        { error: "Name is required", code: "MISSING_NAME" },
        { status: 400 },
      );

    if (!email?.trim())
      return NextResponse.json(
        { error: "Email is required", code: "MISSING_EMAIL" },
        { status: 400 },
      );

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format", code: "INVALID_EMAIL_FORMAT" },
        { status: 400 },
      );
    }

    // Duplicate check
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email address is already subscribed", code: "DUPLICATE_EMAIL" },
        { status: 409 },
      );
    }

    // DB insert
    const [created] = await db
      .insert(newsletterSubscribers)
      .values({
        name: trimmedName,
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
        isActive: true,
      })
      .returning();

    // Fire-and-forget append to Google Sheets (don’t block the response if it fails)
    appendSubscriberToSheet({ name: trimmedName, email: normalizedEmail })
      .catch((e) => console.error("Sheets append failed:", e));

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST newsletter_subscribers error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "DATABASE_ERROR" },
      { status: 500 },
    );
  }
}
