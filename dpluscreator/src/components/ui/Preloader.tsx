"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { HOME_PRELOAD_VIDEOS } from "@/lib/media";
import { lockScroll, releaseScrollLock } from "@/lib/scroll-lock";

// ─── Constants ────────────────────────────────────────────────────────────────

const PHRASES = [
  "Namaste",
  "Namaskar",
  "Kem Cho",
  "Sat Sri Akal",
  "Vanakkam",
  "Adaab",
  "Welcome"
] as const;

const LAST_PHRASE_INDEX     = PHRASES.length - 1;
const PHRASE_HOLD_MS        = 200;   // ms to hold a fully typed phrase
const EXIT_DURATION         = 1.1;   // s — total exit animation
const REDUCED_MOTION_DUR    = 350;   // ms — fallback for prefers-reduced-motion
const SETTLE_DELAY          = 600;   // ms — extra buffer after assets ready
const MAX_ASSET_WAIT        = 10_000;
const VIDEO_READY_TIMEOUT   = 4_500;
const FONT_READY_TIMEOUT    = 3_000;
const IMAGE_READY_TIMEOUT   = 5_000;
const SPRING_STIFFNESS      = 80;
const SPRING_DAMPING        = 20;
const CHAR_ENTER_STAGGER    = 0.045;
const CHAR_EXIT_STAGGER     = 0.03;
const CHAR_ENTER_DURATION   = 0.65;
const CHAR_EXIT_DURATION    = 0.35;

// Bézier used for all major transitions — cinematic deceleration
const EASE_CINEMATIC = [0.76, 0, 0.24, 1] as const;
// Softer ease for character stagger
const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1] as const;

// ─── Asset helpers ─────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<void> {
  return Promise.race([promise, delay(ms)]).then(() => undefined);
}

function waitForWindowLoad(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForFonts(): Promise<void> {
  if (!document.fonts) return Promise.resolve();
  return withTimeout(document.fonts.ready, FONT_READY_TIMEOUT);
}

function waitForImagesInDom(): Promise<void> {
  const images = Array.from(document.images).filter((img) => !img.complete);
  if (images.length === 0) return Promise.resolve();

  return withTimeout(
    Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            const done = () => resolve();
            img.addEventListener("load",  done, { once: true });
            img.addEventListener("error", done, { once: true });
          })
      )
    ),
    IMAGE_READY_TIMEOUT
  );
}

function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    let settled = false;

    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("canplay",    done);
      video.removeEventListener("error",      done);
      video.removeAttribute("src");
      video.load();
      resolve();
    };

    const timeoutId = window.setTimeout(done, VIDEO_READY_TIMEOUT);
    video.preload = "auto";
    video.muted   = true;
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("canplay",    done, { once: true });
    video.addEventListener("error",      done, { once: true });
    video.src = src;
    video.load();
  });
}

// ─── Sub-components ────────────────────────────────────────────────────────────

interface PhraseWordProps {
  text: string;
  reduceMotion: boolean;
  onEnterComplete: () => void;
}

function PhraseWord({ text, reduceMotion, onEnterComplete }: PhraseWordProps) {
  const chars = text.split("");

  if (reduceMotion) {
    return (
      <motion.span
        key={text}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="block"
        onAnimationComplete={() => onEnterComplete()}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <motion.span
      key={text}
      className="flex"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: CHAR_ENTER_STAGGER, delayChildren: 0 } },
        exit:    { transition: { staggerChildren: CHAR_EXIT_STAGGER, staggerDirection: -1 } },
      }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          onAnimationComplete={(definition) => {
            // Fire when the LAST character finishes entering
            if (definition === "visible" && i === chars.length - 1) {
              onEnterComplete();
            }
          }}
          variants={{
            hidden:  { opacity: 0, y: 48,  rotateX: -30, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              transition: {
                duration: CHAR_ENTER_DURATION,
                ease: EASE_OUT_EXPO,
              },
            },
            exit: {
              opacity: 0,
              y: -32,
              rotateX: 20,
              filter: "blur(4px)",
              transition: {
                duration: CHAR_EXIT_DURATION,
                ease: EASE_CINEMATIC,
              },
            },
          }}
          style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface ProgressBarProps {
  progress: number;
  exiting: boolean;
}

