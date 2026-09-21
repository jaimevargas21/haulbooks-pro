export const commissionDisclosure =
  "HaulBooks may earn a commission if you use this link. Your price does not change. The provider sets approval, discounts, and fees, and those terms can change.";

export type ProgramAccess = "self-serve" | "apply" | "partner-inquiry" | "driver-app";

export type FuelOffer = {
  id: string;
  name: string;
  access: ProgramAccess;
  accessLabel: string;
  priority: boolean;
  ooFit: string;
  fleetFit: string;
  driversSave: string;
  youEarn: string;
  ctaLabel: string;
  href: string;
  configured: boolean;
  links: { label: string; href: string }[];
};

type OfferSeed = Omit<FuelOffer, "href" | "configured" | "ctaLabel"> & {
  fallbackHref: string;
  idleCta: string;
};

const offers: OfferSeed[] = [
  {
    id: "coast",
    name: "Coast",
    access: "self-serve",
    accessLabel: "Self-serve affiliate",
    priority: true,
    ooFit: "Limited. Coast says it does not approve sole proprietorships.",
    fleetFit: "Yes, for fleets organized as an LLC, corporation, or partnership.",
    driversSave:
      "Coast is a Visa fleet card accepted anywhere Visa is accepted, with spend controls and rebates on fuel. Coast’s own materials advertise rebates that vary by station and volume, including a published range of a few cents per gallon up to higher tier-1 savings. Confirm the current rebate on Coast’s site. Approval is a credit decision, and there is no personal guarantee on the business card.",
    youEarn:
      "Self-serve on PartnerStack. The program is advertised at about $300 per approved application. Confirm that bounty inside PartnerStack before you count on it. Coast also publishes a customer referral at coastpay.com/refer/ advertised as $200 for the referrer and $200 for the person referred. Commissions are paid only on approved new customers, and Coast’s affiliate terms require a clear disclosure on every promotion.",
    fallbackHref: "https://market.partnerstack.com/program/coast361",
    idleCta: "Get offer",
    links: [
      { label: "PartnerStack application", href: "https://market.partnerstack.com/program/coast361" },
      { label: "Affiliate terms", href: "https://coastpay.com/affiliate-terms" },
      { label: "Customer referral ($200/$200 advertised)", href: "https://coastpay.com/refer/" },
    ],
  },
  {
    id: "roadflex",
    name: "RoadFlex",
    access: "apply",
    accessLabel: "Apply to partner",
    priority: false,
    ooFit: "Poor affiliate fit. RoadFlex pays nothing on referred businesses with fewer than 10 vehicles.",
    fleetFit: "Yes. Payouts start at fleets of 10 vehicles and scale up.",
    driversSave:
      "RoadFlex is a fleet fuel card. Discount levels are set by RoadFlex and are not listed as a flat public rate on the affiliate page. Drivers and fleet managers should confirm the current price, fees, and network on RoadFlex before applying.",
    youEarn:
      "Apply for a custom affiliate link. RoadFlex pays only after the fleet is approved and buys 4,000 gallons on RoadFlex cards. Published tiers: 10–49 vehicles $200, 50–99 $300, 100–249 $500, 250–499 $750, 500+ $1,000. Fewer than 10 vehicles pays $0. Payment is by PayPal.",
    fallbackHref: "https://www.roadflex.com/affiliate-program",
    idleCta: "Get offer",
    links: [{ label: "Affiliate program", href: "https://www.roadflex.com/affiliate-program" }],
  },
  {
    id: "atob",
    name: "AtoB",
    access: "apply",
    accessLabel: "Apply to partner",
    priority: false,
    ooFit: "Yes. Owner-operators can apply for the fuel card.",
    fleetFit: "Yes. Built for small trucking fleets, with driver-level controls.",
    driversSave:
      "AtoB’s referral page advertises average diesel discounts of 46¢ per gallon and up to $1.85 per gallon at partner truck stops (their H1 2024 figures), Mastercard acceptance, and no transaction or setup fees on that offer. A referred applicant can earn a $250 welcome bonus after credit approval and 10 transactions in the first 30 days. Those numbers are AtoB’s, and they can change.",
    youEarn:
      "Two paths. Factoring and broker partners apply at atob.com/become-a-factoring-partner. The customer referral program pays about $250 per referred customer, capped at $500 total (two paid referrals) under AtoB’s published referral terms. Paste the tracking link they give you into NEXT_PUBLIC_AFFILIATE_ATOB.",
    fallbackHref: "https://www.atob.com/become-a-factoring-partner",
    idleCta: "Get offer",
    links: [
      { label: "Factoring partner application", href: "https://www.atob.com/become-a-factoring-partner" },
      { label: "Customer referral page", href: "https://go.atob.com/referrals" },
    ],
  },
  {
    id: "wex",
    name: "WEX / EFS",
    access: "apply",
    accessLabel: "Apply to partner",
    priority: false,
    ooFit: "Not a one-truck self-serve CPA. This is a formal partner program.",
    fleetFit: "Yes, for organizations that already serve fleets, associations, or networks.",
    driversSave:
      "EFS and WEX fleet cards are widely accepted. Driver pricing, rebates, and fees depend on the program the partner negotiates. The cents-per-gallon table on the EFS partner page is partner economics, not a promise of what a driver saves at the pump.",
    youEarn:
      "Apply. It is not a reliable self-serve cost-per-acquisition signup. Start with the truckers affiliate page and the become-a-partner form. EFS lists organizations such as trucking associations, factoring companies, GPS providers, and leasing companies as the typical partners.",
    fallbackHref: "https://partners.efsllc.com/truckers-affiliate/",
    idleCta: "Get offer",
    links: [
      { label: "Truckers affiliate", href: "https://partners.efsllc.com/truckers-affiliate/" },
      { label: "Become a partner", href: "https://www.efsllc.com/become-a-partner/" },
    ],
  },
  {
    id: "tss",
    name: "TSS Fuel Card",
    access: "partner-inquiry",
    accessLabel: "Partner inquiry",
    priority: false,
    ooFit: "Possible, after TSS accepts a partner relationship. Do not send drivers a guessed application.",
    fleetFit: "Possible for fleets. Same rule: confirm the live offer with TSS first.",
    driversSave:
      "TSS advertises fuel-card discounts and credit for trucking companies. HaulBooks does not have a stable public rate card to quote. Confirm the discount, fees, credit line, and where the card is accepted with TSS before anyone enrolls.",
    youEarn:
      "Partner inquiry, not a public self-serve link. TSS referral materials advertise about $80 per month per active referred card. Treat that as an advertisement to verify in writing. Do not promise it on the site until TSS confirms the rate, the definition of “active,” and how you get paid.",
    fallbackHref: "https://octanefuel.com/",
    idleCta: "Partner inquiry",
    links: [{ label: "TSS / Octane public site", href: "https://octanefuel.com/" }],
  },
  {
    id: "mudflap",
    name: "Mudflap",
    access: "driver-app",
    accessLabel: "Driver discount app",
    priority: true,
    ooFit: "Strong product fit for owner-operators who want a discount at partner stops today.",
    fleetFit: "Useful for small fleets whose drivers fuel at Mudflap stops. Not a fleet-card control system.",
    driversSave:
      "Mudflap is a phone app. Drivers see a discount price at partner truck stops before they pump and pay with a debit or credit card they already have. There is no Mudflap credit application. The discount changes by stop. The app shows the price.",
    youEarn:
      "There is no clear public publisher commission. Mudflap’s public partner program is for truck stops, and drivers can share invite rewards inside the app. Ask Mudflap partnerships for a publisher or affiliate link before expecting to be paid. This page does not state a Mudflap commission rate.",
    fallbackHref: "https://www.mudflapinc.com/",
    idleCta: "Get offer",
    links: [
      { label: "Driver app", href: "https://www.mudflapinc.com/" },
      { label: "Truck-stop partners (not a publisher program)", href: "https://www.mudflapinc.com/truck-stop-partners" },
    ],
  },
];

