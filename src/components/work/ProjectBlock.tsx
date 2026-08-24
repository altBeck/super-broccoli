"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { WorkTagIcon } from "@/components/home/WorkTagIcon";
import { cn } from "@/lib/cn";

type LayoutMode = "spread" | "grid" | "compact";
type MobileView = "single" | "split";

// Progressive backdrop blur: two masked layers keep the backdrop clear at the
// top and increasingly frosted toward the bottom without forcing four full-
// viewport backdrop-filter passes during the lightbox entrance.
// backdrop-filter + mask are set inline because Lightning CSS strips
// `backdrop-filter` from authored CSS at build time.
const lightboxBlurLayers: Array<{ blur: number; mask: string }> = [
  {
    blur: 3,
    mask: "linear-gradient(to bottom, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 0%) 18%, rgb(0 0 0 / 100%) 58%, rgb(0 0 0 / 0%) 76%)",
  },
  {
    blur: 7,
    mask: "linear-gradient(to bottom, rgb(0 0 0 / 0%) 45%, rgb(0 0 0 / 0%) 62%, rgb(0 0 0 / 100%) 90%, rgb(0 0 0 / 100%) 100%)",
  },
];

const layoutOptions: Array<{ cells: number; label: string; mode: LayoutMode }> = [
  { cells: 2, label: "Use wide two-column layout", mode: "spread" },
  { cells: 4, label: "Use square grid layout", mode: "grid" },
  { cells: 9, label: "Use compact grid layout", mode: "compact" },
];

const mobileOptions: Array<{ cells: 1 | 4; label: string; view: MobileView }> = [
  { cells: 1, label: "Show one project per row", view: "single" },
  { cells: 4, label: "Show two projects per row", view: "split" },
];

function LayoutGlyph({ mode, cells }: { mode: LayoutMode; cells: number }) {
  return (
    <span className={cn("layout-glyph", `layout-glyph--${mode}`)} aria-hidden="true">
      {Array.from({ length: cells }, (_, index) => (
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

export function ProjectBlock({
  project,
  aboveTheFold = false,
}: {
  project: Project;
  aboveTheFold?: boolean;
}) {
  const [layout, setLayout] = useState<LayoutMode>("spread");
  const [mobileView, setMobileView] = useState<MobileView>("single");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        dialogRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus();
    };
  }, [selectedIndex]);

  const selectedImage = selectedIndex === null ? null : project.gallery[selectedIndex];

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
                <LayoutGlyph mode={option.mode} cells={option.cells} />
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
              <button
                type="button"
                className="project-card"
                key={`${project.slug}-${index}`}
                aria-label={`Open ${project.title} preview ${index + 1}`}
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setSelectedIndex(index);
                }}
              >
                <Image
                  src={image}
                  alt={`${project.title} preview ${index + 1}`}
                  fill
                  sizes="(max-width: 820px) 100vw, 40vw"
                  loading={aboveTheFold && !animated ? "eager" : undefined}
                  unoptimized={animated}
                  className="project-card__image"
                />
              </button>
            );
          })}
        </div>
      </div>

      {selectedImage ? (
        <div
          ref={dialogRef}
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} expanded preview — tap anywhere to close`}
          tabIndex={-1}
          onClick={() => setSelectedIndex(null)}
        >
          <div className="project-lightbox__blur" aria-hidden="true">
            {lightboxBlurLayers.map((layer) => (
              <div
                key={layer.blur}
                className="project-lightbox__blur-layer"
                style={{
                  backdropFilter: `blur(${layer.blur}px)`,
                  WebkitBackdropFilter: `blur(${layer.blur}px)`,
                  maskImage: layer.mask,
                  WebkitMaskImage: layer.mask,
                }}
              />
            ))}
          </div>

          <span
            className="project-lightbox__tag project-lightbox__tag--index"
            aria-hidden="true"
          >
            {String((selectedIndex ?? 0) + 1).padStart(2, "0")} /{" "}
            {String(project.gallery.length).padStart(2, "0")}
          </span>
          <span
            className="project-lightbox__tag project-lightbox__tag--title"
            aria-hidden="true"
          >
            {project.title}
          </span>

          <div className="project-lightbox__media">
            <Image
              src={selectedImage}
              alt={`${project.title} preview ${(selectedIndex ?? 0) + 1}`}
              fill
              sizes="(max-width: 820px) 94vw, 90vw"
              unoptimized={typeof selectedImage === "string"}
              className="project-lightbox__image"
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}
