import { siteConfig } from "@/data/site";
import { siteUrl } from "@/lib/seo";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.owner,
  url: siteUrl,
  jobTitle: siteConfig.role,
  description:
    "Product designer focused on complex workflows, fintech, compliance, AI tools, enterprise systems, and build-ready product interfaces.",
  knowsAbout: [
    "Product Design",
    "UX Architecture",
    "Design Systems",
    "Fintech",
    "Compliance",
    "AI Tools",
    "Enterprise Workflows",
    "Frontend Development",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: "Beck Kanno Portfolio",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: siteConfig.owner,
  },
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personJsonLd, websiteJsonLd]).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
