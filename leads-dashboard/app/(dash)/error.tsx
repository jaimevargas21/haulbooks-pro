"use client";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-line bg-navy-800 p-6">
      <h1 className="text-xl font-semibold">Could not load the dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Check DATABASE_URL and that the database is reachable. Demo mode (DEMO_MODE=1) does not need a database.
      </p>
      <button type="button" onClick={reset} className="mt-4 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-navy-900">
        Try again
      </button>
    </div>
  );
}
