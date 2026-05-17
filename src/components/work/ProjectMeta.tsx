import type { Project } from "@/data/projects";

type ProjectMetaProps = {
  project: Project;
};

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <dl className="grid gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:grid-cols-3">
      <div>
        <dt className="text-foreground">Status</dt>
        <dd className="mt-1">{project.status}</dd>
      </div>
      <div>
        <dt className="text-foreground">Year</dt>
        <dd className="mt-1">{project.year}</dd>
      </div>
      <div>
        <dt className="text-foreground">Role</dt>
        <dd className="mt-1">{project.role.join(", ")}</dd>
      </div>
    </dl>
  );
}
