"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;

    // Skip the perpetual rAF loop for automated browsers (screenshot capture
    // never sees an idle frame otherwise) and when ?static is in the URL.
    const staticRequested =
      new URLSearchParams(window.location.search).has("static") ||
      navigator.webdriver === true;

    // In static mode also drop smooth scroll-behavior: an offscreen/hidden
    // capture pane throttles rAF, freezing animated programmatic scrolls.
    document.documentElement.classList.toggle("is-static", staticRequested);

    const syncScrollMotion = () => {
      lenis?.destroy();
      lenis = null;

      if (reducedMotion.matches || staticRequested) return;

      lenis = new Lenis({
        anchors: { offset: -64 },
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
      });
    };

    syncScrollMotion();
    reducedMotion.addEventListener("change", syncScrollMotion);

    return () => {
      reducedMotion.removeEventListener("change", syncScrollMotion);
      lenis?.destroy();
    };
  }, []);

  return null;
}
