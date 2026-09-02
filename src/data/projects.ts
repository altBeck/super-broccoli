import type { StaticImageData } from "next/image";
import dashHero from "@/images/hero-img/dash-hero.png";
import ledgerHero from "@/images/hero-img/ledger-hero.png";
import puplarMobileHero from "@/images/hero-img/puplar-mobile-hero.png";
// import puplarWebHero from "@/images/hero-img/puplar-web-hero.png";
import sunDialHero from "@/images/hero-img/sun-dial-hero.png";
import dashProjectImage from "@/images/projects/dash/dash-01.png";
import puplarDesktop01 from "@/images/projects/puplar-desktop/puplar-desktop-01.png";
import puplarDesktop02 from "@/images/projects/puplar-desktop/puplar-desktop-02.png";
// import puplarDesktop03 from "@/images/projects/puplar-desktop/puplar-desktop-03.png";
// import puplarDesktop04 from "@/images/projects/puplar-desktop/puplar-desktop-04.png";
import puplarDesktop05 from "@/images/projects/puplar-desktop/puplar-desktop-05.png";
import puplarDesktop06 from "@/images/projects/puplar-desktop/puplar-desktop-06.png";

export type ProjectTagIcon =
  | "product"
  | "design-system"
  | "web"
  | "mobile";

export type ProjectTag = {
  label: string;
  icon: ProjectTagIcon;
};

export type ProjectLink = {
  href: string;
  label: string;
};

export type GalleryItem = StaticImageData | string;

export type Project = {
  title: string;
  slug: string;
  meta: string;
  summary: string;
  tags: ProjectTag[];
  links?: ProjectLink[];
  gallery: GalleryItem[];
};

export const portfolioProjects: Project[] = [
  {
    title: "Puplar",
    slug: "puplar-dashboard",
    meta: "Multi-rail finance dashboard, 2026",
    summary:
      "A desktop financial dashboard for managing payments, accounts, virtual cards, and multi-rail finance operations.",
    tags: [
      { label: "Product", icon: "product" },
      { label: "Design System", icon: "design-system" },
      { label: "Web", icon: "web" },
    ],
    links: [{ href: "https://puplar.com", label: "View live site" }],
    gallery: [
      puplarDesktop01,
      puplarDesktop02,
      // puplarDesktop03,
      // puplarDesktop04,
      puplarDesktop06,
      puplarDesktop05,
      // puplarWebHero,
    ],
  },
  {
    title: "Puplar Mobile",
    slug: "puplar-mobile",
    meta: "Crypto-enabled mobile banking app, 2024",
    summary:
      "A mobile banking and wallet experience for crypto funding, virtual dollar cards, and transaction management.",
    tags: [
      { label: "Product", icon: "product" },
      { label: "Mobile", icon: "mobile" },
    ],
    links: [
      {
        href: "https://apps.apple.com/us/app/usepuplar/id6451193227",
        label: "App Store",
      },
      {
        href: "https://play.google.com/store/apps/details?id=com.a.puplar&pcampaignid=web_share",
        label: "Google Play",
      },
    ],
    gallery: [puplarMobileHero],
  },
  {
    title: "Ledger",
    slug: "ledger",
    meta: "AI observability, B2B SaaS, 2026",
    summary:
      "A dashboard that helps teams understand how AI is used, what it costs, and where it creates value.",
    tags: [
      { label: "Product", icon: "product" },
      { label: "Design System", icon: "design-system" },
      { label: "Web", icon: "web" },
    ],
    links: [{ href: "https://example.com/ledger", label: "View live site" }],
    gallery: [ledgerHero, "/ledger/ledger-edit.gif"],
  },
  {
    title: "Dash",
    slug: "dash",
    meta: "B2B commute, mobility platform, 2025",
    summary:
      "A mobile-first mobility platform combining ride sharing, car rentals, and organisation-based commute services.",
    tags: [
      { label: "Product", icon: "product" },
      { label: "Mobile", icon: "mobile" },
    ],
    links: [{ href: "https://example.com/dash", label: "View live site" }],
    gallery: [dashProjectImage, dashHero],
  },
  {
    title: "sunDial",
    slug: "sundial",
    meta: "Intent-based video compression tool, 2026",
    summary:
      "A desktop app that helps users compress and transcribe long recordings without touching FFmpeg commands.",
    tags: [
      { label: "Product", icon: "product" },
      { label: "Web", icon: "web" },
    ],
    links: [{ href: "https://example.com/sundial", label: "View live site" }],
    gallery: [sunDialHero],
  },
];
