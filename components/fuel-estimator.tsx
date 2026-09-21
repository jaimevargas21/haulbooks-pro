"use client";

import { useMemo, useState } from "react";
import { money } from "@/lib/format";

export function FuelEstimator() {
  const [gallons, setGallons] = useState(350);
  const [cents, setCents] = useState(70);
  const [trucks, setTrucks] = useState(1);

  const yearly = useMemo(() => gallons * (cents / 100) * 12 * trucks, [gallons, cents, trucks]);

  return (
    <form className="rounded-3xl border border-line bg-navy-900/70 p-5 sm:p-6" onSubmit={(event) => event.preventDefault()}>
      <h2 className="font-display text-xl font-bold">Savings estimator</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          <span className="text-muted">Gallons per truck / month</span>
          <input
            className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2 font-semibold"
            type="number"
            min={50}
            max={4000}
            value={gallons}
            onChange={(event) => setGallons(Number(event.target.value) || 0)}
          />
        </label>
        <label className="text-sm">
          <span className="text-muted">Discount (¢ / gallon)</span>
          <input
            className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2 font-semibold"
            type="number"
            min={1}
            max={150}
            value={cents}
            onChange={(event) => setCents(Number(event.target.value) || 0)}
          />
        </label>
        <label className="text-sm">
          <span className="text-muted">Trucks</span>
          <input
            className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2 font-semibold"
            type="number"
            min={1}
            max={15}
            value={trucks}
            onChange={(event) => setTrucks(Number(event.target.value) || 0)}
          />
        </label>
      </div>
      <p className="mt-5 text-sm text-muted">Estimated fuel savings per year</p>
      <p className="num font-display text-4xl font-bold text-amber-400" aria-live="polite">
        {money(yearly)}
      </p>
      <p className="mt-2 text-xs text-muted">
        Estimate only. Actual savings depend on your lanes, network, and the provider&apos;s current pricing.
      </p>
    </form>
  );
}
