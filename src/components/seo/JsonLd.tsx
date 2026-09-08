import { SITE_URL, site } from "@/lib/site";

/**
 * Structured data (schema.org) so search engines and answer/LLM engines can
 * extract who Beck is, the role, employer, and links. Rendered once in the
 * root layout.
 */
export function JsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const profilePageId = `${SITE_URL}/#profilepage`;
  const bridgeId = `${SITE_URL}/#bridge`;
  const breezeId = `${SITE_URL}/#breeze`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: site.role,
        description: site.description,
        url: SITE_URL,
        email: `mailto:${site.email}`,
        worksFor: { "@id": bridgeId },
        sameAs: [site.socials.github, site.socials.linkedin, site.socials.x],
        knowsAbout: [...site.knowsAbout],
      },
      {
        "@type": "Organization",
        "@id": bridgeId,
        name: site.employer.name,
        url: site.employer.url,
        parentOrganization: { "@id": breezeId },
      },
      {
        "@type": "Organization",
        "@id": breezeId,
        name: site.employer.parentOrganization.name,
        url: site.employer.parentOrganization.url,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: site.title,
        description: site.description,
        dateModified: site.lastModified,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: SITE_URL,
        name: site.title,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        dateModified: site.lastModified,
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // schema graph is static, safe to inline
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
