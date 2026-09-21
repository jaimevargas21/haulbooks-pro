"use client";

import { useState } from "react";

const steps = [
  {
    key: "snap",
    label: "Snap",
    caption: "Photograph the receipt at the pump. The image stays with the expense.",
  },
  {
    key: "read",
    label: "Read",
    caption: "Vendor, date, total, and gallons come off the photo. You can correct any field.",
  },
  {
    key: "classify",
    label: "Classify",
    caption: "Fuel, maintenance, or another business expense — tied to the truck that burned it.",
  },
  {
    key: "post",
    label: "Post",
    caption: "The expense is booked and the gallons land on that jurisdiction’s IFTA line.",
  },
] as const;

const fields = [
  ["Vendor", "Pilot Travel Center #442"],
  ["Date", "Aug 9, 2026"],
  ["Total", "$612.40"],
  ["Gallons", "158.4"],
  ["Jurisdiction", "TX"],
  ["Truck", "Unit 12"],
] as const;

export function ReceiptStory() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const revealed = index;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col gap-2" role="tablist" aria-label="Receipt steps">
        {steps.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setIndex(itemIndex)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                active ? "border-amber-400 bg-navy-900" : "border-line bg-navy-950/40 hover:border-amber-400/40"
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">
                {itemIndex + 1}. {item.label}
              </span>
              <span className="mt-1 block text-sm text-muted">{item.caption}</span>
            </button>
          );
        })}
      </div>
      <div className="rounded-3xl border border-line bg-navy-900/70 p-5 sm:p-6" role="tabpanel">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">Sample receipt</p>
        <p className="mt-2 font-display text-2xl font-bold">{step.label}</p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {fields.map(([label, value], fieldIndex) => {
            const visible = fieldIndex === 0 ? revealed >= 0 : revealed >= 1 && fieldIndex < 5 ? true : revealed >= 2;
            const classified = revealed >= 2 && label === "Gallons";
            return (
              <div key={label} className="rounded-xl border border-line bg-navy-950/60 px-3 py-2">
                <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{label}</dt>
                <dd className={`num mt-1 text-sm font-semibold ${visible ? "text-ink" : "text-muted/40"}`}>
                  {visible ? value : "—"}
                  {classified && label === "Gallons" ? (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-amber-400">Fuel</span>
                  ) : null}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {revealed < 3
            ? "Not posted yet. This is sample data."
            : "Posted to Unit 12 as fuel. 158.4 gallons added to the Texas IFTA line. Sample data."}
        </p>
      </div>
    </div>
  );
}
