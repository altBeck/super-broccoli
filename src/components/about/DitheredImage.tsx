"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./DitheredImage.module.css";

/**
 * DitheredImage
 * -------------
 * A portrait rendered with ordered (Bayer) dithering on a <canvas>. At rest it
 * sits at a coarse, abstract dither; on hover/focus it smoothly resolves toward
 * a fine, readable grain — animating *through* the classic dither sequence.
 *
 * Fully self-contained and theme-agnostic: it paints the source image's own
 * colours, so it reads correctly on the light / dark / studio themes without
 * any per-theme wiring.
 */

/** One end of the dither ramp. */
export type DitherStop = {
  /** Pixel cell size in device px. Larger = coarser blocks. */
  cell: number;
  /** Colour quantisation steps per channel. Fewer = more posterised/abstract. */
  levels: number;
};

type Props = {
  src: string;
  alt: string;
  /** Dither state when idle. Default: coarse & abstract. */
  rest?: DitherStop;
  /** Dither state on hover / focus. Default: fine & readable. */
  hover?: DitherStop;
  /** Transition duration in ms. */
  duration?: number;
  className?: string;
};

const DEFAULT_REST: DitherStop = { cell: 11, levels: 3 };
const DEFAULT_HOVER: DitherStop = { cell: 3, levels: 6 };

/** 8×8 Bayer matrix, normalised to (0,1) thresholds. */
const BAYER = (() => {
  const base = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ];
  return base.map((row) => row.map((v) => (v + 0.5) / 64));
})();

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function DitheredImage({
  src,
  alt,
  rest = DEFAULT_REST,
  hover = DEFAULT_HOVER,
  duration = 450,
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const scratchRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const animRef = useRef<{ from: number; start: number } | null>(null);
  // Current eased progress: 0 = rest, 1 = hover. Lives in a ref so animation
  // never fights React's render cycle.
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  const [ready, setReady] = useState(false);

  /** Paint one frame at the given 0..1 progress along the rest→hover ramp. */
  const paint = useCallback(
    (t: number) => {
      const canvas = canvasRef.current;
      const img = imgRef.current;
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) return;

      const cell = lerp(rest.cell, hover.cell, t);
      const maxLevel = lerp(rest.levels - 1, hover.levels - 1, t);

      const cols = Math.max(1, Math.round(W / cell));
      const rows = Math.max(1, Math.round(H / cell));

      // Scratch canvas holds the down-sampled (averaged) image.
      let scratch = scratchRef.current;
      if (!scratch) {
        scratch = document.createElement("canvas");
        scratchRef.current = scratch;
      }
      scratch.width = cols;
      scratch.height = rows;
      const sctx = scratch.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;

      // Cover-crop the source into the low-res grid.
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cols / rows;
      let sw: number, sh: number, sx: number, sy: number;
      if (ir > cr) {
        sh = img.naturalHeight;
        sw = sh * cr;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / cr;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }
      sctx.imageSmoothingEnabled = true;
      sctx.clearRect(0, 0, cols, rows);
      sctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);

      // Ordered dither each channel against the Bayer threshold.
      const image = sctx.getImageData(0, 0, cols, rows);
      const px = image.data;
      const safeMax = Math.max(1, maxLevel);
      for (let y = 0; y < rows; y++) {
        const brow = BAYER[y & 7];
        for (let x = 0; x < cols; x++) {
          const b = brow[x & 7];
          const i = (y * cols + x) * 4;
          for (let c = 0; c < 3; c++) {
            const scaled = (px[i + c] / 255) * safeMax;
            const lo = Math.floor(scaled);
            const out = scaled - lo > b ? lo + 1 : lo;
            px[i + c] = (clamp(out, 0, safeMax) / safeMax) * 255;
          }
        }
      }
      sctx.putImageData(image, 0, 0);

      // Blit the grid up to full size with hard edges → crisp blocks.
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(scratch, 0, 0, cols, rows, 0, 0, W, H);
    },
    [rest.cell, rest.levels, hover.cell, hover.levels],
  );

  /** Size the backing canvas to its rendered box (× DPR, capped). */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    paint(progressRef.current);
  }, [paint]);

  const animateTo = useCallback(
    (target: number) => {
      targetRef.current = target;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        progressRef.current = target;
        paint(target);
        return;
      }
      animRef.current = { from: progressRef.current, start: performance.now() };

      // Hoisted declaration so the rAF loop can reference itself cleanly.
      function step() {
        const anim = animRef.current;
        if (!anim) return;
        const now = performance.now();
        const raw = clamp((now - anim.start) / duration, 0, 1);
        progressRef.current = lerp(anim.from, targetRef.current, easeInOut(raw));
        paint(progressRef.current);
        if (raw < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          progressRef.current = targetRef.current;
          animRef.current = null;
          rafRef.current = null;
        }
      }

      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    },
    [duration, paint],
  );

  // Load the image once.
  useEffect(() => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    imgRef.current = img;
    const onLoad = () => {
      setReady(true);
      resize();
    };
    if (img.complete && img.naturalWidth > 0) onLoad();
    else img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, [src, resize]);

  // Track element size.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [resize]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const enter = useCallback(() => animateTo(1), [animateTo]);
  const leave = useCallback(() => animateTo(0), [animateTo]);

  return (
    <div
      ref={wrapRef}
      className={cn(styles.wrap, ready && styles.ready, className)}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onFocus={enter}
      onBlur={leave}
      tabIndex={0}
      role="img"
      aria-label={alt}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
