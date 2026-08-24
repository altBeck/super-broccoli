"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type ThemeMode = "auto" | "light" | "dark" | "studio";

const THEME_EVENT = "themepreferencechange";
// "auto" temporarily disabled — Light is the default. Add "auto" back here
// (and to `options` + the layout no-flash script) to re-enable system mode.
const MODES: ThemeMode[] = [/* "auto", */ "light", "dark", "studio"];

function readMode(): ThemeMode {
  if (typeof document === "undefined") return "light";
  const pref = document.documentElement.getAttribute("data-theme-pref");
  return MODES.includes(pref as ThemeMode) ? (pref as ThemeMode) : "light";
}

function subscribeMode(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

const options: Array<{ mode: ThemeMode; label: string }> = [
  // { mode: "auto", label: "Auto" }, // disabled for now — Light is the default
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
  { mode: "studio", label: "Studio" },
];

// Per-mode disc icon: auto = crescent, light = sun, dark = moon, studio = ruler.
// Colours are baked from the supplied SVGs so the icon reads the same in any theme.
const icons: Record<ThemeMode, { disc: string; fg: string; path: string }> = {
  auto: {
    disc: "#131c26",
    fg: "#ece5d8",
    path: "M24.833 15.832C24.096 21.124 28.938 25.89 34.168 25.167C34.222 24.787 34.2493 24.398 34.25 24C34.2501 22.8179 33.9962 21.6496 33.5055 20.5742C33.0148 19.4987 32.2987 18.5413 31.4057 17.7668C30.5127 16.9922 29.4637 16.4186 28.3297 16.0848C27.1957 15.751 26.0032 15.6648 24.833 15.832ZM24.033 14.449C24.6803 14.3165 25.3393 14.2499 26 14.25C28.5859 14.25 31.0658 15.2772 32.8943 17.1057C34.7228 18.9342 35.75 21.4141 35.75 24C35.7493 24.674 35.683 25.3297 35.551 25.967C34.641 30.409 30.711 33.75 26 33.75C23.4141 33.75 20.9342 32.7228 19.1057 30.8943C17.2772 29.0658 16.25 26.5859 16.25 24C16.25 19.289 19.591 15.36 24.033 14.449Z",
  },
  light: {
    disc: "#f6f0e6",
    fg: "#0a0a0a",
    path: "M25.25 31.004V32.5C25.25 32.6989 25.329 32.8897 25.4697 33.0303C25.6103 33.171 25.8011 33.25 26 33.25C26.1989 33.25 26.3897 33.171 26.5303 33.0303C26.671 32.8897 26.75 32.6989 26.75 32.5V31.004C26.75 30.8051 26.671 30.6143 26.5303 30.4737C26.3897 30.333 26.1989 30.254 26 30.254C25.8011 30.254 25.6103 30.333 25.4697 30.4737C25.329 30.6143 25.25 30.8051 25.25 31.004ZM21.53 28.47C21.3894 28.3295 21.1988 28.2507 21 28.2507C20.8012 28.2507 20.6106 28.3295 20.47 28.47L19.47 29.47C19.3375 29.6122 19.2654 29.8002 19.2688 29.9945C19.2723 30.1888 19.351 30.3742 19.4884 30.5116C19.6258 30.649 19.8112 30.7277 20.0055 30.7312C20.1998 30.7346 20.3878 30.6625 20.53 30.53L21.53 29.53C21.6705 29.3894 21.7493 29.1988 21.7493 29C21.7493 28.8012 21.6705 28.6106 21.53 28.47ZM31.474 28.418C31.3302 28.2989 31.1471 28.2377 30.9605 28.2465C30.774 28.2552 30.5974 28.3333 30.4653 28.4653C30.3333 28.5974 30.2552 28.774 30.2465 28.9605C30.2377 29.1471 30.2989 29.3302 30.418 29.474L30.47 29.53L31.47 30.53L31.526 30.582C31.6698 30.7011 31.8529 30.7623 32.0395 30.7535C32.226 30.7448 32.4026 30.6667 32.5347 30.5347C32.6667 30.4026 32.7448 30.226 32.7535 30.0395C32.7623 29.8529 32.7011 29.6698 32.582 29.526L32.53 29.47L31.53 28.47L31.474 28.418ZM19.076 23.254L19 23.25H17.5C17.3011 23.25 17.1103 23.329 16.9697 23.4697C16.829 23.6103 16.75 23.8011 16.75 24C16.75 24.1989 16.829 24.3897 16.9697 24.5303C17.1103 24.671 17.3011 24.75 17.5 24.75H19L19.076 24.746C19.2605 24.7269 19.4314 24.64 19.5557 24.5022C19.6799 24.3645 19.7486 24.1855 19.7486 24C19.7486 23.8145 19.6799 23.6355 19.5557 23.4978C19.4314 23.36 19.2605 23.2731 19.076 23.254ZM34.577 23.254L34.5 23.25H33C32.8011 23.25 32.6103 23.329 32.4697 23.4697C32.329 23.6103 32.25 23.8011 32.25 24C32.25 24.1989 32.329 24.3897 32.4697 24.5303C32.6103 24.671 32.8011 24.75 33 24.75H34.5L34.577 24.746C34.7615 24.7269 34.9324 24.64 35.0567 24.5022C35.1809 24.3645 35.2496 24.1855 35.2496 24C35.2496 23.8145 35.1809 23.6355 35.0567 23.4978C34.9324 23.36 34.7615 23.2731 34.577 23.254ZM20.474 17.418C20.3302 17.2989 20.1471 17.2377 19.9605 17.2465C19.774 17.2552 19.5974 17.3333 19.4653 17.4653C19.3333 17.5974 19.2552 17.774 19.2465 17.9605C19.2377 18.1471 19.2989 18.3302 19.418 18.474L19.47 18.53L20.47 19.53L20.526 19.582C20.6698 19.7011 20.8529 19.7623 21.0395 19.7535C21.226 19.7448 21.4026 19.6667 21.5347 19.5347C21.6667 19.4026 21.7448 19.226 21.7535 19.0395C21.7623 18.8529 21.7011 18.6698 21.582 18.526L21.53 18.47L20.53 17.47L20.474 17.418ZM32.53 17.47C32.3988 17.3386 32.2235 17.2605 32.038 17.2509C31.8525 17.2413 31.6701 17.3008 31.526 17.418L31.47 17.47L30.47 18.47C30.3963 18.5387 30.3372 18.6215 30.2962 18.7135C30.2552 18.8055 30.2332 18.9048 30.2314 19.0055C30.2296 19.1062 30.2482 19.2062 30.2859 19.2996C30.3236 19.393 30.3797 19.4778 30.451 19.549C30.5222 19.6203 30.607 19.6764 30.7004 19.7141C30.7938 19.7518 30.8938 19.7704 30.9945 19.7686C31.0952 19.7668 31.1945 19.7448 31.2865 19.7038C31.3785 19.6628 31.4613 19.6037 31.53 19.53L32.53 18.53L32.582 18.474C32.6992 18.3299 32.7587 18.1475 32.7491 17.962C32.7395 17.7765 32.6614 17.6012 32.53 17.47ZM25.25 15.5V17C25.25 17.1989 25.329 17.3897 25.4697 17.5303C25.6103 17.671 25.8011 17.75 26 17.75C26.1989 17.75 26.3897 17.671 26.5303 17.5303C26.671 17.3897 26.75 17.1989 26.75 17V15.5C26.75 15.3011 26.671 15.1103 26.5303 14.9697C26.3897 14.829 26.1989 14.75 26 14.75C25.8011 14.75 25.6103 14.829 25.4697 14.9697C25.329 15.1103 25.25 15.3011 25.25 15.5ZM30.75 24C30.75 25.2598 30.2496 26.468 29.3588 27.3588C28.468 28.2496 27.2598 28.75 26 28.75C24.7402 28.75 23.532 28.2496 22.6412 27.3588C21.7504 26.468 21.25 25.2598 21.25 24C21.25 22.7402 21.7504 21.532 22.6412 20.6412C23.532 19.7504 24.7402 19.25 26 19.25C27.2598 19.25 28.468 19.7504 29.3588 20.6412C30.2496 21.532 30.75 22.7402 30.75 24Z",
  },
  dark: {
    disc: "#131c26",
    fg: "#ebe5d8",
    path: "M25.7119 15.4501C25.799 15.334 25.8505 15.1952 25.8603 15.0505C25.87 14.9057 25.8376 14.7612 25.7669 14.6345C25.6962 14.5078 25.5902 14.4044 25.4619 14.3367C25.3336 14.269 25.1884 14.2399 25.0439 14.2531C19.6299 14.7471 16.6079 19.0051 16.2799 23.3581C15.9519 27.7191 18.3169 32.3331 23.7309 33.5241C29.4169 34.7741 35.2029 30.6871 35.7469 24.8781C35.7604 24.7343 35.7321 24.5896 35.6654 24.4615C35.5987 24.3333 35.4964 24.2272 35.3709 24.1558C35.2453 24.0844 35.1018 24.0508 34.9575 24.059C34.8133 24.0672 34.6745 24.1169 34.5579 24.2021C31.7209 26.2711 28.4779 25.5181 26.4219 23.4781C24.3679 21.4391 23.6219 18.2391 25.7119 15.4501Z",
  },
  studio: {
    disc: "#00342a",
    fg: "#ece5d8",
    path: "M28.9081 14.392C29.4911 14.202 30.1181 14.202 30.7011 14.392C31.0781 14.515 31.3941 14.73 31.7041 14.992C32.0011 15.245 32.339 15.582 32.746 15.99L34.005 17.249C34.415 17.658 34.753 17.997 35.007 18.296C35.27 18.606 35.485 18.922 35.608 19.3C35.798 19.883 35.798 20.51 35.608 21.092C35.485 21.47 35.27 21.785 35.008 22.095C34.754 22.395 34.4151 22.733 34.0061 23.142L25.1421 32.006C24.7331 32.415 24.394 32.754 24.096 33.007C23.786 33.27 23.4701 33.485 23.0921 33.607C22.5101 33.797 21.8821 33.797 21.3001 33.608C20.9221 33.485 20.6061 33.27 20.2961 33.008C19.9971 32.753 19.6581 32.414 19.2491 32.005L17.9891 30.746C17.5831 30.339 17.2451 30.002 16.9921 29.704C16.7301 29.394 16.5151 29.078 16.3921 28.701C16.2026 28.1184 16.2026 27.4907 16.3921 26.908C16.5151 26.531 16.7301 26.214 16.9921 25.905C17.2461 25.605 17.5851 25.267 17.9941 24.858L26.8581 15.994C27.2671 15.585 27.6061 15.246 27.9051 14.993C28.2151 14.73 28.5311 14.515 28.9081 14.392ZM20.9741 24L19.9131 25.06L21.666 26.813C21.8082 26.9455 21.9963 27.0176 22.1906 27.0142C22.3849 27.0108 22.5703 26.932 22.7077 26.7946C22.8451 26.6572 22.9238 26.4718 22.9272 26.2775C22.9307 26.0832 22.8585 25.8952 22.726 25.753L20.9741 24ZM25.7701 22.709L24.0171 20.956L22.957 22.017L24.7091 23.77C24.7783 23.8416 24.8611 23.8987 24.9526 23.938C25.0441 23.9772 25.1425 23.9979 25.2421 23.9987C25.3417 23.9995 25.4404 23.9805 25.5326 23.9427C25.6247 23.905 25.7085 23.8493 25.7788 23.7788C25.8492 23.7083 25.9049 23.6246 25.9426 23.5324C25.9802 23.4402 25.9991 23.3414 25.9982 23.2419C25.9973 23.1423 25.9766 23.0439 25.9372 22.9524C25.8979 22.8609 25.8407 22.7782 25.7691 22.709M27.0591 17.913L26.0001 18.973L27.7521 20.726C27.8207 20.7997 27.9035 20.8588 27.9955 20.8998C28.0875 20.9408 28.1868 20.9628 28.2875 20.9646C28.3882 20.9664 28.4883 20.9479 28.5816 20.9101C28.675 20.8724 28.7599 20.8163 28.8311 20.745C28.9023 20.6738 28.9585 20.589 28.9962 20.4956C29.0339 20.4022 29.0524 20.3022 29.0506 20.2015C29.0489 20.1008 29.0268 20.0015 28.9858 19.9095C28.9448 19.8175 28.8857 19.7347 28.8121 19.666L27.0591 17.913Z",
  },
};

// Zoom the glyphs in slightly (uniform across modes) so they read larger.
const ICON_VIEWBOX = "8 6 36 36";

function resolveTheme(mode: ThemeMode) {
  if (mode !== "auto") return mode;
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme-pref", mode);
  root.setAttribute("data-theme", resolveTheme(mode));
}

export function ThemeToggle() {
  // read the preference the no-flash script put on <html> — SSR-safe, no
  // hydration mismatch (server + first client render use "light", then sync).
  const mode = useSyncExternalStore<ThemeMode>(
    subscribeMode,
    readMode,
    () => "light",
  );
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectMode = (next: ThemeMode) => {
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  // Auto disabled for now, so no OS-preference listener is needed. Re-add a
  // matchMedia("(prefers-color-scheme: dark)") listener here to support "auto".

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="theme-toggle" ref={rootRef}>
      <button
        className="theme-toggle__icon"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Change theme"
        style={{ background: icons[mode].disc, color: icons[mode].fg }}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox={ICON_VIEWBOX} aria-hidden="true" focusable="false">
          <path d={icons[mode].path} fill="currentColor" />
        </svg>
      </button>

      {open ? (
        <div className="theme-popup" role="dialog" aria-label="Theme">
          <p className="theme-popup__title">Theme</p>
          <div className="theme-popup__track" role="radiogroup" aria-label="Theme">
            {options.map((option) => (
              <button
                key={option.mode}
                type="button"
                role="radio"
                aria-checked={mode === option.mode}
                className={cn(
                  "theme-popup__seg",
                  mode === option.mode && "theme-popup__seg--active",
                )}
                onClick={() => selectMode(option.mode)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
