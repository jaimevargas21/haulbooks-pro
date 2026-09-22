import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, readSession } from "@/lib/session";

export async function unauthorizedIfSignedOut() {
  const jar = await cookies();
  const ok = await readSession(jar.get(SESSION_COOKIE)?.value);
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}
