import type { Metadata } from "next";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "About Our Creative Social Media Agency",
  description:
    "Learn how DPLUS Creator helps brands grow online — a creative social media agency blending strategy, design, and content built to drive real results.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | DPLUS Creator",
    description:
      "A creative social media agency helping brands grow and stand out online.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      {children}
    </>
  );
}
