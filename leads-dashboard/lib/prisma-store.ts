import type { PrismaClient } from "../generated/sqlite";
import { IngestConflictError, type IngestPayload, type IngestResult, type Lead, type LeadStatus, type Reply, type ReplyStatus, type ReviewResult, type Store, type StoreKind, type Ticket, type TicketPriority, type TicketStatus } from "@/lib/types";
import { cleanEmail, leadFields, newExternalId, nextLeadStatus, replyLinkEmail } from "@/lib/records";

type Db = PrismaClient;

function asLeadStatus(value: string): LeadStatus {
  if (value === "new" || value === "contacted" || value === "replied" || value === "qualified" || value === "closed") return value;
  throw new Error(`Unexpected lead status "${value}" in the database.`);
}

function asReplyStatus(value: string): ReplyStatus {
  if (value === "pending" || value === "approved" || value === "denied" || value === "sent") return value;
  throw new Error(`Unexpected reply status "${value}" in the database.`);
}

function asTicketStatus(value: string): TicketStatus {
  if (value === "open" || value === "pending" || value === "resolved") return value;
  throw new Error(`Unexpected ticket status "${value}" in the database.`);
}

function asPriority(value: string): TicketPriority {
  if (value === "low" || value === "normal" || value === "high" || value === "urgent") return value;
  throw new Error(`Unexpected ticket priority "${value}" in the database.`);
}

function mapLead(row: {
  id: string;
  company: string;
  email: string;
  city: string;
  state: string;
  fleetSize: number;
  status: string;
  notes: string;
  lastActivity: Date;
  createdAt: Date;
}): Lead {
  return {
    id: row.id,
    company: row.company,
    email: row.email,
    city: row.city,
    state: row.state,
    fleetSize: row.fleetSize,
    status: asLeadStatus(row.status),
    notes: row.notes,
    lastActivity: row.lastActivity.toISOString(),
    createdAt: row.createdAt.toISOString(),
  };
}

