"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

type HoverTextRevealProps = {
  children: string;
  className?: string;
  revealClassName?: string;
};

export function HoverTextReveal({
  children,
  className = "",
  revealClassName = "",
}: HoverTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !topRef.current || !bottomRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const topSplit = new SplitText(topRef.current!, {
        type: "chars",
        charsClass: "char",
      });

      const bottomSplit = new SplitText(bottomRef.current!, {
        type: "chars",
        charsClass: "char",
      });

      // Initial state
      gsap.set(topSplit.chars, {
        yPercent: 0,
        display: "inline-block",
      });

      gsap.set(bottomSplit.chars, {
        yPercent: 100,
        display: "inline-block",
      });

      const tl = gsap.timeline({
        paused: true,
      });

      tl.to(
        topSplit.chars,
        {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
          stagger: 0.02,
        },
        0
      ).to(
        bottomSplit.chars,
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.inOut",
          stagger: 0.02,
        },
        0
      );

      const el = containerRef.current!;

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <span
      ref={containerRef}
      className="relative inline-block overflow-hidden align-baseline"
    >
      {/* Invisible layer — reserves exact dimensions */}
      <span
        aria-hidden="true"
        className={`invisible inline-block whitespace-nowrap ${className}`}
      >
        {children}
      </span>

      {/* Original text */}
      <span
        ref={topRef}
        aria-hidden="true"
        className={`absolute inset-0 whitespace-nowrap ${className}`}
      >
        {children}
      </span>

      {/* Hover text */}
      <span
        ref={bottomRef}
        aria-hidden="true"
        className={`absolute inset-0 whitespace-nowrap ${revealClassName}`}
      >
        {children}
      </span>
    </span>
  );
}