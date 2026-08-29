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
          {project.links?.length ? (
            <div className="project-links" aria-label={`${project.title} links`}>
              {project.links.map((link) => {
                const external = link.href.startsWith("http");

                return (
                  <a
                    key={link.href}
                    className="project-link"
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={`${link.label}${external ? " (opens in a new tab)" : ""}`}
                  >
                    <span>{link.label}</span>
                    <svg
                      className="project-link__icon"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M3.5 12.5L12.5 3.5M4.5 3.5H12.5V11.5" />
                    </svg>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <ProjectGallery project={project} />
      </div>
    </article>
  );
}
