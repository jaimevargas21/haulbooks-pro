import { checkoutLink, type CheckoutTarget } from "@/lib/checkout";

export type PlanId = "owner_operator" | "small_fleet" | "fleet_pro";
export type BillingInterval = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number;
  yearly: number;
  tagline: string;
  truckLimit: number;
  highlighted: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "owner_operator",
    name: "Owner Operator",
    monthly: 9.99,
    yearly: 119.92,
    tagline: "One truck, all the paperwork handled.",
    truckLimit: 1,
    highlighted: false,
    features: [
      "1 truck",
      "Up to 2 users",
      "Receipt storage",
      "Expense tracking",
      "Bill reminders",
      "IFTA preparation",
      "Tax Center",
    ],
  },
  {
    id: "small_fleet",
    name: "Small Fleet",
    monthly: 19.99,
    yearly: 239.92,
    tagline: "For growing fleets with drivers and an accountant.",
    truckLimit: 5,
    highlighted: true,
    features: [
      "Up to 5 trucks",
      "Unlimited drivers",
      "Receipt management",
      "IFTA preparation",
      "Tax Center",
      "Accountant access",
      "Reports",
    ],
  },
  {
    id: "fleet_pro",
    name: "Fleet Pro",
    monthly: 39.99,
    yearly: 479.92,
    tagline: "Deeper reporting for established operations.",
    truckLimit: 15,
    highlighted: false,
    features: [
      "Up to 15 trucks",
      "Everything in Small Fleet",
      "Advanced reporting",
      "Priority support",
      "Future integrations",
    ],
  },
];

export type PricedPlan = Plan & {
  checkout: Record<BillingInterval, CheckoutTarget>;
};

export function getPlans(): PricedPlan[] {
  return plans.map((plan) => ({
    ...plan,
    checkout: {
      monthly: checkoutLink(plan.id, "monthly"),
      yearly: checkoutLink(plan.id, "yearly"),
    },
  }));
}

export function findPlan(id: string | undefined) {
  return plans.find((plan) => plan.id === id) ?? plans.find((plan) => plan.highlighted)!;
}

export function parseInterval(value: string | undefined): BillingInterval {
  return value === "monthly" ? "monthly" : "yearly";
}
