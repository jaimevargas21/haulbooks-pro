export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  related: { href: string; label: string }[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "ifta-quarterly-checklist",
    title: "IFTA prep for owner operators",
    description:
      "IFTA prep for owner operators: miles, gallons, fuel receipts, and a readiness score before you file. HaulBooks prepares the worksheet. You still file.",
    date: "2026-09-08",
    related: [
      { href: "/ifta", label: "IFTA worksheets" },
      { href: "/demo?view=ifta", label: "IFTA dashboard demo" },
      { href: "/blog/cost-per-mile", label: "Trucking cost per mile" },
    ],
    sections: [
      {
        heading: "Close the quarter before the weekend it is due",
        paragraphs: [
          "Q4 is due January 31. Q1 is due April 30. Q2 is due July 31. Q3 is due October 31. Those dates are for planning. If a due date lands on a weekend or holiday, your base jurisdiction’s rule wins.",
          "HaulBooks Pro can have the worksheet ready. It does not file the return, and it is not tax advice.",
        ],
      },
      {
        heading: "Checklist",
        paragraphs: [
          "Every trip for the quarter is on a truck, including deadhead. ELD CSV imports are mapped, and leftover rows are entered by hand.",
          "Every fuel stop has gallons, the jurisdiction where you bought it, and the receipt image. A discount at the pump does not replace the gallon count.",
          "Total miles divided by total gallons is a believable MPG. If it is not, a missing trip or a doubled receipt is usually why.",
          "The readiness score names what is still missing. Fix those rows before you key the return.",
          "Your accountant can open the worksheet if you invited them. They do not need their own truck plan.",
        ],
      },
      {
        heading: "What to hand your base jurisdiction",
        paragraphs: [
          "You still review the numbers and file. Keep the worksheet and the receipt images with that quarter. An audit asks for the same pile you wished you had organized in January.",
        ],
      },
    ],
  },
  {
    slug: "what-belongs-in-trucking-books",
    title: "Fuel receipt tracking for trucking",
    description:
      "Fuel receipt tracking for trucking: photograph the receipt in the cab, keep gallons by state, and hand your accountant a file instead of a shoebox.",
    date: "2026-09-10",
    related: [
      { href: "/product", label: "How capture works" },
      { href: "/demo?view=receipts", label: "Receipts demo" },
      { href: "/blog/ifta-quarterly-checklist", label: "IFTA prep for owner operators" },
    ],
    sections: [
      {
        heading: "The shoebox is the leak",
        paragraphs: [
          "Fuel receipt tracking is the habit that keeps gallons honest. The money that still vanishes is the scale ticket, the lumper, the shower, the parking receipt, the permit, and the toll that never made it out of the door pocket.",
          "Photograph it when you pay. Vendor, date, and total are easier to read on a fresh receipt than on a faded one in March.",
        ],
      },
      {
        heading: "Sort it by the truck that earned it",
        paragraphs: [
          "A repair on unit 12 is not a company-wide office expense. Tires, PM, roadside, and the in-frame overhaul belong on that unit, with the image attached.",
          "Recurring bills — truck note, insurance, plates, ELD — belong on a schedule so a missed payment is not a surprise on the P&L.",
          "Your accountant decides what is deductible. The software’s job is to keep the record, not to give tax advice.",
        ],
      },
      {
        heading: "Hand it over as a file, not a story",
        paragraphs: [
          "CSV exports and the receipt images are what a preparer can use. Invite them as an accountant so they are not rebuilding the year from texts.",
        ],
      },
    ],
  },
  {
    slug: "cost-per-mile",
    title: "Trucking cost per mile",
    description:
      "Trucking cost per mile, per truck: fuel, tolls, and fixed costs divided by the miles that unit actually turned. A load-board rate can still lose money.",
    date: "2026-09-12",
    related: [
      { href: "/demo", label: "Cost per mile demo" },
      { href: "/pricing", label: "Pricing" },
      { href: "/blog/what-belongs-in-trucking-books", label: "Fuel receipt tracking" },
    ],
    sections: [
      {
        heading: "The load board rate is not your cost",
        paragraphs: [
          "A $2.40 per mile offer means nothing until you know what that truck costs to roll. Fuel, tolls, tires, and the note all have to be in the same place as the miles.",
        ],
      },
      {
        heading: "Use the miles that unit turned",
        paragraphs: [
          "Company-wide averages hide a truck that deadheads too far or idles through a bad lane. Cost per mile is per truck: dollars on that unit divided by miles that unit ran.",
          "Fuel gallons still have to be logged by jurisdiction. A cheap pump in one state does not erase IFTA in another. The discount and the tax worksheet are different jobs.",
        ],
      },
      {
        heading: "Decide before you book",
        paragraphs: [
          "If the all-in cost per mile is above the offer after deadhead, the load does not pay. The books should show that before you accept, not at tax time.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
