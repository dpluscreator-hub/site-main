// components/globals/MenuOverlay.tsx
"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLockScroll } from "@/hooks/use-lock-scroll";

interface MenuOverlayProps {
  open: boolean;
  /** navbar ki height jitni offset se overlay start hoga — Navbar ka h-22.5 match karo */
  topOffsetClassName?: string;
  children: React.ReactNode;
  className?: string;
}

export function MenuOverlay({
  open,
  topOffsetClassName = "top-22.5",
  children,
  className,
}: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstRun = useRef(true);

  useLockScroll(open);

  // Build the timeline ONCE — never rebuild it on `open` changes.
  useEffect(() => {
    const overlayEl = overlayRef.current;
    const contentEl = contentRef.current;
    if (!overlayEl || !contentEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.set(overlayEl, { display: "block" })
        .fromTo(
          overlayEl,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.7,
            ease: "cubic-bezier(0.22,1,0.36,1)",
          }
        )
        .fromTo(
          contentEl.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.35"
        );

      tlRef.current = tl;
    }, overlayEl);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []); // <-- built once, not tied to `open`

  // Just drive the SAME timeline forward/backward.
  useEffect(() => {
    const tl = tlRef.current;
    const overlayEl = overlayRef.current;
    if (!tl || !overlayEl) return;

    // skip on initial mount when overlay starts closed — nothing to reverse yet
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (!open) return;
    }

    if (open) {
      tl.eventCallback("onReverseComplete", null);
      tl.play();
    } else {
      tl.eventCallback("onReverseComplete", () => {
        gsap.set(overlayEl, { display: "none" });
      });
      tl.reverse();
    }
  }, [open]);

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed left-0 right-0 bottom-0 z-40 bg-background hidden",
        topOffsetClassName,
        className
      )}
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <div ref={contentRef} className="h-full w-full px-48">
        {children}
      </div>
    </div>
  );
}