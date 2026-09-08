import { SITE_URL, site } from "@/lib/site";

/**
 * Structured data (schema.org) so search engines and answer/LLM engines can
 * extract who Beck is, the role, employer, and links. Rendered once in the
 * root layout.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: site.name,
        jobTitle: site.role,
        description: site.description,
        url: SITE_URL,
        email: `mailto:${site.email}`,
        worksFor: {
          "@type": "Organization",
          name: site.employer.name,
          url: site.employer.url,
          parentOrganization: {
            "@type": "Organization",
            name: site.employer.parentOrganization.name,
            url: site.employer.parentOrganization.url,
          },
        },
        sameAs: [site.socials.github, site.socials.linkedin],
        knowsAbout: [...site.knowsAbout],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.title,
        description: site.description,
        dateModified: site.lastModified,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: site.title,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
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
