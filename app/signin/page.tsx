import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, TrialNote } from "@/components/ui";
import { signInLink } from "@/lib/checkout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the HaulBooks Pro workspace.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  const signIn = signInLink();

  return (
    <div className="mx-auto max-w-xl px-5 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight">Sign in</h1>
      <p className="mt-4 text-muted">
        Sign-in lives here, then continues in the HaulBooks app. IFTA and pricing stay on their own pages.
      </p>
      <div className="mt-6">
        <ButtonLink href={signIn.href}>Continue to the app</ButtonLink>
      </div>
      <p className="mt-6 text-sm text-muted">
        New company? <Link className="text-amber-300 underline" href="/signup">Start free trial</Link>.
      </p>
      <TrialNote className="mt-3" />
      <p className="mt-8 text-xs text-muted">
        Trouble getting in? Email{" "}
        <a className="text-amber-300 underline" href={`mailto:${site.supportEmail}`}>
          {site.supportEmail}
        </a>
        .
      </p>
    </div>
  );
}
