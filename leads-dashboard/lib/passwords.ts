import { createHash, timingSafeEqual } from "node:crypto";

export function safeEqual(left: string, right: string): boolean {
  const a = createHash("sha256").update(left, "utf8").digest();
  const b = createHash("sha256").update(right, "utf8").digest();
  return timingSafeEqual(a, b);
}

const failures = new Map<string, { count: number; reset: number }>();

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Returns false once this IP has more than 8 failed logins in 15 minutes. */
export function recordLoginFailure(ip: string): boolean {
  const now = Date.now();
  const current = failures.get(ip);
  if (!current || current.reset < now) {
    failures.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return true;
  }
  current.count += 1;
  return current.count <= 8;
}

export function clearLoginFailures(ip: string) {
  failures.delete(ip);
}
