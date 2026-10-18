export const demoViews = [
  { id: "home", label: "Home" },
  { id: "receipts", label: "Receipts" },
  { id: "ifta", label: "Fuel & IFTA" },
  { id: "trucks", label: "Trucks" },
  { id: "reports", label: "Reports" },
] as const;

export type DemoView = (typeof demoViews)[number]["id"];

export function parseView(value: string | null | undefined): DemoView {
  return demoViews.find((view) => view.id === value)?.id ?? "home";
}

export type Truck = {
  id: string;
  unit: string;
  model: string;
  cpm: number;
  fuel: number;
  readiness: number;
  gaps: number;
  status: "On the road" | "In the shop" | "Available";
};

export const trucks: Truck[] = [
  {
    id: "214",
    unit: "Unit 214",
    model: "2022 Freightliner Cascadia",
    cpm: 1.84,
    fuel: 4280,
    readiness: 86,
    gaps: 2,
    status: "On the road",
  },
  {
    id: "118",
    unit: "Unit 118",
    model: "2019 Kenworth T680",
    cpm: 2.06,
    fuel: 1940,
    readiness: 71,
    gaps: 3,
    status: "In the shop",
  },
  {
    id: "307",
    unit: "Unit 307",
    model: "2021 Volvo VNL",
    cpm: 1.71,
    fuel: 2610,
    readiness: 94,
    gaps: 1,
    status: "Available",
  },
];

export type Attention = {
  title: string;
  detail: string;
  tone: "warn" | "ok";
};

export const attentionByTruck: Record<string, Attention[]> = {
  "214": [
    { title: "Missing receipt · TX", detail: "Sep 11 fuel stop has gallons and no photo.", tone: "warn" },
    { title: "Miles gap · OK", detail: "186 miles are not matched to a trip.", tone: "warn" },
  ],
  "118": [
    { title: "Needs review · IL", detail: "Speedway receipt is on the truck. Confirm the gallons.", tone: "warn" },
    { title: "PM due", detail: "Unit 118 is in the shop. The last service note is attached.", tone: "ok" },
  ],
  "307": [
    { title: "Missing photo · MO", detail: "Flying J gallons are logged. The image is still out.", tone: "warn" },
  ],
};

export type ReceiptStatus = "Posted" | "Needs review" | "Missing photo";

export type Receipt = {
  id: string;
  vendor: string;
  amount: number;
  gallons: number;
  state: string;
  status: ReceiptStatus;
  truck: string;
  date: string;
};

export const sampleReceipts: Receipt[] = [
  { id: "r1", vendor: "Pilot Travel Center #442", amount: 486.2, gallons: 128.4, state: "TX", status: "Posted", truck: "214", date: "Sep 18" },
  { id: "r2", vendor: "Love's #214", amount: 512.4, gallons: 136.1, state: "OK", status: "Posted", truck: "214", date: "Sep 16" },
  { id: "r3", vendor: "TA Petro", amount: 398.1, gallons: 104.2, state: "NM", status: "Posted", truck: "214", date: "Sep 14" },
  { id: "r4", vendor: "Speedway", amount: 276.55, gallons: 71.8, state: "IL", status: "Needs review", truck: "118", date: "Sep 12" },
  { id: "r5", vendor: "Sapp Bros", amount: 441.9, gallons: 118, state: "NE", status: "Posted", truck: "214", date: "Sep 9" },
  { id: "r6", vendor: "Flying J", amount: 355, gallons: 92.4, state: "MO", status: "Missing photo", truck: "307", date: "Sep 7" },
  { id: "r7", vendor: "QuikTrip", amount: 190.25, gallons: 48.6, state: "TX", status: "Posted", truck: "118", date: "Sep 4" },
];

export const states = ["TX", "OK", "NM", "IL", "NE", "MO", "AR"] as const;

export type Quarter = {
  id: string;
  label: string;
  readiness: number;
  note: string;
  checks: { label: string; done: boolean; detail: string }[];
  rows: { state: string; miles: number; gallons: number }[];
};

export const quarters: Quarter[] = [
  {
    id: "2026-Q3",
    label: "Q3 2026",
    readiness: 86,
    note: "Current quarter · sample",
    checks: [
      { label: "Miles logged on each truck", done: true, detail: "ELD rows are assigned to a unit." },
      { label: "Fuel matched to a receipt", done: false, detail: "One TX stop is missing a photo." },
      { label: "States with miles have gallons", done: false, detail: "OK has 186 miles not on a trip." },
    ],
    rows: [
      { state: "TX", miles: 4820, gallons: 712 },
      { state: "OK", miles: 1960, gallons: 250 },
      { state: "NM", miles: 1420, gallons: 210 },
      { state: "IL", miles: 980, gallons: 148 },
      { state: "NE", miles: 640, gallons: 96 },
    ],
  },
  {
    id: "2026-Q2",
    label: "Q2 2026",
    readiness: 100,
    note: "Closed quarter · sample",
    checks: [
      { label: "Miles logged on each truck", done: true, detail: "No unmatched trips." },
      { label: "Fuel matched to a receipt", done: true, detail: "Every stop has a photo." },
      { label: "States with miles have gallons", done: true, detail: "Ready for you to review and file." },
    ],
    rows: [
      { state: "TX", miles: 5104, gallons: 748 },
      { state: "OK", miles: 2210, gallons: 310 },
      { state: "AR", miles: 1660, gallons: 248 },
      { state: "MO", miles: 1890, gallons: 276 },
    ],
  },
  {
    id: "2026-Q1",
    label: "Q1 2026",
    readiness: 74,
    note: "Closed quarter · sample",
    checks: [
      { label: "Miles logged on each truck", done: true, detail: "Winter reroutes are on the trucks." },
      { label: "Fuel matched to a receipt", done: false, detail: "Two January stops still need photos." },
      { label: "States with miles have gallons", done: false, detail: "AR deadhead is not on a unit yet." },
    ],
    rows: [
      { state: "TX", miles: 3904, gallons: 610 },
      { state: "OK", miles: 1540, gallons: 188 },
      { state: "AR", miles: 980, gallons: 40 },
      { state: "MO", miles: 1720, gallons: 260 },
    ],
  },
  {
    id: "2026-Q4",
    label: "Q4 2026",
    readiness: 41,
    note: "Not open yet · sample preview",
    checks: [
      { label: "Miles logged on each truck", done: false, detail: "The quarter starts October 1." },
      { label: "Fuel matched to a receipt", done: false, detail: "Nothing to match until you roll." },
      { label: "States with miles have gallons", done: false, detail: "The worksheet fills in as you drive." },
    ],
    rows: [
      { state: "TX", miles: 420, gallons: 64 },
      { state: "OK", miles: 180, gallons: 22 },
    ],
  },
];

export const reportLines = [
  { label: "Settlement revenue", amount: 28440 },
  { label: "Fuel", amount: -8830 },
  { label: "Maintenance", amount: -2140 },
  { label: "Insurance and fixed costs", amount: -3180 },
  { label: "Tolls and permits", amount: -640 },
] as const;

export function reportNet() {
  return reportLines.reduce((sum, line) => sum + line.amount, 0);
}
