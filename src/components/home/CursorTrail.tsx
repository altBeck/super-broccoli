"use client";

import { useEffect, useRef } from "react";

const TRAIL_LIFETIME_MS = 280;
const TRAIL_WIDTH = 4;
const POINTER_DOT_RADIUS = 2;
const POINT_SPACING = 4;

type TrailPoint = {
  x: number;
  y: number;
  createdAt: number;
};

type PointerPosition = Pick<TrailPoint, "x" | "y">;

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const desktopPointer = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let points: TrailPoint[] = [];
    let pointer: PointerPosition | null = null;
    let animationFrame = 0;
    let isEnabled = false;

    const clearCanvas = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      points = [];
      pointer = null;
      clearCanvas();
    };

    const drawTrail = () => {
      if (points.length < 2) return;

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);

      for (let index = 1; index < points.length - 1; index += 1) {
        const point = points[index];
        const nextPoint = points[index + 1];
        const midpointX = (point.x + nextPoint.x) / 2;
        const midpointY = (point.y + nextPoint.y) / 2;

        context.quadraticCurveTo(point.x, point.y, midpointX, midpointY);
      }

      const lastPoint = points[points.length - 1];
      context.lineTo(lastPoint.x, lastPoint.y);
      context.strokeStyle = "#000000";
      context.lineWidth = TRAIL_WIDTH;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    };

    const drawPointerDot = () => {
      if (!pointer) return;

      context.beginPath();
      context.arc(
        pointer.x,
        pointer.y,
        POINTER_DOT_RADIUS,
        0,
        Math.PI * 2,
      );
      context.fillStyle = "#000000";
      context.fill();
    };

    const draw = (now: number) => {
      points = points.filter(
        (point) => now - point.createdAt < TRAIL_LIFETIME_MS,
      );
      clearCanvas();
      drawTrail();
      drawPointerDot();

      if (points.length > 1) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        animationFrame = 0;
      }
    };

    const ensureAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isEnabled || event.pointerType === "touch") return;

      const nextPointer = { x: event.clientX, y: event.clientY };
      const now = performance.now();
      const previousPoint = points.at(-1);

      if (previousPoint) {
        const deltaX = nextPointer.x - previousPoint.x;
        const deltaY = nextPointer.y - previousPoint.y;
        const distance = Math.hypot(deltaX, deltaY);
        const steps = Math.max(1, Math.ceil(distance / POINT_SPACING));

        for (let step = 1; step <= steps; step += 1) {
          const progress = step / steps;
          points.push({
            x: previousPoint.x + deltaX * progress,
            y: previousPoint.y + deltaY * progress,
            createdAt: now,
          });
        }
      } else {
        points.push({ ...nextPointer, createdAt: now });
      }

      pointer = nextPointer;
      ensureAnimation();
    };

    const resetPointer = () => {
      points = [];
      pointer = null;
      clearCanvas();

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const syncAvailability = () => {
      const nextEnabled = desktopPointer.matches && !reducedMotion.matches;

      if (nextEnabled === isEnabled) return;
      isEnabled = nextEnabled;
      canvas.hidden = !isEnabled;
      resetPointer();

      if (isEnabled) {
        resizeCanvas();
        window.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        window.addEventListener("blur", resetPointer);
        document.documentElement.addEventListener("pointerleave", resetPointer);
      } else {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("blur", resetPointer);
        document.documentElement.removeEventListener(
          "pointerleave",
          resetPointer,
        );
      }
    };

    canvas.hidden = true;
    syncAvailability();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    desktopPointer.addEventListener("change", syncAvailability);
    reducedMotion.addEventListener("change", syncAvailability);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      desktopPointer.removeEventListener("change", syncAvailability);
      reducedMotion.removeEventListener("change", syncAvailability);

      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[40] hidden md:block"
    />
  );
}
