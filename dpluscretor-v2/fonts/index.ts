import { Geist, Geist_Mono, Raleway, Oxanium, Public_Sans } from "next/font/google";

export const oxaniumHeading = Oxanium({subsets:['latin'],variable:'--font-heading'});

export const raleway = Raleway({subsets:['latin'],variable:'--font-sans'});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const publicSansHeading = Public_Sans({subsets:['latin'],variable:'--font-subtext'});

