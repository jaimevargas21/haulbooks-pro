import { PrismaClient as PostgresClient } from "../generated/postgres";
import { PrismaClient as SqliteClient } from "../generated/sqlite";
import { activityDate, seedLeads, seedReplies, seedTickets } from "../lib/seed-data";

type Writer = SqliteClient;

export async function seedDatabase(db: Writer) {
  for (const lead of seedLeads) {
    const at = activityDate(lead.daysAgo);
    const data = {
      company: lead.company,
      email: lead.email,
      city: lead.city,
      state: lead.state,
      fleetSize: lead.fleetSize,
      status: lead.status,
      notes: lead.notes,
      lastActivity: at,
    };
    await db.lead.upsert({
      where: { externalId: lead.externalId },
      create: { externalId: lead.externalId, ...data, createdAt: at },
      update: data,
    });
  }

  for (const reply of seedReplies) {
    const lead = await db.lead.findUnique({ where: { externalId: reply.leadExternalId } });
    const at = activityDate(reply.daysAgo);
    const data = {
      leadId: lead?.id ?? null,
      fromEmail: reply.fromEmail,
      subject: reply.subject,
      inboundBody: reply.inboundBody,
      draftBody: reply.draftBody,
      status: reply.status,
      reviewerNote: reply.reviewerNote,
    };
    await db.reply.upsert({
      where: { externalId: reply.externalId },
      create: { externalId: reply.externalId, ...data, createdAt: at },
      update: data,
    });
  }

  for (const ticket of seedTickets) {
    const at = activityDate(ticket.daysAgo);
    const data = {
      subject: ticket.subject,
      fromEmail: ticket.fromEmail,
      body: ticket.body,
      status: ticket.status,
      priority: ticket.priority,
    };
    await db.ticket.upsert({
      where: { externalId: ticket.externalId },
      create: { externalId: ticket.externalId, ...data, createdAt: at },
      update: data,
    });
  }
}

async function main() {
  const target =
    process.env.PRISMA_SEED_TARGET ??
    (process.env.DATABASE_URL?.startsWith("postgres") ? "postgres" : "sqlite");

  if (target === "postgres") {
    const db = new PostgresClient();
    try {
      await seedDatabase(db as unknown as Writer);
      const [leads, replies, tickets] = await Promise.all([db.lead.count(), db.reply.count(), db.ticket.count()]);
      console.log(`Seeded Postgres: ${leads} leads, ${replies} replies, ${tickets} tickets.`);
    } finally {
      await db.$disconnect();
    }
    return;
  }

  const db = new SqliteClient();
  try {
    await seedDatabase(db);
    const [leads, replies, tickets] = await Promise.all([db.lead.count(), db.reply.count(), db.ticket.count()]);
    console.log(`Seeded SQLite: ${leads} leads, ${replies} replies, ${tickets} tickets.`);
  } finally {
    await db.$disconnect();
  }
}

const entry = process.argv[1]?.replaceAll("\\", "/");
if (entry?.endsWith("/prisma/seed.ts") || entry?.endsWith("/prisma/seed.js")) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
