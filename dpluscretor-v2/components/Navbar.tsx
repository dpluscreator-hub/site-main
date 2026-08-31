"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useMenu } from "@/context/MenuContext";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, CustomEase } from "@/lib/gsap";
import { TextMaskHover } from "./TextMaskHover";

// Logo SVG containing only the invertible white elements (blends using mix-blend-difference)
const LogoWhiteSVG = () => (
  <svg
    width="314"
    height="138"
    viewBox="0 0 314 138"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Path 1 */}
    <path
      d="M128.904 30.9949C127.621 28.6137 125.757 26.7387 123.319 25.3643C120.876 23.99 117.98 23.3028 114.626 23.3028C110.596 23.3028 106.965 24.3575 103.734 26.4617C100.497 28.5658 97.9521 31.6235 96.0888 35.6186C94.2255 39.6192 93.2992 44.3335 93.2992 49.767C93.2992 55.2004 94.2309 59.9148 96.0888 63.9153C97.9521 67.9158 100.497 70.9681 103.734 73.0723C106.965 75.1764 110.601 76.2311 114.626 76.2311C117.98 76.2311 120.881 75.544 123.319 74.1696C125.757 72.7953 127.621 70.9202 128.904 68.5391V74.6757C128.904 78.0316 128.233 80.3222 126.891 81.5421C125.55 82.7619 123.687 83.3745 121.307 83.3745C117.463 83.3745 115.265 82.0322 114.716 79.3474H94.7632C95.2424 84.1203 96.8075 88.1741 99.4374 91.5194C104.282 88.3978 110.042 86.5814 116.233 86.5814C125.278 86.5814 133.418 90.4487 139.099 96.6226C142.426 94.3427 144.891 91.4235 146.477 87.8705C148.245 83.9019 149.134 79.5072 149.134 74.6863V23.958H128.904V31.0109V30.9949ZM126.998 56.1486C125.603 57.6668 123.809 58.4285 121.626 58.4285C119.444 58.4285 117.65 57.6721 116.255 56.1486C114.86 54.6305 114.157 52.505 114.157 49.767C114.157 47.0289 114.855 44.9088 116.255 43.3853C117.65 41.8671 119.444 41.1054 121.626 41.1054C123.809 41.1054 125.603 41.8671 126.998 43.3853C128.393 44.8982 129.09 47.0289 129.09 49.767C129.09 52.505 128.393 54.6305 126.998 56.1486Z"
      fill="white"
    />
    {/* Path 3 */}
    <path
      d="M40.4067 82.9958C44.2027 84.818 47.2914 87.3855 49.6727 90.709C52.054 94.0326 53.6416 97.9109 54.4246 102.339H36.0436C35.2067 100.495 34.0133 99.0532 32.469 98.0251C30.9246 96.9971 29.1589 96.4803 27.1664 96.4803C24.2343 96.4803 21.9178 97.59 20.2168 99.8039C18.5159 102.018 17.6627 104.999 17.6627 108.746C17.6627 112.494 18.5159 115.47 20.2168 117.689C21.9178 119.903 24.2343 121.012 27.1664 121.012C29.1535 121.012 30.9246 120.496 32.469 119.468C34.0133 118.44 35.2067 117.004 36.0436 115.154H54.4246C53.6416 119.587 52.054 123.46 49.6727 126.784C47.2914 130.107 44.2027 132.68 40.4067 134.497C36.6106 136.319 32.3016 137.228 27.485 137.228C21.88 137.228 17.0148 136.031 12.8785 133.627C8.74228 131.228 5.5618 127.866 3.33707 123.542C1.11235 119.217 0 114.284 0 108.746C0 103.209 1.11235 98.2754 3.33707 93.951C5.5618 89.6266 8.74228 86.2649 12.8785 83.8661C17.0148 81.4673 21.8854 80.2652 27.485 80.2652C32.3016 80.2652 36.6106 81.1736 40.4067 82.9958Z"
      fill="white"
    />
    {/* Path 4 */}
    <path
      d="M83.2182 95.4964C85.7469 93.9729 88.3821 93.2112 91.1185 93.2112V111.573H86.242C82.9893 111.573 80.6043 112.143 79.0817 113.278C77.5592 114.412 76.7979 116.431 76.7979 119.324V137.222H59.6078V93.5255H76.7979V101.585C78.5547 99.0548 80.6948 97.0253 83.2235 95.5018L83.2182 95.4964Z"
      fill="white"
    />
    {/* Path 5 */}
    <path
      d="M137.517 118.631H110.031C110.186 120.799 110.676 122.286 111.501 123.085C112.326 123.884 113.412 124.283 114.754 124.283C116.611 124.283 117.953 123.431 118.778 121.726H136.974C136.357 124.826 135.053 127.602 133.062 130.058C131.076 132.513 128.568 134.447 125.55 135.869C122.531 137.292 119.215 138 115.6 138C111.261 138 107.402 137.094 104.026 135.289C100.646 133.483 98.0107 130.883 96.1261 127.501C94.2415 124.118 93.2992 120.155 93.2992 115.606C93.2992 111.056 94.2415 107.098 96.1261 103.711C98.0107 100.328 100.641 97.7337 104.026 95.9226C107.407 94.1168 111.267 93.2112 115.6 93.2112C119.933 93.2112 123.793 94.1008 127.174 95.8853C130.554 97.6698 133.184 100.211 135.074 103.519C136.958 106.827 137.901 110.726 137.901 115.217C137.901 116.303 137.773 117.438 137.512 118.626L137.517 118.631ZM120.482 111.578C120.482 109.927 120.019 108.702 119.087 107.898C118.155 107.098 116.995 106.699 115.605 106.699C112.454 106.699 110.649 108.324 110.186 111.578H120.482Z"
      fill="white"
    />
    {/* Path 6 */}
    <path
      d="M165.353 94.9478C167.419 96.109 168.995 97.6964 170.075 99.7154V93.7492H187.186V137.446H170.075V131.48C168.989 133.493 167.414 135.081 165.353 136.247C163.288 137.409 160.834 137.989 157.996 137.989C154.589 137.989 151.517 137.1 148.781 135.315C146.044 133.531 143.888 130.952 142.313 127.57C140.737 124.187 139.949 120.197 139.949 115.6C139.949 111.003 140.737 107.013 142.313 103.631C143.888 100.248 146.039 97.6645 148.781 95.8853C151.517 94.1008 154.589 93.2112 157.996 93.2112C160.834 93.2112 163.288 93.7918 165.353 94.9531V94.9478ZM159.162 110.172C157.975 111.467 157.378 113.272 157.378 115.595C157.378 117.917 157.969 119.729 159.162 121.018C160.349 122.307 161.872 122.957 163.73 122.957C165.588 122.957 167.11 122.312 168.297 121.018C169.484 119.729 170.081 117.917 170.081 115.595C170.081 113.272 169.484 111.461 168.297 110.172C167.11 108.883 165.588 108.233 163.73 108.233C161.872 108.233 160.349 108.878 159.162 110.172Z"
      fill="white"
    />
    {/* Path 7 */}
    <path
      d="M265.574 95.9226C269.082 97.7337 271.835 100.328 273.821 103.711C275.806 107.093 276.802 111.056 276.802 115.606C276.802 120.155 275.806 124.118 273.821 127.501C271.835 130.883 269.082 133.477 265.574 135.289C262.061 137.1 258.116 138 253.729 138C249.342 138 245.392 137.094 241.884 135.289C238.37 133.483 235.623 130.883 233.638 127.501C231.652 124.118 230.656 120.155 230.656 115.606C230.656 111.056 231.652 107.098 233.638 103.711C235.623 100.328 238.376 97.7337 241.884 95.9226C245.392 94.1168 249.342 93.2112 253.729 93.2112C258.116 93.2112 262.066 94.1168 265.574 95.9226ZM249.704 109.986C248.618 111.253 248.081 113.123 248.081 115.6C248.081 118.077 248.608 119.952 249.667 121.215C250.727 122.483 252.079 123.111 253.734 123.111C255.39 123.111 256.678 122.477 257.759 121.215C258.845 119.947 259.383 118.077 259.383 115.6C259.383 113.123 258.84 111.248 257.759 109.986C256.673 108.718 255.332 108.089 253.734 108.089C252.137 108.089 250.79 108.723 249.71 109.986H249.704Z"
      fill="white"
    />
    {/* Path 8 */}
    <path
      d="M306.1 95.4964C308.628 93.9729 311.264 93.2112 314 93.2112V111.573H309.124C305.871 111.573 303.486 112.143 301.963 113.278C300.441 114.412 299.679 116.431 299.679 119.324V137.222H282.489V93.5255H299.679V101.585C301.436 99.0548 303.576 97.0253 306.105 95.5018L306.1 95.4964Z"
      fill="white"
    />
    {/* Path 10 */}
    <path d="M87.2739 24.0191H67.044V75.1576H87.2739V24.0191Z" fill="white" />
    {/* Path 11 */}
    <path
      d="M68.6943 17.222C70.8185 19.1077 73.64 20.0452 77.1643 20.0452C80.6885 20.0452 83.4195 19.1024 85.5437 17.222C87.6678 15.3415 88.7325 12.9711 88.7325 10.1158C88.7325 7.2606 87.6678 4.78357 85.5437 2.8712C83.4195 0.958836 80.6246 0 77.1643 0C73.7039 0 70.8185 0.958836 68.6943 2.8712C66.5702 4.78357 65.5055 7.202 65.5055 10.1158C65.5055 13.0297 66.5649 15.3415 68.6943 17.222Z"
      fill="white"
    />
    {/* Path 12 */}
    <path d="M177.044 24.0244H156.814V75.1629H177.044V24.0244Z" fill="white" />
    {/* Path 13 */}
    <path
      d="M175.537 2.8712C173.413 0.958836 170.618 0 167.158 0C163.697 0 160.812 0.958836 158.688 2.8712C156.563 4.78357 155.499 7.202 155.499 10.1158C155.499 13.0297 156.558 15.3415 158.688 17.222C160.812 19.1077 163.633 20.0452 167.158 20.0452C170.682 20.0452 173.413 19.1024 175.537 17.222C177.661 15.3415 178.726 12.9711 178.726 10.1158C178.726 7.2606 177.661 4.78357 175.537 2.8712Z"
      fill="white"
    />
    {/* Path 14 */}
    <path
      d="M263.669 30.9203C262.386 28.5605 260.523 26.7067 258.085 25.343C255.641 23.9846 252.745 23.3028 249.391 23.3028C245.361 23.3028 241.731 24.3469 238.499 26.4297C235.262 28.5179 232.718 31.5382 230.854 35.4961C228.991 39.454 228.065 44.1258 228.065 49.506C228.065 54.8861 228.996 59.5579 230.854 63.5158C232.718 67.4737 235.262 70.4994 238.499 72.5822C241.731 74.665 245.367 75.7091 249.391 75.7091C252.745 75.7091 255.647 75.0273 258.085 73.6689C260.523 72.3105 262.386 70.4514 263.669 68.0916V75.0752H283.899V23.9367H263.669V30.9203ZM261.588 56.1433C260.193 57.6615 258.399 58.4232 256.216 58.4232C254.034 58.4232 252.239 57.6668 250.845 56.1433C249.45 54.6251 248.747 52.4997 248.747 49.7616C248.747 47.0236 249.445 44.9035 250.845 43.38C252.239 41.8618 254.034 41.1001 256.216 41.1001C258.399 41.1001 260.193 41.8618 261.588 43.38C262.983 44.8982 263.68 47.0236 263.68 49.7616C263.68 52.4997 262.983 54.6251 261.588 56.1433Z"
      fill="white"
    />
    {/* Path 15 */}
    <path d="M313.086 7.7676H292.856V75.4196H313.086V7.7676Z" fill="white" />
  </svg>
);

