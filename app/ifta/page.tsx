import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Eyebrow, TrialNote } from "@/components/ui";
import { calendar } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "IFTA worksheets for owner-operators",
  description:
    "Prepare IFTA miles and gallons by jurisdiction, with a readiness score and receipts attached. HaulBooks Pro does not file the return. 7-day trial, card required.",
};

const needs = [
  {
    title: "Miles by jurisdiction",
    body: "Every state and province you ran, including deadhead. ELD CSV or trips you enter by hand.",
  },
  {
    title: "Gallons by jurisdiction",
    body: "Where you bought the fuel, not only where you burned it. The receipt stays attached.",
  },
  {
    title: "MPG that holds up",
    body: "Total miles over total gallons, then the per-jurisdiction split the return asks for.",
  },
  {
    title: "Supporting receipts",
    body: "When an auditor asks, the image is already on the fuel line — not in a shoebox.",
  },
] as const;

const missing = [
  { item: "TX trip, Mar 12", note: "Miles imported. Receipt missing." },
  { item: "OK fuel, Mar 18", note: "Gallons on file. Jurisdiction confirmed." },
  { item: "AR deadhead", note: "ELD row not matched to a truck yet." },
] as const;

const faqs = [
  {
    q: "Do you file IFTA for me?",
    a: "No. HaulBooks Pro prepares the worksheet — miles, gallons, and MPG by jurisdiction — and a readiness score. You review the numbers and file with your base jurisdiction. This is not tax advice.",
  },
  {
    q: "Can I import mileage from an ELD?",
    a: "Yes. Export a mileage CSV and map the columns before import. Manual trips stay available when the ELD export is incomplete.",
  },
  {
    q: "Can my accountant see the worksheet?",
    a: "Yes. Invite them as an accountant. They get read-only financials, CSV exports, and the IFTA worksheet. They do not buy an owner plan to do that.",
  },
] as const;

export default function IftaPage() {
  return (
    <div className="hero-glow">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>IFTA preparation</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
          IFTA worksheets without the quarter scramble
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Miles and gallons by jurisdiction, a readiness score before you file, receipts attached when
          the auditor asks.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/signup">Start free trial</ButtonLink>
          <ButtonLink href="/pricing" variant="secondary">
            See pricing
          </ButtonLink>
        </div>
        <TrialNote className="mt-4" />
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold">What IFTA actually needs</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {needs.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-navy-950/40 p-6">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold">How HaulBooks prepares it</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Trips in", "ELD CSV or manual trips, assigned to the truck that ran them."],
            ["Fuel in", "Pump photos and fuel logs, gallons kept by purchase jurisdiction."],
            ["Worksheet out", "Miles, gallons, and MPG by jurisdiction, ready for you to review and file."],
          ].map(([title, body], index) => (
            <li key={title} className="rounded-2xl border border-line bg-navy-900/50 p-6">
              <p className="font-display text-2xl font-bold text-amber-400">{index + 1}</p>
              <h3 className="mt-2 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm">
          <Link href="/product" className="font-semibold text-amber-300">
            See the full product →
          </Link>
        </p>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Readiness score</h2>
            <p className="mt-3 text-muted">
              A percentage is only useful if it says what is still missing. Sample quarter below.
            </p>
            <p className="num mt-6 font-display text-6xl font-bold text-amber-400">92%</p>
            <p className="mt-2 text-sm text-muted">Q1 sample · not a filing</p>
          </div>
          <ul className="space-y-3">
            {missing.map((row) => (
              <li key={row.item} className="rounded-2xl border border-line bg-navy-950/50 p-4">
                <p className="font-semibold">{row.item}</p>
                <p className="mt-1 text-sm text-muted">{row.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold">Quarter dates, for planning only</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          We do not file. Dates can move when they land on a weekend or holiday.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {calendar.map((item) => (
            <article key={item.what} className="rounded-2xl border border-line p-5">
              <p className="num font-display text-lg font-bold text-amber-400">{item.when}</p>
              <p className="mt-2 text-sm font-bold">{item.what}</p>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">{site.ifta}</p>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">Most fleets start here</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Small Fleet · $19.99/mo</h2>
          <p className="mt-3 text-muted">
            Up to 5 trucks, accountant access, and IFTA preparation. Yearly is $119.92, $239.92, or
            $479.92, billed once. That is about twelve times the monthly price.
          </p>
          <div className="mt-6">
            <ButtonLink href="/signup?plan=small-fleet&interval=yearly">Start free trial</ButtonLink>
          </div>
          <TrialNote className="mt-4" />
          <p className="mt-4 text-sm">
            <Link href="/pricing" className="text-amber-300 underline">
              Compare all three plans
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold">IFTA questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-2xl border border-line bg-navy-900/40 p-5">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Related:{" "}
          <Link href="/for-accountants" className="text-amber-300 underline">
            accountant access
          </Link>
          {" · "}
          <Link href="/fuel-cards" className="text-amber-300 underline">
            fuel gallons and card discounts
          </Link>
          {" · "}
          <Link href="/product" className="text-amber-300 underline">
            product tour
          </Link>
        </p>
      </section>

      <section className="px-5 pb-20 text-center sm:px-6">
        <h2 className="font-display text-4xl font-bold">Walk into the quarter with a worksheet.</h2>
        <div className="mt-6">
          <ButtonLink href="/signup">Start free trial</ButtonLink>
        </div>
        <TrialNote className="mt-4" />
      </section>
    </div>
  );
}
