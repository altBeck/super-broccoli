import type { MetadataRoute } from "next";
import { SITE_URL, site } from "@/lib/site";
import { currentChangelogEntry } from "@/data/changelog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: site.lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/changelog`,
      lastModified: currentChangelogEntry.date,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
