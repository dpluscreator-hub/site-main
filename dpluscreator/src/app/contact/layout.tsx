import type { Metadata } from "next";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact Our Creative Digital Agency",
  description:
    "Get in touch with DPLUS Creator to grow your brand online. Tell us about your project and our team will reply with a tailored plan and clear next steps.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | DPLUS Creator",
    description:
      "Get in touch with DPLUS Creator to take your brand to the next level.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      {children}
    </>
  );
}
