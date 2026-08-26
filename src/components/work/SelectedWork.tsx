import { portfolioProjects } from "@/data/projects";
import { ProjectBlock } from "./ProjectBlock";

export function SelectedWork() {
  return (
    <section
      className="selected-work"
      id="work"
      aria-labelledby="selected-work-title"
    >
      <h2 id="selected-work-title">Selected Work</h2>

      <div className="project-list">
        {portfolioProjects.map((project) => (
          <ProjectBlock
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
