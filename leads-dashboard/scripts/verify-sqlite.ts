import { PrismaClient } from "../generated/sqlite";
import { createPrismaStore } from "../lib/prisma-store";
import { seedDatabase } from "../prisma/seed";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function main() {
  const prisma = new PrismaClient();
  const store = createPrismaStore(prisma, "sqlite");
  try {
    await prisma.ticket.deleteMany({ where: { externalId: "ticket_verify_sqlite" } });
    await prisma.lead.deleteMany({ where: { externalId: "lead_verify_sqlite" } });
    await seedDatabase(prisma);
    const overview = await store.overview();
    assert(overview.leads >= 25, "sqlite seed should load the leads");
    assert(overview.pendingApprovals >= 1, "sqlite seed should include a pending draft");

    const pending = (await store.listReplies()).find((reply) => reply.status === "pending");
    assert(pending, "missing pending reply");
    const approved = await store.reviewReply(pending.id, "approved", "sqlite check");
    assert(approved.ok && approved.reply.reviewerNote === "sqlite check", "sqlite approve failed");

    const denied = await store.reviewReply(pending.id, "denied", "sqlite deny");
    assert(denied.ok && denied.reply.status === "denied", "sqlite deny failed");

    const ingested = await store.ingest({
      leads: [
        {
          externalId: "lead_verify_sqlite",
          company: "Verify Haul LLC",
          email: "dispatch@verifyhaul.example",
          city: "Tulsa",
          state: "OK",
          fleetSize: 2,
        },
      ],
      tickets: [
        {
          externalId: "ticket_verify_sqlite",
          subject: "Verify ticket",
          fromEmail: "dispatch@verifyhaul.example",
          priority: "high",
        },
      ],
    });
    assert(ingested.leads.created === 1, "sqlite ingest create failed");
    const again = await store.ingest({
      leads: [
        {
          externalId: "lead_verify_sqlite",
          company: "Verify Haul LLC",
          email: "dispatch@verifyhaul.example",
          city: "Tulsa",
          state: "OK",
          fleetSize: 3,
          status: "contacted",
        },
      ],
    });
    assert(again.leads.updated === 1, "sqlite ingest update failed");

    console.log("verify-sqlite: ok");
  } finally {
    await prisma.ticket.deleteMany({ where: { externalId: "ticket_verify_sqlite" } });
    await prisma.lead.deleteMany({ where: { externalId: "lead_verify_sqlite" } });
    await seedDatabase(prisma);
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
