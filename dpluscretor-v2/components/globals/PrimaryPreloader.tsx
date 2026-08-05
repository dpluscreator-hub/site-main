// components/globals/providers/PrimaryPreloader.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LogoOutline from '@/assets/preloader/OutlineLogo';
import LogoFill from '@/assets/preloader/FillLogo';

type FracturePoint = readonly [number, number];

const LOGO_VIEW_BOX = {
    width: 314,
    height: 138,
} as const;

const FRACTURE_POINTS: readonly FracturePoint[] = [
    [157, 0],
    [149, 14],
    [165, 28],
    [153, 42],
    [168, 57],
    [151, 73],
    [162, 89],
    [146, 106],
    [159, 122],
    [152, 138],
];

const TIMING = {
    intro: 0.85,
    fill: 2.35,
    glowIn: 0.18,
    glowOut: 0.38,
    hold: 0.32,
    crackFlashIn: 0.01,
    crackDraw: 0.18,
    crackFade: 0.22,
    crackFadeDelay: 0.12,
    splitDelay: 0.18,
    split: 0.78,
    rootFade: 0.58,
    rootFadeDelay: 0.2,
    reducedHold: 0.3,
    reducedFade: 0.4,
} as const;

const SPLIT_MOTION = {
    left: {
        xPercent: -48,
        x: -90,
        rotation: -7,
        transformOrigin: '42% 50%',
    },
    right: {
        xPercent: 48,
        x: 90,
        rotation: 7,
        transformOrigin: '58% 50%',
    },
    blur: 'blur(8px)',
} as const;

const CRACK_STROKE_WIDTH = 3.4;
const EMPTY_FILL_CLIP_PATH = 'inset(100% 0% 0% 0%)';
const FULL_FILL_CLIP_PATH = 'inset(0% 0% 0% 0%)';
const RESTING_GLOW = 'drop-shadow(0 0 14px rgba(245, 166, 35, 0.18))';
const PEAK_GLOW =
    'drop-shadow(0 0 28px rgba(245, 166, 35, 0.78)) drop-shadow(0 0 54px rgba(245, 166, 35, 0.34))';

const toPercent = (value: number, total: number) =>
    `${((value / total) * 100).toFixed(2)}%`;

const toClipPoint = ([x, y]: FracturePoint) =>
    `${toPercent(x, LOGO_VIEW_BOX.width)} ${toPercent(y, LOGO_VIEW_BOX.height)}`;

const FRACTURE_CLIP_POINTS = FRACTURE_POINTS.map(toClipPoint);
const FRACTURE_POLYLINE_POINTS = FRACTURE_POINTS.map(([x, y]) => `${x},${y}`).join(' ');
const LEFT_FRACTURE_CLIP_PATH = `polygon(0% 0%, ${FRACTURE_CLIP_POINTS.join(', ')}, 0% 100%)`;
const RIGHT_FRACTURE_CLIP_PATH = `polygon(${FRACTURE_CLIP_POINTS[0]}, 100% 0%, 100% 100%, ${[
    ...FRACTURE_CLIP_POINTS,
].reverse().join(', ')})`;

