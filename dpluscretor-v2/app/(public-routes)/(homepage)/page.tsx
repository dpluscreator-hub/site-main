"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { HeroSection } from "@/components/sections/homepage/HeroSection";
import "./home.css";
import { Preloader } from "./Preloader";
import { HeroVideoPlayer } from "@/components/sections/homepage/HeroVideoPlayer";
import { CreativeManifestoSection } from "@/components/sections/homepage/CreativeManifestoSection";

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);

CustomEase.create("hop", "0.8, 0, 0.1, 1");

const ROTATING_WORDS = [
  "Digital",
  "Dynamic",
  "Distinct",
  "Dreamers",
  "Directive",
  "Designs",
  "Digital",
];

export default function Home() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const isIntroPlayingRef = useRef(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const preloaderCounterRef = useRef<HTMLHeadingElement | null>(null);
  const preloaderWordRef = useRef<HTMLHeadingElement | null>(null);
  const heroHeaderImageRef = useRef<HTMLDivElement | null>(null);
  const heroHeaderVideoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lenisRef.current = lenis;
    if (isIntroPlayingRef.current) {
      lenis?.stop();
      lenis?.scrollTo(0, { immediate: true });
      document.body.style.overflow = "hidden";
    }
  }, [lenis]);

  useLayoutEffect(() => {
    const preloader = preloaderRef.current;
    const preloaderCounter = preloaderCounterRef.current;
    const preloaderWord = preloaderWordRef.current;
    const heroImageFrame = heroHeaderImageRef.current;
    const heroVideoFrame = heroHeaderVideoRef.current;

    const ctx = gsap.context(() => {
      const heroRows = gsap.utils.toArray<HTMLElement>(".hero-header-row");
      const heroHeadings = gsap.utils.toArray<HTMLHeadingElement>(
        ".hero-header-row h1"
      );
      const heroImages = gsap.utils.toArray<HTMLImageElement>(
        ".hero-header-img img"
      );

      const counter = { progress: 0 };
      const wordCycle = { progress: 0 };
      const imageCycle = { progress: 0 };

      let activeWord = 0;
      let activeImage = 0;

      // 1. Split hero headings
      const headingSplits = heroHeadings.map((heading) =>
        SplitText.create(heading, {
          type: "words",
          mask: "words",
          wordsClass: "word",
        })
      );

      // 2. Set initial hidden/offset states
      headingSplits.forEach((split, rowIndex) => {
        gsap.set(split.words, {
          x: rowIndex === 1 ? "100%" : "-100%",
        });
      });

      // Navbar out of viewport above screen
      gsap.set("[data-navbar], nav", {
        yPercent: -120,
      });

      // Hero footer hidden initially
      gsap.set(".hero-footer p", {
        opacity: 0,
      });

      if (heroVideoFrame) {
        gsap.set(heroVideoFrame, {
          opacity: 0,
          pointerEvents: "none",
        });
      }

      if (heroImageFrame) {
        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        const leftEdgeOffset =
          2.5 * rootFontSize - heroImageFrame.getBoundingClientRect().left;

        gsap.set(heroImageFrame, {
          x: leftEdgeOffset,
        });
      }

      const renderCounter = () => {
        if (!preloaderCounter) return;
        const value = Math.round(counter.progress);
        preloaderCounter.textContent = String(value).padStart(3, "0");
      };

      const renderWord = () => {
        if (!preloaderWord) return;
        const index = Math.round(wordCycle.progress);
        if (index === activeWord) return;
        activeWord = index;
        preloaderWord.innerText = ROTATING_WORDS[index];
      };

      const renderImage = () => {
        if (!heroImages.length) return;
        const index = Math.round(imageCycle.progress) % heroImages.length;
        if (index === activeImage) return;
        activeImage = index;
        heroImages.forEach((image, imageIndex) => {
          image.style.opacity = imageIndex === index ? "1" : "0";
        });
      };

      const expandImageToFullScreen = () => {
        if (!heroImageFrame) return;
        heroRows.forEach((row) => {
          gsap.set(row, {
            flex: "none",
            height: row.getBoundingClientRect().height,
          });
        });

        gsap.set(heroHeadings, {
          color: "white",
          mixBlendMode: "difference",
          zIndex: 10,
        });

        gsap.set([".hero-footer", ".hero-footer p"], {
          color: "white",
          mixBlendMode: "difference",
          zIndex: 10,
        });

        const frame = heroImageFrame.getBoundingClientRect();

        gsap.set(heroImageFrame, {
          position: "fixed",
          top: frame.top,
          left: frame.left,
          width: frame.width,
          height: frame.height,
          x: 0,
          y: 0,
          zIndex: 6,
        });

        const createHeroScrollAnimation = () => {
          if (!heroImageFrame) return;

          const scrollTL = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true
            },
          });

          scrollTL
            .to(heroImageFrame, {
              width: "65%",
              height: "65vh",
              top: "18vh",
              left: "17.5%",
              borderRadius: "4rem",
              border: "solid var(--color-primary) 0.4rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
              ease: "none",
            })
            .to(
              ".hero-header-row h1",
              {
                scale: 0.75,
                ease: "none",
              },
              "<"
            )
            .set(heroImageFrame, {
              autoAlpha: 0,
            })
            .set(heroVideoFrame, {
              opacity: 1,
              pointerEvents: "auto",
            });
        };

        const enableScroll = () => {
          isIntroPlayingRef.current = false;

          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";

          if (lenisRef.current) {
            lenisRef.current.start();
            lenisRef.current.resize();
          }

          if (heroVideoFrame) {
            gsap.set(heroVideoFrame, {
              opacity: 0,
              pointerEvents: "none",
            });
          }

          createHeroScrollAnimation();

          ScrollTrigger.refresh();
        };

        const expandTL = gsap.timeline({
          onComplete: enableScroll,
        });
        expandTL
          .to(heroImageFrame, {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100svh",
            duration: 1.25,
            ease: "hop",
          })
          .to(
            ".hero-footer p",
            {
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to(
            "[data-navbar], nav",
            {
              yPercent: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.8"
          );
      };

      // 3. Unified Master Sequence
      const heroTL = gsap.timeline({ delay: 0.2 });

      if (preloader) {
        // Step A: Preloader counting & cycles
        heroTL
          .to(counter, {
            progress: 100,
            duration: 3,
            onUpdate: renderCounter,
          })
          .to(
            heroImageFrame,
            {
              x: 0,
              duration: 3,
              ease: "none",
            },
            0
          )
          .to(
            wordCycle,
            {
              progress: ROTATING_WORDS.length - 1,
              duration: 3,
              ease: "none",
              onUpdate: renderWord,
            },
            0
          )
          .to(
            imageCycle,
            {
              progress: heroImages.length * 3 - 1,
              duration: 3,
              ease: "none",
              onUpdate: renderImage,
            },
            0
          )
          // Step B: Fade preloader info
          .to(
            [
              ".preloader-header",
              ".preloader-counter",
              ".preloader-footer-copy",
            ],
            {
              opacity: 0,
              duration: 0.25,
            },
            "+=0.35"
          )
          // Step C: Lift preloader curtain
          .to(preloader, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
            onComplete: () => {
              if (preloader) {
                preloader.style.display = "none";
              }
            },
          })
          // Step D: Slide hero words into place and expand image
          .to(
            ".word",
            {
              x: "0%",
              duration: 1.25,
              ease: "power3.out",
              onComplete: expandImageToFullScreen,
            },
            "-=0.5"
          );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      isIntroPlayingRef.current = false;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lenisRef.current) {
        lenisRef.current.start();
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Preloader
        ref={preloaderRef}
        counterRef={preloaderCounterRef}
        wordRef={preloaderWordRef}
      />

      <main>
        <HeroSection
          imageFrameRef={heroHeaderImageRef}
        />
        <div className="hero-video-section">
          <HeroVideoPlayer
            ref={heroHeaderVideoRef}
            src="/assets/video/hero.mp4"
            poster="/assets/images/hero/10.png"
          />
        </div>

        <CreativeManifestoSection/>
      </main>
    </div>
  );
}