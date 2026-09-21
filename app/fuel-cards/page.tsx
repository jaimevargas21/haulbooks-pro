import type { Metadata } from "next";
import { FuelEstimator } from "@/components/fuel-estimator";
import { ButtonLink, CheckItem, Eyebrow } from "@/components/ui";
import { fuelTips } from "@/lib/content";
import { getFuelOffers } from "@/lib/fuel";

export const metadata: Metadata = {
  title: "Fuel cards",
  description:
    "Compare fuel cards and discount programs for owner-operators and small fleets. HaulBooks Pro may earn a commission if you enroll. Your price does not change.",
};

export default function FuelCardsPage() {
  const offers = getFuelOffers();

  return (
    <div className="hero-glow px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Fuel card offers</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Stop overpaying at the pump.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Fuel is the biggest line on your P&amp;L. These are the fuel cards and discount programs worth
          running — compared on savings, fees, network, and credit requirements. Every purchase still
          lands in HaulBooks Pro as a tracked expense.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-amber-300">
          HaulBooks Pro may earn a commission if you sign up through these links. It never changes your
          price.
        </p>
        <div className="mt-8">
          <FuelEstimator />
        </div>
        <h2 className="mt-14 font-display text-3xl font-bold">Compare the programs</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.id} className="flex flex-col rounded-3xl border border-line bg-navy-900/60 p-6">
              {offer.featured ? (
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">Best value</p>
              ) : null}
              <h3 className="mt-1 font-display text-2xl font-bold">{offer.name}</h3>
              <p className="mt-2 text-sm text-muted">{offer.tagline}</p>
              <p className="mt-4 font-semibold text-amber-300">{offer.savings}</p>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ["Best for", offer.bestFor],
                  ["Network", offer.network],
                  ["Fees", offer.fees],
                  ["Credit check", offer.creditCheck],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-bold uppercase tracking-wide text-muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-4 space-y-2">
                {offer.perks.map((perk) => (
                  <CheckItem key={perk}>{perk}</CheckItem>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href={offer.href}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400"
                >
                  Get the {offer.name} offer
                </a>
              </div>
            </article>
          ))}
        </div>
        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">Get the most out of any fuel card</h2>
          <ul className="mt-6 space-y-3">
            {fuelTips.map((tip) => (
              <CheckItem key={tip}>{tip}</CheckItem>
            ))}
          </ul>
        </section>
        <section className="mt-14 rounded-3xl border border-amber-400/30 bg-navy-900 p-6 sm:p-8">
          <h2 className="font-display text-3xl font-bold">Track the savings, not just the discount</h2>
          <p className="mt-3 max-w-2xl text-muted">
            HaulBooks Pro logs every gallon by truck and state so you can see what the card is actually
            saving you — and have your IFTA worksheet ready when the quarter closes.
          </p>
          <div className="mt-6">
            <ButtonLink href="/pricing">Start 7-day free trial</ButtonLink>
          </div>
        </section>
        <p className="mt-8 text-xs leading-relaxed text-muted">
          HaulBooks Pro may earn a commission when you sign up for a fuel card through the links on this
          page. It never changes your price, and we only list programs we&apos;d put in our own trucks.
          Discounts, fees, and approval terms are set by each provider and can change — confirm the
          current offer on their site before enrolling.
        </p>
      </div>
    </div>
  );
}
