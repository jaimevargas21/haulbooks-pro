import Link from "next/link";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import { formatWhen, placeLabel } from "@/lib/format";
import { getStore } from "@/lib/store";

export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage() {
  const store = await getStore();
  const [overview, leads, replies, tickets] = await Promise.all([
    store.overview(),
    store.listLeads(),
    store.listReplies(),
    store.listTickets(),
  ]);
  const pending = replies.filter((reply) => reply.status === "pending").slice(0, 4);
  const openTickets = tickets.filter((ticket) => ticket.status === "open").slice(0, 4);

  const cards = [
    { href: "/leads", label: "Leads", value: overview.leads, hint: "Companies in outreach" },
    { href: "/leads?status=replied", label: "Replied", value: overview.replied, hint: "Leads still marked replied" },
    { href: "/replies", label: "Pending approvals", value: overview.pendingApprovals, hint: "Drafts waiting on you" },
    { href: "/tickets?status=open", label: "Open tickets", value: overview.openTickets, hint: "Support still open" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Overview</h1>
        <p className="mt-1 text-sm text-muted">Outreach, draft replies, and support for HaulBooks Pro.</p>
      </div>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-2xl border border-line bg-navy-800 p-5 hover:border-amber-500/50">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-4xl font-semibold tabular-nums">{card.value}</p>
            <p className="mt-2 text-sm text-muted">{card.hint}</p>
          </Link>
        ))}
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-navy-800 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Drafts waiting</h2>
            <Link href="/replies" className="text-sm text-amber-400 hover:text-amber-500">
              All replies
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {pending.length === 0 ? <li className="text-sm text-muted">Nothing is waiting on you.</li> : null}
            {pending.map((reply) => (
              <li key={reply.id} className="rounded-xl border border-line px-3 py-3">
                <p className="font-medium">{reply.subject}</p>
                <p className="mt-1 text-sm text-muted">
                  {reply.company ?? reply.fromEmail} · {formatWhen(reply.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-navy-800 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Open tickets</h2>
            <Link href="/tickets" className="text-sm text-amber-400 hover:text-amber-500">
              All tickets
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {openTickets.length === 0 ? <li className="text-sm text-muted">No open tickets.</li> : null}
            {openTickets.map((ticket) => (
              <li key={ticket.id} className="rounded-xl border border-line px-3 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{ticket.subject}</p>
                  <StatusBadge value={ticket.priority} />
                </div>
                <p className="mt-1 text-sm text-muted">{ticket.fromEmail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="rounded-2xl border border-line bg-navy-800 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">Latest lead activity</h2>
          <Link href="/leads" className="text-sm text-amber-400 hover:text-amber-500">
            All leads
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-white/10">
          {leads.slice(0, 5).map((lead) => (
            <li key={lead.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{lead.company}</p>
                <p className="text-sm text-muted">
                  {placeLabel(lead.city, lead.state)} · {lead.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge value={lead.status} />
                <span className="text-sm text-muted">{formatWhen(lead.lastActivity)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
