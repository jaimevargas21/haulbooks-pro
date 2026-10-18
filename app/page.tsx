import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DashboardTeaser } from "@/components/demo-dashboard";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PricingSection } from "@/components/pricing-section";
import { ButtonLink, Eyebrow, TrialNote } from "@/components/ui";
import { dashboardImage, heroImage, receiptImage } from "@/lib/brand";
import { posts } from "@/lib/blog";
import { comparison, homeFaqs, quotes } from "@/lib/content";
import { getPlans } from "@/lib/plans";
import { faqNode, organizationNode, schemaGraph, softwareNode } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Trucking Bookkeeping & IFTA Readiness | HaulBooks Pro",
  description: site.description,
  path: "/",
  absolute: true,
});

const proof = [
  ["58", "IFTA jurisdictions"],
  ["Seconds", "From photo to a booked expense"],
  ["CSV", "Exports an accountant can open"],
] as const;

const tour = [
  {
    title: "Snap receipts in the cab",
    body: "A fuel receipt scanner for trucking: vendor, gallons, and state, filed to the truck before you leave the pump.",
    href: "/demo?view=receipts",
    cta: "Open receipts",
    image: receiptImage(),
    alt: "Phone on a truck dash scanning a fuel receipt into HaulBooks Pro",
  },
  {
    title: "Dashboard home",
    body: "Cost per mile, fuel this month, IFTA readiness, and the two gaps that still need a human.",
    href: "/demo",
    cta: "Open home",
    image: dashboardImage(),
    alt: "HaulBooks Pro dashboard with cost per mile, fuel spend, and IFTA readiness for Unit 214",
  },
] as const;

const audiences = [
  {
    title: "I run trucks",
    body: "Start a card-required trial and put the first truck on the books.",
    href: site.trialHref,
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
    body: "Compare partner fuel cards. Gallons still belong in the books and on the IFTA worksheet.",
    href: "/fuel-cards",
    cta: "Compare fuel cards",
  },
] as const;