function mapReply(row: {
  id: string;
  leadId: string | null;
  fromEmail: string;
  subject: string;
  inboundBody: string;
  draftBody: string;
  status: string;
  reviewerNote: string;
  createdAt: Date;
  lead: { company: string } | null;
}): Reply {
  return {
    id: row.id,
    leadId: row.leadId,
    company: row.lead?.company ?? null,
    fromEmail: row.fromEmail,
    subject: row.subject,
    inboundBody: row.inboundBody,
    draftBody: row.draftBody,
    status: asReplyStatus(row.status),
    reviewerNote: row.reviewerNote,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapTicket(row: {
  id: string;
  subject: string;
  fromEmail: string;
  body: string;
  status: string;
  priority: string;
  createdAt: Date;
}): Ticket {
  return {
    id: row.id,
    subject: row.subject,
    fromEmail: row.fromEmail,
    body: row.body,
    status: asTicketStatus(row.status),
    priority: asPriority(row.priority),
    createdAt: row.createdAt.toISOString(),
  };
}

function isUniqueConflict(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002";
}

const replyInclude = { lead: { select: { company: true } } } as const;

export function createPrismaStore(db: Db, kind: Exclude<StoreKind, "demo">): Store {
  return {
    kind,
    async overview() {
      const [leads, replied, pendingApprovals, openTickets] = await Promise.all([
        db.lead.count(),
        db.lead.count({ where: { status: "replied" } }),
        db.reply.count({ where: { status: "pending" } }),
        db.ticket.count({ where: { status: "open" } }),
      ]);
      return { leads, replied, pendingApprovals, openTickets };
    },
    async listLeads() {
      const rows = await db.lead.findMany({ orderBy: { lastActivity: "desc" } });
      return rows.map(mapLead);
    },
    async listReplies() {
      const rows = await db.reply.findMany({ include: replyInclude, orderBy: { createdAt: "desc" } });
      const rank: Record<ReplyStatus, number> = { pending: 0, approved: 1, denied: 2, sent: 3 };
      return rows
        .map(mapReply)
        .sort((a, b) => rank[a.status] - rank[b.status] || (a.createdAt < b.createdAt ? 1 : -1));
    },
    async listTickets() {
      const rows = await db.ticket.findMany({ orderBy: { createdAt: "desc" } });
      const statusRank: Record<TicketStatus, number> = { open: 0, pending: 1, resolved: 2 };
      const priorityRank: Record<TicketPriority, number> = { urgent: 0, high: 1, normal: 2, low: 3 };
      return rows
        .map(mapTicket)
        .sort((a, b) => statusRank[a.status] - statusRank[b.status] || priorityRank[a.priority] - priorityRank[b.priority] || (a.createdAt < b.createdAt ? 1 : -1));
    },
    async reviewReply(id, decision, note): Promise<ReviewResult> {
      const existing = await db.reply.findUnique({ where: { id }, include: replyInclude });
      if (!existing) return { ok: false, error: "not_found" };
      if (existing.status === "sent") return { ok: false, error: "already_sent" };
      const updated = await db.reply.update({
        where: { id },
        data: {
          status: decision,
          reviewerNote: note ?? existing.reviewerNote,
        },
        include: replyInclude,
      });
      return { ok: true, reply: mapReply(updated) };
    },
    async ingest(input: IngestPayload): Promise<IngestResult> {
      const result: IngestResult = {
        leads: { created: 0, updated: 0 },
        replies: { created: 0, updated: 0 },
        tickets: { created: 0, updated: 0 },
      };

      try {
        for (const inputLead of input.leads ?? []) {
          const email = cleanEmail(inputLead.email);
          const byExternal = inputLead.externalId ? await db.lead.findUnique({ where: { externalId: inputLead.externalId } }) : null;
          const byEmail = await db.lead.findUnique({ where: { email } });
          if (byExternal && byEmail && byExternal.id !== byEmail.id) {
            throw new IngestConflictError(`Email ${email} already belongs to another lead.`);
          }
          const existing = byExternal ?? byEmail;
          const fields = leadFields(inputLead, existing ? { status: asLeadStatus(existing.status), notes: existing.notes } : undefined);
          if (existing) {
            await db.lead.update({
              where: { id: existing.id },
              data: {
                company: fields.company,
                email: fields.email,
                city: fields.city,
                state: fields.state,
                fleetSize: fields.fleetSize,
                status: fields.status,
                notes: fields.notes,
                lastActivity: fields.lastActivity,
                ...(inputLead.externalId ? { externalId: inputLead.externalId } : {}),
              },
            });
            result.leads.updated += 1;
          } else {
            await db.lead.create({
              data: {
                externalId: inputLead.externalId ?? newExternalId("lead"),
                company: fields.company,
                email: fields.email,
                city: fields.city,
                state: fields.state,
                fleetSize: fields.fleetSize,
                status: fields.status,
                notes: fields.notes,
                lastActivity: fields.lastActivity,
              },
            });
            result.leads.created += 1;
          }
        }

        for (const inputReply of input.replies ?? []) {
          const existing = inputReply.externalId ? await db.reply.findUnique({ where: { externalId: inputReply.externalId } }) : null;
          const lead = await db.lead.findUnique({ where: { email: replyLinkEmail(inputReply) } });
          if (lead) {
            await db.lead.update({
              where: { id: lead.id },
              data: {
                status: nextLeadStatus(asLeadStatus(lead.status)),
                lastActivity: new Date(),
              },
            });
          }
          const data = {
            leadId: lead?.id ?? existing?.leadId ?? null,
            fromEmail: cleanEmail(inputReply.fromEmail),
            subject: inputReply.subject.trim(),
            inboundBody: inputReply.inboundBody.trim(),
            draftBody: inputReply.draftBody.trim(),
            status: inputReply.status ?? existing?.status ?? "pending",
          };
          if (existing) {
            await db.reply.update({ where: { id: existing.id }, data });
            result.replies.updated += 1;
          } else {
            await db.reply.create({
              data: {
                ...data,
                externalId: inputReply.externalId,
                reviewerNote: "",
              },
            });
            result.replies.created += 1;
          }
        }

        for (const inputTicket of input.tickets ?? []) {
          const existing = inputTicket.externalId ? await db.ticket.findUnique({ where: { externalId: inputTicket.externalId } }) : null;
          if (existing) {
            await db.ticket.update({
              where: { id: existing.id },
              data: {
                subject: inputTicket.subject.trim(),
                fromEmail: cleanEmail(inputTicket.fromEmail),
                body: inputTicket.body !== undefined ? inputTicket.body.trim() : existing.body,
                status: inputTicket.status ?? existing.status,
                priority: inputTicket.priority ?? existing.priority,
              },
            });
            result.tickets.updated += 1;
          } else {
            await db.ticket.create({
              data: {
                externalId: inputTicket.externalId,
                subject: inputTicket.subject.trim(),
                fromEmail: cleanEmail(inputTicket.fromEmail),
                body: inputTicket.body?.trim() ?? "",
                status: inputTicket.status ?? "open",
                priority: inputTicket.priority ?? "normal",
              },
            });
            result.tickets.created += 1;
          }
        }
      } catch (error) {
        if (error instanceof IngestConflictError) throw error;
        if (isUniqueConflict(error)) {
          throw new IngestConflictError("That email or external id is already used by another record.");
        }
        throw error;
      }

      return result;
    },
  };
}
