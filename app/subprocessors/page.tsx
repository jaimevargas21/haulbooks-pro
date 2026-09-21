import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Subprocessors",
  description: "Service providers that process data for HaulBooks Pro.",
};

const rows = [
  ["Supabase", "Database, authentication, and private file storage for company records in the product"],
  ["Cloudflare", "Application hosting, content delivery, and network security for the product"],
  ["Vercel", "Hosting for this marketing website"],
  ["Stripe", "Merchant of Record: checkout, payments, subscription management, invoicing, and tax"],
  ["Google (Gemini)", "Automated reading of uploaded receipt images to suggest vendor, date, amount, and category"],
  ["Resend", "Transactional and newsletter email delivery"],
];

export default function SubprocessorsPage() {
  return (
    <LegalShell title="Subprocessors">
      <p>
        HaulBooks Pro, operated by {site.operator}, uses the service providers below to operate the product
        and this website. Each one processes data only on our instructions and under a written
        data-processing agreement where a processor relationship applies. This marketing site does not store
        the business records you keep in the product.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink">
              <th className="py-2 pr-4 font-semibold">Provider</th>
              <th className="py-2 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([provider, purpose]) => (
              <tr key={provider} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-semibold text-ink">{provider}</td>
                <td className="py-3">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6">
        Where a provider processes data outside the UK or EEA, we rely on appropriate safeguards such as
        Standard Contractual Clauses or an adequacy decision. Questions about this list? Email{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
      <p className="mt-3">
        See also our <Link href="/privacy">Privacy Notice</Link> and <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalShell>
  );
}
