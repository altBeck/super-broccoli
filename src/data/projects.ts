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
  longDescription: string;
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
    longDescription:
      "Ledger is an AI observability dashboard for teams trying to understand how AI is being used across products, workflows, and people. It tracks usage, behavior, cost, and value so teams can make better decisions about adoption, governance, and impact.",
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
    longDescription:
      "Dash is a mobile-first mobility platform for ride sharing, car rentals, and B2B commute services. The product separates personal mobility from organisation-managed commute flows, supporting riders, organisation heads, members, and drivers across a coherent mobile experience.",
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
    longDescription:
      "sunDial is a desktop video compression and transcription tool for long recordings, product demos, client feedback sessions, and internal walkthroughs. It uses intent-based presets to turn technical compression decisions into simple user choices.",
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
    longDescription:
      "Puplar Desktop is a redesigned fintech dashboard for managing local currency, crypto-enabled funding, international banking, virtual dollar cards, accounts, and transactions from a clearer financial command center.",
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
    longDescription:
      "Puplar Mobile is a mobile fintech wallet for managing crypto-enabled funding, international banking, virtual dollar cards, balances, and everyday transactions from one app.",
    featured: true,
    visibility: "public",
    caseStudyStatus: "stub",
  },
];

export const publicProjects = projects.filter(
  (project) => project.visibility === "public",
);

export function isIndexableProject(project: Project) {
  return project.visibility === "public";
}

export const indexableProjects = projects.filter(isIndexableProject);

export function getPublicProject(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}

export function getIndexableProject(slug: string) {
  return indexableProjects.find((project) => project.slug === slug);
}
