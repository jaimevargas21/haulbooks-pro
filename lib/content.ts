export const comparison = [
  {
    old: "A shoebox of fuel receipts behind the seat",
    next: "Snap the receipt in the cab. Vendor, gallons, and state file to the truck.",
  },
  {
    old: "An IFTA spreadsheet the night before it is due",
    next: "The worksheet builds as you drive, with a readiness score and the gaps named.",
  },
  {
    old: "Guessing cost per mile from a load-board rate",
    next: "Cost per mile per truck, from the fuel, repairs, and miles that unit actually ran.",
  },
  {
    old: "Chasing drivers for paperwork on payday",
    next: "Drivers upload to their own truck. You see the receipt without the chase.",
  },
  {
    old: "A quarter-end pile your accountant has to rebuild",
    next: "CSV exports and a read-only accountant seat. The images stay attached.",
  },
] as const;

export const homeFaqs = [
  {
    q: "What is trucking bookkeeping in HaulBooks Pro?",
    a: "HaulBooks Pro is bookkeeping for owner-operators and small fleets. You snap fuel and repair receipts, keep expenses and miles on each truck, and see cost per mile without a generic accounting tool that has never heard of a jurisdiction.",
  },
  {
    q: "How do you track cost per mile for a truck?",
    a: "Cost per mile is the fuel, tolls, repairs, and fixed costs on that unit, divided by the miles that unit ran. The dashboard shows it per truck so a load-board rate can be compared with what the truck actually costs to roll.",
  },
  {
    q: "Is this an IFTA spreadsheet?",
    a: "It replaces the quarter-end spreadsheet. Fuel purchases and miles stay separated by jurisdiction, and each quarter you get a worksheet with miles, gallons, and MPG plus an IFTA readiness score. HaulBooks Pro prepares the worksheet. It does not file the return, and it is not tax advice.",
  },
  {
    q: "How does IFTA readiness work for owner-operators?",
    a: "The readiness score is a percentage of the quarter that is complete, with the missing pieces named: a fuel stop without a receipt, miles that are not on a truck, or a state that does not match. You fix those rows before you file with your base jurisdiction.",
  },
  {
    q: "Does the fuel receipt scanner work from the cab?",
    a: "Yes. Photograph a fuel, repair, or supply receipt on your phone. HaulBooks Pro reads the vendor, date, total, and gallons, then files it to the truck. You can edit any field before it is saved. Duplicate photos and matching vendor, date, and amount are flagged.",
  },
  {
    q: "Can I track owner-operator expenses besides fuel?",
    a: "Yes. Scale tickets, lumper fees, tolls, parking, permits, insurance, and the truck note can sit on the same truck as the fuel. Your accountant decides what is deductible. The software keeps the record and the image.",
  },
  {
    q: "Do I need a credit card for the 7-day trial?",
    a: "Yes. A credit card is required to start. You are not charged until day 8. Cancel before then and you are not billed.",
  },
  {
    q: "Can my accountant get the books out?",
    a: "Yes. Invite them as an accountant for read-only financials, CSV exports, and the IFTA worksheet. They do not buy an owner plan. HaulBooks Pro does not file income taxes.",
  },
] as const;

export const nav = [
  { href: "/product", label: "Product" },
  { href: "/ifta", label: "IFTA" },
  { href: "/pricing", label: "Pricing" },
  { href: "/fuel-cards", label: "Fuel cards" },
  { href: "/for-accountants", label: "For accountants" },
  { href: "/blog", label: "Blog" },
] as const;

export const replaces = [
  "Replaces the receipt shoebox",
  "Replaces the mileage spreadsheet",
  "Replaces the quarter-end IFTA scramble",
  "Gives your accountant clean exports",
] as const;

export const howItWorks = [
  {
    step: "1",
    title: "Capture from the cab",
    body: "Snap fuel, repair, and toll receipts, log fuel purchases, or let your drivers upload from their own login.",
  },
  {
    step: "2",
    title: "HaulBooks Pro sorts it",
    body: "Receipts are read automatically, categorized as fuel, maintenance, or business expense, checked for duplicates, and tied to the right truck.",
  },
  {
    step: "3",
    title: "Hand it off",
    body: "Quarterly IFTA worksheets, per-truck profit and loss, and CSV exports are ready whenever your accountant or the state asks.",
  },
] as const;

