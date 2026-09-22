import Link from "next/link";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import { formatWhen } from "@/lib/format";
import { getStore } from "@/lib/store";
import { TICKET_STATUSES, type TicketStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Tickets" };

function isStatus(value: string | undefined): value is TicketStatus {
  return TICKET_STATUSES.includes(value as TicketStatus);
}

export default async function TicketsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const store = await getStore();
  const tickets = (await store.listTickets()).filter((ticket) => (isStatus(status) ? ticket.status === status : true));
  const filters = [{ href: "/tickets", label: "All", active: !isStatus(status) }].concat(
    TICKET_STATUSES.map((item) => ({ href: `/tickets?status=${item}`, label: item, active: status === item })),
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Tickets</h1>
        <p className="mt-1 text-sm text-muted">Support already in progress. Open means someone still needs to act.</p>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <Link
            key={filter.label}
            href={filter.href}
            className={`rounded-full px-3 py-1 text-sm capitalize ${filter.active ? "bg-white/15 text-ink" : "text-muted hover:text-ink"}`}
          >
            {filter.label}
          </Link>
        ))}
      </div>
      {tickets.length === 0 ? <p className="text-sm text-muted">No tickets in this view.</p> : null}
      <ul className="space-y-3">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="rounded-2xl border border-line bg-navy-800 p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge value={ticket.status} />
              <StatusBadge value={ticket.priority} />
              <span className="text-sm text-muted">{formatWhen(ticket.createdAt)}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{ticket.subject}</h2>
            <p className="mt-1 text-sm text-muted">{ticket.fromEmail}</p>
            {ticket.body ? <p className="mt-3 text-sm whitespace-pre-wrap">{ticket.body}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
