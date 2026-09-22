import { NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/origin";
import { unauthorizedIfSignedOut } from "@/lib/require-session";
import { getStore } from "@/lib/store";

export const runtime = "nodejs";

async function readNote(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { note?: unknown };
  if (typeof body.note !== "string") return undefined;
  const note = body.note.trim();
  if (!note) return undefined;
  return note.slice(0, 2000);
}

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const unauthorized = await unauthorizedIfSignedOut();
  if (unauthorized) return unauthorized;
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await context.params;
  const note = await readNote(req);
  const store = await getStore();
  const result = await store.reviewReply(id, "approved", note);
  if (!result.ok && result.error === "not_found") {
    return NextResponse.json({ error: "Reply not found." }, { status: 404 });
  }
  if (!result.ok && result.error === "already_sent") {
    return NextResponse.json({ error: "This draft was already sent." }, { status: 409 });
  }
  if (!result.ok) {
    return NextResponse.json({ error: "Could not update this draft." }, { status: 400 });
  }
  return NextResponse.json({ ok: true, reply: result.reply });
}
