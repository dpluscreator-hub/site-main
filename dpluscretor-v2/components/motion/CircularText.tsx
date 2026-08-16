import React, { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

export type CircularTextDirection = "clockwise" | "anticlockwise";

export interface CircularTextProps {
  /** Text to render around the circle (this is what "children" controls) */
  children: string;
  /** Diameter of the component in px */
  size?: number;
  /** Font size in px */
  fontSize?: number;
  /** Spin direction — controlled via prop */
  direction?: CircularTextDirection;
  /** Base rotation speed in degrees / second */
  speed?: number;
  /** Multiplier applied to speed on hover (speed increases on hover) */
  hoverSpeedMultiplier?: number;
  /** If true, repeats the text around the circle to fill it fully */
  duplicate?: boolean;
  /** How many times to repeat the text when duplicate = true */
  repeatCount?: number;
  /** If true, inserts a "•" dot between repeats/at the loop point */
  showDots?: boolean;
  /** Text color */
  color?: string;
  /** Letter spacing in px */
  letterSpacing?: number;
  /** Font weight */
  fontWeight?: number | string;
  /** Uppercase the text (like the shadcn/ui badge look) */
  uppercase?: boolean;
  /** Pause/slow the spin for users who prefer reduced motion */
  respectReducedMotion?: boolean;
  /** Extra class name for the wrapper */
  className?: string;
  /** Optional element rendered in the dead-center of the circle (e.g. an icon/logo) */
  centerContent?: React.ReactNode;
}

/**
 * CircularText
 * ---------------------------------------------------------------------------
 * Renders `children` curved along a circular SVG path and spins it forever.
 *
 * - direction="clockwise" | "anticlockwise"  -> controls spin direction
 * - duplicate + showDots                     -> controls whether the text
 *   repeats around the ring, and whether repeats are separated by a dot
 * - hover                                    -> speeds the rotation up
 *
 * Usage:
 *   <CircularText direction="anticlockwise" duplicate showDots>
 *     shadcn/ui components
 *   </CircularText>
 */
const CircularText: React.FC<CircularTextProps> = ({
  children,
  size = 220,
  fontSize = 18,
  direction = "clockwise",
  speed = 20,
  hoverSpeedMultiplier = 2.5,
  duplicate = true,
  repeatCount = 2,
  showDots = true,
  color = "currentColor",
  letterSpacing = 2,
  fontWeight = 600,
  uppercase = true,
  respectReducedMotion = true,
  className,
  centerContent,
}) => {
  const [hovered, setHovered] = useState(false);
  const rotate = useMotionValue(0);

  // Stable unique id so multiple instances on the same page don't clash.
  const pathId = useRef(
    `circular-text-path-${Math.random().toString(36).slice(2, 9)}`
  ).current;

  const prefersReducedMotion =
    respectReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    const dirMultiplier = direction === "clockwise" ? 1 : -1;
    const currentSpeed = hovered ? speed * hoverSpeedMultiplier : speed;
    rotate.set(rotate.get() + dirMultiplier * currentSpeed * (delta / 1000));
  });

  const separator = showDots ? " • " : " ";
  const content = duplicate
    ? Array.from({ length: Math.max(1, repeatCount) })
        .fill(children)
        .join(separator) + separator
    : children;

  const radius = size / 2 - fontSize; // leave room so glyphs don't clip the edge
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{ rotate, transformOrigin: "50% 50%", willChange: "transform" }}
      >
        <defs>
          <path
            id={pathId}
            fill="none"
            d={`M ${cx - radius},${cy}
                a ${radius},${radius} 0 1,1 ${radius * 2},0
                a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fill={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          style={{
            letterSpacing,
            textTransform: uppercase ? "uppercase" : "none",
          }}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {content}
          </textPath>
        </text>
      </motion.svg>

      {centerContent && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          {centerContent}
        </div>
      )}
    </div>
  );
};

export default CircularText;