"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

// How long after the last scroll tick the bar waits before tucking away.
const IDLE_MS = 500;
// Near the very top the bar always stays put (it's the page header there).
const TOP_ZONE = 120;

export function CuttingMatNav() {
  const [hidden, setHidden] = useState(false);
  const idleTimerRef = useRef<number | undefined>(undefined);
  const pointerInsideRef = useRef(false);
  const focusWithinRef = useRef(false);
  const pointerFocusRef = useRef(false);
  const pointerDownRef = useRef(false);

  const isEngaged = useCallback(
    () =>
      pointerInsideRef.current ||
      pointerDownRef.current ||
      (focusWithinRef.current && !pointerFocusRef.current),
    [],
  );

  const clearIdleTimer = useCallback(() => {
    window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = undefined;
  }, []);

  const revealAndStay = useCallback(() => {
    clearIdleTimer();
    setHidden(false);
  }, [clearIdleTimer]);

  const scheduleHide = useCallback(() => {
    clearIdleTimer();
    if (isEngaged()) return;

    idleTimerRef.current = window.setTimeout(() => {
      if (!isEngaged() && window.scrollY > TOP_ZONE) setHidden(true);
    }, IDLE_MS);
  }, [clearIdleTimer, isEngaged]);

  // Reveal while the visitor is actively scrolling; tuck away once they go idle
  // (unless we're still up near the top of the page). Pointer/focus activity
  // pauses the idle timer so the controls never disappear under the cursor.
  useEffect(() => {
    const onScroll = () => {
      revealAndStay();
      scheduleHide();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdleTimer();
    };
  }, [clearIdleTimer, revealAndStay, scheduleHide]);

  return (
    <header
      className={cn("cutting-mat", hidden && "cutting-mat--hidden")}
      onPointerEnter={() => {
        pointerInsideRef.current = true;
        revealAndStay();
      }}
      onPointerLeave={() => {
        pointerInsideRef.current = false;
        pointerDownRef.current = false;
        scheduleHide();
      }}
      onPointerDown={() => {
        pointerDownRef.current = true;
        pointerFocusRef.current = true;
        revealAndStay();
      }}
      onPointerUp={() => {
        pointerDownRef.current = false;
        scheduleHide();
      }}
      onPointerCancel={() => {
        pointerDownRef.current = false;
        scheduleHide();
      }}
      onFocusCapture={() => {
        focusWithinRef.current = true;
        revealAndStay();
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          focusWithinRef.current = false;
          pointerFocusRef.current = false;
          scheduleHide();
        }
      }}
      onKeyDown={() => {
        // Keyboard focus should keep the header available while tabbing.
        pointerFocusRef.current = false;
        revealAndStay();
      }}
    >
      <Image
        className="cutting-mat__asset"
        src="/media/frame-2.svg"
        alt=""
        fill
        priority
        sizes="100vw"
      />

      <nav className="cutting-mat__nav" aria-label="Primary navigation">
        <a className="cutting-mat__brand" href="#top">
          Beck.
        </a>

        <div className="cutting-mat__links">
          <a href="#work">Work</a>
          <a href="#about-me">About</a>
          <a href="#gallery" aria-label="Gallery (coming soon)">
            Gallery
          </a>
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}
