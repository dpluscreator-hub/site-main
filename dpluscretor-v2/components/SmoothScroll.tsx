"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMenu } from "@/context/MenuContext";

function ScrollTicker() {
  const lenis = useLenis();
  const { isMenuOpen } = useMenu();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // When GSAP pins an element (pin:true), it injects a spacer div that
    // increases the page height. Lenis's internal scroll limit stays stale
    // unless we explicitly resize it after each ScrollTrigger refresh.
    // ⚠️ Must be deferred with rAF: calling lenis.resize() synchronously
    // inside the refresh event causes Lenis to re-emit a scroll event mid-cycle,
    // which calls ScrollTrigger.update() while GSAP is still setting up pins —
    // breaking the pin completely.
    const handleRefresh = () => {
      requestAnimationFrame(() => {
        lenis.resize();
      });
    };
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      gsap.ticker.remove(updateTicker);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isMenuOpen]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <ScrollTicker />
      {children}
    </ReactLenis>
  );
}
