'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import PrimaryPreloader from '../PrimaryPreloader';
import SecondaryPreloader from '../SecondaryPreloader';
type PreloaderKind = 'primary' | 'secondary';

const MIN_DURATION: Record<PreloaderKind, number> = {
  primary: 2200,
  secondary: 700,
};

// Runs once, at initial render — reads what the inline script already set.
// Not a subscription, so a lazy useState initializer (not an effect) is correct here.
function getInitialType(): PreloaderKind {
  if (typeof document === 'undefined') return 'secondary';
  const attr = document.documentElement.getAttribute('data-preloader');
  return attr === 'primary' ? 'primary' : 'secondary';
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [type] = useState<PreloaderKind>(getInitialType);
  const [readyToDismiss, setReadyToDismiss] = useState(false);
  const [primaryAnimationDone, setPrimaryAnimationDone] = useState(type !== 'primary');
  const startTimeRef = useRef<number | null>(null);
  const show = !readyToDismiss || !primaryAnimationDone;
  const handlePrimaryDone = useCallback(() => setPrimaryAnimationDone(true), []);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const minDuration = MIN_DURATION[type];
    let timer: ReturnType<typeof setTimeout> | undefined;

    const scheduleFinish = () => {
      const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
      const remaining = Math.max(minDuration - elapsed, 0);
      timer = setTimeout(() => setReadyToDismiss(true), remaining);
    };

    if (document.readyState === 'complete') {
      scheduleFinish();
    } else {
      window.addEventListener('load', scheduleFinish);
    }

    return () => {
      window.removeEventListener('load', scheduleFinish);
      if (timer) clearTimeout(timer);
    };
  }, [type]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <div aria-hidden={show}>{children}</div>

      {show && (
        <div role="status" aria-busy="true" aria-label="Loading site" className="fixed inset-0 z-[9999]">
          {type === 'primary' ? (
            <PrimaryPreloader reduced={prefersReducedMotion} onDone={handlePrimaryDone} />
          ) : (
            <SecondaryPreloader reduced={prefersReducedMotion} onDone={() => {}} />
          )}
        </div>
      )}
    </>
  );
}
