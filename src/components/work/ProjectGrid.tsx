import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          priority={index === 0}
          galleryIndex={index}
        />
      ))}
    </div>
  );
}
