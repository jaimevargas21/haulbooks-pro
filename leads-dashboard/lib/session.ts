import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

export const SESSION_COOKIE = "hb_leads_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const DEV_SECRET = "dev-only-session-secret-not-for-production";

export function sessionSecret(): Uint8Array | null {
  const raw = process.env.SESSION_SECRET?.trim() ?? "";
  if (raw.length >= 16) return new TextEncoder().encode(raw);
  if (process.env.NODE_ENV !== "production") return new TextEncoder().encode(DEV_SECRET);
  return null;
}

export async function signSession(): Promise<string | null> {
  const secret = sessionSecret();
  if (!secret) return null;
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("dashboard")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret);
}

export async function readSession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const secret = sessionSecret();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return payload.role === "admin" && payload.sub === "dashboard";
  } catch {
    return false;
  }
}

export function safeNextPath(value: string | null | undefined): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return "/";
  if (value.startsWith("/login") || value.includes("\\") || value.includes("://")) return "/";
  return value;
}

export function requestOrigin(req: Request): string {
  const forwardedHost = req.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || req.headers.get("host")?.trim();
  const forwardedProto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const current = new URL(req.url);
  const proto = forwardedProto === "https" || forwardedProto === "http" ? forwardedProto : current.protocol.replace(":", "");
  if (!host) return current.origin;
  return `${proto}://${host}`;
}

export function sameOriginUrl(req: Request, path: string): URL {
  return new URL(path, requestOrigin(req));
}

export function cookieSecure(req: Request): boolean {
  return requestOrigin(req).startsWith("https:");
}
