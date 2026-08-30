"use client";

import React, { useRef, useEffect } from "react";
import { useMenu } from "@/context/MenuContext";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { MenuLink } from "./MenuLink";
import { AnimatePresence, motion } from "framer-motion";
import { FrozenRoute } from "./FrozenRoute";
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaPinterestSquare, FaWhatsapp } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiFiverrFill, RiTwitterXFill } from "react-icons/ri";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuColumn {
  links: MenuItem[];
  showSocials?: boolean;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const MENU_COLUMNS: MenuColumn[] = [
  {
    links: [
      { label: "What We Do", href: "/services" },
      { label: "Our Process", href: "/process" },
      { label: "Our Creations", href: "/works" },
    ],
  },
  {
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    links: [
      { label: "Meet the Team", href: "/team" },
    ],
    showSocials: true,
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/d_pluscreator",
    icon: <FaInstagram />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/dpluscreator/",
    icon: <FaLinkedin />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@DplusCreator",
    icon: <AiFillYoutube />,
  },
  {
    name: "X",
    href: "https://x.com/DPlus_Creator",
    icon: <RiTwitterXFill />,
  },
  {
    name: "Pinterest",
    href: "https://in.pinterest.com/dpluscreator",
    icon: <FaPinterestSquare />,
  },
];

interface MenuLayoutProps {
  children: React.ReactNode;
}

export function MenuLayout({ children }: MenuLayoutProps) {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const pathname = usePathname();

  const layoutRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const clipWrapperRef = useRef<HTMLDivElement>(null);
  const innerPageRef = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(pathname);
  const isFirstRender = useRef(true);

  // Close the menu smoothly on route change and reset scroll
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      if (isMenuOpen) {
        const timer = setTimeout(() => {
          setIsMenuOpen(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, isMenuOpen, setIsMenuOpen]);

  // Toggle body scrollbar class and disable page scrolling
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isMenuOpen) {
      document.documentElement.classList.add("scrollbar-none");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("scrollbar-none");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.classList.remove("scrollbar-none");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  useGSAP(
    () => {
      const menu = menuRef.current;
      const page = pageContainerRef.current;
      const clip = clipWrapperRef.current;
      const inner = innerPageRef.current;

      if (!menu || !page || !clip || !inner) return;

      if (isFirstRender.current) {
        if (!isMenuOpen) {
          gsap.set(".menu-item-anim", { yPercent: 110 });
          isFirstRender.current = false;
          return;
        }
        isFirstRender.current = false;
      }

      if (isMenuOpen) {
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const vh50 = typeof window !== "undefined" ? window.innerHeight * 0.5 : 0;
        const targetY = vh50 + scrollY;

        gsap.to(menu, {
          height: "50vh",
          paddingTop: "6rem",
          paddingBottom: "2.5rem",
          duration: 0.75,
          ease: "menuEase",
        });
        gsap.to(page, {
          y: targetY,
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          backgroundColor: "#18181b",
          borderColor: "transparent",
          borderRadius: "0px",
          duration: 0.75,
          ease: "menuEase",
          onComplete: () => {
            const frame = document.querySelector(".page-frame");
            if (frame) {
              gsap.set(frame, { overflowY: "auto" });
            }
          }
        });
        gsap.to(inner, {
          y: -scrollY,
          duration: 0.75,
          ease: "menuEase",
        });
        gsap.set(clip, { overflow: "hidden" });

        // Reveal of links from bottom to up (mask entry)
        gsap.fromTo(
          ".menu-item-anim",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.75,
            ease: "power4.out",
            delay: 0.1,
          }
        );
      } else {
        // Mask back down to the bottom (mask exit)
        gsap.to(".menu-item-anim", {
          yPercent: 110,
          duration: 0.45,
          ease: "power3.in",
        });

        gsap.to(menu, {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.75,
          ease: "menuEase",
        });
        gsap.to(page, {
          y: 0,
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
          borderRadius: "0px",
          duration: 0.75,
          ease: "menuEase",
          onComplete: () => {
            gsap.set(page, { clearProps: "all" });
            gsap.set(clip, { clearProps: "all" });
            if (typeof document !== "undefined") {
              const frames = document.querySelectorAll(".page-frame");
              frames.forEach((frame) => {
                (frame as HTMLElement).style.transform = "";
                (frame as HTMLElement).style.willChange = "";
                gsap.set(frame, { clearProps: "overflowY,overflow,transform,willChange" });
              });
            }
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh();
            }
          }
        });
        gsap.to(inner, {
          y: 0,
          duration: 0.75,
          ease: "menuEase",
          onComplete: () => {
            gsap.set(inner, { clearProps: "all" });
          }
        });
      }
    },
    { dependencies: [isMenuOpen], scope: layoutRef }
  );

  return (
    <div ref={layoutRef} className="min-h-screen text-foreground flex flex-col relative overflow-x-hidden scrollbar-none">
      <Navbar />

      {/* 50vh Menu container */}
      <div
        ref={menuRef}
        className="h-0 w-full overflow-hidden bg-zinc-900 flex flex-col justify-center px-8 pt-0 pb-0 fixed top-0 left-0 z-40 scrollbar-none"
      >
        <div className="max-w-full mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-x-8 pt-6 lg:px-2.5">
          {MENU_COLUMNS.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`flex flex-col ${column.showSocials
                  ? "gap-2 lg:gap-4 text-left"
                  : "lg:gap-1"
                }`}
            >
              {column.links.map((link) => (
                <MenuLink
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  label={link.label}
                />
              ))}

              {column.showSocials && (
                <div className="overflow-hidden py-1">
                  <div className="menu-item-anim flex items-center lg:gap-1 lg:mt-1">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.name}
                        className="w-8 h-8 rounded-md border border-zinc-700 hover:border-brand flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Padded Page container holding child segments */}
      <div
        ref={pageContainerRef}
        className="flex-1 w-full bg-zinc-900 text-foreground relative flex flex-col scrollbar-none"
      >
        <div
          ref={clipWrapperRef}
          className={`flex-1 w-full h-full relative flex flex-col scrollbar-none transition-[border-radius,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-2 ${isMenuOpen
              ? "border-white rounded-[24px] overflow-hidden"
              : "border-transparent rounded-[0px] overflow-hidden"
            }`}
        >
          <div ref={innerPageRef} className="flex-1 w-full min-h-full relative flex flex-col scrollbar-none">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={pathname}
                initial={{ x: "calc(100% + 10vw)", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "calc(-100% - 10vw)", opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => {
                  if (typeof document !== "undefined") {
                    const frames = document.querySelectorAll(".page-frame");
                    frames.forEach((frame) => {
                      (frame as HTMLElement).style.transform = "";
                      (frame as HTMLElement).style.willChange = "";
                    });
                    if (typeof ScrollTrigger !== "undefined") {
                      ScrollTrigger.refresh();
                    }
                  }
                }}
                className="flex-1 flex flex-col w-full min-h-full relative z-[10] page-frame scrollbar-none"
              >
                <FrozenRoute>{children}</FrozenRoute>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
