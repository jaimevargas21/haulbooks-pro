import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold">That page is not on the route.</h1>
      <p className="mt-3 text-muted">The link may be old. The books are still on the home page.</p>
      <div className="mt-6">
        <ButtonLink href="/">Back to HaulBooks Pro</ButtonLink>
      </div>
    </div>
  );
}
