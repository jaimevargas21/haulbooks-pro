import Link from "next/link";
import { Nav } from "@/components/nav";
import type { StoreKind } from "@/lib/types";

const modeLabel: Record<StoreKind, string> = {
  demo: "Demo",
  sqlite: "SQLite",
  postgres: "Postgres",
};

export function Shell({ mode, children }: { mode: StoreKind; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-navy-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-sm font-semibold text-navy-900">HB</span>
              <span>
                <span className="block text-sm font-semibold tracking-wide">HaulBooks Pro</span>
                <span className="block text-xs text-muted">Leads & support</span>
              </span>
            </Link>
            <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted md:hidden">{modeLabel[mode]}</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:gap-6">
            <Nav />
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full border border-line px-2.5 py-1 text-xs text-muted md:inline">{modeLabel[mode]}</span>
              <span className="text-sm text-muted">Jaime Vargas</span>
              <form action="/api/auth/logout" method="post">
                <button type="submit" className="rounded-full border border-line px-3 py-1.5 text-sm text-ink hover:border-amber-500">
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>
      {mode === "demo" ? (
        <div className="border-b border-amber-500/30 bg-amber-500/10">
          <p className="mx-auto max-w-6xl px-4 py-2 text-sm text-amber-400">
            Demo mode. These records are seeded in memory and reset when this server process restarts. They are not shared across Vercel instances. Connect Neon and set DEMO_MODE=0 to keep them.
          </p>
        </div>
      ) : null}
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">{children}</main>
    </div>
  );
}
