import type { Metadata } from "next";
import { SupportForm } from "@/components/support-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact support",
  description: `Contact HaulBooks Pro support at ${site.supportEmail}.`,
};

export default function SupportPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Contact support</h1>
        <p className="mt-4 text-muted">
          Send a note and we&apos;ll get back to you by email. You can also write straight to{" "}
          <a className="text-amber-300 underline" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
          .
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          HaulBooks Pro is operated by {site.operator}. For a payment already made through Stripe, include
          the email on the order so we can match the subscription.
        </p>
      </div>
      <SupportForm />
    </div>
  );
}
