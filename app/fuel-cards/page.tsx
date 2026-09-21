import type { Metadata } from "next";
import { FuelEstimator } from "@/components/fuel-estimator";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { fuelTips } from "@/lib/content";
import { commissionDisclosure, getFuelOffers, joinChecklist } from "@/lib/fuel";

export const metadata: Metadata = {
  title: "Fuel cards",
  description:
    "Compare Coast, RoadFlex, AtoB, WEX/EFS, TSS, and Mudflap. HaulBooks may earn a commission if you use these links. Your price does not change.",
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
          Fuel is the biggest line on a trucking P&amp;L. These are real partner programs an owner-operator
          or small fleet can compare, and that HaulBooks can join for a commission. Every gallon still
          belongs in HaulBooks Pro so IFTA stays accurate.
        </p>
        <p className="mt-4 max-w-3xl rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-100">
          Advertising disclosure: {commissionDisclosure}
        </p>

        <div className="mt-8">
          <FuelEstimator />
        </div>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">Owner-operator or small fleet</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            “How you earn” is what HaulBooks can be paid. “How drivers save” is the customer offer. They
            are different numbers.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <thead className="bg-navy-900 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Program</th>
                  <th className="px-4 py-3 font-semibold">How you join</th>
                  <th className="px-4 py-3 font-semibold">Best for owner-operators</th>
                  <th className="px-4 py-3 font-semibold">Best for small fleets</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} className="border-t border-line align-top">
                    <td className="px-4 py-3 font-semibold text-ink">{offer.name}</td>
                    <td className="px-4 py-3 text-amber-300">{offer.accessLabel}</td>
                    <td className="px-4 py-3 text-muted">{offer.ooFit}</td>
                    <td className="px-4 py-3 text-muted">{offer.fleetFit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">The programs</h2>
          <div className="mt-6 grid gap-5">
            {offers.map((offer) => (
              <article key={offer.id} id={offer.id} className="rounded-3xl border border-line bg-navy-900/60 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy-950">
                    {offer.accessLabel}
                  </p>
                  {offer.priority ? (
                    <p className="rounded-full border border-amber-400/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300">
                      Start here
                    </p>
                  ) : null}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold">{offer.name}</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-navy-950/50 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">How drivers save</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{offer.driversSave}</p>
                  </div>
                  <div className="rounded-2xl border border-line bg-navy-950/50 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">How you earn</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{offer.youEarn}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <a
                    href={offer.href}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400"
                  >
                    {offer.ctaLabel}
                  </a>
                  <p className="mt-3 max-w-xl text-xs leading-relaxed text-amber-100/90">{commissionDisclosure}</p>
                  {!offer.configured ? (
                    <p className="mt-2 text-xs text-muted">
                      Tracking link not connected yet. This button opens the official program page.
                    </p>
                  ) : null}
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    {offer.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="sponsored noopener noreferrer" className="text-amber-300 underline">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-line bg-navy-900/40 p-6 sm:p-8">
          <h2 className="font-display text-3xl font-bold">Join these programs</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Operator checklist. Coast on PartnerStack is the first application. The site already runs
            without these links. Paste each tracking URL into the env var, then redeploy.
          </p>
          <ol className="mt-6 space-y-5">
            {joinChecklist.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 font-display text-sm font-bold text-navy-950">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-relaxed text-amber-100/90">{commissionDisclosure}</p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">Get the most out of any fuel card</h2>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            {fuelTips.map((tip) => (
              <li key={tip} className="rounded-xl border border-line px-4 py-3">
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-3xl border border-amber-400/30 bg-navy-900 p-6 sm:p-8">
          <h2 className="font-display text-3xl font-bold">Track the savings, not just the discount</h2>
          <p className="mt-3 max-w-2xl text-muted">
            HaulBooks Pro logs every gallon by truck and state so the card’s discount shows up in the books,
            and the IFTA worksheet is ready when the quarter closes.
          </p>
          <div className="mt-6">
            <ButtonLink href="/pricing">Start 7-day free trial</ButtonLink>
          </div>
          <p className="mt-3 text-xs text-muted">
            7-day free trial. A credit card is required. You are charged only after the trial ends.
          </p>
        </section>

        <p className="mt-8 text-xs leading-relaxed text-muted">{commissionDisclosure} Confirm the current offer on the provider’s site before enrolling.</p>
      </div>
    </div>
  );
}
