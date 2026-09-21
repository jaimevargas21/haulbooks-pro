"use client";

import { useState } from "react";
import Link from "next/link";
import { checkoutLink } from "@/lib/checkout";
import { money } from "@/lib/format";
import { plans, signupHref, type BillingInterval, type PlanId } from "@/lib/plans";
import { site } from "@/lib/site";
import { ButtonLink, TrialNote } from "@/components/ui";

export function SignupFlow({
  initialPlan,
  initialInterval,
}: {
  initialPlan: PlanId;
  initialInterval: BillingInterval;
}) {
  const [step, setStep] = useState(1);
  const [planId, setPlanId] = useState<PlanId>(initialPlan);
  const [interval, setInterval] = useState<BillingInterval>(initialInterval);
  const plan = plans.find((item) => item.id === planId) ?? plans[1];
  const amount = interval === "yearly" ? plan.yearly : plan.monthly;
  const suffix = interval === "yearly" ? "/yr" : "/mo";
  const handoff = checkoutLink(plan.id, interval);

  return (
    <div>
      <ol className="flex gap-2" aria-label="Signup progress">
        {[
          [1, "Plan"],
          [2, "Account"],
          [3, "Card"],
        ].map(([number, label]) => {
          const current = step === number;
          const done = step > Number(number);
          return (
            <li
              key={label}
              className={`flex-1 rounded-full border px-3 py-2 text-center text-xs font-bold ${
                current
                  ? "border-amber-400 bg-amber-500 text-navy-950"
                  : done
                    ? "border-amber-400/40 text-amber-300"
                    : "border-line text-muted"
              }`}
              aria-current={current ? "step" : undefined}
            >
              {number}. {label}
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <div className="mt-8">
          <h2 className="font-display text-2xl font-bold">Choose a plan</h2>
          <p className="mt-2 text-sm text-muted">
            Yearly is billed once at the annual total. It is the same rate as paying monthly.
          </p>
          <div className="mt-4 inline-flex rounded-full border border-line bg-navy-900 p-1" role="radiogroup" aria-label="Billing interval">
            {(
              [
                ["yearly", "Yearly"],
                ["monthly", "Monthly"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={interval === value}
                onClick={() => setInterval(value)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  interval === value ? "bg-amber-500 text-navy-950" : "text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3">
            {plans.map((item) => {
              const selected = item.id === plan.id;
              const price = interval === "yearly" ? item.yearly : item.monthly;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlanId(item.id)}
                  className={`rounded-2xl border p-4 text-left ${
                    selected ? "border-amber-400 bg-navy-900" : "border-line bg-navy-950/40"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-bold">
                      {item.name}
                      {item.highlighted ? (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400">
                          Most popular
                        </span>
                      ) : null}
                    </span>
                    <span className="num font-display text-lg font-bold text-amber-400">
                      {money(price)}
                      <span className="text-xs font-medium text-muted">{interval === "yearly" ? "/yr" : "/mo"}</span>
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{item.tagline}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-6 inline-flex rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400"
          >
            Continue
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-8">
          <h2 className="font-display text-2xl font-bold">Create the company in the app</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The next screens ask for your name, email, password, and company name. Those fields live in
            the HaulBooks app. This marketing site does not store passwords.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {["Your name", "Work email", "Password", "Company name"].map((field) => (
              <li key={field} className="rounded-xl border border-line bg-navy-950/50 px-4 py-3 text-muted">
                {field} <span className="text-ink">— entered in the app</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex rounded-full border border-line px-5 py-3 text-sm font-bold"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400"
            >
              Continue to card
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-8">
          <h2 className="font-display text-2xl font-bold">Add your card</h2>
          <p className="num mt-3 font-display text-3xl font-bold text-amber-400">
            {money(amount)}
            <span className="text-base font-medium text-muted">{suffix}</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {plan.name}
            {interval === "yearly" ? ", billed once a year" : ", billed monthly"} after the trial.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            You will not be charged until the trial ends. Cancel anytime in one click before day 8.
            Stripe is the Merchant of Record and collects the card in the app. HaulBooks Pro does not
            store your card number. If a card is declined, you stay on that payment step and can try
            another card.
          </p>
          <TrialNote className="mt-4" />
          <p className="mt-3 text-xs leading-relaxed text-muted">{site.ifta}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex rounded-full border border-line px-5 py-3 text-sm font-bold"
            >
              Back
            </button>
            <ButtonLink href={handoff.href}>Continue to add your card</ButtonLink>
          </div>
          <p className="mt-4 text-xs text-muted">
            Opens {plan.name} signup in the HaulBooks app with this plan already selected.
          </p>
        </div>
      ) : null}

      <p className="mt-8 text-sm text-muted">
        <Link href="/pricing" className="text-amber-300 underline">
          Trial rules and pricing FAQ
        </Link>
        {" · "}
        <Link href={signupHref(plan.id, interval)} className="text-amber-300 underline">
          Share this plan link
        </Link>
      </p>
    </div>
  );
}
