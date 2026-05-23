"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/data/projects";
import { ProjectGrid } from "@/components/work/ProjectGrid";

type RecentProjectsProps = {
  projects: Project[];
};

const filters: Array<{ label: string; value: ProjectStatus }> = [
  { label: "Ongoing", value: "ongoing" },
  { label: "Concept", value: "concept" },
  { label: "Shipped", value: "shipped" },
];

export function RecentProjects({ projects }: RecentProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | null>(null);

  const visibleProjects = useMemo(() => {
    if (!activeFilter) {
      return projects;
    }

    return projects.filter((project) => project.status === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div>
      <div className="mb-[30px] flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between md:mb-[44px]">
        <h2 className="text-[24px] font-semibold leading-normal tracking-normal text-[#242424] dark:text-foreground">
          Recent Projects
        </h2>
        <div
          className="flex flex-wrap gap-2 sm:justify-end"
          aria-label="Filter recent projects"
        >
          {filters.map((filter) => {
            const selected = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  setActiveFilter(selected ? null : filter.value)
                }
                className={`rounded-full px-5 py-2 text-[15px] leading-none transition duration-150 ease-out hover:-translate-y-px active:translate-y-0 ${
                  selected
                    ? "bg-[#0a130c] text-white dark:bg-[#d1e2bf] dark:text-[#0a130c]"
                    : "bg-[#ececec] text-[#0a130c] hover:bg-[#dedede] dark:bg-[#1b261e] dark:text-[#f1f4ee] dark:hover:bg-[#263126]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <ProjectGrid projects={visibleProjects} />
    </div>
  );
}
