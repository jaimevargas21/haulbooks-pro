import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-amber-400",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-navy-900/80 px-5 py-3 text-sm font-bold text-ink transition hover:border-amber-400/60",
  ghost:
    "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const classNames = `${styles[variant]} ${className}`;
  const external = href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a
        href={href}
        className={classNames}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">{children}</p>
  );
}

export function TrialNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-muted ${className}`}>
      7-day trial · Card required · Cancel before day 8 · Not tax advice
    </p>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}
