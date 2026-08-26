"use client";

import { useEffect, useRef, useState } from "react";

type RevealState = "static" | "waiting" | "revealed";

/**
 * Gives the footer its single, quiet entrance: the name settles into the
 * fixed reference crop only once it reaches the viewport. Without JavaScript
 * (or when motion is reduced), it remains completely static.
 */
export function FooterWordmark() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [revealState, setRevealState] = useState<RevealState>("static");

  useEffect(() => {
    if (
      window.matchMedia("(max-width: 560px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const wordmark = wordmarkRef.current;
    if (!wordmark || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setRevealState("revealed");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    setRevealState("waiting");
    observer.observe(wordmark);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wordmarkRef}
      className="site-footer__wordmark"
      data-reveal-state={revealState}
      aria-hidden="true"
    >
      <span>Beck Kanno</span>
    </div>
  );
}
