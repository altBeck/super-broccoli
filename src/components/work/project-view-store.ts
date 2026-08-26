export type LayoutMode = "spread" | "grid" | "compact";
export type MobileView = "single" | "split";

export type ProjectView = {
  layout: LayoutMode;
  mobileView: MobileView;
};

export const DEFAULT_PROJECT_VIEW: ProjectView = {
  layout: "spread",
  mobileView: "single",
};

const views = new Map<string, ProjectView>();
const listeners = new Map<string, Set<() => void>>();

export function getProjectView(slug: string) {
  return views.get(slug) ?? DEFAULT_PROJECT_VIEW;
}

export function subscribeProjectView(slug: string, listener: () => void) {
  const projectListeners = listeners.get(slug) ?? new Set<() => void>();
  projectListeners.add(listener);
  listeners.set(slug, projectListeners);

  return () => {
    projectListeners.delete(listener);
    if (projectListeners.size === 0) listeners.delete(slug);
  };
}

export function updateProjectView(slug: string, patch: Partial<ProjectView>) {
  const nextView = { ...getProjectView(slug), ...patch };
  views.set(slug, nextView);
  listeners.get(slug)?.forEach((listener) => listener());
}
