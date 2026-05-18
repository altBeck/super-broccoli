import { Container } from "@/components/layout/Container";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { publicProjects } from "@/data/projects";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Work",
  description:
    "Selected product design work by Beck Kanno across AI observability, mobility, fintech, video productivity, and complex workflow systems.",
  path: "/work",
});

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
          Selected work across AI tools, fintech, mobility, productivity, and
          workflow-heavy systems.
        </p>
      </div>
      <ProjectGrid projects={publicProjects} />
    </Container>
  );
}
