"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

// Persists across client-side navigations (template re-mounts per route) but
// resets on a full reload. Lets us skip the entrance on first paint — so the
// SSR'd HTML is never hidden — and only animate on subsequent route changes.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isFirstPaint = !hasNavigated;

  if (typeof window !== "undefined") {
    hasNavigated = true;
  }

  return (
    <motion.div
      key={pathname}
      initial={isFirstPaint || reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
