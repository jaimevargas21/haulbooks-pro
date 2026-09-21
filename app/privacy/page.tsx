import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How HaulBooks Pro, operated by Liberty Haul Logistics LLC, collects and uses personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Notice">
      <section>
        <h2>Who we are</h2>
        <p className="mt-3">
          HaulBooks Pro is operated by <strong>{site.operator}</strong>. We are the data controller for
          the personal data described here, which means we decide why and how it is processed. Contact us
          at <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
      </section>
      <section>
        <h2>What we collect and why</h2>
        <ul className="mt-3">
          <li>
            <strong>Account data</strong> — name, email address, login credentials, and company details, so
            we can create and secure your account and provide the service (performance of our contract with
            you).
          </li>
          <li>
            <strong>Business records you enter or upload</strong> — trucks, drivers, receipts and receipt
            images, fuel purchases, expenses, recurring bills, mileage records, and documents such as
            registrations or insurance certificates. We process these to provide bookkeeping, scanning, IFTA
            preparation, and reporting (performance of our contract).
          </li>
          <li>
            <strong>Support messages</strong> — what you send when you ask for help, so we can answer
            (legitimate interests). The marketing-site contact form opens your email app. It does not store
            the message on this website.
          </li>
          <li>
            <strong>Usage and device data</strong> — log entries, IP address, device and browser
            identifiers, and error reports, used for security, fraud prevention, and product improvement
            (legitimate interests).
          </li>
          <li>
            <strong>Marketing preferences</strong> — if you opt in to a newsletter we use your email to send
            it, and you can unsubscribe at any time (consent).
          </li>
        </ul>
        <p className="mt-3">
          We also process data where we must to comply with a legal obligation, such as accounting and
          record-keeping duties.
        </p>
      </section>
      <section>
        <h2>Who can see your records</h2>
        <p className="mt-3">
          Records belong to your company. Only members you invite can access them, and each member&apos;s
          role limits what they can see. Drivers see only their own truck and their own uploads. Accountants
          receive read-only access to financial records and exports.
        </p>
      </section>
      <section>
        <h2>Who we share data with</h2>
        <ul className="mt-3">
          <li>
            Service providers and subprocessors — cloud hosting, database and file storage, email delivery,
            error monitoring, and the automated receipt-scanning provider that processes uploaded receipt
            images. See the <Link href="/subprocessors">subprocessor list</Link>.
          </li>
          <li>
            <strong>Stripe</strong>, our Merchant of Record, for the sale of subscriptions, payments,
            subscription management, invoicing, and tax compliance.
          </li>
          <li>Professional advisers and authorities where the law requires disclosure.</li>
        </ul>
        <p className="mt-3">We do not sell your personal data.</p>
      </section>
      <section>
        <h2>Files and images</h2>
        <p className="mt-3">
          Receipt photos and documents are kept in private storage. They are not publicly accessible. The
          product generates short-lived links when an authorized member views a file.
        </p>
      </section>
      <section>
        <h2>Retention</h2>
        <p className="mt-3">
          We retain your records for as long as your account is active so you can meet the multi-year
          retention periods that apply to IFTA and tax records, and afterwards only as long as needed for
          legal, accounting, or dispute-resolution purposes. Data is then deleted or anonymised. You may
          export or delete your data from the product.
        </p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p className="mt-3">
          Depending on where you live, you may ask us to access, correct, delete, restrict, or port your
          personal data, object to processing based on legitimate interests, or withdraw consent for
          marketing. Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and we will
          respond within one month. If you are in the UK or EEA you may also complain to your local
          supervisory authority. Where data is transferred outside the UK/EEA we rely on appropriate
          safeguards such as Standard Contractual Clauses or an adequacy decision.
        </p>
      </section>
      <section>
        <h2>Advertising</h2>
        <p className="mt-3">
          We may run Google Ads campaigns. When an advertising tag is enabled on this marketing site, Google
          may set cookies to measure visits and conversions such as sign-ups and subscriptions. You can opt
          out of personalized advertising in your Google Ads settings. Blocking cookies in your browser
          prevents the tag from measuring your visit. The tag is off unless an ads ID is configured for this
          deployment.
        </p>
      </section>
      <section>
        <h2>Security</h2>
        <p className="mt-3">
          We use appropriate technical and organisational measures, including encryption in transit, access
          controls that isolate each company&apos;s data, private file storage, and role-based permissions.
          No system is perfectly secure, so use a strong, unique password.
        </p>
      </section>
      <section>
        <h2>Cookies</h2>
        <p className="mt-3">
          The product uses essential cookies and similar local storage to keep you signed in and to keep the
          app secure. This marketing site does not require an account. If a Google Ads tag is enabled, the
          advertising cookies described above may also be set.
        </p>
      </section>
      <section>
        <h2>Related policies</h2>
        <p className="mt-3">
          See our <Link href="/terms">Terms of Service</Link>, <Link href="/refunds">Refund Policy</Link>,
          and <Link href="/subprocessors">subprocessors</Link>.
        </p>
      </section>
    </LegalShell>
  );
}
