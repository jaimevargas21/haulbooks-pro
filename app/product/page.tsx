import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DemoPreview } from "@/components/demo-dashboard";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, CheckItem, Eyebrow, TrialNote } from "@/components/ui";
import { dashboardImage } from "@/lib/brand";
import { features, productFaqs, roles } from "@/lib/content";
import type { DemoView } from "@/lib/demo-data";
import { faqNode, organizationNode, schemaGraph, softwareNode } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Trucking Dashboard: Receipts, Cost per Mile & IFTA",
  description:
    "Walk through the HaulBooks dashboard: snap fuel receipts, cost per mile by truck, and IFTA readiness. Open the live demo or start a 7-day trial. Card required.",
  path: "/product",
});

const steps: { view: DemoView; kicker: string; title: string; body: string; points: string[] }[] = [
  {
    view: "home",
    kicker: "Home",
    title: "Four numbers, then the work.",
    body: "Pick a truck. Cost per mile, fuel this month, IFTA readiness, and open gaps sit on one screen. Needs-attention names the missing receipt and the miles gap. Recent receipts are the last five stops on that unit.",
    points: ["Truck selector, not a company average", "Upload a receipt or jump to IFTA", "Nothing here is a highway photo"],
  },
  {
    view: "receipts",
    kicker: "Receipts",
    title: "The fuel receipt scanner, after the photo.",
    body: "Search by vendor, then filter by truck or state. Each row keeps the amount, gallons, jurisdiction, and whether the photo posted. An empty filter tells you to widen the search instead of showing a blank app.",
    points: ["Posted, needs review, or missing photo", "Gallons stay with the state you bought them in", "Duplicates are a product rule, not a demo trick"],
  },
  {
    view: "ifta",
    kicker: "Fuel & IFTA",
    title: "Readiness before the spreadsheet.",
    body: "Choose the quarter. The ring is the score. The checklist says what is done and what is a gap. The table is miles, gallons, and MPG by state. Export on the demo only toasts — the real CSV is in the trial.",
    points: ["You still file with your base jurisdiction", "HaulBooks does not file the return", "Not tax advice"],
  },
  {
    view: "trucks",
    kicker: "Trucks",
    title: "One card per unit.",
    body: "Status, cost per mile, fuel, and IFTA on the trucks you actually run. Owner Operator is one truck. Small Fleet is up to five. Fleet Pro stops at 15.",
    points: ["On the road, in the shop, or available", "Cost per mile is per truck", "Open a unit to land on Home"],
  },
  {
    view: "reports",
    kicker: "Reports",
    title: "A snapshot your accountant can export.",
    body: "Revenue, fuel, maintenance, fixed costs, and a net figure for the sample month. The live app exports CSV. This page is the shape of that report, with sample dollars.",
    points: ["Invite an accountant instead of forwarding a shoebox", "Read-only seat, no second owner plan", "Figures on the demo are not a filing"],
  },
];

export default function ProductPage() {
  return (
    <div className="hero-glow">
      <JsonLd data={schemaGraph(organizationNode(), softwareNode(), faqNode(productFaqs))} />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-2">
        <div>
          <Eyebrow>Product tour</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            The dashboard, screen by screen.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Receipts, cost per mile, and IFTA readiness in one cab-side workspace. This walkthrough uses the same
            sample company as the live demo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/demo">Open the demo</ButtonLink>
            <ButtonLink href={site.trialHref} variant="secondary">
              Start free trial
            </ButtonLink>
          </div>
          <TrialNote className="mt-4 max-w-md" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-navy-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)]">
          <Image
            src={dashboardImage()}
            alt="HaulBooks dashboard home with cost per mile and IFTA readiness"
            width={1280}
            height={720}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      <nav className="border-y border-line bg-navy-900/50" aria-label="Walkthrough">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 sm:px-6">
          {steps.map((step, index) => (
            <li key={step.view}>
              <a href={`#${step.view}`} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-muted hover:text-amber-300">
                {index + 1}. {step.kicker}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {steps.map((step, index) => (
        <section key={step.view} id={step.view} className="scroll-mt-24 border-b border-line py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                {index + 1} · {step.kicker}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{step.title}</h2>
              <p className="mt-4 text-muted">{step.body}</p>
              <ul className="mt-6 space-y-3">
                {step.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href={`/demo?view=${step.view}`}>Try {step.kicker} in the demo</ButtonLink>
              </div>
            </div>
            <div className="h-[28rem] overflow-hidden rounded-2xl border border-line bg-navy-950">
              <DemoPreview view={step.view} />
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What the books actually hold</h2>
        <p className="mt-3 max-w-2xl text-muted">
          The demo is the map. These are the records behind each screen, including{" "}
          <Link href="/ifta" className="text-amber-300 underline">
            IFTA worksheets
          </Link>{" "}
          and{" "}
          <Link href="/fuel-cards" className="text-amber-300 underline">
            fuel-card gallons
          </Link>
          .
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-line bg-navy-900/40 p-6">
              <h3 className="font-display text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">A seat for everyone who touches the books</h2>
            <ul className="mt-6 space-y-3">
              {roles.map((role) => (
                <CheckItem key={role}>{role}</CheckItem>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link href="/for-accountants" className="font-semibold text-amber-300">
                Accountant access →
              </Link>
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-navy-950/50 p-6">
            <h3 className="font-display text-xl font-bold">Keep reading</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/pricing" className="font-semibold text-amber-300">
                  Pricing from $9.99
                </Link>
              </li>
              <li>
                <Link href="/blog/ifta-quarterly-checklist" className="font-semibold text-amber-300">
                  IFTA prep for owner operators
                </Link>
              </li>
              <li>
                <Link href="/blog/cost-per-mile" className="font-semibold text-amber-300">
                  Trucking cost per mile
                </Link>
              </li>
              <li>
                <Link href="/blog/what-belongs-in-trucking-books" className="font-semibold text-amber-300">
                  Fuel receipt tracking
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
        <FaqList items={productFaqs} />
      </section>

      <section className="px-5 pb-20 text-center sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight">Ready when the next receipt is.</h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.trialHref}>Start free trial</ButtonLink>
          <ButtonLink href="/demo" variant="secondary">
            Open the demo
          </ButtonLink>
        </div>
        <TrialNote className="mt-4" />
      </section>
    </div>
  );
}
