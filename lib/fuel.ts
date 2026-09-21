export type FuelOffer = {
  id: string;
  name: string;
  tagline: string;
  savings: string;
  bestFor: string;
  network: string;
  fees: string;
  creditCheck: string;
  perks: string[];
  href: string;
  featured: boolean;
  configured: boolean;
};

type OfferSeed = Omit<FuelOffer, "href" | "configured"> & { fallback: string };

const offers: OfferSeed[] = [
  {
    id: "mudflap",
    name: "Mudflap",
    tagline: "Instant per-gallon discounts, no card and no credit check.",
    savings: "Up to $0.90 off per gallon at 1,000+ truck stops",
    bestFor: "Owner-operators who want savings today without an application",
    network: "Independent truck stops plus major chains",
    fees: "No monthly fee, no annual fee",
    creditCheck: "None — pay with your existing debit or credit card",
    perks: [
      "Discount shown before you pump",
      "Works from the phone, no physical card",
      "Receipts export straight into HaulBooks Pro",
    ],
    fallback: "https://www.mudflapinc.com/",
    featured: true,
  },
  {
    id: "atob",
    name: "AtoB",
    tagline: "A real fleet card built for small trucking businesses.",
    savings: "Average $0.30–$0.50 off per gallon plus fraud controls",
    bestFor: "Fleets of 2–15 trucks that need spend controls per driver",
    network: "Accepted anywhere Visa is, discounts at partner stops",
    fees: "No hidden card fees on the standard plan",
    creditCheck: "Soft check, no personal guarantee for most fleets",
    perks: [
      "Per-driver spend limits and category blocks",
      "Real-time fraud alerts",
      "CSV exports that reconcile with HaulBooks Pro expenses",
    ],
    fallback: "https://www.atob.com/",
    featured: true,
  },
  {
    id: "tcs",
    name: "TCS Fuel Card",
    tagline: "Deep discounts at the big chains, no credit check.",
    savings: "Average $0.42+ off per gallon at 1,500+ in-network stops",
    bestFor: "Long-haul owner-operators running national lanes",
    network: "Pilot, Flying J, TA, Petro, Love's, and more",
    fees: "No setup fee, no annual fee; small per-transaction fee",
    creditCheck: "No credit check",
    perks: [
      "Discounts posted at the pump, not as a rebate",
      "Cash advances available",
      "24/7 support line",
    ],
    fallback: "https://www.tcsfuel.com/",
    featured: false,
  },
  {
    id: "rts",
    name: "RTS Fuel Card",
    tagline: "Fuel savings bundled with factoring if you need it.",
    savings: "Average $0.25–$0.45 off per gallon in-network",
    bestFor: "Carriers who also factor invoices and want one statement",
    network: "1,600+ locations nationwide",
    fees: "No monthly minimum for factoring clients",
    creditCheck: "No credit check for factoring clients",
    perks: [
      "Fuel finder with live in-network pricing",
      "Discounts settle against factoring advances",
      "Driver-level cards",
    ],
    fallback: "https://www.rtsinc.com/services/fuel-card",
    featured: false,
  },
  {
    id: "wex",
    name: "WEX Fleet Card",
    tagline: "The widest acceptance network in North America.",
    savings: "Rebates up to $0.10+ per gallon with volume tiers",
    bestFor: "Mixed fleets running both diesel and light-duty vehicles",
    network: "95%+ of US fuel stations",
    fees: "Monthly card fee depending on program",
    creditCheck: "Credit application required",
    perks: [
      "Level III purchase data for clean books",
      "Driver ID and odometer prompts",
      "Works for pickups, vans, and reefers too",
    ],
    fallback: "https://www.wexinc.com/products/business-fuel-cards/",
    featured: false,
  },
  {
    id: "comdata",
    name: "Comdata",
    tagline: "Fleet-grade controls and settlement for growing carriers.",
    savings: "Negotiated network pricing and volume rebates",
    bestFor: "Fleets of 10+ trucks with driver settlements to run",
    network: "8,000+ truck stops and service locations",
    fees: "Program-dependent",
    creditCheck: "Credit application required",
    perks: [
      "Driver payroll and settlement on the same card",
      "Granular purchase controls",
      "Maintenance and tire program pricing",
    ],
    fallback: "https://www.comdata.com/en/solutions/trucking-fleet-cards.html",
    featured: false,
  },
];

const affiliateEnv: Record<string, string | undefined> = {
  mudflap: process.env.NEXT_PUBLIC_AFFILIATE_MUDFLAP,
  atob: process.env.NEXT_PUBLIC_AFFILIATE_ATOB,
  tcs: process.env.NEXT_PUBLIC_AFFILIATE_TCS,
  rts: process.env.NEXT_PUBLIC_AFFILIATE_RTS,
  wex: process.env.NEXT_PUBLIC_AFFILIATE_WEX,
  comdata: process.env.NEXT_PUBLIC_AFFILIATE_COMDATA,
};

export function getFuelOffers(): FuelOffer[] {
  return offers.map((offer) => {
    const href = affiliateEnv[offer.id]?.trim();
    return {
      id: offer.id,
      name: offer.name,
      tagline: offer.tagline,
      savings: offer.savings,
      bestFor: offer.bestFor,
      network: offer.network,
      fees: offer.fees,
      creditCheck: offer.creditCheck,
      perks: offer.perks,
      featured: offer.featured,
      href: href || offer.fallback,
      configured: Boolean(href),
    };
  });
}
