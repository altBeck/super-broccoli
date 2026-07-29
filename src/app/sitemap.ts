import type { MetadataRoute } from "next";
import { indexableNotes } from "@/data/notes";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/notes",
    "/now",
    "/lab",
    "/contact",
    "/colophon",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...indexableNotes.map((note) => ({
      url: `${siteUrl}/notes/${note.slug}`,
      lastModified: new Date(note.date),
    })),
  ];
}
