"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import smile from "@/images/hero-img/smile.png";

export function Smiley() {
  const [turns, setTurns] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <button
      className="smiley"
      type="button"
      aria-label="Spin the smiley"
      onClick={() => setTurns((value) => value + 1)}
    >
      <motion.span
        animate={{ rotate: 30 + turns * 360 }}
        transition={{
          duration: reduceMotion ? 0 : 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image src={smile} alt="" sizes="64px" />
      </motion.span>
    </button>
  );
}
