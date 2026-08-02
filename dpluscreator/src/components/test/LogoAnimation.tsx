"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  Single unified viewBox: 0 0 122 54  (matches final logo exactly)
 *
 *  Plus (initial) → T (final)  — ONE path morphing to ONE path
 *
 *  Plus is scaled non-uniformly so its bounding box matches T exactly:
 *    T bbox: x=72–85.18, y=9–52.84  (same as plus bbox after transform)
 *    scaleX = 13.18/25 = 0.52726
 *    scaleY = 43.84/25 = 1.75347
 *    translate: (72, 9)
 *
 *  This means the horizontal arms stretch upward into the T crossbar,
 *  and the vertical shaft narrows into the T stem — a natural morph.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Plus path transformed into 122×54 coordinate space.
 * Bounding box exactly matches T: x=72–85.18, y=9–52.84.
 *
 * Original plus (25×25):
 *   M9.375 0H15.625V10H25V16H15.625V25H9.375V16H0V10H9.375V0Z
 *
 * After scale(0.52726, 1.75347) + translate(72, 9):
 */
const PLUS_PATH =
  "M76.9431 9H80.2385V26.5347H85.1816V37.0555H80.2385V52.8367H76.9431V37.0555H72V26.5347H76.9431V9Z";

/**
 * T path as a single closed path (crossbar + stem + serif foot, clockwise).
 * Taken directly from the 122×54 final logo SVG — no transformation.
 */
const T_PATH =
  "M72 9H84.5V22.4809H81.895V40.4699V45.4261" +
  "C81.895 45.8623 81.9997 46.1771 82.2113 46.3725" +
  "C82.4229 46.5659 82.7721 46.6646 83.261 46.6646" +
  "H85.1816V52.8367H82.3428" +
  "C77.1129 52.8367 74.5 50.3206 74.5 45.2924" +
  "V40.4926V22.4809H72V9Z";

const LogoAnimation = () => {
  const plusRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    gsap.to(plusRef.current, {
      morphSVG: { shape: T_PATH, shapeIndex: "auto" },
      duration: 1.4,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <svg
      viewBox="0 0 122 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", maxWidth: "40rem" }}
    >
      {/* D — static, orange */}
      <path
        d="M17.1851 5.58211C15.2316 4.52669 12.9556 4 10.3571 4H0V28.8941H10.3571C12.9556 28.8941 15.2316 28.3489 17.1851 27.2585C19.1386 26.1681 20.6422 24.6745 21.696 22.7755C22.7498 20.8766 23.2756 18.7431 23.2756 16.3771C23.2756 14.0111 22.7498 11.853 21.696 9.9787C20.6422 8.10444 19.1386 6.63754 17.1851 5.58417V5.58211ZM13.845 20.4589C12.8159 21.4197 11.4232 21.9011 9.66686 21.9011H7.80579V10.7914H9.66686C11.4211 10.7914 12.8138 11.2728 13.845 12.2336C14.8741 13.1944 15.3897 14.5666 15.3897 16.3462C15.3897 18.1259 14.8741 19.4981 13.845 20.4589Z"
        fill="#F5A623"
      />

      {/* Plus → morphs to T (single path, single ref) */}
      <path
        ref={plusRef}
        d={PLUS_PATH}
        fill="#F5A623"
      />
    </svg>
  );
};

export default LogoAnimation;