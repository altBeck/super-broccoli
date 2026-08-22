"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./IndustrialSwitch.module.css";

type IndustrialShapeSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function IndustrialShapeSwitch({
  checked,
  onChange,
}: IndustrialShapeSwitchProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={styles.control}
      data-state={checked ? "wavy" : "straight"}
    >
      <span className={styles.label} aria-hidden="true">
        STR
      </span>

      <motion.button
        className={styles.switch}
        type="button"
        data-state={checked ? "wavy" : "straight"}
        aria-label={`Label shape: ${checked ? "wavy" : "straight"}. Click to switch.`}
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      >
        <span className={styles.outerFrame}>
          <span className={styles.well}>
            <motion.span
              className={styles.thumb}
              animate={{
                x: checked ? 36 : 0,
                rotate: reduceMotion ? 0 : checked ? 1.5 : -1.5,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 700, damping: 26, mass: 0.6 }
              }
            >
              <span className={styles.thumbHighlight} />
            </motion.span>
          </span>
        </span>
      </motion.button>

      <span className={styles.label} aria-hidden="true">
        WAV
      </span>
    </div>
  );
}
