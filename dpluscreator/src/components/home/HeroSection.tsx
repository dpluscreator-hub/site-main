"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import BookMeetingModal from "@/components/BookMeetingModal";
import LogoAnimation from "../test/LogoAnimation";

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Stacked headline lines — each rises out of its own line-mask.
// Swap these two strings for different copy; the layout is tuned for
// short (1–2 word) lines so the reveal mask stays a single line per word.
const HEADLINE_LINES = ["CREATIVE", "ENGINE"];

export default function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const reduce = useReducedMotion();

  const lineContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
  };
  const lineMask = {
    hidden: { y: "118%" },
    visible: { y: "0%", transition: { duration: 1, ease: EASE } },
  };

  return (
    <>
      <section data-nav-theme="light" className="section-pattern relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden text-dark">
        {/* Cinematic grain — a static noise texture, not an animation, so it
            adds atmosphere on the very first frame without tripping
            prefers-reduced-motion. */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
          aria-hidden="true"
        >
          <filter id="heroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>

        {/* ---------- Foreground content ---------- */}
        <div className="relative z-10 mx-auto w-full max-w-[min(94vw,72rem)] px-4 pt-24 pb-16 text-center sm:px-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mb-6 flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dark/60 sm:text-[12px] sm:tracking-[0.32em]">
              Cinematic · Interactive · Engineered
            </span>
          </motion.div>

          {/* Headline — stacked line-mask reveal */}
          <motion.h1
            variants={reduce ? undefined : lineContainer}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "visible"}
            className="uppercase leading-[0.86] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-poppins)", fontWeight: 800 }}
          >
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  variants={reduce ? undefined : lineMask}
                  className="block text-[clamp(3.5rem,15vw,11rem)]"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mx-auto mt-6 max-w-[55ch] text-base md:text-lg leading-relaxed text-dark/80"
          >
            DPLUS Creator is a creative digital agency based in India, specializing in branding, social media strategy, content creation, video production, and performance marketing for ambitious brands across the country.
          </motion.p>

          {/* Test Fragment Logo Animation */}
          {/* <LogoAnimation/> */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mx-auto mt-5 max-w-[22ch] font-serif text-[clamp(1.35rem,4.6vw,2.6rem)] italic leading-[1.15] text-dark/80 sm:mt-6"
          >
            that makes brands feel{" "}
            <span className="text-brand-primary">inevitable.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <button
              onClick={() => setIsBookingOpen(true)}
              className="group relative inline-flex w-full max-w-[230px] items-center justify-center gap-2 rounded-full bg-dark px-6 py-3.5 text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-primary hover:text-dark hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] sm:w-auto sm:text-sm md:text-base"
            >
              <span>Book a meeting</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <VideoModal />
          </motion.div>
        </div>

        {/* Scroll cue — points at the work section that now follows the hero
            directly. A line instead of a generic chevron icon, and it goes
            still (no bounce) under reduced motion. */}
        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-dark/45 transition-colors duration-300 hover:text-dark"
          aria-label="Scroll to our work"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            Our Work
          </span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-current"
            aria-hidden="true"
          />
        </motion.a>
      </section>

      <BookMeetingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}