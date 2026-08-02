// components/globals/providers/SecondaryPreloader.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LogoOutline from '@/assets/preloader/OutlineLogo';
import LogoFill from '@/assets/preloader/FillLogo';

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
                // Reduced motion: simple opacity fade, no fill animation
                tl.set(fillRef.current, { clipPath: 'inset(0% 0% 0% 0%)' })
                    .to(rootRef.current, { opacity: 0, duration: 0.4, delay: 0.3 });
                return;
            }

            // Start fully "empty" — clipped from the top (nothing visible)
            tl.set(fillRef.current, { clipPath: 'inset(100% 0% 0% 0%)' })
                // Fill bottom → top by animating the top-inset down to 0
                .to(fillRef.current, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.6,
                    ease: 'power2.inOut',
                })
                // Small hold so the completed logo is visible for a beat
                .to({}, { duration: 0.3 })
                // Fade whole preloader out
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
            className="h-full w-full bg-black flex items-center justify-center"
        >
            <div ref={containerRef} className="relative w-40 h-40">
                {/* Base layer — dim outline, no color override needed, color is baked in */}
                <LogoOutline className="absolute inset-0 w-full h-full opacity-25" />

                {/* Fill layer — solid brand color, clipped bottom-to-top */}
                <div ref={fillRef} className="absolute inset-0 w-full h-full">
                    <LogoFill className="w-full h-full" />
                </div>
            </div>
        </div>
    );
}