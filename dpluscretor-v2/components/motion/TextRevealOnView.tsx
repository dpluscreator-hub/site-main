"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(SplitText);

type TextRevealOnViewProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean
};

export function TextRevealOnView({ children, className = "", once=true }: TextRevealOnViewProps) {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: once,
    threshold: 0.2,
  });

  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current || !inView) return;

    let split: SplitText;
    let tween: gsap.core.Tween;

    document.fonts.ready.then(() => {
      if (!innerRef.current) return;

      split = new SplitText(innerRef.current, {
        type: "lines",
        linesClass: "reveal-line",
      });

      // set initial state explicitly before animating in — avoids any FOUC flash
      gsap.set(split.lines, {
        y: "110%",
        opacity: 0,
        rotateX: 40,
        filter: "blur(2px)",
        transformOrigin: "50% 100%",
        force3D: true,
      });

      tween = gsap.to(split.lines, {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "expo.out",
        stagger: {
          each: 0.12,
          from: "start",
        },
      });
    });

    return () => {
      tween?.kill();
      split?.revert();
    };
  }, [inView]);

  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    inViewRef(node);
  };

  return (
    <div ref={setRefs} className={className}>
      {children}
    </div>
  );
}