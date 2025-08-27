// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "10", 10), 100);
    const offset = parseInt(searchParams.get("offset") ?? "0", 10);
    const search = searchParams.get("search")?.trim();

    const term = search ? `%${search}%` : null;

    // Build the query without mutating a builder variable
    const query = term
      ? db
          .select()
          .from(newsletterSubscribers)
          .where(
            or(
              like(newsletterSubscribers.name, term),
              like(newsletterSubscribers.email, term)
            )
          )
      : db.select().from(newsletterSubscribers);

    const subscribers = await query.limit(limit).offset(offset);
    return NextResponse.json(subscribers, { status: 200 });
  } catch (error) {
    console.error("GET newsletter_subscribers error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error, code: "DATABASE_ERROR" },
      { status: 500 }
    );
  }
}
