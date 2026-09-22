import Link from "next/link";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import { fleetLabel, formatWhen, placeLabel } from "@/lib/format";
import { getStore } from "@/lib/store";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Leads" };

function isStatus(value: string | undefined): value is LeadStatus {
  return LEAD_STATUSES.includes(value as LeadStatus);
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const store = await getStore();
  const leads = (await store.listLeads()).filter((lead) => {
    if (isStatus(status) && lead.status !== status) return false;
    if (!query) return true;
    const haystack = `${lead.company} ${lead.email} ${lead.city} ${lead.state} ${lead.notes}`.toLowerCase();
    return haystack.includes(query);
  });

  const filters = [{ href: "/leads", label: "All", active: !isStatus(status) }].concat(
    LEAD_STATUSES.map((item) => ({
      href: `/leads?status=${item}`,
      label: item,
      active: status === item,
    })),
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Leads</h1>
        <p className="mt-1 text-sm text-muted">{leads.length} shown. Status moves from new to closed as outreach progresses.</p>
      </div>
      <form className="flex flex-col gap-2 sm:flex-row" action="/leads">
        {isStatus(status) ? <input type="hidden" name="status" value={status} /> : null}
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search company, email, or city"
          className="w-full rounded-xl border border-line bg-navy-950 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button type="submit" className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-navy-900">
          Search
        </button>
      </form>
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <Link
            key={filter.label}
            href={query ? `${filter.href}${filter.href.includes("?") ? "&" : "?"}q=${encodeURIComponent(query)}` : filter.href}
            className={`rounded-full px-3 py-1 text-sm capitalize ${filter.active ? "bg-white/15 text-ink" : "text-muted hover:text-ink"}`}
          >
            {filter.label}
          </Link>
        ))}
      </div>
      {leads.length === 0 ? <p className="text-sm text-muted">No leads match this filter.</p> : null}
      <div className="hidden overflow-hidden rounded-2xl border border-line md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-950/60 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">City / state</th>
              <th className="px-4 py-3 font-medium">Fleet</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Last activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-navy-800">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{lead.company}</p>
                  {lead.notes ? <p className="mt-1 max-w-xs text-xs text-muted">{lead.notes}</p> : null}
                </td>
                <td className="px-4 py-3 text-muted">{lead.email}</td>
                <td className="px-4 py-3">{placeLabel(lead.city, lead.state)}</td>
                <td className="px-4 py-3 tabular-nums">{fleetLabel(lead.fleetSize)}</td>
                <td className="px-4 py-3">
                  <StatusBadge value={lead.status} />
                </td>
                <td className="px-4 py-3 text-muted">{formatWhen(lead.lastActivity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-3 md:hidden">
        {leads.map((lead) => (
          <li key={lead.id} className="rounded-2xl border border-line bg-navy-800 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">{lead.company}</p>
              <StatusBadge value={lead.status} />
            </div>
            <p className="mt-2 text-sm text-muted">{lead.email}</p>
            <p className="mt-1 text-sm">
              {placeLabel(lead.city, lead.state)} · {fleetLabel(lead.fleetSize)}
            </p>
            <p className="mt-1 text-sm text-muted">{formatWhen(lead.lastActivity)}</p>
            {lead.notes ? <p className="mt-2 text-sm text-muted">{lead.notes}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
