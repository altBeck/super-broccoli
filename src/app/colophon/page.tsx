import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Colophon",
  description: "Build notes, tools, credits, and site philosophy for Caesar.",
};

export default function ColophonPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Colophon
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          Caesar is a portfolio built to keep changing.
        </h1>
        <div className="mt-10 space-y-6 text-lg leading-8 text-muted">
          <p>
            Built with Next.js App Router, TypeScript, Tailwind CSS, Inter
            Tight, and Geist Mono.
          </p>
          <p>
            The public site is static-first. The private studio architecture is
            scaffolded for later, but real authentication and write workflows
            are intentionally not implemented in v1.
          </p>
          <p>
            The design system uses CSS variables for theme tokens, class-based
            dark mode, and data-driven content models for work, notes, and
            current status.
          </p>
        </div>
      </div>
    </Container>
  );
}
