import React, { forwardRef } from "react";

interface PreloaderProps {
  counterRef?: React.Ref<HTMLHeadingElement>;
  wordRef?: React.Ref<HTMLHeadingElement>;
}

export const Preloader = forwardRef<HTMLDivElement, PreloaderProps>(
  ({ counterRef, wordRef }, ref) => {
    return (
      <div ref={ref} className="preloader">
        <div className="preloader-header">
          <div className="preloader-header-row">
            <h1 ref={wordRef}>Digital</h1>
          </div>

          <div className="preloader-header-row items-center">
            <h2 className="text-[clamp(4rem,18vw,24rem)]! leading-0">+</h2>
            <h1>Creator</h1>
          </div>
        </div>

        <div className="preloader-footer">
          <div className="preloader-counter">
            <h1
              ref={counterRef}
              className="font-heading text-[clamp(2.2rem,9vw,12rem)]!"
            >
              000
            </h1>
          </div>

          <div className="preloader-footer-copy">
            <p>Currently Growing</p>
          </div>
        </div>
      </div>
    );
  }
);

Preloader.displayName = "Preloader";
