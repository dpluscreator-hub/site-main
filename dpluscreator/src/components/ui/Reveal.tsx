"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.8, 0.2, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  duration?: number;
  once?: boolean;
};

/**
 * Block-level enter reveal — fades + slides into view once the
 * element scrolls into the viewport. Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={
        reduce ? { opacity: 1 } : { opacity: 1, y: 0 }
      }
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Per-word stagger in seconds. */
  stagger?: number;
  once?: boolean;
};

/**
 * Word-by-word masked reveal for headings — each word rises out of an
 * overflow-hidden line mask. Falls back to plain text under reduced motion.
 *
 * IMPORTANT: `whileInView` lives on the OUTER, unclipped span — not on the
 * masked word itself. An IntersectionObserver target's reported position
 * includes its CSS transform, so a word sitting at `y: "115%"` inside an
 * `overflow:hidden` wrapper is, by definition, clipped out of view at the
 * moment it's observed. If you attach `whileInView` directly to that word,
 * the observer can never report it as "in view" — it has to become visible
 * to be observed, and has to be observed to become visible. Observing the
 * plain, untransformed wrapper instead and propagating the result down via
 * variants breaks that deadlock.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word = {
    hidden: { y: "115%" },
    visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      variants={container}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          {/* No initial/whileInView here — it inherits the "hidden"/"visible"
              variant label from the parent motion.span above via context. */}
          <motion.span style={{ display: "inline-block" }} variants={word}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default Reveal;