function ProgressBar({ progress, exiting }: ProgressBarProps) {
  const rawMotion = useMotionValue(0);
  const smoothed  = useSpring(rawMotion, {
    stiffness: SPRING_STIFFNESS,
    damping:   SPRING_DAMPING,
  });

  useEffect(() => {
    rawMotion.set(progress);
  }, [progress, rawMotion]);

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-[2px]"
      style={{ background: "rgba(255,255,255,0.08)" }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX:     smoothed,
          background: "var(--color-brand-primary, #fff)",
        }}
      />
    </motion.div>
  );
}

function AccentDot() {
  return (
    <motion.span
      className="block h-2.5 w-2.5 rounded-full bg-brand-primary flex-shrink-0"
      animate={{
        scale:   [1, 1.7, 1],
        opacity: [0.9, 0.4, 0.9],
      }}
      transition={{
        duration: 1.4,
        repeat:   Infinity,
        ease:     "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Unified progress hook ────────────────────────────────────────────────────

interface UsePreloaderProgressInput {
  assetsReady: boolean;
  lastPhraseEntered: boolean;
  exiting: boolean;
}

function usePreloaderProgress({
  assetsReady,
  lastPhraseEntered,
  exiting,
}: UsePreloaderProgressInput): number {
  const [progress, setProgress] = useState(0);
  const mountTimeRef = useRef(Date.now());
  const maxProgressRef = useRef(0);

  useEffect(() => {
    // Expected durations for each phase (milliseconds)
    const LOAD_PHASE_DURATION = 8000; // 8s for loading phase (assets + phrases in parallel)
    const SETTLE_PHASE_DURATION = 800; // 0.8s for settle phase (settle delay + buffer)

    const updateProgress = () => {
      const elapsed = Date.now() - mountTimeRef.current;
      let targetProgress = 0;

      if (exiting) {
        // Exit animation started — lock progress at 100%
        targetProgress = 1.0;
      } else if (lastPhraseEntered && assetsReady) {
        // Both conditions met — we're in the settle phase (85% → 100%)
        const settleElapsed = Math.max(0, elapsed - LOAD_PHASE_DURATION);
        targetProgress = 0.85 + Math.min(settleElapsed / SETTLE_PHASE_DURATION, 1) * 0.15;
      } else {
        // Still loading — progress through 0% → 85%
        targetProgress = Math.min(elapsed / LOAD_PHASE_DURATION, 0.85);
      }

      // Ensure progress never decreases and stays within [0, 1]
      targetProgress = Math.max(
        maxProgressRef.current,
        Math.min(targetProgress, 1)
      );
      maxProgressRef.current = targetProgress;

      setProgress(targetProgress);
      requestAnimationFrame(updateProgress);
    };

    const frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [assetsReady, lastPhraseEntered, exiting]);

  return progress;
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [exiting,   setExiting]   = useState(false);
  const [index,     setIndex]     = useState(0);

  const reduceMotion = useReducedMotion();
  const pathname     = usePathname();

  // ── Two flags that must both be true before we exit ──────────────────────────
  // assetsReady: all network/font/video loading is done
  // lastPhraseEntered: the final phrase has fully animated in
  const assetsReady       = useRef(false);
  const lastPhraseEntered = useRef(false);

  // Timer used only to hold a phrase before advancing to the next one
  const phraseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPhraseTimer = useCallback(() => {
    if (!phraseTimer.current) return;
    clearTimeout(phraseTimer.current);
    phraseTimer.current = null;
  }, []);

  // Called once to begin the exit sequence (idempotent via exiting ref guard)
  const triggerExit = useCallback(() => {
    setExiting(true);
    setTimeout(() => setIsLoading(false), EXIT_DURATION * 1000 + 100);
  }, []);

  // ── Scroll lock while loading ─────────────────────────────────────────────
  useEffect(() => {
    if (!isLoading) return;
    const token = lockScroll({ resetScroll: true });
    return () => releaseScrollLock(token);
  }, [isLoading]);

  // ── Called by PhraseWord when the last character finishes entering ────────
  //    This is the ONLY place that advances the index or triggers exit.
  const onEnterComplete = useCallback(() => {
    const currentIndex = index; // captured at call time

    if (currentIndex === LAST_PHRASE_INDEX) {
      // We just finished showing the final phrase.
      lastPhraseEntered.current = true;

      if (assetsReady.current) {
        // Assets already done — exit immediately after the hold
        clearPhraseTimer();
        phraseTimer.current = setTimeout(() => {
          triggerExit();
        }, PHRASE_HOLD_MS + SETTLE_DELAY);
      }
      // If assets aren't ready yet, the asset-loading effect will call
      // triggerExit() when it resolves (see below).
      return;
    }

    // Not the last phrase — schedule the next one
    clearPhraseTimer();
    phraseTimer.current = setTimeout(() => {
      setIndex((i) => i + 1);
      phraseTimer.current = null;
    }, PHRASE_HOLD_MS);
  }, [index, clearPhraseTimer, triggerExit]);

  // ── Unified progress controller ─────────────────────────────────────────
  const progress = usePreloaderProgress({
    assetsReady: assetsReady.current,
    lastPhraseEntered: lastPhraseEntered.current,
    exiting,
  });

  // ── Clean up phrase timer on unmount ──────────────────────────────────────
  useEffect(() => () => clearPhraseTimer(), [clearPhraseTimer]);

  // ── Asset loading (no fake progress) ────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const assetPromises: Promise<void>[] = [
      waitForWindowLoad(),
      waitForFonts(),
      waitForImagesInDom(),
    ];

    if (pathname === "/") {
      assetPromises.push(
        Promise.all(HOME_PRELOAD_VIDEOS.map(preloadVideo)).then(() => undefined)
      );
    }

    withTimeout(Promise.all(assetPromises), MAX_ASSET_WAIT).then(() => {
      if (cancelled) return;

      assetsReady.current = true;

      if (reduceMotion) {
        // No phrase animation — just exit after settle delay
        setTimeout(() => {
          if (!cancelled) triggerExit();
        }, SETTLE_DELAY);
        return;
      }

      // Assets done. If the last phrase has already fully entered, exit now.
      // Otherwise onEnterComplete() will call triggerExit() when it fires.
      if (lastPhraseEntered.current && !cancelled) {
        setTimeout(() => {
          if (!cancelled) triggerExit();
        }, SETTLE_DELAY);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [pathname, reduceMotion, triggerExit]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          role="status"
          aria-busy={!exiting}
          aria-live="polite"
          aria-label={`Loading — ${PHRASES[index]}`}
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: "#080808" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale:   1.035,
            filter:  "blur(12px)",
            transition: {
              duration: EXIT_DURATION,
              ease:     EASE_CINEMATIC,
            },
          }}
        >
          {/* Subtle grain texture overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize:   "160px 160px",
              opacity:          0.6,
              mixBlendMode:     "overlay",
            }}
          />

          {/* Progress bar */}
          <ProgressBar progress={progress} exiting={exiting} />

          {/* Center stage */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-6">
            <div
              className="flex items-center gap-5"
              style={{ perspective: "800px" }}
            >
              {!reduceMotion && !exiting && <AccentDot />}

              <h2
                className="
                  font-display
                  text-[clamp(3.5rem,11vw,8rem)]
                  font-bold
                  leading-[0.88]
                  tracking-[-0.055em]
                  text-white
                  select-none
                "
                aria-live="polite"
              >
                <AnimatePresence mode="wait">
                  <PhraseWord
                    key={index}
                    text={PHRASES[index]}
                    reduceMotion={reduceMotion ?? false}
                    onEnterComplete={onEnterComplete}
                  />
                </AnimatePresence>
              </h2>
            </div>

            {/* Tagline / sub-label */}
            <motion.p
              className="mt-6 text-[13px] font-medium tracking-[0.22em] uppercase text-white/30 select-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: exiting ? 0 : 1, y: exiting ? -6 : 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
            >
              Loading experience
            </motion.p>
          </div>

          {/* Bottom wordmark / brand anchor */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 z-20 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 0.25 }}
            transition={{ duration: 1, delay: 0.6 }}
            aria-hidden="true"
          >
            <span
              className="text-[11px] font-medium tracking-[0.3em] uppercase text-white"
              style={{ letterSpacing: "0.28em" }}
            >
              Digital Creator
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}