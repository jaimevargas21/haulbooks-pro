# HaulBooks Pro — Leads & Support Dashboard

Private dashboard for Jaime Vargas. It tracks outreach leads, inbound replies with draft responses, and support tickets for [HaulBooks Pro](https://haulbookspro.com).

This is a separate Next.js app. Deploy it as its **own Vercel project**. Do not change the marketing site's root directory.

There is no public signup. One shared password, set with `DASHBOARD_PASSWORD`.

## Routes

| Path | What it is |
| --- | --- |
| `/login` | Password gate |
| `/` | Counts for leads, replied leads, pending draft approvals, and open tickets |
| `/leads` | Outreach table: company, email, city/state, fleet size, status, last activity |
| `/replies` | Inbound reply plus the draft. Approve or deny, with an optional note |
| `/tickets` | Support tickets: subject, from email, status, priority |
| `POST /api/ingest` | Support agent pushes leads, replies, and tickets |

Lead status: `new`, `contacted`, `replied`, `qualified`, `closed`.

Reply status: `pending`, `approved`, `denied`, `sent`. A sent draft cannot be approved or denied.

Ticket status: `open`, `pending`, `resolved`. Priority: `low`, `normal`, `high`, `urgent`.

"Replied" on the overview is the number of leads whose status is `replied`. "Pending approvals" is the number of drafts still `pending`. "Open tickets" ignores pending and resolved tickets.

## Local run (demo, no database)

Node 20 or newer.

```bash
cd leads-dashboard
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000 and sign in with `DASHBOARD_PASSWORD` from `.env`.

`DEMO_MODE=1` keeps a seeded in-memory store: 26 fictional trucking leads, sample replies (three of them waiting on approval), and sample tickets. Nothing is written to disk. Restarting the dev server resets any approve, deny, or ingest changes.

If `DATABASE_URL` is unset and `DEMO_MODE` is unset, the app also uses that in-memory store. Set `DEMO_MODE=1` on Vercel so the choice is obvious.

```bash
npm run verify
npm run build
```

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `DASHBOARD_PASSWORD` | Yes | The only login. No signup. |
| `SESSION_SECRET` | Yes in production | Signs the httpOnly session cookie. At least 16 characters. `next dev` uses a dev-only secret if this is empty. |
| `INGEST_API_KEY` | Yes, for ingest | Sent as the `x-api-key` header. |
| `DEMO_MODE` | Until a database is linked | `1` forces the in-memory seed, even if `DATABASE_URL` is set. |
| `DATABASE_URL` | For persistence | `file:./dev.db` for local SQLite, or a Neon `postgresql://` URL. |

The session cookie is httpOnly, SameSite=Lax, and `Secure` when the request is HTTPS.

## Local SQLite

SQLite is for your machine. Do not use the SQLite file on Vercel — serverless instances do not keep a local file.

```bash
cd leads-dashboard
# in .env:
#   DEMO_MODE=0
#   DATABASE_URL="file:./dev.db"
npm run db:setup
npm run dev
```

`npm run db:setup` creates `prisma/dev.db` and loads the seed. Prisma stores that file next to `prisma/schema.prisma`, so `file:./dev.db` means `leads-dashboard/prisma/dev.db`.

`npm run verify:sqlite` checks approve, deny, and ingest against that file, then re-seeds.

The SQLite schema is `prisma/schema.prisma` (`provider = "sqlite"`). The Postgres schema is `prisma/schema.postgres.prisma`. The app generates both clients. You do not edit the provider by hand.

## Vercel and Neon

Create a **second** Vercel project from this same GitHub repo.

1. Root Directory: `leads-dashboard`
2. Framework: Next.js
3. Build command: `npm run build` (the default)
4. Install command: `npm install` (the default). `postinstall` generates the Prisma clients.

### Show the UI before Neon is connected

Set:

```
DASHBOARD_PASSWORD=...
SESSION_SECRET=...
INGEST_API_KEY=...
DEMO_MODE=1
```

Leave `DATABASE_URL` empty. Deploy. Sign in. The banner says demo mode.

Demo limits:

- Data lives in the memory of one server process.
- Approve, deny, and ingest look like they worked, then disappear on the next cold start.
- Two Vercel instances do not see each other's changes.
- Turn demo mode off once Neon is connected. Do not leave `DEMO_MODE=1` in production if you need the support agent to trust the queue.

### Persist with Neon (free tier)

1. Create a project at [neon.tech](https://neon.tech). The free tier is enough for this dashboard.
2. Copy the **pooled** connection string (the host contains `-pooler`).
3. Append `sslmode=require`. If Prisma reports prepared-statement errors, also append `pgbouncer=true`.
4. In the Vercel project, set `DEMO_MODE=0` and:

```
DATABASE_URL=postgresql://USER:PASSWORD@ep-example-pooler.region.aws.neon.tech/neondb?sslmode=require
```

5. From your machine, with that same URL exported, create the tables and seed once:

```bash
cd leads-dashboard
export DATABASE_URL="postgresql://..."
npm run db:setup:postgres
```

6. Redeploy. The header pill should say Postgres, and the demo banner should be gone.

`db:setup:postgres` runs `prisma db push` against `prisma/schema.postgres.prisma`, then the seed. Re-running the seed updates rows that share an `externalId` (the sample companies). It does not delete leads you added later.

A direct (non-pooled) Neon URL also works for `db:setup:postgres`. Prefer the pooled URL as `DATABASE_URL` on Vercel. For a quiet internal tool you can use the direct URL with `&connection_limit=1` instead of the pooler.

Prisma Accelerate is optional. This app talks to Neon with the normal `postgresql://` URL and does not need an Accelerate `prisma://` URL.

## How the support agent calls `/api/ingest`

`POST /api/ingest` with header `x-api-key: $INGEST_API_KEY` and `Content-Type: application/json`.

One record:

```bash
curl -s -X POST "$ORIGIN/api/ingest" \
  -H "content-type: application/json" \
  -H "x-api-key: $INGEST_API_KEY" \
  -d '{
    "type": "lead",
    "company": "Red Dirt Hauling",
    "email": "dispatch@reddirthauling.com",
    "city": "Amarillo",
    "state": "TX",
    "fleetSize": 3,
    "status": "new",
    "notes": "Reefer, three trucks."
  }'
```

`type` may be `lead`, `reply`, or `ticket`. You can also send a batch:

```bash
curl -s -X POST "$ORIGIN/api/ingest" \
  -H "content-type: application/json" \
  -H "x-api-key: $INGEST_API_KEY" \
  -d '{
    "leads": [
      {
        "externalId": "lead_red_dirt",
        "company": "Red Dirt Hauling",
        "email": "dispatch@reddirthauling.com",
        "city": "Amarillo",
        "state": "TX",
        "fleetSize": 3
      }
    ],
    "replies": [
      {
        "externalId": "reply_red_dirt",
        "fromEmail": "dispatch@reddirthauling.com",
        "subject": "Three reefers",
        "inboundBody": "Does the $19.99 plan cover three trucks?",
        "draftBody": "Yes. Three trucks is Small Fleet at $19.99 a month."
      }
    ],
    "tickets": [
      {
        "externalId": "ticket_red_dirt",
        "subject": "Cannot upload a scale ticket",
        "fromEmail": "dispatch@reddirthauling.com",
        "body": "Photo upload fails on iPhone.",
        "status": "open",
        "priority": "high"
      }
    ]
  }'
```

Behavior:

- Leads match an existing row by `externalId`, otherwise by email. Email is stored lowercase. A match updates; otherwise a row is created.
- A new reply whose sender matches a lead email links to that lead. If the lead was `new` or `contacted`, the status becomes `replied`. `qualified` and `closed` are left alone.
- The same `externalId` on a later push updates that reply or ticket. Send `"status": "sent"` when the approved draft actually goes out.
- New replies default to `pending`. New tickets default to `open` / `normal`.
- At most 100 records per array. Fleet size is an integer from 1 to 500.
- A wrong or missing key returns 401. If `INGEST_API_KEY` is unset, the route returns 503.
- Success looks like `{ "ok": true, "leads": { "created": 1, "updated": 0 }, "replies": { "created": 1, "updated": 0 }, "tickets": { "created": 0, "updated": 0 } }`.

Approve and deny are **not** part of ingest. Jaime does those in the dashboard while signed in:

- `POST /api/replies/:id/approve` with `{ "note": "optional" }`
- `POST /api/replies/:id/deny` with `{ "note": "optional" }`

Both require the session cookie and a same-site `Origin`. A sent reply returns 409.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dashboard |
| `npm run build` | Generates both Prisma clients, then `next build` |
| `npm run db:setup` | SQLite file + seed |
| `npm run db:setup:postgres` | Neon/Postgres tables + seed |
| `npm run verify` | In-memory approve, deny, and ingest checks |
| `npm run verify:sqlite` | Same checks against `prisma/dev.db` |

## Seed data

The companies, inboxes, and tickets are fictional, for a demo. Plan language in the sample drafts matches the live product: Owner Operator $9.99 (1 truck), Small Fleet $19.99 (up to 5), Fleet Pro $39.99 (up to 15), 7-day trial with a card required and charged only after the trial, IFTA worksheets prepared here and not filed.

Running the seed again updates those sample `externalId`s. It does not remove records the agent added under other ids.
