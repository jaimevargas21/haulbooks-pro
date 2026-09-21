import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { logoImage } from "@/lib/brand";
import { site } from "@/lib/site";

const product = [
  { href: "/product", label: "Product" },
  { href: "/ifta", label: "IFTA" },
  { href: "/pricing", label: "Pricing" },
  { href: "/fuel-cards", label: "Fuel cards" },
  { href: "/for-accountants", label: "For accountants" },
  { href: "/blog", label: "Blog" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refunds", label: "Refunds" },
  { href: "/subprocessors", label: "Subprocessors" },
  { href: "/contact", label: "Contact support" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandMark src={logoImage()} height="2rem" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Bookkeeping, receipts, and IFTA prep for owner-operators and small fleets. Software, not
              tax advice. Fleets up to {site.maxTrucks} trucks.
            </p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Product</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Legal</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 space-y-3 border-t border-line pt-8 text-xs leading-relaxed text-muted">
          <p>
            HaulBooks Pro is operated by {site.operator}. Support:{" "}
            <a className="underline decoration-line underline-offset-2 hover:text-ink" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
            .
          </p>
          <p>{site.stripeMor}</p>
          <p>{site.notAdvice}</p>
          <p>
            Advertising disclosure: HaulBooks may earn a commission if you sign up for a fuel card or
            discount program through links on this site, including the fuel-cards page. That commission
            does not change the price you pay.
          </p>
          <p className="font-medium text-ink">{site.poweredBy}</p>
          <p className="pt-2 text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} HaulBooks Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
