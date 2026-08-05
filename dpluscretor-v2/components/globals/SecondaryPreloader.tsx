// components/globals/providers/SecondaryPreloader.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LogoOutline from '@/assets/preloader/OutlineLogo';
import LogoFill from '@/assets/preloader/FillLogo';

const EMPTY_FILL_CLIP_PATH = 'inset(100% 0% 0% 0%)';
const FULL_FILL_CLIP_PATH = 'inset(0% 0% 0% 0%)';

export default function SecondaryPreloader({
    reduced,
    onDone,
}: {
    reduced: boolean;
    onDone: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: onDone,
            });

            if (reduced) {
                tl.set(fillRef.current, { clipPath: FULL_FILL_CLIP_PATH })
                    .to(rootRef.current, { opacity: 0, duration: 0.4, delay: 0.3 });
                return;
            }

            tl.set(fillRef.current, { clipPath: EMPTY_FILL_CLIP_PATH })
                .to(fillRef.current, {
                    clipPath: FULL_FILL_CLIP_PATH,
                    duration: 1.6,
                    ease: 'power2.inOut',
                })
                .to({}, { duration: 0.3 })
                .to(rootRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power1.out',
                });
        }, containerRef);

        return () => ctx.revert();
    }, [reduced, onDone]);

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
        >
            <div
                ref={containerRef}
                className="relative aspect-[314/138] w-[clamp(14rem,38vw,22rem)] will-change-transform"
            >
                <LogoOutline className="absolute inset-0 h-full w-full opacity-25" />

                <div
                    ref={fillRef}
                    className="absolute inset-0 h-full w-full will-change-[clip-path]"
                    style={{ clipPath: EMPTY_FILL_CLIP_PATH }}
                >
                    <LogoFill className="h-full w-full" />
                </div>
            </div>
        </div>
    );
}
