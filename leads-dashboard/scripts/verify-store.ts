import { parseIngest } from "../lib/ingest";
import { createMemoryStore } from "../lib/memory-store";
import { seedLeads, seedReplies, seedTickets } from "../lib/seed-data";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function main() {
  const store = createMemoryStore();
  const overview = await store.overview();
  assert(overview.leads === seedLeads.length, `expected ${seedLeads.length} leads, got ${overview.leads}`);
  assert(
    overview.replied === seedLeads.filter((lead) => lead.status === "replied").length,
    "replied count mismatch",
  );
  assert(
    overview.pendingApprovals === seedReplies.filter((reply) => reply.status === "pending").length,
    "pending count mismatch",
  );
  assert(
    overview.openTickets === seedTickets.filter((ticket) => ticket.status === "open").length,
    "open ticket count mismatch",
  );
  assert(overview.leads >= 25, "need at least 25 leads");

  const approved = await store.reviewReply("reply_prairie", "approved", "Send the Small Fleet link.");
  assert(approved.ok && approved.reply.status === "approved", "approve should stick");
  assert(approved.ok && approved.reply.reviewerNote === "Send the Small Fleet link.", "note should save");

  const denied = await store.reviewReply("reply_gulf", "denied", "Ask for the accountant's email first.");
  assert(denied.ok && denied.reply.status === "denied", "deny should stick");

  const sent = await store.reviewReply("reply_heartland", "approved", "too late");
  assert(!sent.ok && sent.error === "already_sent", "sent drafts stay sent");

  const missing = await store.reviewReply("reply_missing", "denied");
  assert(!missing.ok && missing.error === "not_found", "missing reply");

  const empty = parseIngest({});
  assert(!empty.ok, "empty ingest should fail");

  const single = parseIngest({
    type: "lead",
    company: "Test Haul LLC",
    email: "Dispatch@TestHaul.example",
    city: "Austin",
    state: "tx",
    fleetSize: 2,
  });
  assert(single.ok, "single lead ingest should parse");

  const created = await store.ingest(single.ok ? single.data : {});
  assert(created.leads.created === 1, "lead should be created");
  const leads = await store.listLeads();
  const testLead = leads.find((lead) => lead.email === "dispatch@testhaul.example");
  assert(testLead?.state === "TX", "state should normalize");
  assert(testLead?.status === "new", "new lead status");

  const replied = await store.ingest({
    replies: [
      {
        externalId: "reply_test_haul",
        fromEmail: "dispatch@testhaul.example",
        subject: "Interested",
        inboundBody: "We have two trucks. What does the trial cost after day 7?",
        draftBody: "Small Fleet is $19.99 a month after the 7-day trial.",
      },
    ],
  });
  assert(replied.replies.created === 1, "reply should be created");
  const after = await store.listLeads();
  assert(after.find((lead) => lead.email === "dispatch@testhaul.example")?.status === "replied", "reply marks the lead");

  const marked = await store.ingest({
    replies: [
      {
        externalId: "reply_test_haul",
        fromEmail: "dispatch@testhaul.example",
        subject: "Interested",
        inboundBody: "We have two trucks. What does the trial cost after day 7?",
        draftBody: "Small Fleet is $19.99 a month after the 7-day trial.",
        status: "sent",
      },
    ],
  });
  assert(marked.replies.updated === 1, "reply should update by external id");
  const replies = await store.listReplies();
  assert(replies.find((reply) => reply.subject === "Interested")?.status === "sent", "status should become sent");

  const badKey = parseIngest({ type: "ticket" });
  assert(!badKey.ok, "ticket without fields should fail");

  console.log("verify-store: ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
