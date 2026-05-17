import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments and playground space inside Caesar.",
};

export default function LabPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Lab
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          Experiments will live here.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          This placeholder keeps Caesar ready for small tools, prototypes, and
          design engineering experiments without turning v1 into a playground
          build.
        </p>
      </div>
    </Container>
  );
}
