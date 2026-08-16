// RevealImage.tsx — with revealType variants (clip / blur / grayscale / pixelate via DOM grid)
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, type TargetAndTransition } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImagePro, type ImageProState } from "@/components/globals/ImagePro";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type RevealType = "clip" | "blur" | "grayscale" | "pixelate";

interface RevealImageProps extends ImageProState {
  revealType?: RevealType;
  revealDirection?: RevealDirection; // sirf revealType="clip" ke liye
  revealDuration?: number;
  revealDelay?: number;
  revealStart?: string;
  wrapperClassName?: string;
  blurAmount?: number; // revealType="blur" ke liye
  pixelSize?: number; // revealType="pixelate" ke liye — grid tile size (px), default 30
  tileColor?: string; // pixelate tiles ka color, default neutral skeleton color
}

const clipPaths: Record<
  RevealDirection,
  { hidden: string; visible: string }
> = {
  left: { hidden: "inset(0 100% 0 0)", visible: "inset(0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0)" },
  top: { hidden: "inset(100% 0 0 0)", visible: "inset(0)" },
  bottom: { hidden: "inset(0 0 100% 0)", visible: "inset(0)" },
  center: { hidden: "inset(50% 50% 50% 50%)", visible: "inset(0)" },
  "top-left": { hidden: "inset(100% 100% 0 0)", visible: "inset(0)" },
  "top-right": { hidden: "inset(100% 0 0 100%)", visible: "inset(0)" },
  "bottom-left": { hidden: "inset(0 100% 100% 0)", visible: "inset(0)" },
  "bottom-right": { hidden: "inset(0 0 100% 100%)", visible: "inset(0)" },
} satisfies Record<RevealDirection, { hidden: string; visible: string }>;

