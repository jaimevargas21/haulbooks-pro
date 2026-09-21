"use client";

import { useState } from "react";
import type { BillingInterval, PricedPlan } from "@/lib/plans";
import { money } from "@/lib/format";
import { ButtonLink, CheckItem, TrialNote } from "@/components/ui";

export function PricingSection({
  plans,
  defaultInterval = "yearly",
  heading = "Simple pricing. No surprise charges.",
  intro = "Every plan includes a 7-day free trial, receipt scanning and storage, IFTA prep, and CSV exports. A credit card is required to start. Cancel anytime.",
}: {
  plans: PricedPlan[];
  defaultInterval?: BillingInterval;
  heading?: string;
  intro?: string;
}) {
  const [interval, setInterval] = useState<BillingInterval>(defaultInterval);

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-4 text-muted">{intro}</p>
        <div
          className="mt-6 inline-flex rounded-full border border-line bg-navy-900 p-1"
          role="radiogroup"
          aria-label="Billing interval"
        >
          {(
            [
              ["yearly", "Yearly"],
              ["monthly", "Monthly"],
            ] as const
          ).map(([value, label]) => {
            const active = interval === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setInterval(value)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  active ? "bg-amber-500 text-navy-950" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted">
          Yearly is the annual amount below, billed once. It is the same rate as paying monthly.
        </p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const amount = interval === "yearly" ? plan.yearly : plan.monthly;
          const suffix = interval === "yearly" ? "/yr" : "/mo";
          const target = plan.checkout[interval];
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-6 sm:p-8 ${
                plan.highlighted
                  ? "border-amber-400 bg-navy-900 shadow-[0_0_0_1px_rgba(240,180,60,0.35),0_30px_80px_-40px_rgba(240,180,60,0.7)]"
                  : "border-line bg-navy-900/60"
              }`}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-navy-950">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-lg font-bold">{plan.name}</h3>
              <p className="num mt-4 font-display text-4xl font-bold text-amber-400">
                {money(amount)}
                <span className="text-base font-medium text-muted">{suffix}</span>
              </p>
              <p className="mt-2 text-xs font-semibold text-success">
                {interval === "yearly"
                  ? `${money(plan.monthly)}/mo if you paid monthly · billed once`
                  : `Or ${money(plan.yearly)} billed once a year`}
              </p>
              <p className="mt-3 text-sm text-muted">{plan.tagline}</p>
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((feature) => (
                  <CheckItem key={feature}>{feature}</CheckItem>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href={target.href} className="w-full">
                  Start 7-day free trial
                </ButtonLink>
                <TrialNote className="mt-3" />
              </div>
            </article>
          );
        })}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted">
        Fifteen trucks is the maximum. Owner Operator is one truck, Small Fleet is up to five, Fleet Pro
        is up to fifteen.
      </p>
    </div>
  );
}
