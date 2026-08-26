"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import {
  DEFAULT_PROJECT_VIEW,
  getProjectView,
  subscribeProjectView,
} from "./project-view-store";

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

export function ProjectGallery({ project }: { project: Project }) {
  const view = useSyncExternalStore(
    (listener) => subscribeProjectView(project.slug, listener),
    () => getProjectView(project.slug),
    () => DEFAULT_PROJECT_VIEW,
  );
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

  const selectedImage =
    selectedIndex === null ? null : project.gallery[selectedIndex];

  return (
    <>
      <div
        className={cn("project-gallery", `project-gallery--${view.layout}`)}
        data-mobile={view.mobileView}
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
                unoptimized={animated}
                className="project-card__image"
              />
            </button>
          );
        })}
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
    </>
  );
}
