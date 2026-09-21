# HaulBooks Pro

Marketing site for [HaulBooks Pro](https://haulbookspro.com) — trucking bookkeeping and IFTA preparation for owner-operators and small fleets, up to 15 trucks.

Operated by Liberty Haul Logistics LLC. Support: haulbookspro@gmail.com. Stripe is the Merchant of Record.

This repository is the public marketing site (Next.js App Router). It does not include the product app, authentication, or a database.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Short decision homepage |
| `/product` | Features, roles, full demo, calendar |
| `/ifta` | IFTA marketing landing. Not sign-in |
| `/pricing` | Owner Operator $9.99/mo, Small Fleet $19.99/mo (most popular), Fleet Pro $39.99/mo |
| `/fuel-cards` | Coast, RoadFlex, AtoB, WEX/EFS, TSS, and Mudflap. Tracking links come from env vars. See AFFILIATES.md |
| `/for-accountants` | Accountant invite path |
| `/blog` | Three launch posts |
| `/signup` | Card-required trial handoff into the app. `/start` redirects here |
| `/signin` | Sign-in only. `/sign-in` redirects here |
| `/contact` | Contact form that opens the visitor's email app. `/support` redirects here |
| `/privacy` `/terms` `/refunds` `/subprocessors` | Legal |

## Product rules baked into the copy

- 7-day free trial. A credit card is required. The card is charged only after the trial. Cancel anytime.
- The site never says a credit card is optional.
- Monthly amounts: Owner Operator $9.99, Small Fleet $19.99, Fleet Pro $39.99. Yearly amounts: $119.92, $239.92, and $479.92. Yearly is about twelve times monthly, so the site does not claim "33% off" or "4 months free."
- IFTA worksheets are prepared here. HaulBooks Pro does not file taxes and is not tax advice.
- Fleet Pro stops at 15 trucks.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm run lint
```

Node 20 or newer.

## Environment variables

See `.env.example`. The production build succeeds with none of them set. Trial buttons still deep-link to the live app, using the Price IDs below as defaults.

This site does not create a Stripe Checkout session. The HaulBooks app on haulbookspro.com collects the card. A pricing button goes to:

```
https://haulbookspro.com/auth?mode=signup&plan=small_fleet&interval=yearly
```

`plan` is `owner_operator`, `small_fleet`, or `fleet_pro`. `interval` is `monthly` or `yearly`. After signup the app opens Stripe with the lookup key (`small_fleet_monthly`, `owner_operator_yearly`, and the rest). The link does not put a dollar amount in the query string.

Live prices on account `acct_1SggnO8XymiTE9iP`:

```
NEXT_PUBLIC_STRIPE_PRICE_OWNER_MONTHLY=price_1UIDF88XymiTE9iPvRuk9Kpi
NEXT_PUBLIC_STRIPE_PRICE_SMALL_MONTHLY=price_1UIDHK8XymiTE9iPGcmTvOdM
NEXT_PUBLIC_STRIPE_PRICE_FLEET_MONTHLY=price_1UIDJb8XymiTE9iPK1WiGxQc
NEXT_PUBLIC_STRIPE_PRICE_OWNER_YEARLY=price_1UFfLn8XymiTE9iPI7CeCno9
NEXT_PUBLIC_STRIPE_PRICE_SMALL_FLEET_YEARLY=price_1UFfLm8XymiTE9iPugV0TCcl
NEXT_PUBLIC_STRIPE_PRICE_FLEET_PRO_YEARLY=price_1UFfLm8XymiTE9iPeNd2n7lG
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

| Env var | Lookup key | Amount | Product |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_STRIPE_PRICE_OWNER_MONTHLY` | `owner_operator_monthly` | $9.99 | `prod_VGBj4HPsHnQJyk` |
| `NEXT_PUBLIC_STRIPE_PRICE_OWNER_YEARLY` | `owner_operator_yearly` | $119.92 | `prod_VGBj4HPsHnQJyk` |
| `NEXT_PUBLIC_STRIPE_PRICE_SMALL_MONTHLY` | `small_fleet_monthly` | $19.99 | `prod_VGBjfX9YkpilGx` |
| `NEXT_PUBLIC_STRIPE_PRICE_SMALL_FLEET_YEARLY` | `small_fleet_yearly` | $239.92 | `prod_VGBjfX9YkpilGx` |
| `NEXT_PUBLIC_STRIPE_PRICE_FLEET_MONTHLY` | `fleet_pro_monthly` | $39.99 | `prod_VGBj1pAMhfoyLG` |
| `NEXT_PUBLIC_STRIPE_PRICE_FLEET_PRO_YEARLY` | `fleet_pro_yearly` | $479.92 | `prod_VGBj1pAMhfoyLG` |

The 7-day trial is not stored on the Stripe Price. The product app's subscribe call must set `subscription_data.trial_period_days` to 7 and collect a payment method. This marketing site does not create that Checkout session.

Jaime fills `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. This marketing site does not load it and must not receive a secret key.

1. **Stripe Price IDs** — the six variables above. They already match the live account. Change one only when Stripe replaces that price, then redeploy.
2. **App origin** — `NEXT_PUBLIC_APP_URL`. Leave it empty while the product app is still at https://haulbookspro.com. Set it when the app moves to its own origin. Sign in opens `/auth` on that origin.
3. **Affiliate links** — `NEXT_PUBLIC_AFFILIATE_COAST`, `ROADFLEX`, `ATOB`, `WEX`, `TSS`, `MUDFLAP`. Until each one is set, that button says “Get offer” (TSS says “Partner inquiry”) and opens the official program page in AFFILIATES.md. Start with Coast on PartnerStack.
4. **Optional ads tag** — `NEXT_PUBLIC_GOOGLE_ADS_ID` (`AW-…` or `G-…`). Leave it blank to load no tag.

`NEXT_PUBLIC_*` values are read at build time on Vercel. Change them, then redeploy.

## Deploy on Vercel

1. Import this GitHub repository. Framework preset: Next.js. Build command: `npm run build`. Output is handled by Next.js (do not set a static `out` directory).
2. Add the environment variables above in the Vercel project. Production and Preview can differ.
3. Attach the domain `haulbookspro.com`.
4. Deploy, then click a pricing button and confirm it opens `https://haulbookspro.com/auth?mode=signup&plan=…&interval=…` (or the app origin you set). Click a fuel-card button and confirm the affiliate URL.

No server, database, or cron is required for this site.

## Where the copy came from

The redesign spec file and the previous app export were not in this workspace. Page copy, FAQ, fuel-card comparison, legal substance, and the photographs (`hero-truck`, `receipt-scan`, `fleet-yard`, logo, icon) were taken from the public site at haulbookspro.com. The old Open Graph file on the previous host returned 403, so `/opengraph-image` is generated in the app. Product rules in the project brief override the previous site where they conflict: card required to start the trial, 15-truck maximum, and Liberty Haul Logistics LLC as the operator.

Do not add Lovable, Supabase keys, or any `.env` secrets to this repo.