export const jobCards = [
  {
    title: "Cost per mile, per truck",
    body: "Fuel, tolls, tires, insurance, and the truck note divided by the miles that unit actually turned — so you know your break-even rate before you book the load.",
  },
  {
    title: "Fuel taxed where you burned it",
    body: "IFTA doesn't care where you bought the diesel. It cares where you ran the miles. HaulBooks Pro keeps gallons purchased and miles run separated by jurisdiction all quarter.",
  },
  {
    title: "Maintenance history per unit",
    body: "PM services, tires, in-frames, and roadside repairs logged against the VIN, with the receipt attached — useful at trade-in time and at a DOT audit.",
  },
  {
    title: "Deductions you'd otherwise lose",
    body: "Scale tickets, lumper fees, parking, showers, ELD subscriptions, permits, and tolls. The small ones add up to thousands a year when they're actually captured.",
  },
  {
    title: "Fixed costs that hit every month",
    body: "Truck and trailer notes, physical damage and occupational accident insurance, plates, IRP, and parking — tracked as recurring bills and booked when paid.",
  },
  {
    title: "Records that survive an audit",
    body: "Original receipt images, trip-level mileage, and jurisdiction detail retained together, so a fuel tax audit is a download instead of a panic.",
  },
] as const;

export const calendar = [
  {
    when: "Jan 31",
    what: "Q4 IFTA return",
    body: "October through December miles and gallons, summarized by jurisdiction and ready to key in.",
  },
  {
    when: "Apr 30",
    what: "Q1 IFTA return",
    body: "The quarter that usually hurts — winter fuel, weather reroutes, and a lot of receipts.",
  },
  {
    when: "Aug 31",
    what: "Form 2290 HVUT",
    body: "Heavy vehicle use tax for the July–June period. Keep the stamped Schedule 1 with the truck's documents.",
  },
  {
    when: "Ongoing",
    what: "Plates, permits, insurance",
    body: "Registration, IRP, insurance certificates, and inspection dates with expiration reminders per unit.",
  },
] as const;

export const features = [
  {
    title: "Scan receipts at the pump",
    body: "Take a photo of any fuel or repair receipt. HaulBooks Pro reads the vendor, date, total, and gallons, then files it as an expense — no shoebox, no data entry.",
  },
  {
    title: "Fuel and expense tracking",
    body: "Every gallon and every dollar sorted by truck, driver, and state, so you always know what a load actually cost you.",
  },
  {
    title: "Recurring bills",
    body: "Truck notes, insurance, permits, parking, ELD. HaulBooks Pro tracks what's due and logs each payment as an expense automatically.",
  },
  {
    title: "Mileage by state",
    body: "Import a mileage CSV from your ELD or enter trips by hand. HaulBooks Pro keeps the state-by-state breakdown IFTA asks for.",
  },
  {
    title: "IFTA preparation",
    body: "A quarterly worksheet with miles, gallons, and MPG per state, plus a readiness score that tells you what's still missing before you file.",
  },
  {
    title: "Trucks, drivers, and docs",
    body: "Keep registration, insurance, and Form 2290 documents per unit, with expiration reminders and the right driver assigned to each truck.",
  },
] as const;

export const roles = [
  "Owner / Admin — full control, billing, and team invites",
  "Manager — trucks, drivers, bills, and mileage",
  "Driver — upload receipts and log fuel from the road",
  "Accountant — read-only financials, exports, and IFTA worksheets",
] as const;

export const stats = [
  ["58", "IFTA jurisdictions supported"],
  ["4", "Quarters kept on file"],
  ["7 yrs", "Of records you can keep"],
  ["CSV", "Exports your accountant can use"],
] as const;

export const quotes = [
  {
    quote:
      "I used to keep a year of fuel receipts in a shoebox behind the seat. Now I shoot the receipt at the pump and the quarter is basically done before I get home.",
    name: "Owner-operator",
    detail: "1 truck · Texas regional",
  },
  {
    quote:
      "The IFTA readiness score is the part that sold me. It tells me exactly which trips are missing miles instead of leaving me to hunt through the logs.",
    name: "Small fleet owner",
    detail: "4 trucks · Midwest dry van",
  },
  {
    quote:
      "My drivers only see their own truck, so uploading a repair receipt takes them ten seconds and I don't have to chase paperwork on payday.",
    name: "Fleet manager",
    detail: "9 trucks · Reefer",
  },
  {
    quote:
      "Exports go straight to my accountant. No more rebuilding a spreadsheet every January from a pile of crumpled paper.",
    name: "Company driver turned owner",
    detail: "2 trucks · Flatbed",
  },
] as const;

