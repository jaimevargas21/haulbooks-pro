import { z } from "zod";
import {
  LEAD_STATUSES,
  REPLY_STATUSES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  type IngestPayload,
} from "@/lib/types";

const leadSchema = z.object({
  externalId: z.string().trim().min(1).max(120).optional(),
  company: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(2).max(40),
  fleetSize: z.number().int().min(1).max(500),
  status: z.enum(LEAD_STATUSES).optional(),
  notes: z.string().trim().max(2000).optional(),
  lastActivity: z.string().datetime({ offset: true }).optional(),
});

const replySchema = z.object({
  externalId: z.string().trim().min(1).max(120).optional(),
  leadEmail: z.string().trim().email().max(200).optional(),
  fromEmail: z.string().trim().email().max(200),
  subject: z.string().trim().min(1).max(300),
  inboundBody: z.string().trim().min(1).max(20000),
  draftBody: z.string().trim().min(1).max(20000),
  status: z.enum(REPLY_STATUSES).optional(),
});

const ticketSchema = z.object({
  externalId: z.string().trim().min(1).max(120).optional(),
  subject: z.string().trim().min(1).max(300),
  fromEmail: z.string().trim().email().max(200),
  body: z.string().trim().max(20000).optional(),
  status: z.enum(TICKET_STATUSES).optional(),
  priority: z.enum(TICKET_PRIORITIES).optional(),
});

const batchSchema = z
  .object({
    leads: z.array(leadSchema).max(100).optional(),
    replies: z.array(replySchema).max(100).optional(),
    tickets: z.array(ticketSchema).max(100).optional(),
  })
  .refine((value) => (value.leads?.length ?? 0) + (value.replies?.length ?? 0) + (value.tickets?.length ?? 0) > 0, {
    message: "Provide at least one lead, reply, or ticket.",
  });

function withoutType(value: Record<string, unknown>) {
  const rest = { ...value };
  delete rest.type;
  return rest;
}

export function parseIngest(input: unknown): { ok: true; data: IngestPayload } | { ok: false; issues: { path: string; message: string }[] } {
  let normalized: unknown = input;
  if (input && typeof input === "object" && !Array.isArray(input)) {
    const record = input as Record<string, unknown>;
    if (record.type === "lead" && !record.leads) normalized = { leads: [withoutType(record)] };
    else if (record.type === "reply" && !record.replies) normalized = { replies: [withoutType(record)] };
    else if (record.type === "ticket" && !record.tickets) normalized = { tickets: [withoutType(record)] };
  }

  const parsed = batchSchema.safeParse(normalized);
  if (!parsed.success) {
    return {
      ok: false,
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }
  return { ok: true, data: parsed.data };
}
