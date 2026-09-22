import { NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/origin";
import { SESSION_COOKIE, cookieSecure, sameOriginUrl } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const response = NextResponse.redirect(sameOriginUrl(req, "/login"), 303);
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: cookieSecure(req),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
