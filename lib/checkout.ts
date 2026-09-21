import type { BillingInterval, PlanId } from "@/lib/plans";

export type CheckoutTarget = {
  href: string;
  configured: boolean;
};

const specificUrls: Record<`${PlanId}:${BillingInterval}`, string | undefined> = {
  "owner_operator:monthly": process.env.NEXT_PUBLIC_STRIPE_SIGNUP_URL_OWNER_OPERATOR_MONTHLY,
  "owner_operator:yearly": process.env.NEXT_PUBLIC_STRIPE_SIGNUP_URL_OWNER_OPERATOR_YEARLY,
  "small_fleet:monthly": process.env.NEXT_PUBLIC_STRIPE_SIGNUP_URL_SMALL_FLEET_MONTHLY,
  "small_fleet:yearly": process.env.NEXT_PUBLIC_STRIPE_SIGNUP_URL_SMALL_FLEET_YEARLY,
  "fleet_pro:monthly": process.env.NEXT_PUBLIC_STRIPE_SIGNUP_URL_FLEET_PRO_MONTHLY,
  "fleet_pro:yearly": process.env.NEXT_PUBLIC_STRIPE_SIGNUP_URL_FLEET_PRO_YEARLY,
};

function clean(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function checkoutLink(plan: PlanId, interval: BillingInterval): CheckoutTarget {
  const specific = clean(specificUrls[`${plan}:${interval}`]);
  if (specific) return { href: specific, configured: true };

  const base = clean(process.env.NEXT_PUBLIC_STRIPE_SIGNUP_URL);
  if (!base) {
    return { href: `/start?plan=${plan}&interval=${interval}`, configured: false };
  }

  if (base.includes("{plan}") || base.includes("{interval}")) {
    return {
      href: base.replaceAll("{plan}", plan).replaceAll("{interval}", interval),
      configured: true,
    };
  }

  try {
    const url = new URL(base);
    url.searchParams.set("plan", plan);
    url.searchParams.set("interval", interval);
    return { href: url.toString(), configured: true };
  } catch {
    return { href: `/start?plan=${plan}&interval=${interval}`, configured: false };
  }
}

export function signInLink(): CheckoutTarget {
  const url = clean(process.env.NEXT_PUBLIC_APP_URL);
  if (!url) return { href: "/sign-in", configured: false };
  return { href: url, configured: true };
}
