/**
 * Central site config — the single source of truth for SEO/AEO.
 *
 * SITE_URL is the "canonical domain": the one authoritative absolute URL for
 * the site. It's only read server-side (metadata, sitemap, robots, JSON-LD),
 * so it uses a plain server env var — no NEXT_PUBLIC_ prefix needed. Set
 * SITE_URL in the deploy environment (e.g. https://beckkanno.com) once a custom
 * domain exists. Everything (canonical tags, OG URLs, sitemap, robots) derives
 * from it.
 */
function resolveSiteUrl() {
  // 1. explicit override — set this once you have a custom domain
  if (process.env.SITE_URL) return process.env.SITE_URL;
  // 2. Vercel's production domain (auto-injected on Vercel builds)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  // 3. local dev
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, "");

export const site = {
  name: "Beck Kanno",
  role: "Product Designer",
  title: "Beck Kanno — Product Designer",
  description:
    "Lead Product Designer at Bridge, turning complex products into clear, scalable experiences through strategy, systems and craft.",
  locale: "en_US",
  email: "drkannobeck@gmail.com",
  employer: { name: "Bridge", url: "https://bridgenetwork.trade" },
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
