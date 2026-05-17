import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectArtwork } from "@/components/work/ProjectArtwork";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const aspectClass = {
    wide: "aspect-[1.6]",
    dash: "aspect-[537/400]",
    mobile: "aspect-[537/387]",
  }[project.coverRatio];

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:rounded-md"
    >
      <div
        className={`relative ${aspectClass} overflow-hidden rounded-[4px] border border-[rgba(133,149,116,0.16)] bg-surface`}
      >
        <ProjectArtwork project={project} priority={priority} />
      </div>
      <div className="mt-[10px] grid gap-[10px] sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
        <h3 className="text-[18px] font-normal leading-tight tracking-normal md:text-[16px]">
          {project.label}
        </h3>
        <p className="font-mono text-[15px] uppercase leading-tight tracking-normal text-muted sm:text-right">
          {project.title} <span className="mx-2">•</span> {project.status}{" "}
          <span className="ml-2">{project.year}</span>
        </p>
      </div>
    </Link>
  );
}
