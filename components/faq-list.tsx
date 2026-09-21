export function FaqList({
  items,
  id,
  title = "Frequently asked questions",
  intro = "What owner-operators and fleet owners ask before they start the trial.",
}: {
  items: readonly { q: string; a: string }[];
  id?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-muted">{intro}</p>
      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-navy-900/50">
        {items.map((item) => (
          <details key={item.q} className="group px-5 py-1 sm:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold">
              {item.q}
              <span className="text-xl leading-none text-amber-400 transition group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
