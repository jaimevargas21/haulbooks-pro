# HaulBooks Pro — operator runbook

This marketing site does not run bookkeeping, IFTA filing, billing, or email delivery by itself. Stripe bills the customer. The product app holds the books. This document is what to configure so the site sends people to the right places.

## Deploy

Vercel project, Next.js, `npm run build`, Node 20+.

Production domain: `https://haulbookspro.com`.

After any env change, redeploy. `NEXT_PUBLIC_` variables are inlined into the build.

## What Jaime still has to fill in

### 1. Stripe prices

The trial is 7 days, a credit card is required, and Stripe charges only when the trial ends. Cancel anytime. Stripe is the Merchant of Record. Checkout already runs in the HaulBooks app. This site does not create a Checkout session.

Displayed prices (live account `acct_1SggnO8XymiTE9iP`):

| Plan | Monthly | Yearly | Lookup key |
| --- | --- | --- | --- |
| Owner Operator | $9.99 | $119.92 | `owner_operator_monthly` / `owner_operator_yearly` |
| Small Fleet (most popular) | $19.99 | $239.92 | `small_fleet_monthly` / `small_fleet_yearly` |
| Fleet Pro (max 15 trucks) | $39.99 | $479.92 | `fleet_pro_monthly` / `fleet_pro_yearly` |

Yearly is about twelve times the monthly price. Do not describe it as 4 months free.

```
NEXT_PUBLIC_STRIPE_PRICE_OWNER_MONTHLY=price_1UIDF88XymiTE9iPvRuk9Kpi
NEXT_PUBLIC_STRIPE_PRICE_SMALL_MONTHLY=price_1UIDHK8XymiTE9iPGcmTvOdM
NEXT_PUBLIC_STRIPE_PRICE_FLEET_MONTHLY=price_1UIDJb8XymiTE9iPK1WiGxQc
NEXT_PUBLIC_STRIPE_PRICE_OWNER_YEARLY=price_1UFfLn8XymiTE9iPI7CeCno9
NEXT_PUBLIC_STRIPE_PRICE_SMALL_FLEET_YEARLY=price_1UFfLm8XymiTE9iPugV0TCcl
NEXT_PUBLIC_STRIPE_PRICE_FLEET_PRO_YEARLY=price_1UFfLm8XymiTE9iPeNd2n7lG
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Jaime fills the publishable key. Do not put a secret key in this repo. The marketing site does not load the publishable key.

A "Start 7-day free trial" button on a plan opens the app:

```
https://haulbookspro.com/auth?mode=signup&plan=owner_operator&interval=monthly
```

The app stores that plan and, after signup, calls Stripe with the lookup key (`owner_operator_monthly`, `small_fleet_monthly`, `fleet_pro_monthly`, `owner_operator_yearly`, `small_fleet_yearly`, `fleet_pro_yearly`). The marketing URL does not include a dollar amount.

The 7-day trial is not a field on the Stripe Price. The product app must create the subscription with `subscription_data.trial_period_days` set to 7 and must collect a payment method up front. This site does not create that Checkout session. Do not describe the trial as "no credit card."

### 2. Sign in

```
NEXT_PUBLIC_APP_URL=https://haulbookspro.com
```

Header "Sign in" uses this origin plus `/auth` when the path is empty. Leave it unset while the product app is still served at https://haulbookspro.com. This site does not implement passwords.

### 3. Fuel-card affiliate URLs

`/fuel-cards` is the passive-income page. Signup order, payouts, and official URLs are in `AFFILIATES.md`. Apply to Coast on PartnerStack first.

```
NEXT_PUBLIC_AFFILIATE_COAST
NEXT_PUBLIC_AFFILIATE_ROADFLEX
NEXT_PUBLIC_AFFILIATE_ATOB
NEXT_PUBLIC_AFFILIATE_WEX
NEXT_PUBLIC_AFFILIATE_TSS
NEXT_PUBLIC_AFFILIATE_MUDFLAP
```

Paste the tracking URL from each program. Links are `rel="sponsored"`.

If a variable is empty, the button says “Get offer” and opens the official program page (TSS says “Partner inquiry” and opens https://octanefuel.com/). The page and the site footer disclose that HaulBooks may earn a commission and that the customer’s price does not change. You do not need these links for the site to ship.

### 4. Optional Google Ads

```
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXX
```

Only values shaped like `AW-…` or `G-…` are loaded. Leave blank and no tag is added. The privacy notice describes this.

## What stays manual

- IFTA and income-tax filing. The product prepares worksheets. It does not file, and the site says so.
- Refunds. The policy is 30 days from the order. Stripe is the Merchant of Record. Support handles requests at haulbookspro@gmail.com.
- Support tickets. `/support` opens the visitor's email app. Nothing is stored on this site.
- Price changes. Edit `lib/plans.ts` and the Price ID defaults in `lib/checkout.ts`, set the matching env vars, then redeploy. Keep yearly at $119.92, $239.92, and $479.92 unless Stripe changes those prices.
- Affiliate applications. Coast on PartnerStack first, then RoadFlex, AtoB, WEX/EFS, TSS, and a Mudflap publisher ask. Steps are in `AFFILIATES.md`. This repo only stores the tracking URLs you paste into env vars.

## Checks after a deploy

1. Home, pricing, and fuel cards load on a phone-width window.
2. A pricing button opens `https://haulbookspro.com/auth?mode=signup&plan=…&interval=…` for that plan. The page shows $9.99, $19.99, and $39.99 monthly, and $119.92, $239.92, and $479.92 yearly.
3. A fuel-card button reaches the affiliate URL, or the public fallback.
4. Footer still names Liberty Haul Logistics LLC, haulbookspro@gmail.com, and Stripe as Merchant of Record.
5. No page says the trial works without a credit card.
