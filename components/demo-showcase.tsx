"use client";

import { useEffect, useMemo, useState } from "react";

const receiptSteps = [
  { key: "snap", label: "Snap", caption: "Photograph the receipt at the pump." },
  { key: "read", label: "Read", caption: "We pull vendor, date, total, and gallons." },
  { key: "classify", label: "Classify", caption: "Fuel, maintenance, or other deductible." },
  { key: "post", label: "Post", caption: "An expense is logged and the IFTA gallons update." },
] as const;

const fields = [
  ["Vendor", "Pilot Travel Center #442"],
  ["Date", "Aug 9, 2026"],
  ["Total", "$612.40"],
  ["Gallons", "158.4"],
  ["Jurisdiction", "TX"],
] as const;

const jurisdictions = [
  { j: "TX", miles: 4820, gal: 712, rate: 0.2 },
  { j: "OK", miles: 1960, gal: 250, rate: 0.19 },
  { j: "AR", miles: 1420, gal: 168, rate: 0.285 },
  { j: "MO", miles: 2310, gal: 340, rate: 0.27 },
  { j: "IL", miles: 980, gal: 96, rate: 0.622 },
];

const expenses = [
  { cat: "Fuel", amount: 18420, pct: 62 },
  { cat: "Maintenance", amount: 4310, pct: 15 },
  { cat: "Insurance", amount: 2850, pct: 10 },
  { cat: "Tolls & parking", amount: 1640, pct: 6 },
  { cat: "Meals (50%)", amount: 980, pct: 4 },
  { cat: "Other", amount: 760, pct: 3 },
];

const bills = [
  { name: "Truck note — Freightliner", amount: 2140, due: "Sep 1", status: "Scheduled" },
  { name: "Commercial insurance", amount: 1180, due: "Sep 5", status: "Due soon" },
  { name: "ELD subscription", amount: 42, due: "Sep 7", status: "Scheduled" },
  { name: "Trailer lease", amount: 650, due: "Sep 10", status: "Scheduled" },
  { name: "Parking / yard", amount: 275, due: "Aug 28", status: "Overdue" },
  { name: "Factoring fee", amount: 310, due: "Sep 15", status: "Paid" },
];

