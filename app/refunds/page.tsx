import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "30-day money-back guarantee and 7-day trial terms for HaulBooks Pro.",
};

export default function RefundsPage() {
  return (
    <LegalShell title="Refund Policy">
      <section>
        <h2>{site.refundDays}-day money-back guarantee</h2>
        <p className="mt-3">
          HaulBooks Pro offers a {site.refundDays}-day money-back guarantee on subscription payments. If
          HaulBooks Pro is not right for your operation, you can request a full refund within{" "}
          {site.refundDays} days of the order date.
        </p>
      </section>
      <section>
        <h2>How to request a refund</h2>
        <p className="mt-3">
          Refunds are processed through Stripe, our payment provider and Merchant of Record. Email us at{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> from the address on your order and
          we will arrange it for you.
        </p>
      </section>
      <section>
        <h2>Free trial</h2>
        <p className="mt-3">
          Every company starts on a 7-day free trial. A credit card is required to start the trial. You are
          not charged during the trial, and you can cancel before it ends without paying anything.
        </p>
      </section>
      <section>
        <h2>Cancelling</h2>
        <p className="mt-3">
          You can cancel a subscription at any time from billing inside the product. Cancellation stops
          future renewals and your access continues to the end of the billing period you already paid for.
          Your records stay viewable after that. There is no cancellation fee.
        </p>
      </section>
    </LegalShell>
  );
}
