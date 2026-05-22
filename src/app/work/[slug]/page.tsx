import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { LedgerCaseStudy } from "@/components/work/LedgerCaseStudy";
import { ProjectArtwork } from "@/components/work/ProjectArtwork";
import { ProjectMeta } from "@/components/work/ProjectMeta";
import { getIndexableProject, indexableProjects } from "@/data/projects";
import { createSeoMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return indexableProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getIndexableProject(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const image =
    typeof project.coverImage === "string"
      ? project.coverImage
      : project.coverImage.src;

  return createSeoMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    openGraphTitle: `${project.title} — ${project.label}`,
    image,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getIndexableProject(slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "ledger") {
    return <LedgerCaseStudy />;
  }

  return (
    <article>
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {project.label}
            </p>
            <h1 className="mt-4 text-6xl font-semibold leading-[0.9] sm:text-8xl">
              {project.title}
            </h1>
          </div>
          <div className="max-w-2xl">
            <p className="text-2xl leading-tight sm:text-3xl">
              {project.summary}
            </p>
            <div className="mt-8">
              <ProjectMeta project={project} />
            </div>
          </div>
        </div>

        <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-lg border border-border">
          <ProjectArtwork project={project} priority />
        </div>

        <section className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Case study status
            </p>
            <p className="mt-3 text-2xl font-semibold">
              {project.caseStudyStatus}
            </p>
          </div>
          <div className="space-y-8">
            {project.caseStudyStatus !== "published" ? (
              <div className="rounded-lg border border-border bg-surface p-6">
                <h2 className="text-3xl font-semibold">
                  This case study is being written.
                </h2>
                <p className="mt-4 leading-8 text-muted">
                  For now, here&apos;s the short version: {project.summary}
                </p>
              </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Role
                </h2>
                <ul className="mt-3 space-y-2 text-lg">
                  {project.role.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Domain
                </h2>
                <ul className="mt-3 space-y-2 text-lg">
                  {project.domain.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </article>
  );
}
