import type { Metadata } from "next";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Our Work — Branding & Content Portfolio",
  description:
    "See DPLUS Creator's portfolio — branding, reels, motion graphics, 3D, and social media campaigns that helped brands stand out and grow online.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | DPLUS Creator",
    description:
      "Explore the creative work that has helped brands grow and connect.",
    url: "/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      {children}
    </>
  );
}
