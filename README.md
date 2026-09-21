# HaulBooks Pro

Marketing site for [HaulBooks Pro](https://haulbookspro.com) — trucking bookkeeping and IFTA preparation for owner-operators and small fleets, up to 15 trucks.

Operated by Liberty Haul Logistics LLC. Support: haulbookspro@gmail.com. Stripe is the Merchant of Record.

This repository is the public marketing site (Next.js App Router). It does not include the product app, authentication, or a database.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home: product story, features, pricing, interactive sample demo, FAQ |
| `/pricing` | Owner Operator $9.99/mo, Small Fleet $19.99/mo (most popular), Fleet Pro $39.99/mo |
| `/fuel-cards` | Coast, RoadFlex, AtoB, WEX/EFS, TSS, and Mudflap. Tracking links come from env vars. See AFFILIATES.md |
| `/support` | Contact form that opens the visitor's email app |
| `/privacy` `/terms` `/refunds` `/subprocessors` | Legal |
| `/start` | Trial handoff. Used when a Stripe URL is not configured yet |
| `/sign-in` | Points at `NEXT_PUBLIC_APP_URL`, or tells the visitor to email support |

## Product rules baked into the copy

- 7-day free trial. A credit card is required. The card is charged only after the trial. Cancel anytime.
- The site never says a credit card is optional.
- Yearly amounts: Owner Operator $119.92, Small Fleet $239.92, Fleet Pro $479.92. Those are about twelve times the monthly price, so the site does not claim "33% off" or "4 months free."
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

See `.env.example`. All of them are optional. The production build succeeds with none of them set.

Jaime still needs to fill these before the buttons do real work:

1. **Stripe signup URL** — `NEXT_PUBLIC_STRIPE_SIGNUP_URL`, or one link per plan and interval (`NEXT_PUBLIC_STRIPE_SIGNUP_URL_SMALL_FLEET_YEARLY` and the rest). Per-plan links are the right fit for Stripe Payment Links. Until one of these is set, "Start 7-day free trial" opens `/start`, which explains the card-required trial and emails haulbookspro@gmail.com.
2. **App sign-in** — `NEXT_PUBLIC_APP_URL`. Until it is set, Sign in opens `/sign-in`.
3. **Affiliate links** — `NEXT_PUBLIC_AFFILIATE_COAST`, `ROADFLEX`, `ATOB`, `WEX`, `TSS`, `MUDFLAP`. Until each one is set, that button says “Get offer” (TSS says “Partner inquiry”) and opens the official program page in AFFILIATES.md. Start with Coast on PartnerStack.
4. **Optional ads tag** — `NEXT_PUBLIC_GOOGLE_ADS_ID` (`AW-…` or `G-…`). Leave it blank to load no tag.

`NEXT_PUBLIC_*` values are read at build time on Vercel. Change them, then redeploy.

## Deploy on Vercel

1. Import this GitHub repository. Framework preset: Next.js. Build command: `npm run build`. Output is handled by Next.js (do not set a static `out` directory).
2. Add the environment variables above in the Vercel project. Production and Preview can differ.
3. Attach the domain `haulbookspro.com`.
4. Deploy, then click a pricing button and a fuel-card button and confirm they land on the Stripe and affiliate URLs you set.

No server, database, or cron is required for this site.

## Where the copy came from

The redesign spec file and the previous app export were not in this workspace. Page copy, FAQ, fuel-card comparison, legal substance, and the photographs (`hero-truck`, `receipt-scan`, `fleet-yard`, logo, icon) were taken from the public site at haulbookspro.com. The old Open Graph file on the previous host returned 403, so `/opengraph-image` is generated in the app. Product rules in the project brief override the previous site where they conflict: card required to start the trial, 15-truck maximum, and Liberty Haul Logistics LLC as the operator.

Do not add Lovable, Supabase keys, or any `.env` secrets to this repo.
