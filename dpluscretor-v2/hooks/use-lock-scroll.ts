// hooks/use-lock-scroll.ts
"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

export function useLockScroll(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (locked) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis.start();
      document.body.style.overflow = "";
    };
  }, [locked, lenis]);
}