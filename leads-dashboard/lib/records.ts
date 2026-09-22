import type { IngestLead, IngestReply, LeadStatus } from "@/lib/types";

export function cleanEmail(email: string) {
  return email.trim().toLowerCase();
}

export function cleanState(state: string) {
  const trimmed = state.trim();
  return trimmed.length === 2 ? trimmed.toUpperCase() : trimmed;
}

export function newExternalId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function leadFields(input: IngestLead, existing?: { status: LeadStatus; notes: string }) {
  return {
    company: input.company.trim(),
    email: cleanEmail(input.email),
    city: input.city.trim(),
    state: cleanState(input.state),
    fleetSize: input.fleetSize,
    status: input.status ?? existing?.status ?? "new",
    notes: input.notes !== undefined ? input.notes.trim() : (existing?.notes ?? ""),
    lastActivity: input.lastActivity ? new Date(input.lastActivity) : new Date(),
  };
}

export function replyLinkEmail(input: IngestReply) {
  return cleanEmail(input.leadEmail ?? input.fromEmail);
}

export function nextLeadStatus(current: LeadStatus): LeadStatus {
  if (current === "new" || current === "contacted") return "replied";
  return current;
}