// Logo SVG containing only the brand-colored orange elements (not blended)
const LogoOrangeSVG = () => (
  <svg
    width="314"
    height="138"
    viewBox="0 0 314 138"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Path 2 (Orange) */}
    <path
      d="M213.063 120.068C212.514 119.562 212.243 118.747 212.243 117.617V58.2076H218.994V38.838H212.243V23.3028H193.078V38.838H186.598V58.2076H193.078V117.271C193.078 130.29 199.849 136.805 213.403 136.805H220.761V120.824H215.783C214.516 120.824 213.611 120.568 213.063 120.062V120.068Z"
      fill="#F5A623"
    />
    {/* Path 9 (Orange) */}
    <path
      d="M44.5376 14.4532C39.4748 11.7205 33.5762 10.3568 26.8418 10.3568H0V74.8126H26.8418C33.5762 74.8126 39.4748 73.401 44.5376 70.5777C49.6004 67.7544 53.4973 63.8871 56.2283 58.9703C58.9594 54.0536 60.3222 48.5296 60.3222 42.4036C60.3222 36.2776 58.9594 30.6897 56.2283 25.8368C53.4973 20.984 49.6004 17.1859 44.5376 14.4585V14.4532ZM35.8814 52.9722C33.2142 55.4599 29.6048 56.7064 25.0531 56.7064H20.2298V27.941H25.0531C29.5995 27.941 33.2089 29.1875 35.8814 31.6752C38.5485 34.1628 39.8847 37.7159 39.8847 42.3237C39.8847 46.9315 38.5485 50.4845 35.8814 52.9722Z"
      fill="#F5A623"
    />
  </svg>
);

