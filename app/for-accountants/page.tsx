import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Eyebrow, TrialNote } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For accountants",
  description:
    "Read-only trucking books, CSV exports, and IFTA worksheets. Clients invite you. You do not buy an owner-operator plan to get in.",
};

const gets = [
  {
    title: "Read-only financials",
    body: "Expenses, fuel, bills, and per-truck totals. No driver screens, no company billing.",
  },
  {
    title: "CSV exports",
    body: "Pull the books into the software you already use. No January rebuild from crumpled paper.",
  },
  {
    title: "IFTA worksheets",
    body: "Miles, gallons, and MPG by jurisdiction, with receipt images still attached.",
  },
  {
    title: "Role-scoped access",
    body: "You see that client’s company only. Records stay private to their account.",
  },
] as const;

export default function ForAccountantsPage() {
  return (
    <div className="hero-glow">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>Accountants</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
          Clean trucking books your clients can actually hand you
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Read-only access, CSV exports, IFTA worksheets — without rebuilding a shoebox in January.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#invite">Ask a client to invite you</ButtonLink>
          <ButtonLink href="/signup" variant="secondary">
            Owners: start free trial
          </ButtonLink>
        </div>
        <p className="mt-4 max-w-xl text-xs text-muted">
          Accountant access is an invite. You are not asked to pick a truck plan to open a client’s books.
        </p>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold">What you get</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {gets.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-navy-950/40 p-6">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="invite" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold">How invites work</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Owner starts the company", "They pick a plan and add a card for the 7-day trial. That is their subscription, not yours."],
            ["They invite you", "In the app they add your email with the Accountant role."],
            ["You open the books", "Read-only financials, exports, and IFTA. No driver clutter, no fleet controls."],
          ].map(([title, body], index) => (
            <li key={title} className="rounded-2xl border border-line bg-navy-900/50 p-6">
              <p className="font-display text-2xl font-bold text-amber-400">{index + 1}</p>
              <h3 className="mt-2 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-navy-900/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">What you don’t have to do</h2>
            <p className="mt-4 text-muted">
              Data entry from crumpled fuel receipts, scale tickets, and lumper slips. If the driver
              photographed it, the vendor, date, total, and gallons are already on the expense.
            </p>
            <p className="mt-4 text-sm text-muted">
              You still decide what is deductible and what gets filed. {site.notAdvice}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">Trust and scoping</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="rounded-xl border border-line px-4 py-3">
                Each company is private. An invite does not open any other client.
              </li>
              <li className="rounded-xl border border-line px-4 py-3">
                Receipt images and trip detail stay with the books for multi-year IFTA questions.
              </li>
              <li className="rounded-xl border border-line px-4 py-3">
                Fleets on HaulBooks Pro run up to {site.maxTrucks} trucks. Owner Operator is one truck,
                Small Fleet is five, Fleet Pro is fifteen.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold">Two ways in</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-line bg-navy-900/60 p-6">
            <h3 className="font-display text-2xl font-bold">You run the trucks</h3>
            <p className="mt-3 text-sm text-muted">
              Start the trial, add the card, then invite your accountant from the app.
            </p>
            <div className="mt-5">
              <ButtonLink href="/signup">Start free trial</ButtonLink>
            </div>
            <TrialNote className="mt-3" />
          </article>
          <article className="rounded-3xl border border-amber-400/40 bg-navy-900 p-6">
            <h3 className="font-display text-2xl font-bold">You do the books</h3>
            <p className="mt-3 text-sm text-muted">
              Send your client this page and ask them to invite your email as Accountant. If a client is
              stuck on the invite, contact support and include their company name.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Contact support</ButtonLink>
              <ButtonLink href="/ifta" variant="secondary">
                IFTA worksheets
              </ButtonLink>
            </div>
          </article>
        </div>
        <p className="mt-6 text-sm text-muted">
          <Link href="/product" className="text-amber-300 underline">
            Product tour
          </Link>
          {" · "}
          <Link href="/pricing" className="text-amber-300 underline">
            Owner pricing
          </Link>
        </p>
      </section>
    </div>
  );
}
