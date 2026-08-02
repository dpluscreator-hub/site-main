import type { Metadata } from "next";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema, professionalServiceSchema } from "@/lib/seo/schema";

const SERVICES = [
  "Creative & Design",
  "Video Production",
  "Digital Marketing",
  "E-commerce Solutions",
  "Web Development",
  "Brand Strategy",
];

export const metadata: Metadata = {
  title: "Social Media & Digital Marketing Services",
  description:
    "Explore DPLUS Creator's services: branding, content creation, social media strategy, video production, web, and performance marketing to grow your brand.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | DPLUS Creator",
    description:
      "Complete digital services that help your brand grow online, from strategy to execution.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          professionalServiceSchema(SERVICES),
        ]}
      />
      {children}
    </>
  );
}