interface GridTile {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export function RevealImage({
  revealType = "clip",
  revealDirection = "left",
  revealDuration = 0.9,
  revealDelay = 0,
  revealStart = "top 80%",
  wrapperClassName,
  blurAmount = 20,
  pixelSize = 30,
  tileColor,
  containerClassName,
  ...imageProps
}: RevealImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tilesLayerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [grid, setGrid] = useState<GridTile[]>([]);
  const [tilesDone, setTilesDone] = useState(false);

  // ScrollTrigger — jab wrapper viewport mein enter kare
  useEffect(() => {
    if (!wrapperRef.current) return;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: revealStart,
      once: true,
      onEnter: () => setInView(true),
    });

    return () => st.kill();
  }, [revealStart]);

  useEffect(() => {
    if (!loaded) return;
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [loaded]);

  const revealed = inView && loaded;

 // pixelate ke liye grid tiles ka size wrapper ke actual width/height ke hisaab se compute karo
  // ab tiles uniform nahi — squares + horizontal rects + vertical rects mix hote hain
  const computeGrid = useCallback(() => {
    if (!wrapperRef.current) return;
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    if (!width || !height) return;

    const base = pixelSize / 2; // base unit cell size, e.g. pixelSize=30 → base=15
    const cols = Math.ceil(width / base);
    const rows = Math.ceil(height / base);

    // occupied[r][c] = true matlab wo base-cell kisi tile mein use ho chuka hai
    const occupied: boolean[][] = Array.from({ length: rows }, () =>
      new Array(cols).fill(false)
    );

    const canPlace = (r: number, c: number, h: number, w: number) => {
      if (r + h > rows || c + w > cols) return false;
      for (let rr = r; rr < r + h; rr++) {
        for (let cc = c; cc < c + w; cc++) {
          if (occupied[rr][cc]) return false;
        }
      }
      return true;
    };

    const markPlaced = (r: number, c: number, h: number, w: number) => {
      for (let rr = r; rr < r + h; rr++) {
        for (let cc = c; cc < c + w; cc++) {
          occupied[rr][cc] = true;
        }
      }
    };

    // shape options: [rowSpan, colSpan] — 2x2 (bada square), 2x1 (vertical rect),
    // 1x2 (horizontal rect), 1x1 (chhota square)
    const shapeOptions: Array<[number, number]> = [
      [2, 2], // bada square 30x30
      [2, 1], // vertical rect 15x30
      [1, 2], // horizontal rect 30x15
      [1, 1], // chhota square 15x15
    ];

    const tiles: GridTile[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (occupied[r][c]) continue;

        // shuffled order mein try karo taaki mix randomly ho, koi pattern repeat na ho
        const shuffled = [...shapeOptions].sort(() => Math.random() - 0.5);
        let placed = false;

        for (const [h, w] of shuffled) {
          if (canPlace(r, c, h, w)) {
            markPlaced(r, c, h, w);
            tiles.push({
              id: `${r}-${c}`,
              left: c * base,
              top: r * base,
              width: w * base,
              height: h * base,
            });
            placed = true;
            break;
          }
        }

        // fallback (edge cells jahan bade shapes fit nahi hote)
        if (!placed) {
          markPlaced(r, c, 1, 1);
          tiles.push({
            id: `${r}-${c}`,
            left: c * base,
            top: r * base,
            width: base,
            height: base,
          });
        }
      }
    }

    setGrid(tiles);
  }, [pixelSize]);

  // resize par grid recompute karo (sirf pixelate variant ke liye)
  useEffect(() => {
    if (revealType !== "pixelate" || !wrapperRef.current) return;

    computeGrid();

    const ro = new ResizeObserver(() => {
      // agar reveal already ho chuka hai to grid dobara mat banao (tiles unmount ho chuke honge)
      if (!tilesDone) computeGrid();
    });
    ro.observe(wrapperRef.current);

    return () => ro.disconnect();
  }, [revealType, computeGrid, tilesDone]);

  // grid ban jaane ke baad, revealed hote hi tiles ko randomly staggered fade+scale out karo
  useEffect(() => {
    if (revealType !== "pixelate") return;
    if (!revealed || grid.length === 0 || tilesDone) return;

    const elements = grid
      .map((t) => tileRefs.current.get(t.id))
      .filter((el): el is HTMLDivElement => Boolean(el));

    if (elements.length === 0) return;

    const tween = gsap.to(elements, {
      opacity: 0,
      scale: 0.2,
      duration: Math.max(revealDuration * 0.35, 0.15),
      delay: revealDelay,
      ease: "power3.out",
      stagger: {
        each: 0,
        amount: revealDuration * 0.75, // poore grid ka total spread time
        from: "random", // 👈 yahi random-order wala effect deta hai
      },
      onComplete: () => setTilesDone(true), // animation ke baad tiles ko DOM se hata do
    });

    return () => {
      tween.kill();
    };
  }, [revealed, grid, revealType, revealDuration, revealDelay, tilesDone]);

  const clip = clipPaths[revealDirection];

  let hiddenAnimate: TargetAndTransition = {};
  let visibleAnimate: TargetAndTransition = {};

  switch (revealType) {
    case "blur":
      hiddenAnimate = { clipPath: "inset(0)", filter: `blur(${blurAmount}px)`, opacity: 0.4 };
      visibleAnimate = { clipPath: "inset(0)", filter: "blur(0px)", opacity: 1 };
      break;
    case "grayscale":
      hiddenAnimate = {
        clipPath: "inset(0)",
        filter: "grayscale(1) brightness(0.85)",
        opacity: 0.5,
      };
      visibleAnimate = {
        clipPath: "inset(0)",
        filter: "grayscale(0) brightness(1)",
        opacity: 1,
      };
      break;
    case "pixelate":
      // yahan koi clipPath/filter animate nahi hota — tiles GSAP se alag handle ho rahe hain
      hiddenAnimate = { clipPath: "inset(0)" };
      visibleAnimate = { clipPath: "inset(0)" };
      break;
    case "clip":
    default:
      hiddenAnimate = { clipPath: clip.hidden };
      visibleAnimate = { clipPath: clip.visible };
      break;
  }

  return (
    <motion.div
      ref={wrapperRef}
      className={cn(wrapperClassName ?? containerClassName)}
      style={{ position: "relative", overflow: "hidden", minHeight: "1px" }}
      initial={false}
      animate={revealed ? visibleAnimate : hiddenAnimate}
      transition={{
        duration: revealDuration,
        delay: revealDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ImagePro
        {...imageProps}
        containerClassName="min-h-full w-full"
        onImageStatusChange={(status) => {
          if (status === "loaded") setLoaded(true);
          imageProps.onImageStatusChange?.(status);
        }}
      />

      {revealType === "pixelate" && !tilesDone && (
        <div
          ref={tilesLayerRef}
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        >
          {grid.map((tile) => (
            <div
              key={tile.id}
              ref={(el) => {
                if (el) tileRefs.current.set(tile.id, el);
                else tileRefs.current.delete(tile.id);
              }}
              className={cn(
                "absolute",
                !tileColor && "bg-neutral-300 dark:bg-neutral-700"
              )}
              style={{
                left: tile.left,
                top: tile.top,
                width: tile.width,
                height: tile.height,
                backgroundColor: tileColor,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}