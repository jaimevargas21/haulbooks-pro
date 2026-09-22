import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readSession, requestOrigin, safeNextPath } from "@/lib/session";

const PUBLIC_PATHS = new Set(["/login", "/api/auth/login", "/api/auth/logout", "/api/ingest"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname === "/favicon.ico" || pathname === "/icon.svg" || pathname === "/robots.txt") {
    return NextResponse.next();
  }

  const signedIn = await readSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/login") {
    if (signedIn) return NextResponse.redirect(new URL("/", requestOrigin(request)));
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith("/api/ingest")) {
    return NextResponse.next();
  }

  if (signedIn) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const login = new URL("/login", requestOrigin(request));
  login.searchParams.set("next", safeNextPath(pathname));
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