export default function PrimaryPreloader({
    reduced,
    onDone,
}: {
    reduced: boolean;
    onDone: () => void;
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    const logoShellRef = useRef<HTMLDivElement>(null);
    const fullLogoRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const crackLineRef = useRef<SVGPolylineElement>(null);
    const splitLeftRef = useRef<HTMLDivElement>(null);
    const splitRightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const logoShell = logoShellRef.current;
        const fullLogo = fullLogoRef.current;
        const fill = fillRef.current;
        const crackLine = crackLineRef.current;
        const splitLeft = splitLeftRef.current;
        const splitRight = splitRightRef.current;

        if (!root || !logoShell || !fullLogo || !fill || !crackLine || !splitLeft || !splitRight) {
            onDone();
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: onDone,
            });

            if (reduced) {
                tl.set(logoShell, { autoAlpha: 1, scale: 1 })
                    .set(fill, { clipPath: FULL_FILL_CLIP_PATH })
                    .to(root, {
                        autoAlpha: 0,
                        duration: TIMING.reducedFade,
                        delay: TIMING.reducedHold,
                        ease: 'power1.out',
                    });
                return;
            }

            const crackLength = crackLine.getTotalLength();

            tl.set(root, { autoAlpha: 1 })
                .set(logoShell, {
                    autoAlpha: 0,
                    scale: 0.88,
                    transformOrigin: '50% 50%',
                    filter: 'drop-shadow(0 0 0 rgba(245, 166, 35, 0))',
                    force3D: true,
                })
                .set(fullLogo, { autoAlpha: 1 })
                .set(fill, { clipPath: EMPTY_FILL_CLIP_PATH })
                .set(splitLeft, {
                    autoAlpha: 0,
                    clipPath: LEFT_FRACTURE_CLIP_PATH,
                    transformOrigin: SPLIT_MOTION.left.transformOrigin,
                    force3D: true,
                })
                .set(splitRight, {
                    autoAlpha: 0,
                    clipPath: RIGHT_FRACTURE_CLIP_PATH,
                    transformOrigin: SPLIT_MOTION.right.transformOrigin,
                    force3D: true,
                })
                .set(crackLine, {
                    autoAlpha: 0,
                    strokeDasharray: crackLength,
                    strokeDashoffset: crackLength,
                })
                .to(logoShell, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: TIMING.intro,
                    ease: 'power3.out',
                })
                .to(fill, {
                    clipPath: FULL_FILL_CLIP_PATH,
                    duration: TIMING.fill,
                    ease: 'expo.inOut',
                })
                .to(logoShell, {
                    scale: 1.04,
                    filter: PEAK_GLOW,
                    duration: TIMING.glowIn,
                    ease: 'power2.out',
                })
                .to(logoShell, {
                    scale: 1,
                    filter: RESTING_GLOW,
                    duration: TIMING.glowOut,
                    ease: 'power3.out',
                })
                .to({}, { duration: TIMING.hold })
                .add('fracture')
                .to(crackLine, { autoAlpha: 1, duration: TIMING.crackFlashIn }, 'fracture')
                .to(
                    crackLine,
                    {
                        strokeDashoffset: 0,
                        duration: TIMING.crackDraw,
                        ease: 'power3.out',
                    },
                    'fracture'
                )
                .to(
                    crackLine,
                    {
                        autoAlpha: 0,
                        duration: TIMING.crackFade,
                        ease: 'power2.out',
                    },
                    `fracture+=${TIMING.crackFadeDelay}`
                )
                .add('split', `fracture+=${TIMING.splitDelay}`)
                .set([splitLeft, splitRight], { autoAlpha: 1 }, 'split')
                .set(fullLogo, { autoAlpha: 0 }, 'split')
                .to(
                    splitLeft,
                    {
                        xPercent: SPLIT_MOTION.left.xPercent,
                        x: SPLIT_MOTION.left.x,
                        rotation: SPLIT_MOTION.left.rotation,
                        filter: SPLIT_MOTION.blur,
                        autoAlpha: 0,
                        duration: TIMING.split,
                        ease: 'power4.in',
                        force3D: true,
                    },
                    'split'
                )
                .to(
                    splitRight,
                    {
                        xPercent: SPLIT_MOTION.right.xPercent,
                        x: SPLIT_MOTION.right.x,
                        rotation: SPLIT_MOTION.right.rotation,
                        filter: SPLIT_MOTION.blur,
                        autoAlpha: 0,
                        duration: TIMING.split,
                        ease: 'power4.in',
                        force3D: true,
                    },
                    'split'
                )
                .to(
                    root,
                    {
                        autoAlpha: 0,
                        duration: TIMING.rootFade,
                        ease: 'power2.out',
                    },
                    `split+=${TIMING.rootFadeDelay}`
                );
        }, root);

        return () => ctx.revert();
    }, [reduced, onDone]);

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
        >
            <div
                ref={logoShellRef}
                className="relative aspect-[314/138] w-[clamp(14rem,38vw,22rem)] opacity-0 will-change-transform"
            >
                <div ref={fullLogoRef} className="absolute inset-0">
                    <div className="absolute inset-0 opacity-25 [&>svg]:h-full [&>svg]:w-full">
                        <LogoOutline />
                    </div>

                    <div
                        ref={fillRef}
                        className="absolute inset-0 will-change-[clip-path] [&>svg]:h-full [&>svg]:w-full"
                        style={{ clipPath: EMPTY_FILL_CLIP_PATH }}
                    >
                        <LogoFill />
                    </div>
                </div>

                <div
                    ref={splitLeftRef}
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 will-change-[clip-path] [&>svg]:h-full [&>svg]:w-full"
                    style={{ clipPath: LEFT_FRACTURE_CLIP_PATH }}
                >
                    <LogoFill />
                </div>

                <div
                    ref={splitRightRef}
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 will-change-[clip-path] [&>svg]:h-full [&>svg]:w-full"
                    style={{ clipPath: RIGHT_FRACTURE_CLIP_PATH }}
                >
                    <LogoFill />
                </div>

                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
                    fill="none"
                    viewBox={`0 0 ${LOGO_VIEW_BOX.width} ${LOGO_VIEW_BOX.height}`}
                >
                    <polyline
                        ref={crackLineRef}
                        points={FRACTURE_POLYLINE_POINTS}
                        stroke="#fff4dc"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={CRACK_STROKE_WIDTH}
                        style={{
                            filter: 'drop-shadow(0 0 10px rgba(245, 166, 35, 0.9))',
                            opacity: 0,
                        }}
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>
        </div>
    );
}
