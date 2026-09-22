"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReplyStatus } from "@/lib/types";

export function ReplyActions({ id, status }: { id: string; status: ReplyStatus }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [pending, setPending] = useState<"approve" | "deny" | null>(null);
  const [error, setError] = useState("");

  async function act(kind: "approve" | "deny") {
    setPending(kind);
    setError("");
    const response = await fetch(`/api/replies/${id}/${kind}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ note }),
    });
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      setError(body.error || "Could not update this draft.");
      setPending(null);
      return;
    }
    setNote("");
    setPending(null);
    router.refresh();
  }

  if (status === "sent") {
    return <p className="text-sm text-muted">This draft was already sent. It cannot be approved or denied.</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      <label className="block text-sm text-muted" htmlFor={`note-${id}`}>
        Note for the support agent (optional)
        <textarea
          id={`note-${id}`}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={2000}
          rows={2}
          className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2 text-ink outline-none focus:ring-2 focus:ring-amber-500"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => act("approve")}
          disabled={pending !== null}
          className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-navy-900 disabled:opacity-60"
        >
          {pending === "approve" ? "Approving…" : status === "approved" ? "Approved — update note" : "Approve"}
        </button>
        <button
          type="button"
          onClick={() => act("deny")}
          disabled={pending !== null}
          className="rounded-full border border-bad/40 px-4 py-2 text-sm text-bad disabled:opacity-60"
        >
          {pending === "deny" ? "Denying…" : status === "denied" ? "Denied — update note" : "Deny"}
        </button>
      </div>
      {error ? <p className="text-sm text-bad">{error}</p> : null}
    </div>
  );
}
