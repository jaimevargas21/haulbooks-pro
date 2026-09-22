import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="text-center">
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-2 text-2xl font-semibold">That page is not in the dashboard.</h1>
        <Link href="/" className="mt-4 inline-block text-amber-400">
          Back to overview
        </Link>
      </div>
    </main>
  );
}
