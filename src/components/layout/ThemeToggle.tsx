"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

type ThemeToggleProps = {
  children?: ReactNode;
};

export function ThemeToggle({ children }: ThemeToggleProps) {
  const { mounted, theme, toggleTheme } = useTheme();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground transition duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {children ?? (
        <span className="font-mono text-[11px]" aria-hidden="true">
          {isDark ? "LT" : "DK"}
        </span>
      )}
    </button>
  );
}
