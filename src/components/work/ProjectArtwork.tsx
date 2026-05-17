"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";

type ProjectArtworkProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectArtwork({ project, priority = false }: ProjectArtworkProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !project.coverImage) {
    return (
      <div className="flex h-full min-h-64 items-end justify-between gap-6 bg-surface p-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {project.label}
          </p>
          <p className="mt-2 text-3xl font-semibold">{project.title}</p>
        </div>
        <span className="h-16 w-16 rounded-full bg-accent" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={project.coverImage}
      alt={`${project.title} project cover for ${project.label}`}
      fill
      priority={priority}
      className="object-cover transition duration-200 ease-out group-hover:scale-[1.012]"
      sizes="(min-width: 1024px) 528px, calc(100vw - 40px)"
      onError={() => setFailed(true)}
    />
  );
}
