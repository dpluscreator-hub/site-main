"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from "framer-motion";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { getRelPos, getCardStyle } from "@/lib/carousel";

interface Service {
  title: string;
  slug: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: "Creative & Design",
    slug: "creative-design",
    description: "Stunning visuals from logos to complete brand identities that make your business stand out.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
  {
    title: "Video Production",
    slug: "video-production",
    description: "Transform raw footage into compelling cinematic stories that engage and drive results.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive marketing strategies from SEO to paid advertising that drive growth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce-solutions",
    description: "Complete marketplace management from listing to reviews on Amazon, Flipkart & more.",
    image: "https://images.unsplash.com/photo-1763872011479-aa293bf083a8?q=80&w=1174&auto=format&fit=crop",
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Beautiful, high-performance websites with modern integrations and exceptional UX.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    title: "Brand Strategy",
    slug: "brand-strategy",
    description: "Strategic guidance with data-driven insights to help your brand thrive digitally.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

const total = services.length;

const spring = { type: "spring", stiffness: 280, damping: 32 } as const;
const reducedTransition = { duration: 0.2, ease: "easeOut" } as const;

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const isPaused = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Pause auto-advance while the section is off-screen (no point paying for
  // a carousel animating behind other content).
  const inView = useInView(sectionRef, { amount: 0.2 });
  const inViewRef = useRef(false);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  const mouseY = useMotionValue(0.5);
  const springY = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), { stiffness: 160, damping: 30 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    let t: number;
    const onResize = () => { clearTimeout(t); t = window.setTimeout(check, 150); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    setActiveIndex((prev) => (prev + dir + total) % total);
  }, []);

  // Manual interaction (arrows, dots, tapping a side card, swiping) should
  // suppress autoplay for a few seconds rather than yanking the carousel
  // forward again right after someone has just navigated it themselves.
  const pauseBriefly = useCallback(() => {
    isPaused.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => { isPaused.current = false; }, 5000);
  }, []);

  const manualAdvance = useCallback((dir: 1 | -1) => {
    advance(dir);
    pauseBriefly();
  }, [advance, pauseBriefly]);

  const manualGoTo = useCallback((i: number) => {
    setActiveIndex(i);
    pauseBriefly();
  }, [pauseBriefly]);

