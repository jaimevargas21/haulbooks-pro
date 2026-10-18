import { plans } from "@/lib/plans";
import { site } from "@/lib/site";

export function organizationNode() {
  return {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.supportEmail,
    logo: `${site.url}/images/haulbooks-logo.png`,
    parentOrganization: { "@type": "Organization", name: site.operator },
  };
}

export function softwareNode() {
  return {
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: site.url,
    description: site.description,
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.monthly.toFixed(2),
      priceCurrency: "USD",
      url: `${site.url}/pricing`,
      description: `${plan.tagline} 7-day trial. Credit card required.`,
    })),
  };
}

export function faqNode(items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function schemaGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
