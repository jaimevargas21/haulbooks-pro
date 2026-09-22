import type { LeadStatus, ReplyStatus, TicketPriority, TicketStatus } from "@/lib/types";

export type LeadSeed = {
  externalId: string;
  company: string;
  email: string;
  city: string;
  state: string;
  fleetSize: number;
  status: LeadStatus;
  notes: string;
  daysAgo: number;
};

export type ReplySeed = {
  externalId: string;
  leadExternalId: string;
  fromEmail: string;
  subject: string;
  inboundBody: string;
  draftBody: string;
  status: ReplyStatus;
  reviewerNote: string;
  daysAgo: number;
};

export type TicketSeed = {
  externalId: string;
  subject: string;
  fromEmail: string;
  body: string;
  status: TicketStatus;
  priority: TicketPriority;
  daysAgo: number;
};

export function activityDate(daysAgo: number): Date {
  return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
}

const signup = (plan: "owner_operator" | "small_fleet" | "fleet_pro") =>
  `https://haulbookspro.com/auth?mode=signup&plan=${plan}&interval=monthly`;

export const seedLeads: LeadSeed[] = [
  {
    externalId: "lead_lone_star",
    company: "Lone Star Flatbed LLC",
    email: "mike@lonestarflatbed.com",
    city: "Dallas",
    state: "TX",
    fleetSize: 4,
    status: "replied",
    notes: "Asked how this compares with QuickBooks for a 4-truck flatbed outfit.",
    daysAgo: 0.4,
  },
  {
    externalId: "lead_prairie_wind",
    company: "Prairie Wind Transport",
    email: "dispatch@prairiewindtransport.com",
    city: "Omaha",
    state: "NE",
    fleetSize: 3,
    status: "replied",
    notes: "Grain and hopper. Wants IFTA worksheets without a full-time bookkeeper.",
    daysAgo: 0.8,
  },
  {
    externalId: "lead_cascade",
    company: "Cascade Timber Hauling",
    email: "office@cascadetimberhaul.com",
    city: "Eugene",
    state: "OR",
    fleetSize: 6,
    status: "replied",
    notes: "Draft approved. Waiting on the agent to send the Fleet Pro link.",
    daysAgo: 1.2,
  },
  {
    externalId: "lead_gulf_coast",
    company: "Gulf Coast Reefer Co",
    email: "maria@gulfcoastreefer.com",
    city: "Mobile",
    state: "AL",
    fleetSize: 5,
    status: "replied",
    notes: "Asked whether CAT scale tickets and reefer fuel can live in one place.",
    daysAgo: 1.1,
  },
  {
    externalId: "lead_iron_range",
    company: "Iron Range Logistics",
    email: "pat@ironrangelogistics.com",
    city: "Duluth",
    state: "MN",
    fleetSize: 8,
    status: "contacted",
    notes: "First email sent. Steel and taconite lanes. No reply yet.",
    daysAgo: 5,
  },
  {
    externalId: "lead_blue_ridge",
    company: "Blue Ridge Carriers",
    email: "sam@blueridgecarriers.com",
    city: "Roanoke",
    state: "VA",
    fleetSize: 12,
    status: "closed",
    notes: "Wanted driver payroll and settlements. Closed — not a product fit.",
    daysAgo: 12,
  },
  {
    externalId: "lead_red_river",
    company: "Red River Hotshot",
    email: "jesse@redriverhotshot.com",
    city: "Wichita Falls",
    state: "TX",
    fleetSize: 1,
    status: "new",
    notes: "Owner-operator. One dually, oilfield hotshot.",
    daysAgo: 0.2,
  },
  {
    externalId: "lead_high_plains",
    company: "High Plains Grain Haul",
    email: "dee@highplainsgrain.com",
    city: "Garden City",
    state: "KS",
    fleetSize: 7,
    status: "contacted",
    notes: "Harvest surge. Intro email sent to the office manager.",
    daysAgo: 6,
  },
  {
    externalId: "lead_sierra",
    company: "Sierra Nevada Freight",
    email: "alex@sierranevadafreight.com",
    city: "Reno",
    state: "NV",
    fleetSize: 2,
    status: "new",
    notes: "Husband and wife team. Two trucks, west-coast dry van.",
    daysAgo: 1.6,
  },
  {
    externalId: "lead_chesapeake",
    company: "Chesapeake Bulk LLC",
    email: "robin@chesapeakebulk.com",
    city: "Norfolk",
    state: "VA",
    fleetSize: 9,
    status: "qualified",
    notes: "Accountant wants a shared login. Trial link sent.",
    daysAgo: 3.4,
  },
  {
    externalId: "lead_ozark",
    company: "Ozark Mountain Trucking",
    email: "lee@ozarkmountaintrucking.com",
    city: "Springfield",
    state: "MO",
    fleetSize: 4,
    status: "contacted",
    notes: "Left a voicemail after the email. Call back Thursday.",
    daysAgo: 8,
  },
  {
    externalId: "lead_great_lakes",
    company: "Great Lakes Steel Haul",
    email: "chris@greatlakessteelhaul.com",
    city: "Gary",
    state: "IN",
    fleetSize: 11,
    status: "contacted",
    notes: "Fleet Pro fit if they reply. Currently on spreadsheets.",
    daysAgo: 7,
  },
  {
    externalId: "lead_sonoran",
    company: "Sonoran Desert Express",
    email: "riley@sonorandesertexpress.com",
    city: "Tucson",
    state: "AZ",
    fleetSize: 2,
    status: "new",
    notes: "Produce into Phoenix. Found via a fuel-card partner list.",
    daysAgo: 2.2,
  },
  {
    externalId: "lead_black_hills",
    company: "Black Hills Transport",
    email: "jordan@blackhillstransport.com",
    city: "Rapid City",
    state: "SD",
    fleetSize: 3,
    status: "new",
    notes: "Cattle and general freight. New lead from a Facebook group.",
    daysAgo: 3.1,
  },
  {
    externalId: "lead_bayou",
    company: "Bayou State Carriers",
    email: "avery@bayoustatecarriers.com",
    city: "Baton Rouge",
    state: "LA",
    fleetSize: 6,
    status: "contacted",
    notes: "Intro sent. They run reefers for poultry plants.",
    daysAgo: 9,
  },
  {
    externalId: "lead_rocky_mtn",
    company: "Rocky Mountain Refrigerated",
    email: "quinn@rockymtnreefer.com",
    city: "Denver",
    state: "CO",
    fleetSize: 10,
    status: "qualified",
    notes: "On a trial. Office manager is uploading September fuel.",
    daysAgo: 2.5,
  },
  {
    externalId: "lead_piedmont",
    company: "Piedmont Dry Van",
    email: "morgan@piedmontdryvan.com",
    city: "Charlotte",
    state: "NC",
    fleetSize: 5,
    status: "new",
    notes: "At the Small Fleet cap. Do not pitch Fleet Pro unless they add a truck.",
    daysAgo: 4,
  },
  {
    externalId: "lead_columbia",
    company: "Columbia River Hauling",
    email: "taylor@columbiariverhaul.com",
    city: "Portland",
    state: "OR",
    fleetSize: 4,
    status: "contacted",
    notes: "Lumber down the I-5. Email opened, no reply.",
    daysAgo: 10,
  },
  {
    externalId: "lead_heartland",
    company: "Heartland Owner Operator",
    email: "casey@heartlandownerop.com",
    city: "Des Moines",
    state: "IA",
    fleetSize: 1,
    status: "replied",
    notes: "Signup link already sent. Watching the trial.",
    daysAgo: 1.5,
  },
  {
    externalId: "lead_keys_coast",
    company: "Keys to Coast Logistics",
    email: "drew@keystocoast.com",
    city: "Miami",
    state: "FL",
    fleetSize: 8,
    status: "qualified",
    notes: "Port drayage. Qualified after a 20-minute call.",
    daysAgo: 6.5,
  },
  {
    externalId: "lead_badlands",
    company: "Badlands Freight",
    email: "skyler@badlandsfreight.com",
    city: "Billings",
    state: "MT",
    fleetSize: 2,
    status: "new",
    notes: "Two owner-ops under one MC. New this week.",
    daysAgo: 4.5,
  },
  {
    externalId: "lead_magnolia",
    company: "Magnolia Lane Trucking",
    email: "reese@magnolialanetrucking.com",
    city: "Jackson",
    state: "MS",
    fleetSize: 3,
    status: "contacted",
    notes: "Second follow-up due. First note was about receipt photos.",
    daysAgo: 11,
  },
  {
    externalId: "lead_northwoods",
    company: "Northwoods Timber",
    email: "parker@northwoodstimber.com",
    city: "Eau Claire",
    state: "WI",
    fleetSize: 7,
    status: "new",
    notes: "Just pulled from a state association directory.",
    daysAgo: 0.1,
  },
  {
    externalId: "lead_alamo",
    company: "Alamo City Hotshot",
    email: "cameron@alamocityhotshot.com",
    city: "San Antonio",
    state: "TX",
    fleetSize: 1,
    status: "replied",
    notes: "Replied from the truck. No draft is in the queue yet.",
    daysAgo: 2.8,
  },
  {
    externalId: "lead_pacific",
    company: "Pacific Rim Produce",
    email: "hayden@pacificrimproduce.com",
    city: "Salinas",
    state: "CA",
    fleetSize: 14,
    status: "closed",
    notes: "Needs 20 trucks. HaulBooks Pro stops at 15. Closed.",
    daysAgo: 18,
  },
  {
    externalId: "lead_sooner",
    company: "Sooner State Tanker",
    email: "rowan@soonerstatetanker.com",
    city: "Oklahoma City",
    state: "OK",
    fleetSize: 6,
    status: "new",
    notes: "Crude and water. Confirm we only do books and IFTA prep, not dispatch.",
    daysAgo: 5.5,
  },
];