export function Navbar() {
  const logoWhiteRef = useRef<HTMLDivElement>(null);
  const logoOrangeRef = useRef<HTMLDivElement>(null);

  // Separate visual layers for Menu Toggle to bypass z-index isolation
  const menuTextRef = useRef<HTMLDivElement>(null);
  const menuCircleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Internal MenuButton state
  const [isHovered, setIsHovered] = useState(false);
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const shouldHideInitially = isHomepage && (typeof window !== "undefined" ? !(window as unknown as { preloaderPlayed?: boolean }).preloaderPlayed : true);

  const lastScrollY = useRef(0);
  const accumulatedScrollUp = useRef(0);
  const isVisible = useRef(true);

  // Menu Animation Refs (Circle internals)
  const circleBgRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  // Hook for toggle sub-animations (matching former MenuButton behavior)
  useGSAP(
    () => {
      try {
        CustomEase.create("menuEase", "M0,0 C0.16,1 0.3,1 1,1");
      } catch {}

      const circleBg = circleBgRef.current;
      const circleBorder = menuCircleRef.current;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const iconContainer = iconContainerRef.current;

      if (!circleBg || !circleBorder || !line1 || !line2 || !iconContainer) return;

      if (isHovered) {
        gsap.to(circleBg, {
          backgroundColor: "var(--brand)",
          duration: 0.45,
          ease: "menuEase",
        });
        gsap.to(circleBorder, {
          borderColor: "transparent",
          duration: 0.45,
          ease: "menuEase",
        });
        gsap.to([line1, line2], {
          backgroundColor: "var(--background)",
          duration: 0.45,
          ease: "menuEase",
        });
      } else {
        gsap.to(circleBg, {
          backgroundColor: "transparent",
          duration: 0.45,
          ease: "menuEase",
        });
        gsap.to(circleBorder, {
          borderColor: "#ffffff",
          duration: 0.45,
          ease: "menuEase",
        });
        gsap.to([line1, line2], {
          backgroundColor: "#ffffff",
          duration: 0.45,
          ease: "menuEase",
        });
      }

      if (isMenuOpen) {
        gsap.to(line1, { y: 0, rotation: 45, duration: 0.5, ease: "menuEase" });
        gsap.to(line2, { y: 0, rotation: 135, duration: 0.5, ease: "menuEase" });

        if (isHovered) {
          gsap.to(iconContainer, { rotation: 360, duration: 0.65, ease: "menuEase" });
        } else {
          gsap.to(iconContainer, { rotation: 0, duration: 0.65, ease: "menuEase" });
        }
      } else {
        gsap.to(iconContainer, { rotation: 0, duration: 0.5, ease: "menuEase" });

        if (isHovered) {
          gsap.to(line1, { y: 0, rotation: 0, duration: 0.5, ease: "menuEase" });
          gsap.to(line2, { y: 0, rotation: 90, duration: 0.5, ease: "menuEase" });
        } else {
          gsap.to(line1, { y: -3, rotation: 0, duration: 0.5, ease: "menuEase" });
          gsap.to(line2, { y: 3, rotation: 0, duration: 0.5, ease: "menuEase" });
        }
      }
    },
    { dependencies: [isHovered, isMenuOpen] }
  );

  useEffect(() => {
    // Reset visibility and variables on path change or menu state change
    isVisible.current = true;
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
    accumulatedScrollUp.current = 0;

    gsap.set([logoWhiteRef.current, logoOrangeRef.current], { clearProps: "transform,opacity" });
    if (menuTextRef.current && menuCircleRef.current && buttonRef.current) {
      gsap.set([menuTextRef.current, menuCircleRef.current, buttonRef.current], { clearProps: "transform,opacity" });
    }

    if (isMenuOpen) {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top of the page
      if (currentScrollY <= 15) {
        if (!isVisible.current) {
          isVisible.current = true;
          gsap.to([logoWhiteRef.current, logoOrangeRef.current], { 
            x: 0, 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.out",
            onComplete: () => {
              gsap.set([logoWhiteRef.current, logoOrangeRef.current], { clearProps: "transform,opacity" });
            }
          });
          if (menuTextRef.current && menuCircleRef.current && buttonRef.current) {
            gsap.to([menuTextRef.current, menuCircleRef.current, buttonRef.current], { 
              x: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: "power2.out",
              onComplete: () => {
                gsap.set([menuTextRef.current, menuCircleRef.current, buttonRef.current], { clearProps: "transform,opacity" });
              }
            });
          }
        }
        accumulatedScrollUp.current = 0;
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      if (diff > 0) {
        // Scrolling down -> hide
        accumulatedScrollUp.current = 0;
        if (isVisible.current) {
          isVisible.current = false;
          gsap.to([logoWhiteRef.current, logoOrangeRef.current], { x: -100, opacity: 0, duration: 0.4, ease: "power2.out" });
          if (menuTextRef.current && menuCircleRef.current && buttonRef.current) {
            gsap.to([menuTextRef.current, menuCircleRef.current, buttonRef.current], { x: 100, opacity: 0, duration: 0.4, ease: "power2.out" });
          }
        }
      } else if (diff < 0) {
        // Scrolling up -> track threshold
        accumulatedScrollUp.current += Math.abs(diff);
        if (accumulatedScrollUp.current >= 25) {
          if (!isVisible.current) {
            isVisible.current = true;
            gsap.to([logoWhiteRef.current, logoOrangeRef.current], { 
              x: 0, 
              opacity: 1, 
              duration: 0.4, 
              ease: "power2.out",
              onComplete: () => {
                gsap.set([logoWhiteRef.current, logoOrangeRef.current], { clearProps: "transform,opacity" });
              }
            });
            if (menuTextRef.current && menuCircleRef.current && buttonRef.current) {
              gsap.to([menuTextRef.current, menuCircleRef.current, buttonRef.current], { 
                x: 0, 
                opacity: 1, 
                duration: 0.4, 
                ease: "power2.out",
                onComplete: () => {
                  gsap.set([menuTextRef.current, menuCircleRef.current, buttonRef.current], { clearProps: "transform,opacity" });
                }
              });
            }
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, pathname]);

  return (
    <>
      {/* 1. White paths layer of Logo (always blends) */}
      <div
        ref={logoWhiteRef}
        data-navbar-item
        className="fixed top-6 left-8 z-50 pointer-events-auto w-[85px] h-[38px] sm:w-[95px] sm:h-[42px] md:w-[105px] md:h-[46px] lg:w-[115px] lg:h-[50px] mix-blend-difference"
        style={shouldHideInitially ? { transform: "translateY(-200px)" } : undefined}
      >
        <Link href="/" className="w-full h-full block">
          <LogoWhiteSVG />
        </Link>
      </div>

      {/* 2. Orange paths layer of Logo (remains solid brand orange) */}
      <div
        ref={logoOrangeRef}
        data-navbar-item
        className="fixed top-6 left-8 z-50 pointer-events-none w-[85px] h-[38px] sm:w-[95px] sm:h-[42px] md:w-[105px] md:h-[46px] lg:w-[115px] lg:h-[50px]"
        style={shouldHideInitially ? { transform: "translateY(-200px)" } : undefined}
      >
        <LogoOrangeSVG />
      </div>

      {/* 3. Text layer of Menu Toggle (always blends, placed directly in fixed body layer) */}
      <div
        ref={menuTextRef}
        data-navbar-item
        className="fixed top-6 right-[96px] z-50 mix-blend-difference pointer-events-none select-none text-[14px] uppercase font-mono tracking-widest text-white leading-none flex items-center h-12"
        style={shouldHideInitially ? { transform: "translateY(-200px)" } : undefined}
      >
        <TextMaskHover text={isMenuOpen ? "CLOSE" : "MENU"} isHovered={isHovered} />
      </div>

      {/* 4. Circle layer of Menu Toggle (outer circular border blends, inner fill is non-blended brand color) */}
      <div
        ref={menuCircleRef}
        data-navbar-item
        className={`fixed top-6 right-8 z-50 pointer-events-none w-12 h-12 rounded-full border-2 border-white flex items-center justify-center overflow-hidden ${!isHovered ? "mix-blend-difference" : ""}`}
        style={shouldHideInitially ? { transform: "translateY(-200px)" } : undefined}
      >
        {/* Inner non-blending circle background */}
        <div ref={circleBgRef} className="absolute inset-0 bg-transparent" />
        
        {/* Blended white icon container & lines */}
        <div ref={iconContainerRef} className="w-5 h-5 relative flex items-center justify-center">
          <span ref={line1Ref} className="absolute w-5 h-[1.5px] bg-white rounded-full" />
          <span ref={line2Ref} className="absolute w-5 h-[1.5px] bg-white rounded-full" />
        </div>
      </div>

      {/* 5. Invisible interactive trigger covering both text and circle areas */}
      <button
        ref={buttonRef}
        data-navbar-item
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-8 w-40 h-12 z-50 bg-transparent cursor-pointer focus:outline-none"
        aria-label="Toggle Menu"
        style={shouldHideInitially ? { transform: "translateY(-200px)" } : undefined}
      />
    </>
  );
}
