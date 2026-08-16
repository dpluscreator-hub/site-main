"use client"

import { cn } from "@/lib/utils";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

interface HeroVideoPlayerProps {
  src: string;
  poster: string;
}

export const HeroVideoPlayer = forwardRef<HTMLDivElement, HeroVideoPlayerProps>(
  ({ src, poster }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Sync media event listeners
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onVolumeChange = () => setIsMuted(video.muted);

      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);
      video.addEventListener("volumechange", onVolumeChange);

      return () => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPause);
        video.removeEventListener("volumechange", onVolumeChange);
      };
    }, []);

    // Helper to get active fullscreen element across browsers
    const getFullscreenElement = useCallback(() => {
      if (typeof document === "undefined") return null;
      return (
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement ||
        null
      );
    }, []);

    // Fullscreen change listener across all browser engines
    useEffect(() => {
      const onFullscreenChange = () => {
        const isFull = !!getFullscreenElement();
        setIsFullscreen(isFull);
      };

      document.addEventListener("fullscreenchange", onFullscreenChange);
      document.addEventListener("webkitfullscreenchange", onFullscreenChange);
      document.addEventListener("mozfullscreenchange", onFullscreenChange);
      document.addEventListener("MSFullscreenChange", onFullscreenChange);

      const video = videoRef.current;
      const onVideoEndFullscreen = () => setIsFullscreen(false);
      if (video) {
        video.addEventListener("webkitendfullscreen", onVideoEndFullscreen);
      }

      return () => {
        document.removeEventListener("fullscreenchange", onFullscreenChange);
        document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
        document.removeEventListener("mozfullscreenchange", onFullscreenChange);
        document.removeEventListener("MSFullscreenChange", onFullscreenChange);
        if (video) {
          video.removeEventListener("webkitendfullscreen", onVideoEndFullscreen);
        }
      };
    }, [getFullscreenElement]);

    const togglePlay = useCallback((e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;

      if (video.paused) {
        video.play().catch(() => { });
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }, []);

    const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    };

    const toggleFullscreen = async (
      e: React.MouseEvent
    ) => {
      e.stopPropagation();

      const container = containerRef.current;

      if (!container) return;

      try {
        const fullElem = getFullscreenElement();

        if (!fullElem) {
          if (container.requestFullscreen) {
            await container.requestFullscreen();
          } else if (
            (container as any).webkitRequestFullscreen
          ) {
            await (container as any).webkitRequestFullscreen();
          } else if (
            (container as any).mozRequestFullScreen
          ) {
            await (container as any).mozRequestFullScreen();
          } else if (
            (container as any).msRequestFullscreen
          ) {
            await (container as any).msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if (
            (document as any).webkitExitFullscreen
          ) {
            await (document as any).webkitExitFullscreen();
          } else if (
            (document as any).mozCancelFullScreen
          ) {
            await (document as any).mozCancelFullScreen();
          } else if (
            (document as any).msExitFullscreen
          ) {
            await (document as any).msExitFullscreen();
          }
        }
      } catch (error) {
        console.error(
          "Fullscreen toggle error:",
          error
        );
      }
    };

    const handleMouseMove = () => {
      setShowControls(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (isPlaying) {
        hideTimeoutRef.current = setTimeout(() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }, 2500);
      }
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }}
        onClick={togglePlay}
        className="hero-header-vid group select-none"
      >
        <video
          ref={videoRef}
          src={src}
          loop
          poster={poster}
          preload="auto"
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Center Floating Play/Pause Button */}
        {(!isPlaying || showControls) && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 sm:size-20 rounded-full",
              "bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center",
              "transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground cursor-pointer shadow-2xl z-20",
              isPlaying ? "opacity-0 group-hover:opacity-90" : "opacity-100 scale-100 shadow-primary/20"
            )}
          >
            {isPlaying ? (
              <Pause className="size-7 sm:size-8 fill-current" />
            ) : (
              <Play className="size-7 sm:size-8 fill-current ml-1" />
            )}
          </button>
        )}

        {/* Bottom Floating Glassmorphic Pill Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6",
            "bg-black/70 backdrop-blur-xl border border-white/15 rounded-full px-5 py-3 text-white z-20",
            "flex items-center justify-between transition-all duration-300 shadow-2xl",
            !isPlaying || showControls
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              className="hover:text-primary transition-colors p-1 cursor-pointer flex items-center gap-2"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-5 fill-current" />
              ) : (
                <Play className="size-5 fill-current" />
              )}
              <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline">
                {isPlaying ? "Pause" : "Play"}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="hover:text-primary transition-colors p-1 cursor-pointer flex items-center gap-2"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="size-5 text-red-400" /> : <Volume2 className="size-5" />}
              <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline">
                {isMuted ? "Muted" : "Sound On"}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="hover:text-primary transition-colors p-1 cursor-pointer flex items-center gap-2"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
              <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline">
                {isFullscreen ? "Exit" : "Fullscreen"}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

HeroVideoPlayer.displayName = "HeroVideoPlayer";