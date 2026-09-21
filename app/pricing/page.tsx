import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { PricingSection } from "@/components/pricing-section";
import { ButtonLink, Eyebrow, TrialNote } from "@/components/ui";
import { pricingFaqs } from "@/lib/content";
import { getPlans } from "@/lib/plans";
import { trialPoints as points } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "HaulBooks Pro trucking bookkeeping from $9.99 a month. Owner Operator, Small Fleet, and Fleet Pro up to 15 trucks. 7-day trial, credit card required.",
};

export default function PricingPage() {
  const plans = getPlans();

  return (
    <div className="hero-glow px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>7-day free trial on every plan</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Trucking bookkeeping from $9.99 a month
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Snap receipts, track fuel and bills, and keep IFTA and tax season ready all year. Start free
          for 7 days — you are not charged until the trial ends, and you can cancel any time. A credit
          card is required to start.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {points.map((point) => (
            <li key={point} className="rounded-full border border-line bg-navy-900 px-3 py-1 text-xs font-semibold text-muted">
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <PricingSection
            plans={plans}
            heading="Pick the plan that matches the trucks you run"
            intro="Small Fleet is the most popular plan. Every plan prepares IFTA. None of them file the return for you."
          />
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <FaqList
            items={pricingFaqs}
            title="Questions before you start"
            intro="Billing, cancellation, and what HaulBooks Pro will and will not file."
          />
        </div>
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">Ready to clear the shoebox?</h2>
          <p className="mt-3 text-muted">Set up in minutes. Your first 7 days are free.</p>
          <div className="mt-6">
            <ButtonLink href={plans[1].checkout.yearly.href}>Start my free trial</ButtonLink>
          </div>
          <TrialNote className="mt-3" />
          <p className="mt-4 text-sm text-muted">
            Questions? <Link className="text-amber-300 underline" href="/support">Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
