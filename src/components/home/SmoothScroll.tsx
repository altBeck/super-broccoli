"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;

    const syncScrollMotion = () => {
      lenis?.destroy();
      lenis = null;

      if (reducedMotion.matches) return;

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
