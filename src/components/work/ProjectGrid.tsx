import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const leftColumn = projects.filter((_, index) => index === 0 || index === 2 || index === 4);
  const rightColumn = projects.filter((_, index) => index === 1 || index === 3);

  return (
    <>
      <div className="grid gap-y-[34px] md:hidden">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index < 2}
          />
        ))}
      </div>
      <div className="hidden gap-6 md:grid md:grid-cols-2">
        <div className="flex flex-col gap-6">
          {leftColumn.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="flex flex-col gap-[34px]">
          {rightColumn.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </>
  );
}
