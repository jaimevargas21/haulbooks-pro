import type { BillingInterval, PlanId } from "@/lib/plans";

export type CheckoutTarget = {
  href: string;
  /** True when the link opens signup for this plan. */
  configured: boolean;
  priceId?: string;
  lookupKey: string;
};

/**
 * Live prices on HAUL BOOKS PRO (acct_1SggnO8XymiTE9iP).
 * Monthly Price IDs are the $9.99 / $19.99 / $39.99 prices.
 * Yearly Price IDs stay on $119.92 / $239.92 / $479.92.
 * The product app charges the lookup key, not a dollar amount in the URL.
 * This marketing site does not create Checkout sessions.
 * The 7-day trial is not a field on these Price objects. The app must set
 * subscription_data.trial_period_days to 7 and collect a payment method.
 */
const livePriceIds: Record<`${PlanId}:${BillingInterval}`, string> = {
  "owner_operator:monthly": "price_1UIDF88XymiTE9iPvRuk9Kpi",
  "owner_operator:yearly": "price_1UFfLn8XymiTE9iPI7CeCno9",
  "small_fleet:monthly": "price_1UIDHK8XymiTE9iPGcmTvOdM",
  "small_fleet:yearly": "price_1UFfLm8XymiTE9iPugV0TCcl",
  "fleet_pro:monthly": "price_1UIDJb8XymiTE9iPK1WiGxQc",
  "fleet_pro:yearly": "price_1UFfLm8XymiTE9iPeNd2n7lG",
};

const envPriceIds: Record<`${PlanId}:${BillingInterval}`, string | undefined> = {
  "owner_operator:monthly": process.env.NEXT_PUBLIC_STRIPE_PRICE_OWNER_MONTHLY,
  "owner_operator:yearly": process.env.NEXT_PUBLIC_STRIPE_PRICE_OWNER_YEARLY,
  "small_fleet:monthly": process.env.NEXT_PUBLIC_STRIPE_PRICE_SMALL_MONTHLY,
  "small_fleet:yearly": process.env.NEXT_PUBLIC_STRIPE_PRICE_SMALL_FLEET_YEARLY,
  "fleet_pro:monthly": process.env.NEXT_PUBLIC_STRIPE_PRICE_FLEET_MONTHLY,
  "fleet_pro:yearly": process.env.NEXT_PUBLIC_STRIPE_PRICE_FLEET_PRO_YEARLY,
};

function clean(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Product app origin. Defaults to the live HaulBooks app. */
export function appOrigin() {
  const raw = clean(process.env.NEXT_PUBLIC_APP_URL);
  if (!raw) return "https://haulbookspro.com";
  try {
    return new URL(raw).origin;
  } catch {
    return "https://haulbookspro.com";
  }
}

export function lookupKey(plan: PlanId, interval: BillingInterval) {
  return `${plan}_${interval}`;
}

export function stripePriceId(plan: PlanId, interval: BillingInterval) {
  const fromEnv = clean(envPriceIds[`${plan}:${interval}`]);
  if (!fromEnv) return livePriceIds[`${plan}:${interval}`];
  return fromEnv.startsWith("price_") ? fromEnv : livePriceIds[`${plan}:${interval}`];
}

/**
 * Deep-link into the existing app signup. The query uses plan and interval
 * only. The app maps those to lookup keys such as small_fleet_monthly.
 */
export function checkoutLink(plan: PlanId, interval: BillingInterval): CheckoutTarget {
  const key = lookupKey(plan, interval);
  const priceId = stripePriceId(plan, interval);
  const url = new URL("/auth", appOrigin());
  url.searchParams.set("mode", "signup");
  url.searchParams.set("plan", plan);
  url.searchParams.set("interval", interval);
  return { href: url.toString(), configured: true, priceId, lookupKey: key };
}

export function signInLink(): CheckoutTarget {
  const raw = clean(process.env.NEXT_PUBLIC_APP_URL);
  const fallback = "https://haulbookspro.com/auth";
  if (!raw) return { href: fallback, configured: true, lookupKey: "sign_in" };
  try {
    const url = new URL(raw);
    if (url.pathname === "/" || url.pathname === "") url.pathname = "/auth";
    return { href: url.toString(), configured: true, lookupKey: "sign_in" };
  } catch {
    return { href: fallback, configured: true, lookupKey: "sign_in" };
  }
}
