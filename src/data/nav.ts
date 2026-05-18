import { studioEnabled } from "@/lib/studio";

export const publicNav = [
  { label: "Work", href: "/work" },
  { label: "Notes", href: "/notes" },
  { label: "Now", href: "/now" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const navItems = studioEnabled
  ? [...publicNav, { label: "Studio", href: "/studio" }]
  : publicNav;

export const studioNav = [
  { label: "Overview", href: "/studio" },
  { label: "Projects", href: "/studio/projects" },
  { label: "Notes", href: "/studio/notes" },
  { label: "Ideas", href: "/studio/ideas" },
  { label: "Now", href: "/studio/now" },
  { label: "References", href: "/studio/references" },
  { label: "Analytics", href: "/studio/analytics" },
  { label: "Settings", href: "/studio/settings" },
];
