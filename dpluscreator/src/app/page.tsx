import HeroSection from "@/components/home/HeroSection";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import ServicesSection from "@/components/home/ServicesSection";
import ClosingCTA from "@/components/home/ClosingCTA";
import FaqSection from "@/components/home/FaqSection";
import { HOMEPAGE_FAQS } from "@/lib/data/faqs";
import { JsonLd } from "@/lib/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(HOMEPAGE_FAQS)} />
      <HeroSection />
      <ProjectShowcase />
      <ServicesSection />
      <FaqSection />
      <ClosingCTA />
    </>
  );
}