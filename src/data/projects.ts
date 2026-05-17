import type { StaticImageData } from "next/image";
import dashHero from "@/images/hero-img/dash-hero.png";
import ledgerHero from "@/images/hero-img/ledger-hero.png";
import puplarMobileHero from "@/images/hero-img/puplar-mobile-hero.png";
import puplarWebHero from "@/images/hero-img/puplar-web-hero.png";
import sunDialHero from "@/images/hero-img/sun-dial-hero.png";

export type ProjectVisibility = "public" | "private" | "password" | "draft";

export type CaseStudyStatus = "stub" | "outline" | "draft" | "published";

export type ProjectStatus = "ongoing" | "shipped" | "concept" | "archived";

export type Project = {
  title: string;
  slug: string;
  label: string;
  status: ProjectStatus;
  year: string;
  coverImage: string | StaticImageData;
  coverRatio: "wide" | "dash" | "mobile";
  role: string[];
  domain: string[];
  summary: string;
  featured: boolean;
  visibility: ProjectVisibility;
  caseStudyStatus: CaseStudyStatus;
};

export const projects: Project[] = [
  {
    title: "Ledger",
    slug: "ledger",
    label: "AI observability dashboard",
    status: "ongoing",
    year: "2026",
    coverImage: ledgerHero,
    coverRatio: "wide",
    role: ["Product Design", "UX Architecture", "Frontend"],
    domain: ["AI", "Analytics", "Team Workflows"],
    summary:
      "An observability dashboard for understanding AI usage, behavior, cost, and value across teams.",
    featured: true,
    visibility: "public",
    caseStudyStatus: "stub",
  },
  {
    title: "Dash",
    slug: "dash",
    label: "B2B commute, mobility platform",
    status: "concept",
    year: "2025",
    coverImage: dashHero,
    coverRatio: "dash",
    role: ["Product Design", "UX Architecture"],
    domain: ["Mobility", "B2B", "Consumer Apps"],
    summary:
      "A mobile-first mobility platform combining ride sharing, car rentals, and organisation-based commute services.",
    featured: true,
    visibility: "public",
    caseStudyStatus: "stub",
  },
  {
    title: "sunDial",
    slug: "sundial",
    label: "Intent-based video compression tool",
    status: "shipped",
    year: "2026",
    coverImage: sunDialHero,
    coverRatio: "wide",
    role: ["Product Design", "Frontend", "Product Strategy"],
    domain: ["Desktop Apps", "Video", "Productivity"],
    summary:
      "A desktop app that helps users compress and transcribe long recordings without touching FFmpeg commands.",
    featured: true,
    visibility: "public",
    caseStudyStatus: "stub",
  },
  {
    title: "Puplar",
    slug: "puplar-dashboard",
    label: "Multi-rail finance dashboard",
    status: "shipped",
    year: "2026",
    coverImage: puplarWebHero,
    coverRatio: "wide",
    role: ["Product Design", "Visual Design"],
    domain: ["Fintech", "Payments", "Dashboards"],
    summary:
      "A desktop financial dashboard for managing payments, accounts, virtual cards, and multi-rail finance operations.",
    featured: true,
    visibility: "public",
    caseStudyStatus: "stub",
  },
  {
    title: "Puplar Mobile",
    slug: "puplar-mobile",
    label: "Crypto-enabled mobile banking app",
    status: "shipped",
    year: "2024",
    coverImage: puplarMobileHero,
    coverRatio: "mobile",
    role: ["Product Design", "Mobile UX"],
    domain: ["Fintech", "Crypto", "Mobile Banking"],
    summary:
      "A mobile banking and wallet experience for crypto funding, virtual dollar cards, and transaction management.",
    featured: true,
    visibility: "public",
    caseStudyStatus: "stub",
  },
];

export const publicProjects = projects.filter(
  (project) => project.visibility === "public",
);

export function getPublicProject(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}
