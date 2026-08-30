"use client";

import React, { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { useMenu } from "@/context/MenuContext";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextMaskHover } from "./TextMaskHover";
import { cn } from "@/lib/utils";

export const MenuButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const [isHovered, setIsHovered] = useState(false);

  const localRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => localRef.current!);

  const textRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const circle = circleRef.current;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const iconContainer = iconContainerRef.current;

      if (!circle || !line1 || !line2 || !iconContainer) return;

      if (isHovered) {
        gsap.to(circle, {
          backgroundColor: "var(--brand)",
          borderColor: "transparent",
          duration: 0.45,
          ease: "menuEase",
        });
        gsap.to([line1, line2], {
          backgroundColor: "var(--background)",
          duration: 0.45,
          ease: "menuEase",
        });
      } else {
        gsap.to(circle, {
          backgroundColor: "transparent",
          borderColor: "#ffffff",
          duration: 0.45,
          ease: "menuEase",
        });
        gsap.to([line1, line2], {
          backgroundColor: "#ffffff",
          duration: 0.45,
          ease: "menuEase",
        });
      }

      if (isMenuOpen) {
        gsap.to(line1, { y: 0, rotation: 45, duration: 0.5, ease: "menuEase" });
        gsap.to(line2, { y: 0, rotation: 135, duration: 0.5, ease: "menuEase" });

        if (isHovered) {
          gsap.to(iconContainer, { rotation: 360, duration: 0.65, ease: "menuEase" });
        } else {
          gsap.to(iconContainer, { rotation: 0, duration: 0.65, ease: "menuEase" });
        }
      } else {
        gsap.to(iconContainer, { rotation: 0, duration: 0.5, ease: "menuEase" });

        if (isHovered) {
          gsap.to(line1, { y: 0, rotation: 0, duration: 0.5, ease: "menuEase" });
          gsap.to(line2, { y: 0, rotation: 90, duration: 0.5, ease: "menuEase" });
        } else {
          gsap.to(line1, { y: -3, rotation: 0, duration: 0.5, ease: "menuEase" });
          gsap.to(line2, { y: 3, rotation: 0, duration: 0.5, ease: "menuEase" });
        }
      }
    },
    { dependencies: [isHovered, isMenuOpen], scope: localRef }
  );

  return (
    <button
      ref={localRef}
      data-menu-button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className={cn(
        "fixed top-6 right-8 z-50 flex items-center gap-4 cursor-pointer focus:outline-none py-2",
        !isHovered && "mix-blend-difference"
      )}
    >
      <span ref={textRef} className="text-[14px] uppercase font-mono tracking-widest text-white">
        <TextMaskHover text={isMenuOpen ? "CLOSE" : "MENU"} isHovered={isHovered} />
      </span>

      <div
        ref={circleRef}
        className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center relative overflow-hidden"
      >
        <div ref={iconContainerRef} className="w-5 h-5 relative flex items-center justify-center">
          <span ref={line1Ref} className="absolute w-5 h-[1.5px] bg-white rounded-full pointer-events-none" />
          <span ref={line2Ref} className="absolute w-5 h-[1.5px] bg-white rounded-full pointer-events-none" />
        </div>
      </div>
    </button>
  );
});

MenuButton.displayName = "MenuButton";
