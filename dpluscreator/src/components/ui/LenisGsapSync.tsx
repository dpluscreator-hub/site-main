"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Keeps GSAP ScrollTrigger perfectly in sync with Lenis smooth scroll, so
 * scrubbed scroll animations (ProjectShowcase, hero parallax) stay frame-tight.
 * Renders nothing.
 */
export default function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    let didScroll = false;

    const markScroll = () => {
      didScroll = true;
    };

    const tickLenis = (time: number) => {
      didScroll = false;
      lenis.raf(time * 1000);
      if (didScroll) {
        ScrollTrigger.update();
      }
    };

    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    lenis.on("scroll", markScroll);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    const refreshId = window.setTimeout(refresh, 50);

    return () => {
      window.clearTimeout(refreshId);
      lenis.off("scroll", markScroll);
      gsap.ticker.remove(tickLenis);
    };
  }, [lenis]);

  return null;
}
