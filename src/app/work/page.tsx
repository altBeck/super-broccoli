import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { publicProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design and design engineering work by Beck Kanno.",
};

export default function WorkPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mb-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Work
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          Case studies and product systems.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Public projects are shown here by default. Draft, private, and future
          password-protected work stay out of the public grid until they are
          ready.
        </p>
      </div>
      <ProjectGrid projects={publicProjects} />
    </Container>
  );
}
