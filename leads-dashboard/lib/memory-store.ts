import { activityDate, seedLeads, seedReplies, seedTickets } from "@/lib/seed-data";
import { IngestConflictError, type IngestPayload, type IngestResult, type Lead, type LeadStatus, type Reply, type ReplyStatus, type ReviewResult, type Store, type Ticket, type TicketPriority, type TicketStatus } from "@/lib/types";
import { cleanEmail, leadFields, newExternalId, nextLeadStatus, replyLinkEmail } from "@/lib/records";

type LeadRow = Lead & { externalId: string };
type ReplyRow = Reply & { externalId: string | null };
type TicketRow = Ticket & { externalId: string | null };

type MemoryData = {
  leads: LeadRow[];
  replies: ReplyRow[];
  tickets: TicketRow[];
};

function leadView(row: LeadRow): Lead {
  return {
    id: row.id,
    company: row.company,
    email: row.email,
    city: row.city,
    state: row.state,
    fleetSize: row.fleetSize,
    status: row.status,
    notes: row.notes,
    lastActivity: row.lastActivity,
    createdAt: row.createdAt,
  };
}

function replyView(row: ReplyRow): Reply {
  return {
    id: row.id,
    leadId: row.leadId,
    company: row.company,
    fromEmail: row.fromEmail,
    subject: row.subject,
    inboundBody: row.inboundBody,
    draftBody: row.draftBody,
    status: row.status,
    reviewerNote: row.reviewerNote,
    createdAt: row.createdAt,
  };
}

function ticketView(row: TicketRow): Ticket {
  return {
    id: row.id,
    subject: row.subject,
    fromEmail: row.fromEmail,
    body: row.body,
    status: row.status,
    priority: row.priority,
    createdAt: row.createdAt,
  };
}

function seedMemory(): MemoryData {
  const leads: LeadRow[] = seedLeads.map((lead) => {
    const at = activityDate(lead.daysAgo).toISOString();
    return {
      id: lead.externalId,
      externalId: lead.externalId,
      company: lead.company,
      email: lead.email,
      city: lead.city,
      state: lead.state,
      fleetSize: lead.fleetSize,
      status: lead.status,
      notes: lead.notes,
      lastActivity: at,
      createdAt: at,
    };
  });

  const replies: ReplyRow[] = seedReplies.map((reply) => {
    const lead = leads.find((item) => item.externalId === reply.leadExternalId);
    const at = activityDate(reply.daysAgo).toISOString();
    return {
      id: reply.externalId,
      externalId: reply.externalId,
      leadId: lead?.id ?? null,
      company: lead?.company ?? null,
      fromEmail: reply.fromEmail,
      subject: reply.subject,
      inboundBody: reply.inboundBody,
      draftBody: reply.draftBody,
      status: reply.status,
      reviewerNote: reply.reviewerNote,
      createdAt: at,
    };
  });

  const tickets: TicketRow[] = seedTickets.map((ticket) => {
    const at = activityDate(ticket.daysAgo).toISOString();
    return {
      id: ticket.externalId,
      externalId: ticket.externalId,
      subject: ticket.subject,
      fromEmail: ticket.fromEmail,
      body: ticket.body,
      status: ticket.status,
      priority: ticket.priority,
      createdAt: at,
    };
  });

  return { leads, replies, tickets };
}

function companyFor(data: MemoryData, leadId: string | null) {
  if (!leadId) return null;
  return data.leads.find((lead) => lead.id === leadId)?.company ?? null;
}

