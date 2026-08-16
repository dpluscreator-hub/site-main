"use client";

import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  animateBy?: "words" | "letters";
  delay?: number;
  duration?: number;
  once?: boolean
  direction?: "top" | "bottom";
}

export default function BlurText({
  text,
  className = "",
  animateBy = "words",
  delay = 0.06,
  once= true,
  duration = 0.6,
  direction = "bottom",
}: BlurTextProps) {
  const items =
    animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <motion.p
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(12px)",
              y: direction === "top" ? -25 : 25,
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                duration,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          style={{
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {item}
          {animateBy === "words" && index < items.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.p>
  );
}