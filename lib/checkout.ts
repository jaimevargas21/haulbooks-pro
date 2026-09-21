import type { BillingInterval, PlanId } from "@/lib/plans";

export type CheckoutTarget = {
  href: string;
  /** True when the link opens the product app for this plan, not a generic pricing page. */
  configured: boolean;
  priceId?: string;
  lookupKey: string;
};

/**
 * Live Stripe prices on HAUL BOOKS PRO (acct_1SggnO8XymiTE9iP).
 * The product app charges the lookup key (`owner_operator_monthly`), which Stripe
 * resolves to these Price IDs. This marketing site does not create Checkout sessions.
 * Env vars override the defaults so a price change does not require a code edit.
 */
const livePriceIds: Record<`${PlanId}:${BillingInterval}`, string> = {
  "owner_operator:monthly": "price_1UFfLl8XymiTE9iP1NqCpRqO",
  "owner_operator:yearly": "price_1UFfLn8XymiTE9iPI7CeCno9",
  "small_fleet:monthly": "price_1UFfLn8XymiTE9iPmxn3RoSt",
  "small_fleet:yearly": "price_1UFfLm8XymiTE9iPugV0TCcl",
  "fleet_pro:monthly": "price_1UFfLm8XymiTE9iP6mNHYs7m",
  "fleet_pro:yearly": "price_1UFfLm8XymiTE9iPeNd2n7lG",
};

const envPriceIds: Record<`${PlanId}:${BillingInterval}`, string | undefined> = {
  "owner_operator:monthly": process.env.NEXT_PUBLIC_STRIPE_PRICE_OWNER_MONTHLY,
  "owner_operator:yearly": process.env.NEXT_PUBLIC_STRIPE_PRICE_OWNER_YEARLY,
  "small_fleet:monthly": process.env.NEXT_PUBLIC_STRIPE_PRICE_SMALL_FLEET_MONTHLY,
  "small_fleet:yearly": process.env.NEXT_PUBLIC_STRIPE_PRICE_SMALL_FLEET_YEARLY,
  "fleet_pro:monthly": process.env.NEXT_PUBLIC_STRIPE_PRICE_FLEET_PRO_MONTHLY,
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
  // A Stripe Price ID is price_… . Anything else is not a Checkout price, so ignore it.
  return fromEnv.startsWith("price_") ? fromEnv : undefined;
}

/**
 * Deep-link into the existing app signup. The app reads `plan` and `interval`
 * and later opens Stripe with the lookup key. This repo never calls Stripe.
 * Without a Price ID, the button goes to the app pricing page instead.
 */
export function checkoutLink(plan: PlanId, interval: BillingInterval): CheckoutTarget {
  const key = lookupKey(plan, interval);
  const priceId = stripePriceId(plan, interval);
  const origin = appOrigin();

  if (!priceId) {
    return { href: `${origin}/pricing`, configured: false, lookupKey: key };
  }

  const url = new URL("/auth", origin);
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