export const seedReplies: ReplySeed[] = [
  {
    externalId: "reply_prairie",
    leadExternalId: "lead_prairie_wind",
    fromEmail: "dispatch@prairiewindtransport.com",
    subject: "Re: IFTA worksheets for three trucks",
    inboundBody:
      "Hi — we run three hoppers out of Omaha. I do the books at night after dispatch closes. Does HaulBooks actually build the IFTA worksheet from miles and fuel, or do I still export to another program? We are tired of a spreadsheet with a tab per truck.\n\nMike is on the road this week so I am the one to talk to.\n\nThanks,\nDana\nPrairie Wind Transport",
    draftBody: `Hi Dana,

HaulBooks Pro builds the IFTA worksheet from the miles and fuel you enter, including receipt photos. You do not export into a second program to prepare the worksheet.

We prepare the worksheet. We do not file the return, and this is not tax advice.

Three trucks fits the Small Fleet plan at $19.99 a month (up to 5 trucks). There is a 7-day trial. A card is required to start, and the card is charged only after the trial.

Signup for Small Fleet:
${signup("small_fleet")}

If you want the yearly amount instead, it is $239.92.

Jaime Vargas
HaulBooks Pro
haulbookspro@gmail.com`,
    status: "pending",
    reviewerNote: "",
    daysAgo: 0.7,
  },
  {
    externalId: "reply_gulf",
    leadExternalId: "lead_gulf_coast",
    fromEmail: "maria@gulfcoastreefer.com",
    subject: "CAT scale tickets and reefer fuel",
    inboundBody:
      "Hello, we have five reefers. Drivers text me CAT scale tickets and fuel receipts from the reefer unit, not just the tractor. Can both live on the same load, and can my outside accountant see it without me forwarding email?\n\nMaria Alvarez\nGulf Coast Reefer Co",
    draftBody: `Hi Maria,

Yes. Drivers can send receipt photos in, and scale tickets and reefer fuel sit with the rest of that truck's expenses. Your accountant can have access on Small Fleet and Fleet Pro. You do not have to forward a pile of email.

Five trucks is the top of Small Fleet at $19.99 a month. A sixth truck would move you to Fleet Pro at $39.99 a month, which stops at 15 trucks.

The trial is 7 days. A card is required to start it. The card is charged only after the trial. We prepare IFTA worksheets from the miles and fuel already in the books. We do not file the return, and this is not tax advice.

Small Fleet signup:
${signup("small_fleet")}

Jaime Vargas
HaulBooks Pro
haulbookspro@gmail.com`,
    status: "pending",
    reviewerNote: "",
    daysAgo: 1,
  },
  {
    externalId: "reply_lone_star",
    leadExternalId: "lead_lone_star",
    fromEmail: "mike@lonestarflatbed.com",
    subject: "Re: books for the flatbeds",
    inboundBody:
      "We are on QuickBooks now. I do not want another thing that only does invoices. We have 4 flatbeds in Dallas. I need fuel, repairs, and IFTA miles without my wife retyping the pilot receipts on Sunday.\n\nIf it is just a cheaper QuickBooks I am not interested.\n\nMike Herrera",
    draftBody: `Hi Mike,

This is not a cheaper QuickBooks. HaulBooks Pro is trucking bookkeeping: fuel, repairs, receipt photos, and an IFTA worksheet from the miles and fuel you already keep. It is built for owner-operators and small fleets, not for a general ledger package.

Four flatbeds fits Small Fleet at $19.99 a month (up to 5 trucks). Owner Operator is the 1-truck plan at $9.99. Fleet Pro is $39.99 and stops at 15 trucks.

The trial is 7 days. A card is required to start, and it is charged only after the trial. We prepare the IFTA worksheet. We do not file it, and this is not tax advice.

Small Fleet signup:
${signup("small_fleet")}

Jaime Vargas
HaulBooks Pro
haulbookspro@gmail.com`,
    status: "pending",
    reviewerNote: "",
    daysAgo: 0.3,
  },
  {
    externalId: "reply_cascade",
    leadExternalId: "lead_cascade",
    fromEmail: "office@cascadetimberhaul.com",
    subject: "Re: six log trucks",
    inboundBody:
      "We have six log trucks out of Eugene. Our bookkeeper quit in August. Can two people be in the account, and is six trucks still the small plan?\n\n— Erin",
    draftBody: `Hi Erin,

Six trucks is Fleet Pro, not Small Fleet. Small Fleet stops at 5 trucks. Fleet Pro is $39.99 a month and covers up to 15 trucks, with more than one person in the account.

The trial is 7 days. A card is required to start, and the card is charged only after the trial. We prepare IFTA worksheets. We do not file the return, and this is not tax advice.

Fleet Pro signup:
${signup("fleet_pro")}

Jaime Vargas
HaulBooks Pro
haulbookspro@gmail.com`,
    status: "approved",
    reviewerNote: "Good. Send the Fleet Pro link. Do not mention Small Fleet pricing again.",
    daysAgo: 1.1,
  },
  {
    externalId: "reply_blue_ridge",
    leadExternalId: "lead_blue_ridge",
    fromEmail: "sam@blueridgecarriers.com",
    subject: "Payroll and driver settlements",
    inboundBody:
      "Before we look at the price — we need driver settlements and weekly payroll for 12 company drivers. If you do not cut checks, tell me now.\n\nSam",
    draftBody: `Hi Sam,

HaulBooks Pro does not run payroll or driver settlements. It keeps the books, receipt photos, and IFTA worksheets for fleets up to 15 trucks. I do not want to put you in a trial for a job the product does not do.

If you only needed the books and IFTA prep later, Fleet Pro is $39.99 a month. For settlements, you will want a payroll provider built for carriers.

Jaime Vargas
HaulBooks Pro
haulbookspro@gmail.com`,
    status: "denied",
    reviewerNote: "Do not send. They need payroll. Lead is closed.",
    daysAgo: 11,
  },
  {
    externalId: "reply_heartland",
    leadExternalId: "lead_heartland",
    fromEmail: "casey@heartlandownerop.com",
    subject: "One truck, is the $9.99 plan enough?",
    inboundBody:
      "I have one truck. I keep missing the fuel receipts in the visor. Is the $9.99 plan the right one, and do you file my IFTA for me?\n\nCasey",
    draftBody: `Hi Casey,

Yes. One truck is the Owner Operator plan at $9.99 a month. You can photograph the fuel receipts into the account instead of keeping them in the visor.

We prepare the IFTA worksheet from your miles and fuel. We do not file it for you, and this is not tax advice.

The trial is 7 days. A card is required to start, and the card is charged only after the trial.

Owner Operator signup:
${signup("owner_operator")}

Jaime Vargas
HaulBooks Pro
haulbookspro@gmail.com`,
    status: "sent",
    reviewerNote: "Sent Tuesday after the call.",
    daysAgo: 1.4,
  },
];