export default function HomePage() {
  const plans = getPlans();
  const shownQuotes = quotes.slice(0, 3);

  return (
    <div>
      <JsonLd data={schemaGraph(organizationNode(), softwareNode(), faqNode(homeFaqs))} />

      <section className="hero-glow mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:pb-20">
        <div>
          <Eyebrow>Trucking bookkeeping for owner-operators & small fleets</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            Know your cost per mile. Walk into IFTA ready.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Snap fuel receipts in the cab. Books stay per truck. IFTA worksheet builds as you drive — not the night
            before it&apos;s due.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.trialHref}>Start free trial</ButtonLink>
            <ButtonLink href="/product" variant="secondary">
              See the dashboard
            </ButtonLink>
          </div>
          <TrialNote className="mt-4 max-w-md" />
          <p className="mt-3 text-sm">
            <Link href="#pricing" className="font-semibold text-amber-300">
              Pricing from $9.99/mo
            </Link>
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-navy-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)]">
          <Image
            src={dashboardImage()}
            alt="HaulBooks Pro dashboard showing cost per mile, fuel this month, IFTA readiness, and recent receipts for Unit 214"
            width={1280}
            height={720}
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/50">
        <ul className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {proof.map(([value, label]) => (
            <li key={label} className="px-5 py-6 sm:px-6">
              <p className="num font-display text-2xl font-bold text-amber-400">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">From the cab, not a case study</h2>
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
        <p className="mt-4 text-xs text-muted">Research composites. Roles and operation type only — not named customers.</p>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">The old way vs HaulBooks</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Owner-operator expense tracking without the shoebox, the spreadsheet, or the Sunday-night IFTA panic.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <div className="hidden grid-cols-2 bg-navy-900 text-xs font-bold uppercase tracking-[0.16em] text-muted sm:grid">
              <p className="px-5 py-3">Old way</p>
              <p className="px-5 py-3 text-amber-300">HaulBooks</p>
            </div>
            <ul>
              {comparison.map((row) => (
                <li key={row.old} className="grid border-t border-line sm:grid-cols-2">
                  <p className="bg-navy-950/40 px-5 py-4 text-sm text-muted">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] sm:hidden">Old way</span>
                    {row.old}
                  </p>
                  <p className="px-5 py-4 text-sm font-medium">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-amber-400 sm:hidden">HaulBooks</span>
                    {row.next}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Product tour</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">Three jobs the dashboard is built around. Open any of them in the live demo.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {tour.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-line bg-navy-900/40">
              <Image
                src={card.image}
                alt={card.alt}
                width={1280}
                height={720}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="aspect-video w-full object-cover object-left-top"
              />
              <div className="p-5">
                <h3 className="font-display text-xl font-bold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
                <Link href={card.href} className="mt-4 inline-block text-sm font-semibold text-amber-300">
                  {card.cta} →
                </Link>
              </div>
            </article>
          ))}
          <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-navy-900/40">
            <div className="flex aspect-video flex-col justify-between bg-navy-950 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">IFTA readiness · Q3 sample</p>
              <p className="num font-display text-6xl font-bold text-amber-400">86%</p>
              <ul className="space-y-1 text-sm text-muted">
                <li>Miles logged</li>
                <li>TX receipt still missing</li>
                <li>OK miles gap named, not buried</li>
              </ul>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-bold">IFTA readiness</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The worksheet and the gaps, in the same place. You still file with your base jurisdiction.
              </p>
              <p className="mt-4 text-sm">
                <Link href="/demo?view=ifta" className="font-semibold text-amber-300">
                  Open Fuel & IFTA →
                </Link>
                <span className="text-muted"> · </span>
                <Link href="/ifta" className="font-semibold text-amber-300">
                  IFTA page
                </Link>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">See the dashboard</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Click the same screens a driver and an owner use. Sample company, three trucks, no login.
          </p>
          <div className="mt-8">
            <DashboardTeaser />
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PricingSection
            plans={plans}
            defaultInterval="monthly"
            heading="Honest pricing"
            intro="Owner Operator $9.99, Small Fleet $19.99, Fleet Pro $39.99. Most fleets start on Small Fleet. A credit card is required. You are not charged until day 8."
          />
          <p className="mt-6 text-center text-sm">
            <Link href="/pricing" className="font-semibold text-amber-300">
              Full comparison and trial details →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Who are you?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audiences.map((item) => (
              <article key={item.title} className="flex flex-col rounded-2xl border border-line bg-navy-950/40 p-6">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                <div className="mt-5">
                  <ButtonLink href={item.href} variant={item.href === site.trialHref ? "primary" : "secondary"}>
                    {item.cta}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight">From the blog</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block h-full rounded-2xl border border-line p-5 hover:border-amber-400/50">
                <h3 className="font-display text-lg font-bold">{post.title}</h3>
                <p className="mt-2 text-sm text-muted">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-6">
        <FaqList
          id="faq"
          items={homeFaqs}
          title="Questions about trucking books and IFTA"
          intro="Short answers. The product tour and the IFTA page go deeper."
        />
      </section>

      <section className="relative overflow-hidden px-5 py-20 text-center sm:px-6">
        <Image src={heroImage()} alt="" fill sizes="100vw" className="object-cover opacity-25" aria-hidden="true" />
        <div className="absolute inset-0 bg-navy-950/82" aria-hidden="true" />
        <div className="relative">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Put the next quarter on the dashboard.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">Seven days free. Card on file. Cancel before day 8 and you are not charged.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={site.trialHref}>Start free trial</ButtonLink>
            <ButtonLink href="/demo" variant="secondary">
              Open the demo
            </ButtonLink>
          </div>
          <TrialNote className="mt-4" />
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-muted">
            {site.stripeMor} {site.notAdvice}
          </p>
        </div>
      </section>
    </div>
  );
}
