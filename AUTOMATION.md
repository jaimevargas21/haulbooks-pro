# HaulBooks Pro — operator runbook

This marketing site does not run bookkeeping, IFTA filing, billing, or email delivery by itself. Stripe bills the customer. The product app holds the books. This document is what to configure so the site sends people to the right places.

## Deploy

Vercel project, Next.js, `npm run build`, Node 20+.

Production domain: `https://haulbookspro.com`.

After any env change, redeploy. `NEXT_PUBLIC_` variables are inlined into the build.

## What Jaime still has to fill in

### 1. Stripe checkout

The trial is 7 days, a credit card is required, and Stripe should charge only when the trial ends. Cancel anytime. Stripe is the Merchant of Record.

Create a Stripe Payment Link (or Checkout URL) for each price:

| Plan | Monthly | Yearly |
| --- | --- | --- |
| Owner Operator | $9.99 | $119.92 |
| Small Fleet (most popular) | $19.99 | $239.92 |
| Fleet Pro (max 15 trucks) | $39.99 | $479.92 |

Put each link in:

```
NEXT_PUBLIC_STRIPE_SIGNUP_URL_OWNER_OPERATOR_MONTHLY
NEXT_PUBLIC_STRIPE_SIGNUP_URL_OWNER_OPERATOR_YEARLY
NEXT_PUBLIC_STRIPE_SIGNUP_URL_SMALL_FLEET_MONTHLY
NEXT_PUBLIC_STRIPE_SIGNUP_URL_SMALL_FLEET_YEARLY
NEXT_PUBLIC_STRIPE_SIGNUP_URL_FLEET_PRO_MONTHLY
NEXT_PUBLIC_STRIPE_SIGNUP_URL_FLEET_PRO_YEARLY
```

Or set one shared URL:

```
NEXT_PUBLIC_STRIPE_SIGNUP_URL=https://example.com/checkout?plan={plan}&interval={interval}
```

`{plan}` becomes `owner_operator`, `small_fleet`, or `fleet_pro`. `{interval}` becomes `monthly` or `yearly`. If the placeholders are absent, the site appends `?plan=` and `?interval=` instead.

Until a URL is set, trial buttons open `/start` and the visitor is asked to email haulbookspro@gmail.com. That page is `noindex`.

Turn the Stripe trial on in the Payment Link (7 days, card collected up front, cancel before the first invoice). Do not describe the trial as "no credit card."

### 2. Sign in

```
NEXT_PUBLIC_APP_URL=https://app.example.com
```

Header "Sign in" uses this. Leave it empty until the product app has a public URL. `/sign-in` then tells people to email support. This site does not implement passwords.

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
- Price changes. Edit `lib/plans.ts`, then redeploy. Keep the yearly totals in sync with Stripe.
- Affiliate applications. Coast on PartnerStack first, then RoadFlex, AtoB, WEX/EFS, TSS, and a Mudflap publisher ask. Steps are in `AFFILIATES.md`. This repo only stores the tracking URLs you paste into env vars.

## Checks after a deploy

1. Home, pricing, and fuel cards load on a phone-width window.
2. A pricing button reaches the Stripe link for that plan and interval, or `/start` if you have not set one.
3. A fuel-card button reaches the affiliate URL, or the public fallback.
4. Footer still names Liberty Haul Logistics LLC, haulbookspro@gmail.com, and Stripe as Merchant of Record.
5. No page says the trial works without a credit card.
