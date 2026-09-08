import type { MetadataRoute } from "next";
import { SITE_URL, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: site.lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
