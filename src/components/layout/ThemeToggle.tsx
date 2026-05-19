"use client";

import { useTheme } from "@/components/layout/ThemeProvider";

export function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useTheme();
  const isDark = mounted && theme === "dark";
  const targetMode = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] text-[#0a130c] transition duration-150 ease-out hover:-translate-y-px hover:scale-[1.03] hover:bg-[#d1e3bf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1e3bf] active:translate-y-0 active:scale-[0.97] dark:text-[#d1e2bf] dark:hover:bg-[#d1e2bf] dark:hover:text-[#0a130c]"
      aria-label={`Switch to ${targetMode} mode`}
      title={`Switch to ${targetMode} mode`}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center">
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-8 w-8"
    >
      <path
        d="M22 12V14M22 30V32M14 22H12M16.3141 16.3141L14.8999 14.8999M27.6859 16.3141L29.1001 14.8999M16.3141 27.69L14.8999 29.1042M27.6859 27.69L29.1001 29.1042M32 22H30M27 22C27 24.7614 24.7614 27 22 27C19.2386 27 17 24.7614 17 22C17 19.2386 19.2386 17 22 17C24.7614 17 27 19.2386 27 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-8 w-8"
    >
      <path
        d="M17 30.6622C19.989 28.9331 22 25.7014 22 22C22 18.2986 19.989 15.0669 17 13.3378M32 22C32 27.5228 27.5228 32 22 32C16.4771 32 12 27.5228 12 22C12 16.4771 16.4771 12 22 12C27.5228 12 32 16.4771 32 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="17" cy="22" rx="5" ry="8" fill="currentColor" />
    </svg>
  );
}
