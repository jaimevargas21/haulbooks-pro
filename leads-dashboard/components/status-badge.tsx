const tones: Record<string, string> = {
  new: "bg-white/10 text-ink",
  contacted: "bg-sky-400/15 text-sky-200",
  replied: "bg-amber-500/20 text-amber-400",
  qualified: "bg-emerald-400/15 text-good",
  closed: "bg-white/5 text-muted",
  pending: "bg-amber-500/20 text-amber-400",
  approved: "bg-emerald-400/15 text-good",
  denied: "bg-rose-400/15 text-bad",
  sent: "bg-sky-400/15 text-sky-200",
  open: "bg-amber-500/20 text-amber-400",
  resolved: "bg-emerald-400/15 text-good",
  low: "bg-white/10 text-muted",
  normal: "bg-white/10 text-ink",
  high: "bg-orange-400/15 text-orange-200",
  urgent: "bg-rose-400/20 text-bad",
};

export function StatusBadge({ value }: { value: string }) {
  const tone = tones[value] ?? "bg-white/10 text-ink";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${tone}`}>
      {value}
    </span>
  );
}
