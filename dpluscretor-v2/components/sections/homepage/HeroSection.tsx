"use client";

import React, { forwardRef } from "react";

export interface HeroSectionProps {
  imageFrameRef?: React.Ref<HTMLDivElement>;
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  ({ imageFrameRef }, ref) => {
    return (
      <section ref={ref} className="hero">
        <div className="hero-header">
          <div className="hero-header-row">
            <h1>Everything</h1>
          </div>

          <div className="hero-header-row">
            <h1>Beneath</h1>

            <div ref={imageFrameRef} className="hero-header-img">
              <img src="/assets/images/hero/1.png" alt="" />
              <img src="/assets/images/hero/2.png" alt="" />
              <img src="/assets/images/hero/3.png" alt="" />
              <img src="/assets/images/hero/4.png" alt="" />
              <img src="/assets/images/hero/5.png" alt="" />
              <img src="/assets/images/hero/6.png" alt="" />
              <img src="/assets/images/hero/7.png" alt="" />
              <img src="/assets/images/hero/8.png" alt="" />
              <img src="/assets/images/hero/9.png" alt="" />
              <img src="/assets/images/hero/10.png" alt="" />
            </div>
          </div>

          <div className="hero-header-row">
            <h1>The Surface</h1>
          </div>
        </div>

        <div className="hero-footer">
          <p>Seen and Unseen</p>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";