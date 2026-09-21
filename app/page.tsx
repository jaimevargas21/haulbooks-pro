import Image from "next/image";
import Link from "next/link";
import { DemoShowcase } from "@/components/demo-showcase";
import { FaqList } from "@/components/faq-list";
import { PricingSection } from "@/components/pricing-section";
import { ButtonLink, CheckItem, Eyebrow, TrialNote } from "@/components/ui";
import {
  calendar,
  features,
  howItWorks,
  jobCards,
  productFaqs,
  quotes,
  replaces,
  roles,
  stats,
} from "@/lib/content";
import { heroImage, receiptImage } from "@/lib/brand";
import { getPlans } from "@/lib/plans";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.supportEmail,
      brand: site.name,
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
    {
      "@type": "FAQPage",
      mainEntity: productFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomePage() {
  const plans = getPlans();

  return (
    <div className="hero-glow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-2 lg:pb-24">
        <div>
          <Eyebrow>Built for owner-operators and fleet owners</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            The <span className="text-amber-400">books</span> behind every mile you run.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            HaulBooks Pro turns receipts, fuel, bills, and miles into clean, tax-ready books for your
            truck or fleet — and gets your IFTA worksheet done before the quarter closes. All from your
            phone, in the cab.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/pricing">Start 7-day free trial</ButtonLink>
            <ButtonLink href="/#demo" variant="secondary">
              See it in action
            </ButtonLink>
          </div>
          <TrialNote className="mt-4 max-w-md" />
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-navy-900 p-2">
          <Image
            src={heroImage()}
            alt="Semi truck driving down an open highway at sunset"
            width={1600}
            height={1104}
            priority
            className="h-[22rem] w-full rounded-2xl object-cover object-[70%_center] sm:h-[30rem]"
          />
          <div className="pointer-events-none absolute inset-2 rounded-2xl bg-gradient-to-t from-navy-950/90 via-navy-950/15 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-amber-400/30 bg-navy-950/85 p-4 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Est. fuel tax owed</p>
              <p className="num mt-1 text-xl font-bold text-amber-400">$4,821.50</p>
            </div>
            <div className="rounded-xl border border-line bg-navy-950/85 p-4 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">IFTA readiness</p>
              <p className="num mt-1 text-xl font-bold">92%</p>
            </div>
          </div>
        </div>
      </section>

      <section id="what" className="scroll-mt-24 border-y border-line bg-navy-900/40 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-2">
          <div>
            <Eyebrow>What is HaulBooks Pro?</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Bookkeeping software built only for trucking.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              HaulBooks Pro is a mobile-first bookkeeping app for owner-operators and small fleets.
              Instead of a shoebox of fuel receipts, a spreadsheet of miles, and a generic accounting
              tool that has never heard of IFTA, you get one place that understands trucks, drivers,
              jurisdictions, and gallons.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Photograph a receipt at the pump and it becomes a categorized expense. Import your ELD
              mileage and your state-by-state miles are ready. When the quarter closes, your IFTA
              worksheet and tax-ready reports are already built — not something you spend a weekend
              recreating.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {replaces.map((item) => (
                <li key={item} className="rounded-xl border border-line bg-navy-950/50 p-4 text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-navy-950/50 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold">How it works</h3>
            <ol className="mt-6 space-y-6">
              {howItWorks.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 font-display font-bold text-navy-950">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-2xl border border-line bg-navy-900 p-5 text-sm text-muted">
              <p className="font-bold text-ink">Who it&apos;s for</p>
              <p className="mt-1.5">
                One-truck owner-operators, growing fleets up to {site.maxTrucks} trucks, and the drivers,
                managers, and accountants who work with them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <Eyebrow>Built around the job</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          The numbers that actually decide if a load was worth running.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Generic accounting software knows invoices. It doesn&apos;t know deadhead, base jurisdiction, or
          that a $6,900 in-frame overhaul is a repair and not a truck payment. HaulBooks Pro does.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-line bg-navy-900/50 p-6">
              <h3 className="font-display text-lg font-bold">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Eyebrow>The trucking calendar</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Nothing sneaks up on you.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Fuel tax quarters, heavy vehicle use tax, plate and permit renewals — HaulBooks Pro keeps the
            records ready and reminds you before the deadline, not after the penalty.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {calendar.map((item) => (
              <article key={item.what} className="rounded-2xl border border-line bg-navy-950/40 p-5">
                <p className="num font-display text-lg font-bold text-amber-400">{item.when}</p>
                <p className="mt-2 text-sm font-bold">{item.what}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
            Filing dates are shown for planning only and can shift when a due date falls on a weekend or
            holiday. {site.ifta}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-line lg:order-1">
          <Image
            src={receiptImage()}
            alt="Driver photographing a fuel receipt with a phone inside the truck cab"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-amber-500 p-5 text-navy-950 sm:right-auto sm:max-w-xs">
            <p className="font-display text-3xl font-bold tracking-tight">Seconds</p>
            <p className="text-sm font-bold uppercase tracking-wide">From photo to booked expense</p>
          </div>
        </div>
        <div>
          <Eyebrow>Receipts, handled</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Snap. Sync. Done.</h2>
          <p className="mt-4 text-lg text-muted">
            One photo is all it takes. HaulBooks Pro pulls the vendor, date, total, and gallons off the
            receipt, sorts it into fuel, maintenance, or another deductible business expense, and flags
            duplicates before they double-count in your books.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Vendor, date, total, and gallons read automatically",
              "Sorted into fuel, maintenance, or business expense",
              "Duplicate receipts caught before they hit your books",
            ].map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 border-t border-line bg-navy-900/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Everything the paperwork asks for.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Run your truck or fleet without the paperwork pile — and hand your accountant clean, tax-ready
            books at quarter-end.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-line bg-navy-950/40 p-6 transition hover:border-amber-400/40">
                <h3 className="font-display text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A seat for everyone who touches the books
          </h2>
          <p className="mt-4 text-muted">
            Invite your team and everyone sees exactly what they should. Drivers upload receipts for their
            own truck, managers run the fleet, accountants pull the reports, and you see everything.
          </p>
          <ul className="mt-6 space-y-3">
            {roles.map((role) => (
              <CheckItem key={role}>{role}</CheckItem>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl border border-line bg-navy-900/50">
          <Image
            src="/images/fleet-yard.jpg"
            alt="Row of semi trucks parked in a fleet yard at dawn"
            width={1200}
            height={900}
            className="h-56 w-full object-cover sm:h-64"
          />
          <div className="p-6">
            <p className="font-bold">Records stay private to your company</p>
            <p className="mt-2 text-sm text-muted">
              Every receipt, bill, and mileage row is scoped to your company. Files are stored privately
              and served through expiring links.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-xl border border-line bg-navy-950/50 p-3">
                  <p className="num font-display text-xl font-bold text-amber-400">{value}</p>
                  <p className="mt-1 text-xs text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built around how drivers actually work
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            The situations HaulBooks Pro was designed to fix, in the words of the owner-operators, fleet
            owners, and drivers we built it with.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quotes.map((item) => (
              <figure key={item.name} className="rounded-2xl border border-line bg-navy-950/40 p-5">
                <blockquote className="text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-xs">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-muted"> — {item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted">
            Composite examples drawn from customer-research interviews, not verbatim statements from named
            customers.
          </p>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <PricingSection plans={plans} />
        </div>
      </section>

      <section id="demo" className="scroll-mt-24 border-y border-line bg-navy-900/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Interactive demo</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">See HaulBooks Pro in action</h2>
            <p className="mt-3 text-muted">
              Click through receipt scanning, IFTA prep, expense tracking, and monthly bills. These are
              sample screens with sample numbers.
            </p>
          </div>
          <div className="mt-10">
            <DemoShowcase />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
        <FaqList id="faq" items={productFaqs} />
      </section>

      <section className="px-5 pb-20 text-center sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Ready to roll?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Start your 7-day free trial. A credit card is required, you are charged only after the trial,
          and you can cancel anytime — before the shoebox and the quarter-end scramble come back.
        </p>
        <div className="mt-8">
          <ButtonLink href="/pricing">Choose your plan</ButtonLink>
        </div>
        <p className="mt-4 text-sm text-muted">
          Questions? <Link href="/support" className="text-amber-300 underline">Contact support</Link>
        </p>
      </section>
    </div>
  );
}
