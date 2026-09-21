import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PricingSection } from "@/components/pricing-section";
import { ReceiptStory } from "@/components/receipt-story";
import { ButtonLink, Eyebrow, TrialNote } from "@/components/ui";
import { heroImage } from "@/lib/brand";
import { quotes } from "@/lib/content";
import { getPlans } from "@/lib/plans";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "HaulBooks Pro — Trucking bookkeeping & IFTA prep",
  description: site.description,
};

const proof = [
  ["58", "IFTA jurisdictions supported"],
  ["Seconds", "From photo to booked expense"],
  ["CSV", "Exports your accountant can use"],
  ["Private", "Records scoped to your company"],
] as const;

const outcomes = [
  {
    title: "Capture in the cab",
    body: "Photo at the pump. Vendor, date, total, gallons — filed.",
  },
  {
    title: "Books per truck",
    body: "Fuel, repairs, notes, and miles where they belong.",
  },
  {
    title: "IFTA, ready",
    body: "Miles and gallons by jurisdiction, with a readiness score before you file.",
  },
] as const;

const jobs = [
  {
    title: "Cost per mile, per truck",
    body: "Know break-even before you book the load.",
  },
  {
    title: "Fuel taxed where you burned it",
    body: "Gallons bought and miles run, separated by jurisdiction.",
  },
  {
    title: "Records that survive an audit",
    body: "Receipt images and trip detail together.",
  },
] as const;

const audiences = [
  {
    title: "I run trucks",
    body: "Start a card-required trial and put the first truck on the books.",
    href: "/signup",
    cta: "Start free trial",
  },
  {
    title: "I do the books",
    body: "Read-only access, CSV exports, and IFTA worksheets. No owner plan required.",
    href: "/for-accountants",
    cta: "For accountants",
  },
  {
    title: "I want cheaper fuel",
    body: "Compare partner fuel cards. Gallons still belong in the books.",
    href: "/fuel-cards",
    cta: "Compare fuel cards",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.supportEmail,
      parentOrganization: { "@type": "Organization", name: site.operator },
    },
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: site.description,
      offers: [
        { "@type": "Offer", name: "Owner Operator", price: "9.99", priceCurrency: "USD" },
        { "@type": "Offer", name: "Small Fleet", price: "19.99", priceCurrency: "USD" },
        { "@type": "Offer", name: "Fleet Pro", price: "39.99", priceCurrency: "USD" },
      ],
    },
  ],
};

export default function HomePage() {
  const plans = getPlans();
  const shownQuotes = quotes.slice(0, 3);

  return (
    <div className="hero-glow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-2 lg:pb-20">
        <div>
          <Eyebrow>Built for owner-operators & small fleets</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            The books behind every mile you run.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Snap receipts in the cab. Track fuel, bills, and miles by truck. Walk into IFTA week with a
            worksheet — not a shoebox.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/signup">Start free trial</ButtonLink>
            <ButtonLink href="/product" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <TrialNote className="mt-4 max-w-md" />
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-navy-900 p-2">
          <Image
            src={heroImage()}
            alt="Semi truck on an open highway, with an IFTA readiness overlay"
            width={1600}
            height={1104}
            priority
            className="h-[22rem] w-full rounded-2xl object-cover object-[70%_center] sm:h-[28rem]"
          />
          <div className="pointer-events-none absolute inset-2 rounded-2xl bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-amber-400/40 bg-navy-950/90 p-4 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">IFTA readiness · sample</p>
            <p className="num mt-1 font-display text-3xl font-bold text-amber-400">92%</p>
            <p className="mt-1 text-xs text-muted">Miles and gallons on file. Two trips still missing receipts.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/50">
        <ul className="mx-auto grid max-w-6xl gap-px sm:grid-cols-2 lg:grid-cols-4">
          {proof.map(([value, label]) => (
            <li key={label} className="px-5 py-6 sm:px-6">
              <p className="num font-display text-2xl font-bold text-amber-400">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          One app instead of three headaches
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {outcomes.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-navy-900/50 p-6">
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              <Link href="/product" className="mt-4 inline-block text-sm font-semibold text-amber-300">
                See product →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built around trucking — not generic accounting
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {jobs.map((card) => (
              <article key={card.title} className="rounded-2xl border border-line bg-navy-950/40 p-6">
                <h3 className="font-display text-lg font-bold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
              </article>
            ))}
          </div>
          <Link href="/product" className="mt-6 inline-block text-sm font-semibold text-amber-300">
            Full product tour →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Who are you?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {audiences.map((item) => (
            <article key={item.title} className="flex flex-col rounded-2xl border border-line bg-navy-900/50 p-6">
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
              <div className="mt-5">
                <ButtonLink href={item.href} variant={item.href === "/signup" ? "primary" : "secondary"}>
                  {item.cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            See a receipt become an expense
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">Sample data. Four steps, one receipt.</p>
          <div className="mt-8">
            <ReceiptStory />
          </div>
          <Link href="/product" className="mt-6 inline-block text-sm font-semibold text-amber-300">
            Explore the full product →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Built around how drivers actually work
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {shownQuotes.map((item) => (
            <figure key={item.detail} className="rounded-2xl border border-line bg-navy-900/40 p-5">
              <blockquote className="text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-xs text-muted">
                {item.name} · {item.detail}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Research composites. Roles and operation type only — not named customers.
        </p>
      </section>

      <section className="border-t border-line px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PricingSection plans={plans} />
          <p className="mt-6 text-center text-sm">
            <Link href="/pricing" className="font-semibold text-amber-300">
              Full comparison & trial details →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 text-center sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Ready to clear the shoebox?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Seven days free. Card on file. Cancel before you&apos;re charged.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/signup">Start free trial</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact support
          </ButtonLink>
        </div>
        <TrialNote className="mt-4" />
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-muted">
          {site.stripeMor} {site.notAdvice}
        </p>
      </section>
    </div>
  );
}
