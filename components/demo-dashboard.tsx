"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui";
import {
  attentionByTruck,
  demoViews,
  parseView,
  quarters,
  reportLines,
  reportNet,
  sampleReceipts,
  states,
  trucks,
  type DemoView,
  type Receipt,
} from "@/lib/demo-data";
import { money } from "@/lib/format";
import { site } from "@/lib/site";

function usd0(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function gallons(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function mpg(miles: number, fuel: number) {
  if (!fuel) return "—";
  return (miles / fuel).toFixed(2);
}

const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-navy-950 px-3 text-sm text-ink outline-none focus:border-amber-400";

function Icon({ name }: { name: DemoView | "help" }) {
  const paths: Record<string, string> = {
    home: "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z",
    receipts: "M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Zm7 1.2V8h3.2M8 12h8M8 16h6",
    ifta: "M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm0 4v5l3 2",
    trucks: "M3 16V8a1 1 0 0 1 1-1h9v9H3Zm10 0h3.2L20 13V8h-7M6.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
    reports: "M5 19V5h14v14H5Zm3-3 2.5-3 2 2L16 10",
    help: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-6v.5M12 8.5a2 2 0 0 1 1 3.7c-.6.4-1 1-1 1.8",
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusPill({ status }: { status: Receipt["status"] }) {
  const posted = status === "Posted";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${posted ? "bg-success/15 text-success" : "bg-amber-500/15 text-amber-300"}`}>
      {status}
    </span>
  );
}

function ReceiptMark() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-navy-950 text-amber-400" aria-hidden="true">
      <Icon name="receipts" />
    </span>
  );
}

function Ring({ value }: { value: number }) {
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - Math.min(100, Math.max(0, value)) / 100);
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28" aria-hidden="true">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className="text-amber-500"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="54" textAnchor="middle" className="fill-white" fontSize="16" fontWeight="700">
        {value}%
      </text>
    </svg>
  );
}

function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return { toast, setToast };
}

function ScreenTitle({ title, lede, action }: { title: string; lede: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h2>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{lede}</p>
      </div>
      {action}
    </div>
  );
}

function AmberButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center justify-center rounded-full bg-amber-500 px-4 py-2.5 text-sm font-bold text-navy-950 transition hover:bg-amber-600">
      {children}
    </button>
  );
}

export function DemoDashboard() {
  const router = useRouter();
  const params = useSearchParams();
  const view = parseView(params.get("view"));
  const [menuOpen, setMenuOpen] = useState(false);
  const label = demoViews.find((item) => item.id === view)?.label ?? "Home";

  function selectView(next: DemoView) {
    const nextParams = new URLSearchParams(params.toString());
    nextParams.set("view", next);
    router.replace(`/demo?${nextParams.toString()}`, { scroll: false });
    setMenuOpen(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
      <div id="demo-app" className="overflow-hidden rounded-2xl border border-line bg-navy-950 shadow-[0_40px_80px_-48px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col gap-3 border-b border-amber-400/30 bg-amber-500/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-amber-100">Demo data — Start free trial to use your trucks</p>
          <Link href={site.trialHref} className="text-sm font-bold text-amber-300 underline decoration-amber-400/50 underline-offset-4">
            Start free trial
          </Link>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-3 lg:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line"
            aria-expanded={menuOpen}
            aria-controls="demo-drawer"
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open dashboard menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <p className="font-display text-base font-bold">{label}</p>
          <span className="w-11" aria-hidden="true" />
        </div>
        <div className="flex min-h-[640px]">
          <Sidebar view={view} onSelect={selectView} className="hidden lg:flex" />
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <Screens view={view} onView={selectView} />
          </div>
        </div>
      </div>
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-navy-950/80" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div id="demo-drawer" className="absolute inset-y-0 left-0 flex w-[min(100%,18rem)]">
            <Sidebar view={view} onSelect={selectView} className="flex w-full" />
          </div>
        </div>
      ) : null}
      <StickyTrial />
    </div>
  );
}

function StickyTrial() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  if (hidden) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-navy-950/95 p-3 backdrop-blur lg:hidden">
      <ButtonLink href={site.trialHref} className="w-full">
        Start free trial
      </ButtonLink>
    </div>
  );
}

function Sidebar({ view, onSelect, className }: { view: DemoView; onSelect: (view: DemoView) => void; className: string }) {
  return (
    <nav className={`${className} flex-col border-r border-line bg-navy-900/70 p-3`} aria-label="Dashboard">
      <p className="px-3 pb-3 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Workspace</p>
      <ul className="space-y-1">
        {demoViews.map((item) => {
          const active = item.id === view;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold ${active ? "bg-amber-500 text-navy-950" : "text-ink hover:bg-white/5"}`}
              >
                <Icon name={item.id} />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto space-y-3 px-2 pt-8">
        <Link href="/contact" className="flex min-h-11 items-center gap-3 rounded-xl px-2 text-sm font-semibold text-muted hover:text-ink">
          <Icon name="help" />
          Help
        </Link>
        <ButtonLink href={site.trialHref} className="w-full">
          Start free trial
        </ButtonLink>
      </div>
    </nav>
  );
}

function Screens({ view, onView }: { view: DemoView; onView: (view: DemoView) => void }) {
  const { toast, setToast } = useToast();
  const [truckId, setTruckId] = useState(trucks[0].id);
  const [receipts, setReceipts] = useState<Receipt[]>(sampleReceipts);
  const [quarterId, setQuarterId] = useState(quarters[0].id);
  const [query, setQuery] = useState("");
  const [truckFilter, setTruckFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const truck = trucks.find((item) => item.id === truckId) ?? trucks[0];
  const quarter = quarters.find((item) => item.id === quarterId) ?? quarters[0];
  const recent = receipts.filter((item) => item.truck === truck.id).slice(0, 5);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return receipts.filter((item) => {
      if (truckFilter !== "all" && item.truck !== truckFilter) return false;
      if (stateFilter !== "all" && item.state !== stateFilter) return false;
      if (!needle) return true;
      return `${item.vendor} ${item.state} ${item.date}`.toLowerCase().includes(needle);
    });
  }, [query, receipts, stateFilter, truckFilter]);

  return (
    <div className="relative">
      {view === "home" ? (
        <HomeScreen truck={truck} onTruck={setTruckId} recent={recent} onUpload={() => setUploadOpen(true)} onReview={() => onView("ifta")} />
      ) : null}
      {view === "receipts" ? (
        <ReceiptsScreen
          receipts={filtered}
          query={query}
          truckFilter={truckFilter}
          stateFilter={stateFilter}
          onQuery={setQuery}
          onTruck={setTruckFilter}
          onState={setStateFilter}
          onUpload={() => setUploadOpen(true)}
        />
      ) : null}
      {view === "ifta" ? <IftaScreen quarter={quarter} onQuarter={setQuarterId} onExport={() => setToast("Demo only")} /> : null}
      {view === "trucks" ? <TrucksScreen onOpen={() => onView("home")} /> : null}
      {view === "reports" ? <ReportsScreen onExport={() => setToast("Demo only")} /> : null}
      {uploadOpen ? (
        <UploadDialog
          defaultTruck={truck.id}
          onClose={() => setUploadOpen(false)}
          onSave={(receipt) => {
            setReceipts((current) => [receipt, ...current]);
            setUploadOpen(false);
            setToast("Demo only — this receipt stays in the preview.");
          }}
        />
      ) : null}
      {toast ? (
        <p role="status" className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-navy-950 shadow-lg lg:bottom-8">
          {toast}
        </p>
      ) : null}
    </div>
  );
}

function HomeScreen({
  truck,
  onTruck,
  recent,
  onUpload,
  onReview,
}: {
  truck: (typeof trucks)[number];
  onTruck: (id: string) => void;
  recent: Receipt[];
  onUpload: () => void;
  onReview: () => void;
}) {
  const attention = attentionByTruck[truck.id] ?? [];
  const kpis = [
    ["Cost per mile", money(truck.cpm)],
    ["Fuel this month", usd0(truck.fuel)],
    ["IFTA readiness", `${truck.readiness}%`],
    ["Open gaps", String(truck.gaps)],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">Sample company · three trucks</p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">Good evening, Jaime</h2>
          <label className="mt-4 block text-xs font-bold uppercase tracking-[0.16em] text-muted" htmlFor="truck-select">
            Truck
          </label>
          <select id="truck-select" value={truck.id} onChange={(event) => onTruck(event.target.value)} className={`${fieldClass} mt-2 max-w-sm`}>
            {trucks.map((item) => (
              <option key={item.id} value={item.id}>
                {item.unit} · {item.model}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <AmberButton onClick={onUpload}>Upload receipt</AmberButton>
          <button type="button" onClick={onReview} className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-4 text-sm font-bold">
            Review IFTA
          </button>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(([label, value]) => (
          <li key={label} className="rounded-2xl border border-line bg-navy-900 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
            <p className="num mt-2 font-display text-3xl font-bold text-amber-400">{value}</p>
          </li>
        ))}
      </ul>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-navy-900/60 p-4">
          <h3 className="font-display text-lg font-bold">Needs attention</h3>
          <ul className="mt-3 space-y-2">
            {attention.map((item) => (
              <li key={item.title} className="rounded-xl border border-line bg-navy-950/50 p-3">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-navy-900/60 p-4">
          <h3 className="font-display text-lg font-bold">Recent receipts</h3>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No sample receipts on this truck yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {recent.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <ReceiptMark />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{item.vendor}</p>
                    <p className="text-xs text-muted">
                      {item.date} · {item.state} · {gallons(item.gallons)} gal
                    </p>
                  </div>
                  <p className="num text-sm font-bold">{money(item.amount)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function ReceiptsScreen({
  receipts,
  query,
  truckFilter,
  stateFilter,
  onQuery,
  onTruck,
  onState,
  onUpload,
}: {
  receipts: Receipt[];
  query: string;
  truckFilter: string;
  stateFilter: string;
  onQuery: (value: string) => void;
  onTruck: (value: string) => void;
  onState: (value: string) => void;
  onUpload: () => void;
}) {
  return (
    <div className="space-y-5">
      <ScreenTitle title="Receipts" lede="Search the sample fuel stops. Photos, gallons, and state stay on the truck." action={<AmberButton onClick={onUpload}>Upload receipt</AmberButton>} />
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Search
          <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Vendor or state" className={`${fieldClass} mt-2`} />
        </label>
        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Truck
          <select value={truckFilter} onChange={(event) => onTruck(event.target.value)} className={`${fieldClass} mt-2`}>
            <option value="all">All trucks</option>
            {trucks.map((truck) => (
              <option key={truck.id} value={truck.id}>
                {truck.unit}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">
          State
          <select value={stateFilter} onChange={(event) => onState(event.target.value)} className={`${fieldClass} mt-2`}>
            <option value="all">All states</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>
      {receipts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-8 text-sm text-muted">
          No receipts match that truck or state. This is sample data — your trucks show up after you start the trial.
        </p>
      ) : (
        <ul className="space-y-2">
          {receipts.map((item) => (
            <li key={item.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-navy-900/50 p-3 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <ReceiptMark />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{item.vendor}</p>
                  <p className="text-xs text-muted">
                    Unit {item.truck} · {item.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <p className="num text-sm font-bold">{money(item.amount)}</p>
                <p className="num text-sm text-muted">{gallons(item.gallons)} gal</p>
                <p className="num text-sm font-semibold">{item.state}</p>
                <StatusPill status={item.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IftaScreen({
  quarter,
  onQuarter,
  onExport,
}: {
  quarter: (typeof quarters)[number];
  onQuarter: (id: string) => void;
  onExport: () => void;
}) {
  return (
    <div className="space-y-5">
      <ScreenTitle
        title="Fuel & IFTA"
        lede="Miles, gallons, and MPG by jurisdiction. You review the worksheet. HaulBooks does not file it."
        action={<AmberButton onClick={onExport}>Export CSV</AmberButton>}
      />
      <div className="flex gap-2 overflow-x-auto pb-1" role="radiogroup" aria-label="Quarter">
        {quarters.map((item) => {
          const active = item.id === quarter.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onQuarter(item.id)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-bold ${active ? "bg-amber-500 text-navy-950" : "border border-line text-muted"}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <section className="rounded-2xl border border-line bg-navy-900 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Readiness</p>
          <div className="mt-3 flex justify-center">
            <Ring value={quarter.readiness} />
          </div>
          <p className="mt-2 text-center text-xs text-muted">{quarter.note}</p>
        </section>
        <ul className="space-y-2">
          {quarter.checks.map((check) => (
            <li key={check.label} className="rounded-2xl border border-line bg-navy-900/50 p-4">
              <p className="font-semibold">
                <span className={check.done ? "text-success" : "text-amber-300"}>{check.done ? "Done" : "Gap"}</span>
                <span className="text-muted"> · </span>
                {check.label}
              </p>
              <p className="mt-1 text-sm text-muted">{check.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <caption className="sr-only">Sample jurisdiction miles and gallons for {quarter.label}</caption>
          <thead className="bg-navy-900 text-[11px] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-bold">State</th>
              <th className="px-4 py-3 font-bold">Miles</th>
              <th className="px-4 py-3 font-bold">Gallons</th>
              <th className="px-4 py-3 font-bold">MPG</th>
            </tr>
          </thead>
          <tbody>
            {quarter.rows.map((row) => (
              <tr key={row.state} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{row.state}</td>
                <td className="num px-4 py-3">{row.miles.toLocaleString("en-US")}</td>
                <td className="num px-4 py-3">{gallons(row.gallons)}</td>
                <td className="num px-4 py-3">{mpg(row.miles, row.gallons)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrucksScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="space-y-5">
      <ScreenTitle
        title="Trucks"
        lede="Three sample units. Cost per mile uses the fuel and miles on that truck, not a company average."
        action={<AmberButton onClick={onOpen}>Open Unit 214</AmberButton>}
      />
      <ul className="grid gap-4 md:grid-cols-3">
        {trucks.map((truck) => (
          <li key={truck.id} className="flex flex-col rounded-2xl border border-line bg-navy-900 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">{truck.status}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{truck.unit}</h3>
            <p className="mt-1 text-sm text-muted">{truck.model}</p>
            <p className="num mt-6 font-display text-4xl font-bold text-amber-400">{money(truck.cpm)}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Cost per mile</p>
            <p className="mt-4 text-sm text-muted">
              Fuel this month {usd0(truck.fuel)} · IFTA {truck.readiness}% · {truck.gaps} open gaps
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReportsScreen({ onExport }: { onExport: () => void }) {
  const net = reportNet();
  return (
    <div className="space-y-5">
      <ScreenTitle
        title="Reports"
        lede="A sample September snapshot for three trucks. Export is a preview — your accountant’s CSV unlocks on a trial."
        action={<AmberButton onClick={onExport}>Export CSV</AmberButton>}
      />
      <div className="overflow-hidden rounded-2xl border border-line">
        <ul>
          {reportLines.map((line) => (
            <li key={line.label} className="flex items-center justify-between gap-4 border-b border-line px-4 py-4">
              <span className="font-medium">{line.label}</span>
              <span className={`num font-bold ${line.amount < 0 ? "text-muted" : "text-ink"}`}>{money(line.amount)}</span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-4 bg-navy-900 px-4 py-4">
            <span className="font-display text-lg font-bold">Net</span>
            <span className="num font-display text-2xl font-bold text-amber-400">{money(net)}</span>
          </li>
        </ul>
      </div>
      <p className="text-xs leading-relaxed text-muted">
        Sample figures only. HaulBooks Pro does not file taxes and this is not a profit-and-loss you can hand to a state.
      </p>
    </div>
  );
}

function UploadDialog({
  defaultTruck,
  onClose,
  onSave,
}: {
  defaultTruck: string;
  onClose: () => void;
  onSave: (receipt: Receipt) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const ignoreClose = useRef(false);
  const titleId = useId();
  const [vendor, setVendor] = useState("Pilot Travel Center");
  const [amount, setAmount] = useState("425.00");
  const [gallonValue, setGallonValue] = useState("112");
  const [state, setState] = useState("TX");
  const [truck, setTruck] = useState(defaultTruck);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      ignoreClose.current = true;
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="w-[min(100%-1.5rem,28rem)] rounded-2xl border border-line bg-navy-900 p-0 text-ink backdrop:bg-black/70"
      onClose={() => {
        if (ignoreClose.current) return;
        onClose();
      }}
    >
      <form
        className="p-5"
        onSubmit={(event) => {
          event.preventDefault();
          const parsedAmount = Number(amount);
          const parsedGallons = Number(gallonValue);
          if (!vendor.trim() || !Number.isFinite(parsedAmount) || !Number.isFinite(parsedGallons)) return;
          onSave({
            id: `new-${Date.now()}`,
            vendor: vendor.trim(),
            amount: parsedAmount,
            gallons: parsedGallons,
            state,
            status: "Posted",
            truck,
            date: "Sep 21",
          });
        }}
      >
        <h2 id={titleId} className="font-display text-2xl font-bold">
          Upload receipt
        </h2>
        <p className="mt-2 text-sm text-muted">Sample photo. Nothing leaves this browser.</p>
        <div className="mt-4 rounded-xl border border-dashed border-amber-400/40 bg-navy-950 p-4 text-sm text-muted">
          Cab photo placeholder · vendor, total, and gallons are editable before you save.
        </div>
        <div className="mt-4 grid gap-3">
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Vendor
            <input value={vendor} onChange={(event) => setVendor(event.target.value)} required className={`${fieldClass} mt-2`} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Total
              <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" required className={`${fieldClass} mt-2`} />
            </label>
            <label className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Gallons
              <input value={gallonValue} onChange={(event) => setGallonValue(event.target.value)} inputMode="decimal" required className={`${fieldClass} mt-2`} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              State
              <select value={state} onChange={(event) => setState(event.target.value)} className={`${fieldClass} mt-2`}>
                {states.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Truck
              <select value={truck} onChange={(event) => setTruck(event.target.value)} className={`${fieldClass} mt-2`}>
                {trucks.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.unit}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="min-h-11 rounded-full px-4 text-sm font-bold text-muted">
            Cancel
          </button>
          <button type="submit" className="min-h-11 rounded-full bg-amber-500 px-4 text-sm font-bold text-navy-950 hover:bg-amber-600">
            Save to demo
          </button>
        </div>
      </form>
    </dialog>
  );
}

export function DemoPreview({ view }: { view: DemoView }) {
  return (
    <div className="pointer-events-none select-none bg-navy-950 p-4 sm:p-5" aria-hidden="true">
      <PreviewBody view={view} />
    </div>
  );
}

function PreviewBody({ view }: { view: DemoView }) {
  const truck = trucks[0];
  if (view === "home") {
    return (
      <HomeScreen
        truck={truck}
        onTruck={() => undefined}
        recent={sampleReceipts.filter((item) => item.truck === truck.id).slice(0, 5)}
        onUpload={() => undefined}
        onReview={() => undefined}
      />
    );
  }
  if (view === "receipts") {
    return (
      <ReceiptsScreen
        receipts={sampleReceipts}
        query=""
        truckFilter="all"
        stateFilter="all"
        onQuery={() => undefined}
        onTruck={() => undefined}
        onState={() => undefined}
        onUpload={() => undefined}
      />
    );
  }
  if (view === "ifta") return <IftaScreen quarter={quarters[0]} onQuarter={() => undefined} onExport={() => undefined} />;
  if (view === "trucks") return <TrucksScreen onOpen={() => undefined} />;
  return <ReportsScreen onExport={() => undefined} />;
}

export function DashboardTeaser() {
  const [view, setView] = useState<DemoView>("home");
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Dashboard preview">
        {demoViews.map((item) => {
          const active = item.id === view;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setView(item.id)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-bold ${active ? "bg-amber-500 text-navy-950" : "border border-line text-muted"}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 h-[28rem] overflow-hidden rounded-2xl border border-line bg-navy-950">
        <DemoPreview view={view} />
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={`/demo?view=${view}`}>Open the dashboard</ButtonLink>
        <ButtonLink href={site.trialHref} variant="secondary">
          Start free trial
        </ButtonLink>
      </div>
    </div>
  );
}
