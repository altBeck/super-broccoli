"use client";

import { animate, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { IndustrialShapeSwitch } from "./IndustrialShapeSwitch";

const WAV_SCALE = 16;

export function HeroShapeControl() {
  const [isWavy, setIsWavy] = useState(true);
  const reduceMotion = useReducedMotion();
  const scale = useMotionValue(WAV_SCALE);

  useEffect(() => {
    return scale.on("change", (value) => {
      document
        .getElementById("hero-strip-displacement")
        ?.setAttribute("scale", value.toFixed(2));
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
    <IndustrialShapeSwitch
      checked={isWavy}
      onChange={() => setIsWavy((value) => !value)}
    />
  );
}
