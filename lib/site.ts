export const site = {
  name: "HaulBooks Pro",
  domain: "haulbookspro.com",
  url: "https://haulbookspro.com",
  supportEmail: "haulbookspro@gmail.com",
  operator: "Liberty Haul Logistics LLC",
  poweredBy: "HAUL BOOKS PRO is powered by Liberty Haul Logistics LLC",
  description:
    "Trucking bookkeeping for owner-operators and small fleets. Snap fuel receipts, see cost per mile by truck, and walk into IFTA ready. 7-day trial, card required.",
  /** Repeated primary CTA. Card-required trial, Small Fleet monthly. */
  trialHref: "/signup?plan=small-fleet&interval=monthly",
  stripeMor:
    "Our order process is conducted by Stripe, the Merchant of Record for our orders. Stripe handles payments, invoicing, tax, and payment-related customer service.",
  notAdvice:
    "HaulBooks Pro organizes business financial records. It does not provide tax, legal, or accounting advice. Consult a qualified professional regarding filing requirements and deductibility.",
  ifta:
    "HaulBooks Pro helps organize and calculate information used for IFTA reporting. It does not file tax returns or guarantee filing accuracy. Review all information before submitting it to your base jurisdiction.",
  trialShort:
    "7-day free trial. A credit card is required. You are charged only after the trial ends. Cancel anytime.",
  maxTrucks: 15,
  refundDays: 30,
} as const;

export const trialPoints = [
  "7 days free",
  "Credit card required",
  "Charged only after the trial",
  "Cancel anytime",
  `${site.refundDays}-day refund`,
] as const;
