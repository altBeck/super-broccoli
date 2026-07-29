import type { StaticImageData } from "next/image";
import dashHero from "@/images/hero-img/dash-hero.png";
import ledgerHero from "@/images/hero-img/ledger-hero.png";
import puplarMobileHero from "@/images/hero-img/puplar-mobile-hero.png";
import puplarWebHero from "@/images/hero-img/puplar-web-hero.png";
import sunDialHero from "@/images/hero-img/sun-dial-hero.png";

export type ProjectStatus = "ongoing" | "shipped" | "concept" | "archived";

export type AnimatedProjectMedia = {
  webm: string;
  mp4: string;
  poster: string | StaticImageData;
  label: string;
};

export type Project = {
  title: string;
  slug: string;
  label: string;
  status: ProjectStatus;
  year: string;
  coverImage: string | StaticImageData;
  heroImage?: string | StaticImageData;
  galleryImages?: Partial<Record<number, string | StaticImageData>>;
  galleryVideos?: Partial<Record<number, AnimatedProjectMedia>>;
  domain: string[];
  summary: string;
};

export const portfolioProjects: Project[] = [
  {
    title: "Ledger",
    slug: "ledger",
    label: "AI observability, B2B SaaS",
    status: "ongoing",
    year: "2026",
    coverImage: ledgerHero,
    heroImage: "/ledger/ledger-hero.png",
    galleryVideos: {
      1: {
        webm: "/ledger/ledger-edit.webm",
        mp4: "/ledger/ledger-edit.mp4",
        poster: "/ledger/ledger-hero.png",
        label: "Animated Ledger interface preview",
      },
    },
    domain: ["AI", "Analytics", "Team Workflows"],
    summary:
      "A dashboard that helps teams understand how AI is used, what it costs, and where it creates value.",
  },
  {
    title: "Dash",
    slug: "dash",
    label: "B2B commute, mobility platform",
    status: "concept",
    year: "2025",
    coverImage: dashHero,
    domain: ["Mobility", "B2B", "Consumer Apps"],
    summary:
      "A mobile-first mobility platform combining ride sharing, car rentals, and organisation-based commute services.",
  },
  {
    title: "sunDial",
    slug: "sundial",
    label: "Intent-based video compression tool",
    status: "shipped",
    year: "2026",
    coverImage: sunDialHero,
    domain: ["Desktop Apps", "Video", "Productivity"],
    summary:
      "A desktop app that helps users compress and transcribe long recordings without touching FFmpeg commands.",
  },
  {
    title: "Puplar",
    slug: "puplar-dashboard",
    label: "Multi-rail finance dashboard",
    status: "shipped",
    year: "2026",
    coverImage: puplarWebHero,
    domain: ["Fintech", "Payments", "Dashboards"],
    summary:
      "A desktop financial dashboard for managing payments, accounts, virtual cards, and multi-rail finance operations.",
  },
  {
    title: "Puplar Mobile",
    slug: "puplar-mobile",
    label: "Crypto-enabled mobile banking app",
    status: "shipped",
    year: "2024",
    coverImage: puplarMobileHero,
    domain: ["Fintech", "Crypto", "Mobile Banking"],
    summary:
      "A mobile banking and wallet experience for crypto funding, virtual dollar cards, and transaction management.",
  },
];
