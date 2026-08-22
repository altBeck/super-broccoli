/**
 * Central site config — the single source of truth for SEO/AEO.
 *
 * SITE_URL is the "canonical domain": the one authoritative absolute URL for
 * the site. Set NEXT_PUBLIC_SITE_URL in the deploy environment (e.g.
 * https://beckkanno.com) once the domain exists. Everything else — canonical
 * tags, Open Graph URLs, the sitemap, robots — derives from it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const site = {
  name: "Beck Kanno",
  role: "Product Designer",
  title: "Beck Kanno — Product Designer",
  description:
    "Lead Product Designer at Breeze, turning complex products into clear, scalable experiences through strategy, systems and craft.",
  locale: "en_US",
  email: "drkannobeck@gmail.com",
  employer: { name: "Breeze", url: "https://breeze.africa" },
  socials: {
    github: "https://github.com/altBeck",
    linkedin: "https://www.linkedin.com/",
  },
  knowsAbout: [
    "Product Design",
    "Design Systems",
    "Fintech",
    "AI",
    "Operational Software",
    "User Experience",
  ],
} as const;
