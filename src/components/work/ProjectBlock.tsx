"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { WorkTagIcon } from "@/components/home/WorkTagIcon";
import { cn } from "@/lib/cn";

type LayoutMode = "spread" | "grid" | "compact";
type MobileView = "single" | "split";

const layoutOptions: Array<{ columns: 2 | 3; label: string; mode: LayoutMode }> = [
  { columns: 2, label: "Use wide two-column layout", mode: "spread" },
  { columns: 2, label: "Use square grid layout", mode: "grid" },
  { columns: 3, label: "Use compact grid layout", mode: "compact" },
];

const mobileOptions: Array<{ cells: 1 | 4; label: string; view: MobileView }> = [
  { cells: 1, label: "Show one project per row", view: "single" },
  { cells: 4, label: "Show two projects per row", view: "split" },
];

function LayoutGlyph({ columns }: { columns: 2 | 3 }) {
  return (
    <span
      className={cn(
        "layout-glyph",
        columns === 2 ? "layout-glyph--two" : "layout-glyph--three",
      )}
      aria-hidden="true"
    >
      {Array.from({ length: columns * columns }, (_, index) => (
        <span key={index} />
      ))}
    </span>
  );
}

function MobileGlyph({ cells }: { cells: 1 | 4 }) {
  return (
    <span
      className={cn(
        "layout-glyph",
        cells === 1 ? "layout-glyph--single" : "layout-glyph--split",
      )}
      aria-hidden="true"
    >
      {Array.from({ length: cells }, (_, index) => (
        <span key={index} />
      ))}
    </span>
  );
}

export function ProjectBlock({ project }: { project: Project }) {
  const [layout, setLayout] = useState<LayoutMode>("spread");
  const [mobileView, setMobileView] = useState<MobileView>("single");

  return (
    <article className="project" aria-label={project.title}>
      <div className="project-toolbar">
        <div className="project-toolbar__line" aria-hidden="true" />
        <div className="project-toolbar__row">
          <p>{project.title}</p>

          <div
            className="layout-controls layout-controls--desktop"
            aria-label={`${project.title} layout`}
          >
            {layoutOptions.map((option) => (
              <button
                key={option.mode}
                type="button"
                aria-label={option.label}
                aria-pressed={layout === option.mode}
                onClick={() => setLayout(option.mode)}
              >
                <LayoutGlyph columns={option.columns} />
              </button>
            ))}
          </div>

          <div
            className="layout-controls layout-controls--mobile"
            aria-label={`${project.title} layout`}
          >
            {mobileOptions.map((option) => (
              <button
                key={option.view}
                type="button"
                aria-label={option.label}
                aria-pressed={mobileView === option.view}
                onClick={() => setMobileView(option.view)}
              >
                <MobileGlyph cells={option.cells} />
              </button>
            ))}
          </div>
        </div>
      </div>

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

        <div
          className={cn("project-gallery", `project-gallery--${layout}`)}
          data-mobile={mobileView}
        >
          {project.gallery.map((image, index) => {
            const animated = typeof image === "string";
            return (
              <div className="project-card" key={`${project.slug}-${index}`}>
                <Image
                  src={image}
                  alt={`${project.title} preview ${index + 1}`}
                  fill
                  sizes="(max-width: 820px) 100vw, 40vw"
                  unoptimized={animated}
                  className="project-card__image"
                />
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
