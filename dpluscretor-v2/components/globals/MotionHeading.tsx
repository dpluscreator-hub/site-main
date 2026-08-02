"use client";

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MotionHeadingProps {
  as?: ElementType;
  children: ReactNode;

  dot?: boolean;

  shadowColor?: string;
  dotShadowColor?: string;

  /** final shadow X */
  shadowX?: number;

  /** final shadow Y */
  shadowY?: number;

  /** dot shadow X */
  dotShadowX?: number;

  /** dot shadow Y */
  dotShadowY?: number;

  className?: string;
  textClassName?: string;
  dotClassName?: string;

  clipReveal?: boolean;

  clipDirection?:
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
}

export function MotionHeading({
  as: Component = "h2",
  children,

  dot,

  shadowColor = "var(--primary)",
  dotShadowColor = "rgb(0 0 0)",

  shadowX = 7,
  shadowY = 5,

  dotShadowX = 4,
  dotShadowY = 4,

  className,
  textClassName,
  dotClassName,

  clipReveal = false,
  clipDirection = "left",
}: MotionHeadingProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;

    gsap.set(text, {
      "--shadow-x": 0,
      "--shadow-y": 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        end: "top 40%",
        scrub: true,
      },
    });

    tl.to(text, {
      "--shadow-x": shadowX,
      "--shadow-y": shadowY,
      ease: "power2.out",
    });

    let dotTween: gsap.core.Tween | undefined;

    if (dot && dotRef.current) {
      gsap.set(dotRef.current, {
        "--dot-shadow-x": 0,
        "--dot-shadow-y": 0,
      });

      dotTween = gsap.to(dotRef.current, {
        "--dot-shadow-x": dotShadowX,
        "--dot-shadow-y": dotShadowY,
        ease: "power2.out",
        scrollTrigger: {
          trigger: dotRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });
    }

    return () => {
      tl.kill();
      dotTween?.kill();
    };
  }, [
    shadowX,
    shadowY,
    dot,
    dotShadowX,
    dotShadowY,
  ]);

  const getClipPath = (
    direction: NonNullable<MotionHeadingProps["clipDirection"]>
  ) => {
    switch (direction) {
      case "left":
        return {
          hidden: "inset(0 100% 0 0)",
          visible: "inset(0 0 0 0)",
        };

      case "right":
        return {
          hidden: "inset(0 0 0 100%)",
          visible: "inset(0 0 0 0)",
        };

      case "top":
        return {
          hidden: "inset(100% 0 0 0)",
          visible: "inset(0 0 0 0)",
        };

      case "bottom":
        return {
          hidden: "inset(0 0 100% 0)",
          visible: "inset(0 0 0 0)",
        };

      case "center":
        return {
          hidden: "inset(50% 50% 50% 50%)",
          visible: "inset(0 0 0 0)",
        };

      case "top-left":
        return {
          hidden: "inset(100% 100% 0 0)",
          visible: "inset(0 0 0 0)",
        };

      case "top-right":
        return {
          hidden: "inset(100% 0 0 100%)",
          visible: "inset(0 0 0 0)",
        };
      
        case "bottom-left":
        return {
          hidden: "inset(0 100% 100% 0)",
          visible: "inset(0 0 0 0)",
        };

      case "bottom-right":
        return {
          hidden: "inset(0 0 100% 100%)",
          visible: "inset(0 0 0 0)",
        };

      default:
        return {
          hidden: "inset(0 100% 0 0)",
          visible: "inset(0 0 0 0)",
        };
    }
  };

  const clip = getClipPath(clipDirection);

  return (
    <Component
      ref={ref}
      className={cn("inline-block font-black", className)}
    >
      <motion.span
        ref={textRef}
        initial={{
          opacity: 0,
          y: 80,
          ...(clipReveal && {
            clipPath: clip.hidden,
            WebkitClipPath: clip.hidden,
          }),
        }}
        animate={
          inView
            ? {
              opacity: 1,
              y: 0,
              ...(clipReveal && {
                clipPath: clip.visible,
                WebkitClipPath: clip.visible,
              }),
            }
            : {}
        }
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={
          {
            "--motion-shadow": shadowColor,
            "--shadow-x": 0,
            "--shadow-y": 0,
            filter:
              "drop-shadow(calc(var(--shadow-x) * 1px) calc(var(--shadow-y) * 1px) 0 var(--motion-shadow))",
          } as CSSProperties
        }
        className={cn(
          "font-heading text-[10vw] leading-[0.85]",
          textClassName
        )}
      >
        {children}
      </motion.span>

      {dot && (
        <motion.span
          ref={dotRef}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={
            inView
              ? {
                opacity: 1,
                scale: 1,
              }
              : {}
          }
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
          style={
            {
              "--motion-dot-shadow": dotShadowColor,
              "--dot-shadow-x": 0,
              "--dot-shadow-y": 0,
              filter:
                "drop-shadow(calc(var(--dot-shadow-x) * 1px) calc(var(--dot-shadow-y) * 1px) 0 var(--motion-dot-shadow))",
            } as CSSProperties
          }
          className={cn(
            "-ml-5 mb-4 font-mono text-[7vw] text-primary",
            dotClassName
          )}
        >
          .
          </motion.span>
      )}
    </Component>
  );
}
