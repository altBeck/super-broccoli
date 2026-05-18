import type { MetadataRoute } from "next";
import { publicNotes } from "@/data/notes";
import { publicProjects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
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
    ...publicProjects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: new Date(),
    })),
    ...publicNotes.map((note) => ({
      url: `${siteUrl}/notes/${note.slug}`,
      lastModified: new Date(note.date),
    })),
  ];
}
