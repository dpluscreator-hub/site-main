import { z } from "zod";

// Framework-free validation, sanitization and rate-limiting helpers for the
// contact API. Kept out of the route handler so they can be unit-tested without
// spinning up a request, and reused by any other intake endpoint.

// --- Input schema ------------------------------------------------------------
// Trim + cap every field at the boundary; `.strip()` drops unknown keys so a
// caller can't smuggle extra spreadsheet columns.
export const contactSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(120),
    email: z.string().trim().email("Invalid email format").max(254),
    phone: z.string().trim().max(40).optional().default(""),
    company: z.string().trim().max(160).optional().default(""),
    message: z.string().trim().max(2000).optional().default(""),
    service: z.string().trim().max(120).optional().default(""),
    date: z.string().trim().max(40).optional().default(""),
    time: z.string().trim().max(40).optional().default(""),
    type: z.string().trim().max(60).optional().default("Contact Form"),
  })
  .strip();

export type ContactInput = z.infer<typeof contactSchema>;

// --- Spreadsheet formula-injection guard (OWASP CSV injection) ---------------
// A cell value beginning with = + - @ or a control char is executed as a live
// formula by Google Sheets/Excel. Prefix with an apostrophe to force plain text;
// also strip angle brackets as defense-in-depth against HTML/script content.
export function neutralizeFormula(value: string): string {
  if (!value) return value;
  const guarded = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return guarded.replace(/[<>]/g, "");
}

// --- Rate limiting -----------------------------------------------------------
export const RATE_LIMIT = 5; // max requests per window
export const RATE_WINDOW = 60_000; // 1 minute

export interface RateEntry {
  count: number;
  timestamp: number;
}

/** Drop entries older than the window so the map can't grow unbounded. */
export function pruneRateLimits(map: Map<string, RateEntry>, now: number): void {
  for (const [key, data] of map) {
    if (now - data.timestamp >= RATE_WINDOW) map.delete(key);
  }
}

/**
 * Record a hit for `key`. Returns true if the request is allowed, false if the
 * caller has exceeded RATE_LIMIT within the current window. Mutates `map`.
 */
export function consumeRateLimit(
  map: Map<string, RateEntry>,
  key: string,
  now: number
): boolean {
  const entry = map.get(key);
  if (entry && now - entry.timestamp < RATE_WINDOW) {
    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
  }
  map.set(key, { count: 1, timestamp: now });
  return true;
}

/** First hop of x-forwarded-for is the client; fall back to x-real-ip. */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