export const seedTickets: TicketSeed[] = [
  {
    externalId: "ticket_ifta_export",
    subject: "Q1 IFTA worksheet will not download",
    fromEmail: "nora@northforkhauling.com",
    body: "Nora at North Fork Hauling (3 trucks, Iowa) says the Q1 worksheet spins and never downloads in Chrome. She can open Q4. Asked for a screenshot of the browser console.",
    status: "open",
    priority: "high",
    daysAgo: 0.6,
  },
  {
    externalId: "ticket_mudflap",
    subject: "Mudflap fuel rows imported twice",
    fromEmail: "eddie@eddiesexpress.com",
    body: "Eddie imported a Mudflap CSV and every March fuel row landed twice. He has not deleted anything yet. Asked him to leave the file as-is until we look.",
    status: "open",
    priority: "normal",
    daysAgo: 1.8,
  },
  {
    externalId: "ticket_sept_miles",
    subject: "Waiting on September miles from the owner",
    fromEmail: "bookkeeper@chesapeakebulk.com",
    body: "Chesapeake Bulk's bookkeeper has fuel in, but the owner still has the paper mileage logs in the truck. Ticket stays pending until those miles arrive. Not a product bug.",
    status: "pending",
    priority: "normal",
    daysAgo: 3,
  },
  {
    externalId: "ticket_password",
    subject: "Password reset for Casey at Heartland",
    fromEmail: "casey@heartlandownerop.com",
    body: "Reset link sent and Casey confirmed he is back in the Owner Operator account. Closed.",
    status: "resolved",
    priority: "low",
    daysAgo: 4,
  },
  {
    externalId: "ticket_trial_auth",
    subject: "Card shows an authorization during the trial",
    fromEmail: "mike@lonestarflatbed.com",
    body: "Mike started a trial and his bank shows a card check. He thinks he was charged. Explain that a card is required to start, the charge comes only after day 7, and an authorization can show before that. He has not been billed the plan price.",
    status: "open",
    priority: "urgent",
    daysAgo: 0.3,
  },
];
