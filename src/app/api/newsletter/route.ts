// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";
import { appendSubscriberToSheet } from "@/lib/googleSheets"; // keep your existing helper

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search")?.trim();

    const db = getDb();
    if (!db) {
      // No DB configured in this environment
      return NextResponse.json([], { status: 200 });
    }

    let q = db.select().from(newsletterSubscribers);

    if (search) {
      const term = `%${search}%`;
      q = q.where(
        or(
          like(newsletterSubscribers.name, term),
          like(newsletterSubscribers.email, term)
        )
      );
    }

    const rows = await q.limit(limit).offset(offset);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("GET newsletter_subscribers error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "DATABASE_ERROR" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!name) {
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string", code: "MISSING_NAME" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { error: "Email is required and must be a non-empty string", code: "MISSING_EMAIL" },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format", code: "INVALID_EMAIL_FORMAT" },
        { status: 400 }
      );
    }

    const db = getDb();
    let created: any = { name, email, isActive: true };

    if (db) {
      const existing = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, email))
        .limit(1);

      if (existing.length > 0) {
        return NextResponse.json(
          { error: "Email address is already subscribed", code: "DUPLICATE_EMAIL" },
          { status: 409 }
        );
      }

      const [row] = await db
        .insert(newsletterSubscribers)
        .values({
          name,
          email,
          subscribedAt: new Date().toISOString(),
          isActive: true,
        })
        .returning();

      created = row;
    }

    // Try Sheets regardless of DB presence; do not fail the request if Sheets fails
    try {
      await appendSubscriberToSheet({ name, email });
    } catch (e) {
      console.error("Sheets append failed:", e);
      // intentionally not throwing
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST newsletter_subscribers error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "DATABASE_ERROR" },
      { status: 500 }
    );
  }
}