const affiliateEnv: Record<string, string | undefined> = {
  coast: process.env.NEXT_PUBLIC_AFFILIATE_COAST,
  roadflex: process.env.NEXT_PUBLIC_AFFILIATE_ROADFLEX,
  atob: process.env.NEXT_PUBLIC_AFFILIATE_ATOB,
  wex: process.env.NEXT_PUBLIC_AFFILIATE_WEX,
  tss: process.env.NEXT_PUBLIC_AFFILIATE_TSS,
  mudflap: process.env.NEXT_PUBLIC_AFFILIATE_MUDFLAP,
};

export function getFuelOffers(): FuelOffer[] {
  return offers.map((offer) => {
    const href = affiliateEnv[offer.id]?.trim();
    const configured = Boolean(href);
    return {
      id: offer.id,
      name: offer.name,
      access: offer.access,
      accessLabel: offer.accessLabel,
      priority: offer.priority,
      ooFit: offer.ooFit,
      fleetFit: offer.fleetFit,
      driversSave: offer.driversSave,
      youEarn: offer.youEarn,
      ctaLabel: configured ? "Get offer" : offer.idleCta,
      href: href || offer.fallbackHref,
      configured,
      links: offer.links,
    };
  });
}

export const joinChecklist = [
  {
    title: "Coast on PartnerStack first",
    body: "This is the fastest path to a paid affiliate. Apply at the PartnerStack listing, read the affiliate terms, and wait for acceptance. When they issue a tracking link, set NEXT_PUBLIC_AFFILIATE_COAST and redeploy. The terms require a clear commission disclosure on every promotion, which this page already prints next to the button.",
  },
  {
    title: "RoadFlex custom link",
    body: "Apply on the RoadFlex affiliate page. Send the link only to fleets of 10 or more vehicles. You are paid after approval and 4,000 gallons, by PayPal. Put the link in NEXT_PUBLIC_AFFILIATE_ROADFLEX.",
  },
  {
    title: "AtoB partner or referral link",
    body: "Apply as a factoring or broker partner, or use the customer referral program (about $250 per referral, capped). Paste the link they give you into NEXT_PUBLIC_AFFILIATE_ATOB.",
  },
  {
    title: "WEX / EFS if you qualify",
    body: "Apply through the truckers affiliate page or the become-a-partner form. This is for organizations with a fleet network, not a same-day CPA signup. Use NEXT_PUBLIC_AFFILIATE_WEX for the tracking URL.",
  },
  {
    title: "TSS as a partner inquiry",
    body: "Ask TSS to confirm the advertised ~$80 per month per active card and to send a landing page. Until that link is in NEXT_PUBLIC_AFFILIATE_TSS, the button stays a partner inquiry and does not invent a driver application.",
  },
  {
    title: "Ask Mudflap for a publisher link",
    body: "Keep the driver button on the public app. Email Mudflap partnerships and ask whether a website can earn a commission. Do not write a commission rate until they give you one. If they do, put it in NEXT_PUBLIC_AFFILIATE_MUDFLAP.",
  },
] as const;
