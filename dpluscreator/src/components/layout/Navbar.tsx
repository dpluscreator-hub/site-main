// src/components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookMeetingModal from "@/components/BookMeetingModal";
import AnimatedLogo from "@/components/AnimatedLogo";
import Magnetic from "@/components/ui/Magnetic";
import FrostedGlassFilter from "@/components/visual/FrostedGlassFilter";
import { lockScroll, releaseScrollLock } from "@/lib/scroll-lock";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

type NavTheme = "light" | "dark";

const EASE = [0.76, 0, 0.24, 1] as const;

// Pages with a dark hero — navbar text + logo go white on these routes
const DARK_HERO_ROUTES = ["/about", "/contact"];

export default function Navbar() {
  const [theme, setTheme] = useState<NavTheme>("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [supportsFrostedFilter, setSupportsFrostedFilter] = useState(false);
  const mobileMenuLockRef = useRef<symbol | null>(null);
  const pathname = usePathname();

  // Is the current page one that has a dark hero behind the navbar?
  const isOnDarkPage =
    DARK_HERO_ROUTES.includes(pathname) || theme === "dark";

  // Feature-detect SVG-filter backdrop support client-side only — Safari
  // silently drops url() filters in backdrop-filter, so we fall back to
  // the plain blur+saturate treatment there instead of a blank navbar.
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports) {
      const supported =
        CSS.supports("backdrop-filter", "url(#navFrosted)") ||
        CSS.supports("-webkit-backdrop-filter", "url(#navFrosted)");
      setSupportsFrostedFilter(supported);
    }
  }, []);

  // Mobile menu scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      if (!mobileMenuLockRef.current) {
        mobileMenuLockRef.current = lockScroll();
      }
    } else {
      releaseScrollLock(mobileMenuLockRef.current);
      mobileMenuLockRef.current = null;
    }
    return () => {
      releaseScrollLock(mobileMenuLockRef.current);
      mobileMenuLockRef.current = null;
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          )[0];

        if (!visible) return;

        const nextTheme = (visible.target as HTMLElement).dataset.navTheme;

        if (nextTheme === "dark" || nextTheme === "light") {
          setTheme(nextTheme);
        }
      },
      {
        root: null,
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // ── Scroll-aware navbar behavior ────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Glass surface styling ───────────────────────────────────────────────
  const frostedBackdropFilter = supportsFrostedFilter
    ? "url(#navFrosted) saturate(180%)"
    : "blur(20px) saturate(180%)";

  const glassStyles = isOnDarkPage
    ? {
        backgroundColor: isScrolled ? "rgba(12, 12, 12, 0.36)" : "rgba(12, 12, 12, 0.25)",
        borderColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)",
        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.2)" : "none",
      }
    : {
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.42)" : "rgba(255, 255, 255, 0.30)",
        borderColor: isScrolled ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.02)",
        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.06)" : "none",
      };

  // ── Colour tokens derived from surface ──────────────────────────────────
  const logoVariant = isOnDarkPage ? "dark" : "light";

  const linkBase = isOnDarkPage
    ? "text-white/70 hover:text-white"
    : "text-dark/70 hover:text-dark";

  const pillBg = isOnDarkPage ? "bg-white/10" : "bg-dark/5";

  const activePillBg = isOnDarkPage ? "bg-white" : "bg-dark";
  const activePillText = isOnDarkPage ? "text-dark" : "text-white";

  const hoverPillBg = isOnDarkPage ? "bg-white/15" : "bg-dark/10";

  const talkLinkColor = isOnDarkPage
    ? "text-white/80 hover:text-white"
    : "text-dark/70 hover:text-dark";

  const dividerColor = isOnDarkPage ? "text-white/30" : "text-gray-300";

  const bookBtnBg = isOnDarkPage
    ? "bg-white text-dark hover:bg-white/90"
    : "bg-dark text-white hover:bg-dark/90";

  const hamburgerColor = isOnDarkPage ? "text-white" : "text-dark";

  return (
    <>
      <FrostedGlassFilter />

      {/* ── NAV — glass surface ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 py-4 lg:py-5 border-b transition-all duration-300"
        style={{
          ...glassStyles,
          backdropFilter: frostedBackdropFilter,
          WebkitBackdropFilter: frostedBackdropFilter,
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative">

            {/* Logo */}
            <Link href="/" className="z-20 relative">
              <AnimatedLogo
                className="h-7 sm:h-8 lg:h-9 w-auto"
                variant={logoVariant}
              />
            </Link>

            {/* Desktop centre nav */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
              <div
                onMouseLeave={() => setHoveredPath(null)}
                className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${pillBg}`}
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onMouseEnter={() => setHoveredPath(link.path)}
                      className={`relative px-4 py-2 rounded-full text-[14px] font-medium transition-colors duration-300 ${
                        isActive ? activePillText : linkBase
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className={`absolute inset-0 rounded-full ${activePillBg}`}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {!isActive && hoveredPath === link.path && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className={`absolute inset-0 rounded-full ${hoverPillBg}`}
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop right CTAs */}
            <div className="hidden lg:flex items-center gap-3 z-20">
              <Link
                href="/contact"
                className={`text-[14px] font-medium transition-all duration-300 px-4 py-2 rounded-full ${talkLinkColor}`}
              >
                Talk to us
              </Link>
              <span className={dividerColor}>|</span>
              <Magnetic strength={0.4}>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className={`group px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-300 ${bookBtnBg}`}
                >
                  <span className="flex items-center gap-2">
                    Book a meeting
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </Magnetic>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden z-20 p-2 -mr-2 transition-colors ${hamburgerColor}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:hidden fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0b0b0c] text-white"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(245,166,35,0.12) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10">
              <AnimatedLogo className="h-8 w-auto" variant="dark" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="relative z-10 flex flex-1 flex-col justify-center px-6">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <div key={link.path} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.15 + index * 0.07 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-baseline justify-between border-b border-white/10 py-4"
                      >
                        <span
                          className="font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl"
                          style={{ color: isActive ? "#F5A623" : undefined }}
                        >
                          {link.name}
                        </span>
                        <svg
                          className="h-6 w-6 -translate-x-2 text-white/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45 }}
              className="relative z-10 px-6 pb-8"
            >
              <p className="mb-1 font-serif text-lg italic text-white/55">Ready to grow?</p>
              <p className="mb-4 text-xl font-semibold text-white">Let&apos;s start your project</p>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 rounded-full border border-white/20 py-3.5 text-center text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="flex-1 rounded-full py-3.5 text-sm font-bold text-black shadow-lg transition-all"
                  style={{ background: "#F5A623" }}
                >
                  Book a Meeting
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookMeetingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}