import type { Metadata } from "next";
import { ReplyActions } from "@/components/reply-actions";
import { StatusBadge } from "@/components/status-badge";
import { formatWhen } from "@/lib/format";
import { getStore } from "@/lib/store";

export const metadata: Metadata = { title: "Replies" };

export default async function RepliesPage() {
  const store = await getStore();
  const replies = await store.listReplies();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Replies</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Inbound mail on the left, the draft the support agent wants to send on the right. Approve sends it onward. Deny keeps it, with your note.
        </p>
      </div>
      {replies.length === 0 ? <p className="text-sm text-muted">No replies yet. The support agent can push one to /api/ingest.</p> : null}
      <ul className="space-y-4">
        {replies.map((reply) => (
          <li
            key={reply.id}
            data-reply-id={reply.id}
            data-reply-status={reply.status}
            className="rounded-2xl border border-line bg-navy-800 p-4 md:p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge value={reply.status} />
              <p className="text-sm text-muted">{formatWhen(reply.createdAt)}</p>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{reply.subject}</h2>
            <p className="mt-1 text-sm text-muted">
              {reply.company ? `${reply.company} · ` : ""}
              {reply.fromEmail}
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <section className="rounded-xl border border-line bg-navy-950/50 p-4">
                <h3 className="text-xs font-medium uppercase tracking-wide text-muted">Inbound</h3>
                <p className="mt-2 text-sm whitespace-pre-wrap">{reply.inboundBody}</p>
              </section>
              <section className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
                <h3 className="text-xs font-medium uppercase tracking-wide text-amber-400">Draft reply</h3>
                <p className="mt-2 text-sm whitespace-pre-wrap">{reply.draftBody}</p>
              </section>
            </div>
            {reply.reviewerNote ? <p className="mt-4 text-sm text-muted">Your note: {reply.reviewerNote}</p> : null}
            <ReplyActions id={reply.id} status={reply.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