  useEffect(() => {
    // Respect prefers-reduced-motion: no ambient autoplay at all, the
    // carousel only moves when someone explicitly asks it to.
    if (reduce) return;
    autoRef.current = setInterval(() => {
      if (!isPaused.current && inViewRef.current) advance(1);
    }, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [advance, reduce]);

  useEffect(() => {
    return () => { if (resumeTimeout.current) clearTimeout(resumeTimeout.current); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseY.set(0.5);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) manualAdvance(diff > 0 ? 1 : -1);
  };

  return (
    <section data-nav-theme="dark" ref={sectionRef} className="bg-black relative overflow-hidden" aria-label="Our Services">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Screen-reader-only announcement of the active slide — sighted users
          get this from the visuals, but a carousel needs an explicit status
          for anyone navigating by voice or screen reader. */}
      <p className="sr-only" role="status" aria-live="polite">
        Showing service {activeIndex + 1} of {total}: {services[activeIndex].title}
      </p>

      <div className="h-screen w-full relative flex flex-col justify-center pt-16 md:pt-0">
        <div className="absolute top-12 md:top-20 left-0 w-full z-40 pointer-events-none px-4">
          <div className="container mx-auto px-2 md:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-3 md:pb-5">
              <div>
                <h2 className="flex flex-wrap items-baseline gap-x-3 text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
                  <span className="font-serif font-normal italic text-brand-primary">Our</span>
                  <RevealText text="Services" />
                </h2>
                <Reveal delay={0.1} y={16} className="max-w-xl">
                  <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base font-normal tracking-normal">
                    Explore our offerings and embark on a journey where innovation meets distinction
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        {isMobile ? (
          <div
            className="flex flex-col items-center mt-20 px-4 gap-6"
            role="region"
            aria-roledescription="carousel"
            aria-label="Services"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full max-w-sm h-[420px] relative">
              <ServiceCard service={services[activeIndex]} index={activeIndex + 1} />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => manualAdvance(-1)}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors touch-manipulation"
                aria-label="Previous service"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => manualGoTo(i)}
                    className="p-2 -m-1 touch-manipulation"
                    aria-label={`Go to service ${i + 1}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  >
                    <span className={`block rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 h-1.5 bg-[#F5A623]" : "w-1.5 h-1.5 bg-white/30"}`} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => manualAdvance(1)}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors touch-manipulation"
                aria-label="Next service"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-20">
            <div
              className="relative h-[460px]"
              style={{ perspective: "1200px" }}
              role="region"
              aria-roledescription="carousel"
              aria-label="Services"
              onMouseEnter={() => { isPaused.current = true; }}
              onMouseLeave={() => { isPaused.current = false; }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {services.map((service, i) => {
                  const relPos = getRelPos(i, activeIndex, total);
                  const style = getCardStyle(relPos);
                  if (!style) return null;

                  const isActive = relPos === 0;

                  return (
                    <motion.div
                      key={service.slug}
                      className="absolute w-full max-w-3xl"
                      animate={{
                        scale: style.scale,
                        x: style.x,
                        rotateY: style.rotateY,
                        opacity: style.opacity,
                        zIndex: style.zIndex,
                      }}
                      transition={reduce ? reducedTransition : spring}
                      style={{
                        // Snap instantly instead of animating — filter/box-shadow
                        // are paint-expensive, and the Framer spring on
                        // transform/opacity already carries the motion.
                        filter: style.filter,
                        boxShadow: style.boxShadow,
                        willChange: "transform",
                        cursor: isActive ? "default" : "pointer",
                        rotateX: isActive && !reduce ? springY : 0,
                      }}
                      onClick={() => !isActive && manualGoTo(i)}
                      onMouseMove={isActive ? handleMouseMove : undefined}
                      onMouseLeave={isActive ? handleMouseLeave : undefined}
                    >
                      <div
                        className="h-[380px] w-full"
                        style={{
                          border: isActive ? "1px solid rgba(245,166,35,0.3)" : "1px solid rgba(255,255,255,0.06)",
                          transition: "border-color 0.4s ease",
                          borderRadius: "2rem",
                          overflow: "hidden",
                        }}
                      >
                        <ServiceCard service={service} index={i + 1} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mt-14">
              <button
                onClick={() => manualAdvance(-1)}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors touch-manipulation"
                aria-label="Previous service"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => manualGoTo(i)}
                    className="p-2 -m-1 touch-manipulation"
                    aria-label={`Go to service ${i + 1}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  >
                    <span className={`block rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 h-1.5 bg-[#F5A623]" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"}`} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => manualAdvance(1)}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors touch-manipulation"
                aria-label="Next service"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href="/services" className="block w-full h-full group">
      <article className="h-full w-full bg-[#0f0f0f] overflow-hidden relative shadow-2xl">
        <div className="md:hidden relative h-[35%] w-full">
          <Image
            src={service.image}
            alt={`${service.title} service image for DPLUS Creator`}
            fill
            sizes="100vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            priority={index === 1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />
        </div>

        <div className="md:hidden relative z-20 h-[65%] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{service.description}</p>
          </div>
          <div className="flex items-center gap-3 mt-4 text-white">
            <span className="font-medium text-xs tracking-wide">VIEW DETAILS</span>
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </div>
        </div>

        <div className="hidden md:flex relative z-20 h-full bg-[#0f0f0f] overflow-hidden flex-shrink-0 w-[50%]">
          <div className="w-full h-full flex flex-col justify-between p-8 lg:p-10">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight tracking-tight">{service.title}</h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-md font-light line-clamp-3">{service.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-8 text-white">
              <span className="font-medium text-sm tracking-wide">VIEW DETAILS</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute top-0 right-0 w-[55%] h-full bg-gray-900 z-10">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10" />
          <Image
            src={service.image}
            alt={`${service.title} service image for DPLUS Creator`}
            fill
            sizes="50vw"
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            priority={index === 1}
          />
        </div>
      </article>
    </Link>
  );
}
