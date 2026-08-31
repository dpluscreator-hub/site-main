"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase);
  CustomEase.create("menuEase", "M0,0 C0.16,1 0.3,1 1,1");
}

export { gsap, ScrollTrigger, useGSAP, CustomEase };
