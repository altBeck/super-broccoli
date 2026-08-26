"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import {
  DEFAULT_PROJECT_VIEW,
  getProjectView,
  subscribeProjectView,
  updateProjectView,
  type LayoutMode,
  type MobileView,
} from "./project-view-store";

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

export function ProjectToolbar({ projectTitle, slug }: { projectTitle: string; slug: string }) {
  const view = useSyncExternalStore(
    (listener) => subscribeProjectView(slug, listener),
    () => getProjectView(slug),
    () => DEFAULT_PROJECT_VIEW,
  );

  return (
    <div className="project-toolbar">
      <div className="project-toolbar__line" aria-hidden="true" />
      <div className="project-toolbar__row">
        <p>{projectTitle}</p>

        <div
          className="layout-controls layout-controls--desktop"
          aria-label={`${projectTitle} layout`}
        >
          {layoutOptions.map((option) => (
            <button
              key={option.mode}
              type="button"
              aria-label={option.label}
              aria-pressed={view.layout === option.mode}
              onClick={() => updateProjectView(slug, { layout: option.mode })}
            >
              <LayoutGlyph mode={option.mode} cells={option.cells} />
            </button>
          ))}
        </div>

        <div
          className="layout-controls layout-controls--mobile"
          aria-label={`${projectTitle} layout`}
        >
          {mobileOptions.map((option) => (
            <button
              key={option.view}
              type="button"
              aria-label={option.label}
              aria-pressed={view.mobileView === option.view}
              onClick={() => updateProjectView(slug, { mobileView: option.view })}
            >
              <MobileGlyph cells={option.cells} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