export function createMemoryStore(): Store {
  const data = seedMemory();

  return {
    kind: "demo",
    async overview() {
      return {
        leads: data.leads.length,
        replied: data.leads.filter((lead) => lead.status === "replied").length,
        pendingApprovals: data.replies.filter((reply) => reply.status === "pending").length,
        openTickets: data.tickets.filter((ticket) => ticket.status === "open").length,
      };
    },
    async listLeads() {
      return data.leads
        .slice()
        .sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1))
        .map(leadView);
    },
    async listReplies() {
      const rank: Record<ReplyStatus, number> = { pending: 0, approved: 1, denied: 2, sent: 3 };
      return data.replies
        .slice()
        .sort((a, b) => rank[a.status] - rank[b.status] || (a.createdAt < b.createdAt ? 1 : -1))
        .map(replyView);
    },
    async listTickets() {
      const statusRank: Record<TicketStatus, number> = { open: 0, pending: 1, resolved: 2 };
      const priorityRank: Record<TicketPriority, number> = { urgent: 0, high: 1, normal: 2, low: 3 };
      return data.tickets
        .slice()
        .sort((a, b) => statusRank[a.status] - statusRank[b.status] || priorityRank[a.priority] - priorityRank[b.priority] || (a.createdAt < b.createdAt ? 1 : -1))
        .map(ticketView);
    },
    async reviewReply(id, decision, note): Promise<ReviewResult> {
      const reply = data.replies.find((item) => item.id === id);
      if (!reply) return { ok: false, error: "not_found" };
      if (reply.status === "sent") return { ok: false, error: "already_sent" };
      reply.status = decision;
      if (note) reply.reviewerNote = note;
      reply.company = companyFor(data, reply.leadId);
      return { ok: true, reply: replyView(reply) };
    },
    async ingest(input: IngestPayload): Promise<IngestResult> {
      const result: IngestResult = {
        leads: { created: 0, updated: 0 },
        replies: { created: 0, updated: 0 },
        tickets: { created: 0, updated: 0 },
      };

      for (const inputLead of input.leads ?? []) {
        const email = cleanEmail(inputLead.email);
        const byExternal = inputLead.externalId ? data.leads.find((lead) => lead.externalId === inputLead.externalId) : undefined;
        const byEmail = data.leads.find((lead) => lead.email === email);
        if (byExternal && byEmail && byExternal.id !== byEmail.id) {
          throw new IngestConflictError(`Email ${email} already belongs to another lead.`);
        }
        const existing = byExternal ?? byEmail;
        const fields = leadFields(inputLead, existing);
        if (existing) {
          const emailTaken = data.leads.some((lead) => lead.email === fields.email && lead.id !== existing.id);
          if (emailTaken) throw new IngestConflictError(`Email ${fields.email} already belongs to another lead.`);
          existing.company = fields.company;
          existing.email = fields.email;
          existing.city = fields.city;
          existing.state = fields.state;
          existing.fleetSize = fields.fleetSize;
          existing.status = fields.status;
          existing.notes = fields.notes;
          existing.lastActivity = fields.lastActivity.toISOString();
          result.leads.updated += 1;
        } else {
          const now = new Date().toISOString();
          data.leads.push({
            id: crypto.randomUUID(),
            externalId: inputLead.externalId ?? newExternalId("lead"),
            company: fields.company,
            email: fields.email,
            city: fields.city,
            state: fields.state,
            fleetSize: fields.fleetSize,
            status: fields.status as LeadStatus,
            notes: fields.notes,
            lastActivity: fields.lastActivity.toISOString(),
            createdAt: now,
          });
          result.leads.created += 1;
        }
      }

      for (const inputReply of input.replies ?? []) {
        const existing = inputReply.externalId ? data.replies.find((reply) => reply.externalId === inputReply.externalId) : undefined;
        const lead = data.leads.find((item) => item.email === replyLinkEmail(inputReply));
        if (lead) {
          lead.status = nextLeadStatus(lead.status);
          lead.lastActivity = new Date().toISOString();
        }
        if (existing) {
          existing.leadId = lead?.id ?? existing.leadId;
          existing.company = companyFor(data, existing.leadId);
          existing.fromEmail = cleanEmail(inputReply.fromEmail);
          existing.subject = inputReply.subject.trim();
          existing.inboundBody = inputReply.inboundBody.trim();
          existing.draftBody = inputReply.draftBody.trim();
          existing.status = inputReply.status ?? existing.status;
          result.replies.updated += 1;
        } else {
          const leadId = lead?.id ?? null;
          data.replies.push({
            id: crypto.randomUUID(),
            externalId: inputReply.externalId ?? null,
            leadId,
            company: companyFor(data, leadId),
            fromEmail: cleanEmail(inputReply.fromEmail),
            subject: inputReply.subject.trim(),
            inboundBody: inputReply.inboundBody.trim(),
            draftBody: inputReply.draftBody.trim(),
            status: inputReply.status ?? "pending",
            reviewerNote: "",
            createdAt: new Date().toISOString(),
          });
          result.replies.created += 1;
        }
      }

      for (const inputTicket of input.tickets ?? []) {
        const existing = inputTicket.externalId ? data.tickets.find((ticket) => ticket.externalId === inputTicket.externalId) : undefined;
        if (existing) {
          existing.subject = inputTicket.subject.trim();
          existing.fromEmail = cleanEmail(inputTicket.fromEmail);
          if (inputTicket.body !== undefined) existing.body = inputTicket.body.trim();
          existing.status = inputTicket.status ?? existing.status;
          existing.priority = inputTicket.priority ?? existing.priority;
          result.tickets.updated += 1;
        } else {
          data.tickets.push({
            id: crypto.randomUUID(),
            externalId: inputTicket.externalId ?? null,
            subject: inputTicket.subject.trim(),
            fromEmail: cleanEmail(inputTicket.fromEmail),
            body: inputTicket.body?.trim() ?? "",
            status: inputTicket.status ?? "open",
            priority: inputTicket.priority ?? "normal",
            createdAt: new Date().toISOString(),
          });
          result.tickets.created += 1;
        }
      }

      return result;
    },
  };
}

const globalStore = globalThis as unknown as { __haulbooksMemory?: { version: number; store: Store } };
const MEMORY_VERSION = 1;

export function sharedMemoryStore(): Store {
  if (!globalStore.__haulbooksMemory || globalStore.__haulbooksMemory.version !== MEMORY_VERSION) {
    globalStore.__haulbooksMemory = { version: MEMORY_VERSION, store: createMemoryStore() };
  }
  return globalStore.__haulbooksMemory.store;
}
