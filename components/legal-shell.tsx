import Link from "next/link";
import type { ReactNode } from "react";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated September 21, 2026</p>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted [&_a]:text-amber-300 [&_a]:underline [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:mt-2 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
