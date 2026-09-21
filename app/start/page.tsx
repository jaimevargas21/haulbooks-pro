import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, CheckItem, TrialNote } from "@/components/ui";
import { checkoutLink } from "@/lib/checkout";
import { money } from "@/lib/format";
import { findPlan, parseInterval } from "@/lib/plans";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start your trial",
  description: "Start a HaulBooks Pro 7-day trial. A credit card is required. You are charged only after the trial.",
  robots: { index: false, follow: false },
};

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; interval?: string }>;
}) {
  const params = await searchParams;
  const plan = findPlan(params.plan);
  const interval = parseInterval(params.interval);
  const target = checkoutLink(plan.id, interval);
  const amount = interval === "yearly" ? plan.yearly : plan.monthly;
  const suffix = interval === "yearly" ? "per year" : "per month";

  return (
    <div className="mx-auto max-w-xl px-5 py-16 sm:px-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">7-day free trial</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Start {plan.name}</h1>
      <p className="num mt-4 font-display text-3xl font-bold text-amber-400">
        {money(amount)} <span className="text-base font-medium text-muted">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted">{plan.tagline}</p>
      <ul className="mt-6 space-y-2">
        <CheckItem>Full access for 7 days</CheckItem>
        <CheckItem>A credit card is required to start</CheckItem>
        <CheckItem>You are charged only after the trial ends</CheckItem>
        <CheckItem>Cancel anytime before the charge</CheckItem>
        <CheckItem>{site.refundDays}-day money-back guarantee after you are billed</CheckItem>
        <CheckItem>Stripe is the Merchant of Record</CheckItem>
      </ul>
      <TrialNote className="mt-4" />
      <p className="mt-4 text-sm text-muted">{site.ifta}</p>
      <div className="mt-8">
        <ButtonLink href={target.href}>
          {target.configured ? "Continue to signup" : "See plans in the app"}
        </ButtonLink>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {target.configured
          ? "Signup and the 7-day trial continue in the HaulBooks app. A credit card is required there. Stripe charges the card only after the trial ends. HaulBooks Pro does not store your card number."
          : `This plan is not tied to a Stripe Price ID on this deployment, so the button opens pricing in the HaulBooks app. A credit card is required there. You are charged only after the 7 days. Questions: ${site.supportEmail}.`}
      </p>
      <p className="mt-6 text-sm">
        <Link href="/pricing" className="text-amber-300 underline">
          Compare plans
        </Link>
      </p>
    </div>
  );
}