export const productFaqs = [
  {
    q: "Does HaulBooks Pro read receipts automatically?",
    a: "Yes. Photograph a fuel, repair, or supply receipt and HaulBooks Pro pulls the vendor, date, total, tax, and gallons off the image, then classifies it as fuel, maintenance, or another business expense. You can edit any field before it's saved.",
  },
  {
    q: "Will it catch a receipt I upload twice?",
    a: "It will. Identical images are caught by file fingerprint before scanning, and receipts with the same vendor, date, and amount are flagged as likely duplicates. You choose to merge, skip, or save anyway, so you never end up with double expenses.",
  },
  {
    q: "How does HaulBooks Pro help with IFTA?",
    a: "Fuel purchases and mileage are tracked per jurisdiction, so each quarter you get a worksheet with miles, gallons, and MPG by state or province, plus a readiness score that points out missing miles or receipts before you file. HaulBooks Pro prepares the worksheet. It does not file the return, and it is not tax advice.",
  },
  {
    q: "Can I import mileage from my ELD?",
    a: "Yes. Export a mileage CSV from your ELD and import it in the Mileage section. HaulBooks Pro maps common column headers automatically and lets you adjust the mapping before importing. Manual entry by state is always available too.",
  },
  {
    q: "What can drivers see?",
    a: "Drivers only see their own assigned truck. They can upload receipts and log fuel from the road but can't view company financials. Managers run trucks, drivers, bills, and mileage. Accountants get read-only financials and exports. Owners see everything, including billing.",
  },
  {
    q: "Is there a free trial, and do I need a credit card?",
    a: "Every new company gets a 7-day free trial with full access. A credit card is required to start. You are not charged until day 8. Cancel before then and you are not billed.",
  },
  {
    q: "How many trucks can I run?",
    a: "Owner Operator covers 1 truck. Small Fleet covers up to 5. Fleet Pro covers up to 15. Fifteen trucks is the maximum on HaulBooks Pro.",
  },
  {
    q: "Can my accountant get the data out?",
    a: "Yes. Expenses, fuel, mileage, and IFTA worksheets export to CSV, so your accountant can work in whatever software they already use.",
  },
  {
    q: "Is HaulBooks Pro tax advice?",
    a: "No. HaulBooks Pro is bookkeeping and record-keeping software that organizes your receipts and mileage. Filing decisions and tax advice should come from your accountant or tax preparer. HaulBooks Pro does not file your IFTA return or your income taxes.",
  },
] as const;

export const pricingFaqs = [
  {
    q: "How does the 7-day free trial work?",
    a: "Pick a plan, add your card, and use every feature free for 7 days. A credit card is required. You are not charged until day 8. Cancel before day 8 and you are not billed.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Move up or down any time from your account. Your records and receipts stay where they are. Fleet Pro is the top plan, at 15 trucks.",
  },
  {
    q: "Does HaulBooks Pro file my IFTA?",
    a: "HaulBooks Pro prepares and organizes the miles, fuel, and receipts you need for IFTA. You review the numbers and file with your base jurisdiction. It does not file the return for you.",
  },
  {
    q: "What if I cancel?",
    a: "Cancel before day 8 and you are not charged. After you are billed, you keep access until the end of the period you paid for. Your records stay readable. There is no cancellation fee.",
  },
] as const;

export const fuelTips = [
  "Run two programs: a discount app for independents, a fleet card for the big chains.",
  "Always check in-network pricing before you pull in — a $0.40 discount at the wrong stop still loses to a cheap independent.",
  "Fuel up in low-tax states, but log the gallons: IFTA settles the difference either way.",
  "Push every fuel purchase into HaulBooks Pro so your IFTA gallons and MPG stay accurate.",
  "Use driver-level cards and spend limits so fuel theft shows up the same day.",
  "Re-check your rebate tier quarterly — volume moves your per-gallon rate.",
] as const;
