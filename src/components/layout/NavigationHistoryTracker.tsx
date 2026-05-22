"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const currentPathKey = "caesar-current-path";
const previousPathKey = "caesar-previous-path";
const navigationStackKey = "caesar-navigation-stack";

export function NavigationHistoryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    try {
      const currentPath = sessionStorage.getItem(currentPathKey);
      const storedStack = sessionStorage.getItem(navigationStackKey);
      const stack = storedStack ? (JSON.parse(storedStack) as string[]) : [];
      const lastPath = stack.at(-1);

      if (currentPath && currentPath !== pathname) {
        sessionStorage.setItem(previousPathKey, currentPath);
      }

      if (!currentPath && document.referrer) {
        const referrer = new URL(document.referrer);

        if (
          referrer.origin === window.location.origin &&
          referrer.pathname !== pathname
        ) {
          sessionStorage.setItem(previousPathKey, referrer.pathname);
          stack.push(referrer.pathname);
        }
      }

      if (lastPath !== pathname) {
        const existingPathIndex = stack.lastIndexOf(pathname);
        const nextStack =
          existingPathIndex >= 0
            ? stack.slice(0, existingPathIndex + 1)
            : [...stack, pathname];

        sessionStorage.setItem(navigationStackKey, JSON.stringify(nextStack));
      }

      sessionStorage.setItem(currentPathKey, pathname);
    } catch {
      // Session storage can be unavailable in restricted browser modes.
    }
  }, [pathname]);

  return null;
}

export const previousInternalPathKey = previousPathKey;
export const currentInternalPathKey = currentPathKey;
export const internalNavigationStackKey = navigationStackKey;
