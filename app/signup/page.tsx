import type { Metadata } from "next";
import { SignupFlow } from "@/components/signup-flow";
import { findPlan, parseInterval } from "@/lib/plans";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start free trial",
  description:
    "Start a HaulBooks Pro 7-day trial. A credit card is required. You are not charged until day 8. Cancel before then and you are not billed.",
  robots: { index: false, follow: false },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; interval?: string }>;
}) {
  const params = await searchParams;
  const plan = findPlan(params.plan);
  const interval = parseInterval(params.interval);

  return (
    <div className="hero-glow mx-auto max-w-xl px-5 py-14 sm:px-6 sm:py-20">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">7-day trial · card required</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Start free trial</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Three steps. The account and the card are collected in the HaulBooks app. {site.name} does not
        store your password or your card number on this site.
      </p>
      <div className="mt-8">
        <SignupFlow initialPlan={plan.id} initialInterval={interval} />
      </div>
    </div>
  );
}
