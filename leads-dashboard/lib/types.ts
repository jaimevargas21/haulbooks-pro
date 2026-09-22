export const LEAD_STATUSES = ["new", "contacted", "replied", "qualified", "closed"] as const;
export const REPLY_STATUSES = ["pending", "approved", "denied", "sent"] as const;
export const TICKET_STATUSES = ["open", "pending", "resolved"] as const;
export const TICKET_PRIORITIES = ["low", "normal", "high", "urgent"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type ReplyStatus = (typeof REPLY_STATUSES)[number];
export type TicketStatus = (typeof TICKET_STATUSES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];
export type StoreKind = "demo" | "sqlite" | "postgres";

export type Lead = {
  id: string;
  company: string;
  email: string;
  city: string;
  state: string;
  fleetSize: number;
  status: LeadStatus;
  notes: string;
  lastActivity: string;
  createdAt: string;
};

export type Reply = {
  id: string;
  leadId: string | null;
  company: string | null;
  fromEmail: string;
  subject: string;
  inboundBody: string;
  draftBody: string;
  status: ReplyStatus;
  reviewerNote: string;
  createdAt: string;
};

export type Ticket = {
  id: string;
  subject: string;
  fromEmail: string;
  body: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
};

export type Overview = {
  leads: number;
  replied: number;
  pendingApprovals: number;
  openTickets: number;
};

export type IngestLead = {
  externalId?: string;
  company: string;
  email: string;
  city: string;
  state: string;
  fleetSize: number;
  status?: LeadStatus;
  notes?: string;
  lastActivity?: string;
};

export type IngestReply = {
  externalId?: string;
  leadEmail?: string;
  fromEmail: string;
  subject: string;
  inboundBody: string;
  draftBody: string;
  status?: ReplyStatus;
};

export type IngestTicket = {
  externalId?: string;
  subject: string;
  fromEmail: string;
  body?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
};

export type IngestPayload = {
  leads?: IngestLead[];
  replies?: IngestReply[];
  tickets?: IngestTicket[];
};

export type IngestCounts = { created: number; updated: number };

export type IngestResult = {
  leads: IngestCounts;
  replies: IngestCounts;
  tickets: IngestCounts;
};

export type ReviewResult =
  | { ok: true; reply: Reply }
  | { ok: false; error: "not_found" | "already_sent" };

export type Store = {
  kind: StoreKind;
  overview(): Promise<Overview>;
  listLeads(): Promise<Lead[]>;
  listReplies(): Promise<Reply[]>;
  listTickets(): Promise<Ticket[]>;
  reviewReply(id: string, decision: "approved" | "denied", note?: string): Promise<ReviewResult>;
  ingest(input: IngestPayload): Promise<IngestResult>;
};

export class IngestConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IngestConflictError";
  }
}
