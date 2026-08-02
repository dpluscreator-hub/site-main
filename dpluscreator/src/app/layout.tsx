import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/ui/Preloader";
import LenisGsapSync from "@/components/ui/LenisGsapSync";
import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk, Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import { JsonLd } from "@/lib/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800"], // only the Hero ExtraBold headline uses Poppins
  variable: "--font-poppins",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dpluscreator.com"),
  title: {
    default: "Social Media, Branding & Marketing Agency | DPLUS Creator",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "DPLUS Creator is a creative social media agency helping brands grow online with branding, content creation, social media strategy, and performance marketing.",
  keywords: [
    "social media agency",
    "digital marketing agency",
    "branding agency",
    "content creation",
    "social media strategy",
    "video production",
    "performance marketing",
    "creative agency India",
  ],
  authors: [{ name: SITE_NAME, url: "https://dpluscreator.com" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Marketing",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Icons (src/app/icon.svg + apple-icon.png) and the OG/Twitter images
  // (opengraph-image.tsx / twitter-image.tsx) are wired via file conventions.
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dpluscreator.com",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Creative social media agency helping brands grow online with branding, content, social strategy, and performance marketing.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Creative social media agency helping brands grow online with branding, content, and performance marketing.",
    creator: "@dpluscreator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable} ${instrumentSerif.variable} font-sans antialiased text-dark `}>

        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ReactLenis
          root
          options={{
            autoRaf: false,
            syncTouch: true,
            gestureOrientation: "vertical",
          }}
        >
          <LenisGsapSync />
          {/* <Preloader /> */}
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid rgba(245, 166, 35, 0.2)',
              },
            }}
          />
          <div id="modal-root" />

        </ReactLenis>


      </body>
    </html>
  );
}
