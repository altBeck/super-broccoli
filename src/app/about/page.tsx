import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About",
  description: "About Beck Kanno and the product design practice behind Caesar.",
};

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            About
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
            Designing clarity into complex systems.
          </h1>
        </div>
        <div className="space-y-6 text-lg leading-8 text-muted">
          <p>
            Beck Kanno is a product designer working across strategy, UX
            architecture, and build-ready interface design.
          </p>
          <p>
            The work is usually closest to fintech, compliance, AI tooling, and
            enterprise workflows: spaces where clarity, trust, and operational
            detail matter.
          </p>
          <p>
            Caesar is the public home for selected work, notes, experiments, and
            the systems used to keep those things alive over time.
          </p>
        </div>
      </div>
    </Container>
  );
}
