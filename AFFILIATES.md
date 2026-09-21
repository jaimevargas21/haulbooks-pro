# Fuel-card affiliates

Public page: `/fuel-cards`.

Buttons say **Get offer** and use your tracking link when the env var is set. Until then they open the official program page below. TSS stays **Partner inquiry** until `NEXT_PUBLIC_AFFILIATE_TSS` is set. Every button and the site footer say HaulBooks may earn a commission and that the customer’s price does not change.

Redeploy after changing any `NEXT_PUBLIC_` variable.

## Do this first

1. Apply to **Coast on PartnerStack**: https://market.partnerstack.com/program/coast361
2. Read the terms before you promote it: https://coastpay.com/affiliate-terms
   - Disclose that you may be paid.
   - Do not bid on Coast trademarks in paid search.
3. When PartnerStack approves you, paste the tracking link into `NEXT_PUBLIC_AFFILIATE_COAST`.
4. The listing is about **$300 per approved application**. Confirm the live bounty in PartnerStack. Coast’s terms pay the amount they indicate, only for a new approved customer.
5. Optional customer referral, separate from the affiliate link: https://coastpay.com/refer/ (advertised as $200 / $200).

Coast does not approve sole proprietorships. Send LLC, corporation, and partnership fleets.

## Then these

### RoadFlex — apply

- Program: https://www.roadflex.com/affiliate-program
- Env: `NEXT_PUBLIC_AFFILIATE_ROADFLEX`
- They create a custom link. Payment is PayPal after the fleet is approved **and** buys 4,000 gallons.
- No payout under 10 vehicles.
- Published tiers: 10–49 vehicles $200, 50–99 $300, 100–249 $500, 250–499 $750, 500+ $1,000.

### AtoB — apply, plus a customer referral

- Partner application: https://www.atob.com/become-a-factoring-partner
- Customer referral (drivers apply here): https://go.atob.com/referrals
- Env: `NEXT_PUBLIC_AFFILIATE_ATOB`
- Referral pay is about **$250 per referred customer**, capped at **$500** total (two paid referrals) in AtoB’s published terms.
- Their referral page advertises average savings of 46¢/gal and up to $1.85/gal (H1 2024). Quote those as AtoB’s figures.

### WEX / EFS — apply, not a quick CPA

- Truckers affiliate: https://partners.efsllc.com/truckers-affiliate/
- Become a partner: https://www.efsllc.com/become-a-partner/
- Env: `NEXT_PUBLIC_AFFILIATE_WEX`
- Aimed at organizations that already have fleets or a network (associations, factoring, GPS, leasing). The cents-per-gallon table on the partner page is partner economics, not a driver pump discount.

### TSS Fuel Card — partner inquiry

- Env: `NEXT_PUBLIC_AFFILIATE_TSS`
- Public materials advertise about **$80 per month per active referred card**. Get that in writing: what “active” means, when it stops, and how you are paid.
- A stable public partner-application URL was not available. The button currently opens https://octanefuel.com/ (the public site tied to TSS) until you paste a real landing page.
- Do not send drivers to a salesperson’s credit-application link.

### Mudflap — driver app, no public CPA

- Driver offer: https://www.mudflapinc.com/
- Truck-stop partners (this pays truck stops, not publishers): https://www.mudflapinc.com/truck-stop-partners
- Env: `NEXT_PUBLIC_AFFILIATE_MUDFLAP`
- Strong fit for owner-operators. Ask Mudflap partnerships whether a website can have an affiliate link. **Do not invent a commission rate.** Leave the env var empty until they send a link.

## Env vars

Fuel-card links are separate from HaulBooks subscription prices. Plans on the site are Owner Operator $9.99/mo or $119.92/yr, Small Fleet $19.99/mo or $239.92/yr, and Fleet Pro $39.99/mo or $479.92/yr. Those Stripe Price IDs are in `.env.example` and README. Do not put a subscription price on a fuel-card button.

```
NEXT_PUBLIC_AFFILIATE_COAST=
NEXT_PUBLIC_AFFILIATE_ROADFLEX=
NEXT_PUBLIC_AFFILIATE_ATOB=
NEXT_PUBLIC_AFFILIATE_WEX=
NEXT_PUBLIC_AFFILIATE_TSS=
NEXT_PUBLIC_AFFILIATE_MUDFLAP=
```

Empty is fine. The page still ships, and the buttons go to the official pages above.
