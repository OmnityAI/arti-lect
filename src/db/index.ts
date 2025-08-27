// src/db/index.ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

/**
 * Returns a Drizzle DB instance if database env vars are present.
 * Otherwise returns null (so the app can still run without DB).
 */
let cachedDb: ReturnType<typeof drizzle> | null | undefined;

export function getDb() {
  if (cachedDb !== undefined) return cachedDb; // cache across invocations

  const url =
    process.env.TURSO_DATABASE_URL ||
    process.env.LIBSQL_DATABASE_URL ||
    process.env.DATABASE_URL;

  const authToken =
    process.env.TURSO_AUTH_TOKEN || process.env.LIBSQL_AUTH_TOKEN;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[DB] No database URL found. Running without DB.");
    }
    cachedDb = null;
    return cachedDb;
  }

  const client = createClient({ url, authToken });
  cachedDb = drizzle(client);
  return cachedDb;
}
