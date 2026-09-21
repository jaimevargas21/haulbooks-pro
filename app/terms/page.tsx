import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for HaulBooks Pro, operated by Liberty Haul Logistics LLC.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service">
      <section>
        <h2>Who you are contracting with</h2>
        <p className="mt-3">
          HaulBooks Pro is operated by <strong>{site.operator}</strong> (&quot;we&quot;, &quot;us&quot;).
          These terms form an agreement between you and {site.operator}. By creating an account or
          continuing to use the service you agree to them. If you sign up on behalf of a company, you
          confirm you have authority to bind it. Otherwise you confirm you are of legal age to contract.
        </p>
      </section>
      <section>
        <h2>The service</h2>
        <p className="mt-3">
          HaulBooks Pro is record-keeping software for trucking businesses: trucks and drivers, receipts
          and receipt scanning, fuel and expense tracking, recurring bills, mileage records, IFTA
          preparation, and tax-ready reports. Plans cover at most {site.maxTrucks} trucks. You are
          responsible for the accuracy and completeness of the information you enter, and for reviewing
          anything produced by the app before relying on it.
        </p>
        <p className="mt-3">
          We grant you a limited, non-exclusive, non-transferable right to use HaulBooks Pro within the
          plan you have selected. We do not guarantee the service will be uninterrupted, error-free, or
          available at all times, and to the fullest extent permitted by law we disclaim implied warranties
          of merchantability and fitness for a particular purpose.
        </p>
      </section>
      <section>
        <h2>Automated receipt scanning</h2>
        <p className="mt-3">
          HaulBooks Pro uses automated processing to read uploaded receipts and suggest a vendor, date,
          amount, category, and deductibility. These suggestions may be inaccurate or incomplete. Review
          every scanned result before saving it or relying on it for filing. You are responsible for having
          the right to upload the documents and images you submit.
        </p>
      </section>
      <section>
        <h2>Not tax or legal advice</h2>
        <p className="mt-3">{site.notAdvice}</p>
      </section>
      <section>
        <h2>IFTA preparation</h2>
        <p className="mt-3">{site.ifta}</p>
      </section>
      <section>
        <h2>Accounts and acceptable use</h2>
        <p className="mt-3">
          Keep your credentials confidential. You are responsible for activity under your account, for the
          members you invite, and for the roles you assign them. Provide accurate account information and
          keep it current.
        </p>
        <p className="mt-3">
          You must not misuse HaulBooks Pro. That includes unlawful use, fraud or spam, infringing
          anyone&apos;s intellectual property, uploading malware, probing or interfering with the security
          of the service, scraping it, reverse engineering it, reselling or redistributing it, or
          circumventing plan limits.
        </p>
      </section>
      <section>
        <h2>Your content</h2>
        <p className="mt-3">
          You keep ownership of the records, images, and documents you upload. You grant us a limited
          licence to host and process them solely to provide the service to you.
        </p>
      </section>
      <section>
        <h2>Our intellectual property</h2>
        <p className="mt-3">
          We retain ownership of HaulBooks Pro and all intellectual property in the software, documentation,
          and branding. Nothing in these terms transfers that ownership to you.
        </p>
      </section>
      <section>
        <h2>Payment, billing, and taxes</h2>
        <p className="mt-3">
          A credit card is required to start the 7-day free trial. You are not charged during the trial.
          When the trial ends, the plan you selected is billed on the monthly or yearly cycle you chose,
          unless you cancel before the charge. {site.stripeMor}
        </p>
        <p className="mt-3">
          Payment, billing, tax, cancellation, and refund mechanics are also governed by Stripe&apos;s
          consumer terms at <a href="https://stripe.com/legal/consumer">stripe.com/legal/consumer</a>. Our{" "}
          <Link href="/refunds">Refund Policy</Link> sets out the {site.refundDays}-day money-back
          guarantee. You can change or cancel your plan at any time. Cancellation takes effect at the end
          of the current billing period.
        </p>
      </section>
      <section>
        <h2>Suspension and termination</h2>
        <p className="mt-3">
          We may suspend or terminate access for material breach of these terms, non-payment, a security or
          fraud risk, or repeated or serious policy violations. When access ends you may export your data
          for a reasonable period before it is deleted.
        </p>
      </section>
      <section>
        <h2>Liability</h2>
        <p className="mt-3">
          To the extent permitted by law, our aggregate liability is capped at the fees you paid in the
          twelve months before the claim, and we are not liable for indirect or consequential loss,
          including lost profits, lost data, or lost goodwill. Nothing excludes liability for fraud, death,
          or personal injury where the law does not allow it. You indemnify us against claims arising from
          your content, your unlawful use of the service, or your breach of these terms.
        </p>
      </section>
      <section>
        <h2>General</h2>
        <p className="mt-3">
          You may not assign these terms without our consent. We may assign them in connection with a
          merger or acquisition. Neither party is liable for delays caused by events beyond its reasonable
          control. These terms are governed by the laws of the jurisdiction in which {site.operator} is
          established, and its courts have exclusive jurisdiction.
        </p>
        <p className="mt-3">
          Questions? Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
      </section>
    </LegalShell>
  );
}
