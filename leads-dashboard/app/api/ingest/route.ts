import { NextResponse } from "next/server";
import { parseIngest } from "@/lib/ingest";
import { safeEqual } from "@/lib/passwords";
import { getStore } from "@/lib/store";
import { IngestConflictError } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const expected = process.env.INGEST_API_KEY ?? "";
  if (!expected) {
    return NextResponse.json({ error: "Ingest is not configured. Set INGEST_API_KEY." }, { status: 503 });
  }
  const provided = req.headers.get("x-api-key") ?? "";
  if (!safeEqual(provided, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = parseIngest(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.issues }, { status: 400 });
  }

  try {
    const store = await getStore();
    const result = await store.ingest(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof IngestConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("ingest failed");
    return NextResponse.json({ error: "Could not save records." }, { status: 500 });
  }
}
