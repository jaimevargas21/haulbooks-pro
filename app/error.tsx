"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Something broke on this page.</h1>
      <p className="mt-3 text-muted">Try it again. If it keeps failing, email haulbookspro@gmail.com.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950"
      >
        Try again
      </button>
    </div>
  );
}
