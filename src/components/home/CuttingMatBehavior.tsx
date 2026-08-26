"use client";

import { useEffect } from "react";

const IDLE_MS = 500;
const TOP_ZONE = 120;

export function CuttingMatBehavior() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".cutting-mat");
    if (!header) return;

    let pointerInside = false;
    let focusWithin = false;
    let pointerFocus = false;
    let pointerDown = false;
    let idleTimer: number | undefined;

    const isEngaged = () =>
      pointerInside ||
      pointerDown ||
      (focusWithin && !pointerFocus);

    const clearIdleTimer = () => {
      window.clearTimeout(idleTimer);
      idleTimer = undefined;
    };

    const setHidden = (hidden: boolean) => {
      header.classList.toggle("cutting-mat--hidden", hidden);
    };

    const revealAndStay = () => {
      clearIdleTimer();
      setHidden(false);
    };

    const scheduleHide = () => {
      clearIdleTimer();
      if (isEngaged()) return;

      idleTimer = window.setTimeout(() => {
        if (!isEngaged() && window.scrollY > TOP_ZONE) setHidden(true);
      }, IDLE_MS);
    };

    const onScroll = () => {
      revealAndStay();
      scheduleHide();
    };
    const onPointerEnter = () => {
      pointerInside = true;
      revealAndStay();
    };
    const onPointerLeave = () => {
      pointerInside = false;
      pointerDown = false;
      scheduleHide();
    };
    const onPointerDown = () => {
      pointerDown = true;
      pointerFocus = true;
      revealAndStay();
    };
    const onPointerUp = () => {
      pointerDown = false;
      scheduleHide();
    };
    const onPointerCancel = () => {
      pointerDown = false;
      scheduleHide();
    };
    const onFocusIn = () => {
      focusWithin = true;
      revealAndStay();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!header.contains(event.relatedTarget as Node | null)) {
        focusWithin = false;
        pointerFocus = false;
        scheduleHide();
      }
    };
    const onKeyDown = () => {
      pointerFocus = false;
      revealAndStay();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("pointerenter", onPointerEnter);
    header.addEventListener("pointerleave", onPointerLeave);
    header.addEventListener("pointerdown", onPointerDown);
    header.addEventListener("pointerup", onPointerUp);
    header.addEventListener("pointercancel", onPointerCancel);
    header.addEventListener("focusin", onFocusIn);
    header.addEventListener("focusout", onFocusOut);
    header.addEventListener("keydown", onKeyDown);

    return () => {
      clearIdleTimer();
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("pointerenter", onPointerEnter);
      header.removeEventListener("pointerleave", onPointerLeave);
      header.removeEventListener("pointerdown", onPointerDown);
      header.removeEventListener("pointerup", onPointerUp);
      header.removeEventListener("pointercancel", onPointerCancel);
      header.removeEventListener("focusin", onFocusIn);
      header.removeEventListener("focusout", onFocusOut);
      header.removeEventListener("keydown", onKeyDown);
      setHidden(false);
    };
  }, []);

  return null;
}
