"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { lockScroll, releaseScrollLock } from "@/lib/scroll-lock";

// --- Framer Motion Animation Configs with TypeScript Variants ---
// backdropFilter stays constant — animating opacity only avoids the browser
// having to re-sample the blur radius on every frame.
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: 30 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    y: 30,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
};

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollLockRef = useRef<symbol | null>(null);

  // Check for video existence
  useEffect(() => {
    setMounted(true);
    fetch("/assets/intro-video.mp4", { method: "HEAD" })
      .then((res) => setHasVideo(res.ok))
      .catch(() => setHasVideo(false));
  }, []);

  // Handle ESC key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  // Lock body scroll and handle event listeners when open
  useEffect(() => {
    if (isOpen) {
      if (!scrollLockRef.current) {
        scrollLockRef.current = lockScroll();
      }
      window.addEventListener("keydown", handleKeyDown);
    } else {
      releaseScrollLock(scrollLockRef.current);
      scrollLockRef.current = null;
      setIsVideoLoading(true); // Reset loading state for next open
    }

    return () => {
      releaseScrollLock(scrollLockRef.current);
      scrollLockRef.current = null;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setIsOpen(false)}
          style={{ backdropFilter: "blur(16px)" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Intro video"
            className="group relative w-full max-w-[400px] overflow-hidden rounded-[32px] bg-neutral-900 shadow-[0_0_80px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
            style={{ aspectRatio: "9/16" }}
          >
            {/* Cinematic Gradient Overlay (Top & Bottom) */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Close Button - Glassmorphic */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-red-400 active:scale-95"
              aria-label="Close video"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Content */}
            {hasVideo ? (
              <>
                {/* Loading Spinner Overlay */}
                {isVideoLoading && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-900">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                  </div>
                )}

                <video
                  ref={videoRef}
                  src="/assets/intro-video.mp4"
                  controls
                  autoPlay
                  playsInline
                  onLoadedData={() => setIsVideoLoading(false)}
                  className="h-full w-full object-cover transition-opacity duration-500"
                  style={{ opacity: isVideoLoading ? 0 : 1 }}
                />
              </>
            ) : (
              // Empty State - Premium Design
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-neutral-800 to-neutral-950 p-8 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <svg className="h-8 w-8 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium tracking-tight text-white">Coming soon</h3>
                <p className="text-sm font-light text-white/50">Our intro video is on its way. Check back shortly.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Trigger button — dark-on-light, since this only sits on the light Hero */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-4 rounded-full bg-dark/5 py-2 pl-2 pr-6 ring-1 ring-dark/10 transition-all duration-300 hover:bg-dark/8 hover:ring-dark/15 active:scale-95"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623] shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFB033] group-hover:shadow-[0_0_25px_rgba(245,166,35,0.6)]">
          <svg className="ml-1 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-sm font-medium tracking-wide text-dark/80">
          Watch Intro
        </span>
      </button>

      {/* Portal Render */}
      {mounted && createPortal(modalContent, document.getElementById("modal-root") || document.body)}
    </>
  );
}
