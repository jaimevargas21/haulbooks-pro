import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
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
      {signIn.configured ? (
        <>
          <p className="mt-4 text-muted">The HaulBooks Pro workspace opens in the product app.</p>
          <div className="mt-6">
            <ButtonLink href={signIn.href}>Continue to the app</ButtonLink>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 leading-relaxed text-muted">
            The workspace sign-in link is not connected on this deployment yet. Email{" "}
            <a className="text-amber-300 underline" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>{" "}
            from the address on your account and we will help you in.
          </p>
          <div className="mt-6">
            <ButtonLink href={`mailto:${site.supportEmail}?subject=${encodeURIComponent("HaulBooks Pro sign-in help")}`}>
              Email support
            </ButtonLink>
          </div>
        </>
      )}
      <p className="mt-6 text-sm text-muted">
        New here? <Link className="text-amber-300 underline" href="/pricing">Start a 7-day trial</Link>. A
        credit card is required. You are charged only after the trial.
      </p>
      <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-muted">{site.poweredBy}</p>
    </div>
  );
}
