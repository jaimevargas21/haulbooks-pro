import { NextResponse } from "next/server";
import { clearLoginFailures, clientIp, recordLoginFailure, safeEqual } from "@/lib/passwords";
import { SESSION_COOKIE, SESSION_MAX_AGE, cookieSecure, safeNextPath, sameOriginUrl, signSession } from "@/lib/session";

export const runtime = "nodejs";

async function readCredentials(req: Request): Promise<{ password: string; next: string; json: boolean }> {
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await req.json().catch(() => ({}))) as { password?: unknown; next?: unknown };
    return {
      password: typeof body.password === "string" ? body.password : "",
      next: safeNextPath(typeof body.next === "string" ? body.next : "/"),
      json: true,
    };
  }
  const form = await req.formData();
  return {
    password: String(form.get("password") ?? ""),
    next: safeNextPath(String(form.get("next") ?? "/")),
    json: false,
  };
}

export async function POST(req: Request) {
  const { password, next, json } = await readCredentials(req);
  const expected = process.env.DASHBOARD_PASSWORD ?? "";
  if (!expected) {
    if (json) return NextResponse.json({ error: "DASHBOARD_PASSWORD is not set." }, { status: 503 });
    return NextResponse.redirect(sameOriginUrl(req, "/login"), 303);
  }

  const token = await signSession();
  if (!token) {
    if (json) return NextResponse.json({ error: "SESSION_SECRET is not set." }, { status: 503 });
    return NextResponse.redirect(sameOriginUrl(req, "/login"), 303);
  }

  const ip = clientIp(req);
  const ok = password.length > 0 && password.length <= 500 && safeEqual(password, expected);
  if (!ok) {
    const allowed = recordLoginFailure(ip);
    if (json) {
      return NextResponse.json({ error: allowed ? "Wrong password." : "Too many attempts." }, { status: allowed ? 401 : 429 });
    }
    const login = sameOriginUrl(req, "/login");
    login.searchParams.set("error", allowed ? "1" : "rate");
    login.searchParams.set("next", next);
    return NextResponse.redirect(login, 303);
  }

  clearLoginFailures(ip);
  const response = json ? NextResponse.json({ ok: true }) : NextResponse.redirect(sameOriginUrl(req, next), 303);
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: cookieSecure(req),
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
