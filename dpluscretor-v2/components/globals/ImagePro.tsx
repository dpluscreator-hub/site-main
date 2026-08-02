"use client";

import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export type ImageStatus = "loading" | "loaded" | "error";

export interface ImageProState
  extends Omit<NextImageProps, "onLoad" | "onError"> {
  containerClassName?: string;
  imageClassName?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onImageStatusChange?: (status: ImageStatus) => void;
  /** parallax on/off */
  parallax?: boolean;
  /** 0 to 1 — jitna zyada, utna zyada movement. Default 0.15 */
  parallaxStrength?: number;
}

export const ImagePro = forwardRef<HTMLDivElement, ImageProState>(
  (
    {
      src,
      alt,
      fill = false,
      width,
      height,
      containerClassName,
      imageClassName,
      aspectRatio,
      fallbackSrc = "/assets/images/fallback.jpg",
      showSkeleton = true,
      skeletonClassName,
      onLoad,
      onError,
      onImageStatusChange,
      quality = 75,
      placeholder,
      blurDataURL,
      loader,
      sizes,
      className,
      style,
      parallax = false,
      parallaxStrength = 0.15,
      ...rest
    },
    ref
  ) => {
    const [status, setStatus] = useState<ImageStatus>("loading");
    const [currentSrc, setCurrentSrc] = useState(src);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const parallaxWrapRef = useRef<HTMLDivElement>(null);
    const prevStatusRef = useRef<ImageStatus>("loading");

    useEffect(() => {
      if (prevStatusRef.current !== status) {
        prevStatusRef.current = status;
        onImageStatusChange?.(status);
      }
    }, [status, onImageStatusChange]);

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("loaded");
        onLoad?.(e);
      },
      [onLoad]
    );

    const handleError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("error");
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.(e);
      },
      [fallbackSrc, currentSrc, onError]
    );

    useEffect(() => {
      if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
        setStatus("loaded");
      }
    }, [currentSrc]);

    useEffect(() => {
      setCurrentSrc(src);
      setStatus("loading");
    }, [src]);

    // 👇 parallax effect — sirf tab chalega jab parallax=true ho
    useEffect(() => {
      if (!parallax || !containerRef.current || !parallaxWrapRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          parallaxWrapRef.current,
          { yPercent: -parallaxStrength * 100 },
          {
            yPercent: parallaxStrength * 100,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }, [parallax, parallaxStrength]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        data-image-status={status}
        className={cn(
          "relative overflow-hidden",
          !fill && "inline-block",
          containerClassName
        )}
        style={{ aspectRatio, ...style }}
      >
        {showSkeleton && status === "loading" && (
          <div
            className={cn(
              "absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800",
              skeletonClassName
            )}
          />
        )}

        {/* parallax=true hone par extra wrapper — thoda bada rakha hai (top/bottom offset)
            taaki translate hone par edges pe gap na dikhe */}
        <div
          ref={parallaxWrapRef}
          className={cn(
            parallax ? "absolute inset-0" : "contents"
          )}
          style={
            parallax
              ? {
                  top: `-${parallaxStrength * 100}%`,
                  bottom: `-${parallaxStrength * 100}%`,
                  height: `${100 + parallaxStrength * 200}%`,
                }
              : undefined
          }
        >
          <NextImage
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            fill={fill || parallax}
            width={!fill && !parallax ? width : undefined}
            height={!fill && !parallax ? height : undefined}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            loader={loader}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-opacity duration-700 ease-out",
              parallax && "object-cover",
              status === "loading" ? "opacity-0" : "opacity-100",
              imageClassName,
              className
            )}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

ImagePro.displayName = "ImagePro";