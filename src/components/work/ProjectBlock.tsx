import type { Project } from "@/data/projects";
import { WorkTagIcon } from "@/components/home/WorkTagIcon";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectToolbar } from "./ProjectToolbar";

export function ProjectBlock({ project }: { project: Project }) {
  return (
    <article className="project" aria-label={project.title}>
      <ProjectToolbar projectTitle={project.title} slug={project.slug} />

      <div className="project-body">
        <div className="project-meta">
          <p className="project-meta__sub">{project.meta}</p>
          <p className="project-meta__summary">{project.summary}</p>
          <ul className="project-tags">
            {project.tags.map((tag) => (
              <li key={tag.label} className="project-tag">
                <WorkTagIcon icon={tag.icon} />
                {tag.label}
              </li>
            ))}
          </ul>
        </div>

        <ProjectGallery project={project} />
      </div>
    </article>
  );
}
