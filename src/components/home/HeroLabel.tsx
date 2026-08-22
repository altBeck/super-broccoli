"use client";

import Image from "next/image";
import { animate, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IndustrialShapeSwitch } from "./IndustrialShapeSwitch";
import { cn } from "@/lib/cn";

const labelCopy =
  "WORKS BEST ON COMPLEX PRODUCTS, MESSY WORKFLOWS, AND SYSTEMS WITH TOO MANY EDGE CASES. THINK IN SYSTEMS. DESIGN WITH INTENT. BUILD CLOSE TO ENGINEERING. BEST RESULTS OCCUR WHEN THE PROBLEM IS HARD, THE RULES ARE UNCLEAR, AND THE INTERFACE STILL NEEDS TO FEEL OBVIOUS. MAY CONTAIN FINTECH, AI, OPERATIONAL SOFTWARE, AND AN UNREASONABLE NUMBER OF STATES.";

// Displacement travel of the WAV state, copied from the Figma export
// (Frame 3 → feDisplacementMap scale="16"). STR is scale 0 (Frame 3-1, no map).
const WAV_SCALE = 16;

// Monotone grain, copied verbatim from the Figma "noise" effect (black 4%,
// ~50% density via a discrete alpha ramp of 51 ones then 49 zeros).
const GRAIN_ALPHA_RAMP =
  "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";

const barcodeBars = [
  [0, 4],
  [7, 2],
  [14, 5],
  [24, 4],
  [33, 4],
  [39, 4],
  [48, 2],
  [52, 2],
  [58, 4],
  [71, 2],
  [75, 8],
  [86, 6],
  [94, 5],
  [101, 6],
  [111, 2],
  [118, 4],
] as const;

function Barcode() {
  return (
    <span className="barcode" aria-hidden="true">
      {barcodeBars.map(([left, width]) => (
        <span key={`${left}-${width}`} style={{ left, width }} />
      ))}
    </span>
  );
}

function formatLocalTime() {
  // The visitor's own local time (their timezone is used automatically), in the
  // label's 12-hour "05:42 PM" format.
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function SystemMetadata() {
  const [time, setTime] = useState("05:42 PM");

  useEffect(() => {
    const update = () => setTime(formatLocalTime());
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="system-metadata">
      <Barcode />
      <span className="system-metadata__status">
        <svg
          className="system-metadata__bracket"
          viewBox="0 0 5 14"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 0H4.5V2.5H2.5V11H4.5V13.5H0V0Z" fill="currentColor" />
        </svg>
        <svg
          className="system-metadata__dot"
          viewBox="0 0 12 12"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="6" cy="6" r="6" fill="currentColor" />
        </svg>
        <span>STATUS: AVLB. 2026(MMXXVI)</span>
        <svg
          className="system-metadata__dot"
          viewBox="0 0 12 12"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="6" cy="6" r="6" fill="currentColor" />
        </svg>
        <time suppressHydrationWarning>{time}</time>
        <svg
          className="system-metadata__bracket system-metadata__bracket--end"
          viewBox="0 0 5 14"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 0H4.5V2.5H2.5V11H4.5V13.5H0V0Z" fill="currentColor" />
        </svg>
      </span>
      <Barcode />
    </div>
  );
}

export function HeroLabel() {
  const [isWavy, setIsWavy] = useState(true);
  const reduceMotion = useReducedMotion();

  // The whole strip (orange field + every child) is routed through ONE Figma
  // filter, exactly like the export: a low-frequency displacement warps the
  // edges AND the copy AND the switch together, then a fine grain is laid over
  // the top. STR = displacement scale 0; WAV = scale 16.
  const scale = useMotionValue(isWavy ? WAV_SCALE : 0);
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    return scale.on("change", (value) => {
      displaceRef.current?.setAttribute("scale", value.toFixed(2));
    });
  }, [scale]);

  useEffect(() => {
    const controls = animate(scale, isWavy ? WAV_SCALE : 0, {
      duration: reduceMotion ? 0 : 0.32,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isWavy, reduceMotion, scale]);

  return (
    <div className={cn("hero-label", isWavy && "hero-label--wavy")}>
      <svg className="hero-label__defs" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="hero-strip-texture"
            x="-4%"
            y="-12%"
            width="108%"
            height="124%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            {/* Texture: low-frequency displacement of the entire strip */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves={3}
              seed={7213}
              result="warpNoise"
            />
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="warpNoise"
              scale={isWavy ? WAV_SCALE : 0}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Noise: fine monotone grain, black 4%, ~50% density */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="2 2"
              stitchTiles="stitch"
              numOctaves={3}
              seed={1026}
              result="grainNoise"
            />
            <feColorMatrix
              in="grainNoise"
              type="luminanceToAlpha"
              result="grainAlpha"
            />
            <feComponentTransfer in="grainAlpha" result="grainMask">
              <feFuncA type="discrete" tableValues={GRAIN_ALPHA_RAMP} />
            </feComponentTransfer>
            <feComposite
              operator="in"
              in="grainMask"
              in2="displaced"
              result="grainClipped"
            />
            <feFlood floodColor="rgba(0, 0, 0, 0.04)" result="grainFill" />
            <feComposite
              operator="in"
              in="grainFill"
              in2="grainClipped"
              result="grain"
            />
            <feMerge>
              <feMergeNode in="displaced" />
              <feMergeNode in="grain" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="hero-label__strip">
        <div className="hero-label__field" aria-hidden="true" />

        <div className="hero-label__grid">
          <div className="binary-display">
            <Image
              src="/media/beck-binary-label-animated.gif"
              alt=""
              width={380}
              height={58}
              unoptimized
              priority
              sizes="380px"
              className="binary-display__image"
            />
          </div>

          <p className="label-instruction">{labelCopy}</p>

          <div className="hero-label__identity">
            <p>BECK©2026</p>
            <IndustrialShapeSwitch checked={isWavy} onChange={setIsWavy} />
          </div>

          <h1 className="hero-label__title">Product Designer</h1>
          <SystemMetadata />

          <p className="hero-label__made">
            <span className="hero-label__made-copy">MADE WITH</span>
            <svg
              className="hero-label__heart"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M9.99442 4.27984C8.32825 2.332 5.54987 1.80804 3.46232 3.59168C1.37478 5.37532 1.08089 8.3575 2.72025 10.467C4.08327 12.2209 8.20822 15.9201 9.56017 17.1173C9.71142 17.2513 9.78708 17.3183 9.87525 17.3446C9.95225 17.3676 10.0365 17.3676 10.1135 17.3446C10.2017 17.3183 10.2773 17.2513 10.4286 17.1173C11.7805 15.9201 15.9055 12.2209 17.2685 10.467C18.9078 8.3575 18.6498 5.35656 16.5264 3.59168C14.403 1.8268 11.6605 2.332 9.99442 4.27984Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.56"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