const tabs = [
  { key: "receipt", label: "Receipt scan" },
  { key: "ifta", label: "IFTA" },
  { key: "expenses", label: "Expenses" },
  { key: "bills", label: "Monthly bills" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function ReceiptDemo() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduced || !playing) return;
    const timer = window.setTimeout(() => {
      setStep((current) => {
        if (current >= receiptSteps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, step]);

  const title =
    step === 0 ? "Capture receipt" : step === 1 ? "Reading fields" : step === 2 ? "Classifying" : "Expense posted";

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="order-2 lg:order-1">
        <div className="mx-auto w-full max-w-[280px] rounded-[2.2rem] border border-line bg-navy-800 p-2 shadow-2xl">
          <div className="overflow-hidden rounded-[1.7rem] bg-navy-950">
            <div className="flex items-center justify-between px-5 pt-4 text-[10px] font-semibold text-muted">
              <span>9:41</span>
              <span className="text-amber-400">HaulBooks</span>
              <span>100%</span>
            </div>
            <div className="px-4 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
                Step {step + 1} of {receiptSteps.length}
              </p>
              <h3 className="font-display text-lg font-bold">{title}</h3>
            </div>
            <div className="mx-4 mt-3 rounded-xl border border-line bg-navy-900 p-3 font-mono text-[10px] leading-relaxed text-ink/90">
              <p className="font-bold">PILOT TRAVEL CENTER #442</p>
              <p className="text-muted">AMARILLO, TX</p>
              <p className="text-muted">08/09/2026 14:21</p>
              <p className="mt-2 border-t border-dashed border-line pt-2">DIESEL 158.400 GAL @ 3.866</p>
              <p>ODOMETER 512,884</p>
              <p className="mt-2 border-t border-dashed border-line pt-2 font-bold">TOTAL $612.40</p>
            </div>
            <dl className="space-y-1.5 px-4 py-3 text-[11px]">
              {fields.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-muted">{label}</dt>
                  <dd className="num font-semibold">{step >= 1 ? value : "····"}</dd>
                </div>
              ))}
            </dl>
            {step >= 2 ? (
              <p className="mx-4 mb-2 inline-flex rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-navy-950">
                Fuel · Deductible
              </p>
            ) : null}
            {step >= 3 ? (
              <p className="mx-4 mb-3 rounded-xl border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-300">
                $612.40 on Unit 104 · 158.4 gal added to the sample Q3 TX worksheet.
              </p>
            ) : null}
            <div className="px-4 pb-4">
              <div className="rounded-2xl bg-amber-500 py-3 text-center text-sm font-bold text-navy-950">
                {step >= 3 ? "Posted to expenses" : step >= 2 ? "Post expense" : "Scanning…"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
          {receiptSteps.map((item, index) => {
            const active = index === step;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep(index);
                }}
                aria-current={active ? "step" : undefined}
                className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold ${
                  active ? "border-amber-400 bg-amber-500/10" : "border-line"
                }`}
              >
                {item.label}
                <span className="mt-1 hidden text-xs font-normal text-muted lg:block">{item.caption}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted lg:hidden">{receiptSteps[step].caption}</p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-amber-300"
          onClick={() => {
            setStep(0);
            setPlaying(true);
          }}
        >
          Restart
        </button>
        <p className="mt-2 text-xs text-muted">Sample data — tap a step to explore. Not a customer record.</p>
      </div>
    </div>
  );
}

function IftaDemo() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? jurisdictions.length : 0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setCount((current) => (current > jurisdictions.length ? 0 : current + 1));
    }, 900);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const rows = jurisdictions.slice(0, Math.min(count, jurisdictions.length));
  const summary = useMemo(() => {
    const miles = rows.reduce((sum, row) => sum + row.miles, 0);
    const gal = rows.reduce((sum, row) => sum + row.gal, 0);
    const mpg = gal ? miles / gal : 0;
    const due = mpg
      ? rows.reduce((sum, row) => sum + (row.miles / mpg - row.gal) * row.rate, 0)
      : 0;
    return { miles, mpg, due };
  }, [rows]);

  return (
    <div>
      <p className="text-sm text-muted">
        Miles by state from an ELD import, gallons from fuel receipts. Sample quarter only — review before you file.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Total miles", summary.miles.toLocaleString()],
          ["Fleet MPG", summary.mpg ? summary.mpg.toFixed(2) : "—"],
          ["Illustration of net tax", `$${Math.abs(summary.due).toFixed(2)}`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-line bg-navy-950/60 p-3">
            <p className="text-xs text-muted">{label}</p>
            <p className="num mt-1 font-display text-xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-4 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
          <span>State</span>
          <span className="text-right">Miles</span>
          <span className="text-right">Gallons</span>
          <span className="text-right">Rate</span>
        </div>
        {jurisdictions.map((row, index) => (
          <div
            key={row.j}
            className="grid grid-cols-4 border-t border-line px-3 py-2 text-sm"
            style={{ opacity: index < count ? 1 : 0.3 }}
          >
            <span className="font-semibold">{row.j}</span>
            <span className="num text-right">{row.miles.toLocaleString()}</span>
            <span className="num text-right">{row.gal}</span>
            <span className="num text-right">${row.rate.toFixed(3)}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">
        The tax figure is a demo illustration, not a filing number and not tax advice.
      </p>
    </div>
  );
}

function ExpenseDemo() {
  const total = expenses.reduce((sum, row) => sum + row.amount, 0);
  return (
    <div>
      <p className="text-sm text-muted">Sample quarter. Receipts roll into categories per truck.</p>
      <p className="num mt-3 font-display text-3xl font-bold">{total.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</p>
      <ul className="mt-5 space-y-3">
        {expenses.map((row) => (
          <li key={row.cat}>
            <div className="flex justify-between text-sm">
              <span>{row.cat}</span>
              <span className="num font-semibold">${row.amount.toLocaleString()}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BillsDemo() {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
      {bills.map((bill) => (
        <li key={bill.name} className="flex items-center justify-between gap-3 px-3 py-3">
          <div>
            <p className="text-sm font-semibold">{bill.name}</p>
            <p className="text-xs text-muted">Due {bill.due}</p>
          </div>
          <div className="text-right">
            <p className="num text-sm font-semibold">${bill.amount.toLocaleString()}</p>
            <p className="text-[11px] font-semibold text-amber-300">{bill.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DemoShowcase() {
  const [tab, setTab] = useState<TabKey>("receipt");

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-navy-900/70">
      <div className="grid grid-cols-2 gap-2 border-b border-line p-3 sm:flex" role="tablist" aria-label="Product demos">
        {tabs.map((item) => {
          const selected = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(item.key)}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${
                selected ? "bg-amber-500 text-navy-950" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="p-5 sm:p-8" role="tabpanel">
        {tab === "receipt" ? <ReceiptDemo /> : null}
        {tab === "ifta" ? <IftaDemo /> : null}
        {tab === "expenses" ? <ExpenseDemo /> : null}
        {tab === "bills" ? <BillsDemo /> : null}
      </div>
    </div>
  );
}
