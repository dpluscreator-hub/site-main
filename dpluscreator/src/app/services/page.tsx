"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const allServices = [
  {
    title: "Creative & Design",
    num: "01",
    slug: "creative-design",
    tagline: "Visuals that stop the scroll.",
    description:
      "Stunning visuals that capture attention and communicate your brand message effectively. From logos to complete brand identities, we create designs that make your business stand out.",
    features: [
      "Logo Design & Branding",
      "Social Media Post Design",
      "Poster & Banner Design",
      "Flyer & Brochure Design",
      "Business Card & Visiting Card Design",
      "Packaging Design",
      "Product Mockups",
      "Presentation Design (PPT)",
      "Thumbnail Design (YouTube/Social Media)",
    ],
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
  {
    title: "Video Production",
    num: "02",
    slug: "video-production",
    tagline: "Motion that moves people.",
    description:
      "Transform raw footage into compelling cinematic stories that engage your audience and drive results. Professional video production from concept to final cut.",
    features: [
      "Content Shoot (Product, Corporate, Event)",
      "Social Media Reels & Shorts",
      "YouTube Video Editing",
      "Motion Graphics & Animation",
      "Product Demo Videos",
      "Explainer Videos",
      "Advertisement Videos (TV/Digital)",
      "Infographic Videos",
      "Product 3D Animation",
    ],
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    title: "Digital Marketing",
    num: "03",
    slug: "digital-marketing",
    tagline: "Reach the right people, every time.",
    description:
      "Comprehensive digital marketing strategies that drive growth and achieve your business objectives. From SEO to paid advertising, we cover it all.",
    features: [
      "Search Engine Optimization (SEO)",
      "Local SEO & Technical SEO",
      "On-page & Off-page SEO",
      "Google My Business Optimization",
      "Social Media Marketing (Instagram, Facebook, LinkedIn, YouTube)",
      "WhatsApp Business Marketing",
      "Paid Advertising (Google, Meta, YouTube, LinkedIn Ads)",
      "Content Strategy & Copywriting",
      "Email Marketing & Cold Email Campaigns",
      "WhatsApp Broadcast Campaigns",
      "Influencer Marketing & Collaboration",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "E-commerce Solutions",
    num: "04",
    slug: "ecommerce",
    tagline: "Your store, fully optimised.",
    description:
      "Complete e-commerce management services to help you succeed on all major marketplaces. From product listing to review management, we handle everything.",
    features: [
      "Product Listing (Amazon, Flipkart, Meesho)",
      "Marketplace Management",
      "Inventory Monitoring",
      "Product Photography & Editing",
      "A+ Content Creation",
      "Review Management",
      "E-commerce SEO",
    ],
    image:
      "https://images.unsplash.com/photo-1763872011479-aa293bf083a8?q=80&w=1174&auto=format&fit=crop",
  },
  {
    title: "Web Design & Dev",
    num: "05",
    slug: "web-design",
    tagline: "Sites built to perform.",
    description:
      "Beautiful, functional, high-performance websites that deliver exceptional user experiences across all devices. From simple business sites to complex web applications.",
    features: [
      "Business Website Design",
      "E-commerce Website Development",
      "Landing Page Design",
      "WordPress Development",
      "Shopify Store Setup",
      "Multi-vendor E-commerce Platform",
      "WhatsApp Integration (Chat Widget, Business API)",
      "AI Chatbot Integration",
      "Payment Gateway Integration",
      "CRM Integration",
      "Website Maintenance & Support",
      "Mobile-Responsive Design",
      "Website Speed Optimization",
      "Custom Web Application Development",
    ],
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    title: "Brand Strategy",
    num: "06",
    slug: "brand-strategy",
    tagline: "Clarity that builds confidence.",
    description:
      "Strategic guidance to help your brand grow and thrive in the digital landscape. We analyze, strategize, and help you make data-driven decisions.",
    features: [
      "Brand Identity Development",
      "Social Media Strategy",
      "Digital Marketing Consultation",
      "Competitor Analysis",
      "Performance Analytics & Reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }
  }, []);

  return (
    <div
      className="min-h-screen pt-24"
      style={{
        background: "#F7F5F0",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        color: "#111",
      }}
    >
      {/* ── HERO ── */}
      <section data-nav-theme="light" className="relative overflow-hidden py-20 md:py-28">
        {/* Subtle grain texture overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Ghost number */}
        <span
          className="pointer-events-none absolute -right-8 top-0 select-none leading-none font-black"
          style={{
            fontSize: "clamp(160px, 28vw, 340px)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(245,166,35,0.15)",
            fontFamily: "'Bebas Neue', cursive",
            letterSpacing: "-0.02em",
          }}
        >
          SVC
        </span>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs tracking-[0.35em] uppercase mb-8 font-medium"
            style={{ color: "#F5A623" }}
          >
            — What We Offer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-[0.9] tracking-tight mb-8"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(64px, 10vw, 130px)",
              color: "#111",
            }}
          >
            EVERYTHING
            <br />
            YOUR BRAND
            <br />
            <span style={{ color: "#F5A623" }}>NEEDS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg max-w-lg leading-relaxed"
            style={{ color: "#555" }}
          >
            From strategy to execution — complete digital services designed to help
            your brand grow, stand out, and convert.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICE COUNT STRIP ── */}
      <section
        data-nav-theme="light"
        className="border-y py-5"
        style={{ borderColor: "rgba(0,0,0,0.1)" }}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-8 overflow-x-auto">
          {allServices.map((s, i) => (
            <a
              key={s.num}
              href={`#${s.slug}`}
              className="shrink-0 flex items-center gap-2 group transition-opacity"
              style={{ opacity: 0.45 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
            >
              <span
                className="text-xs font-bold"
                style={{ color: "#F5A623" }}
              >
                {s.num}
              </span>
              <span className="text-xs tracking-wide uppercase font-medium whitespace-nowrap">
                {s.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── SERVICES STACK ── */}
      <section data-nav-theme="light" className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-6">
            {allServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                isOpen={activeIndex === index}
                onToggle={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        data-nav-theme="dark"
        className="py-24 md:py-36 relative overflow-hidden"
        style={{ background: "#111" }}
      >
        {/* Amber glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 50% 110%, rgba(245,166,35,0.22) 0%, transparent 70%)",
          }}
        />
        {/* Ghost text */}
        <span
          className="pointer-events-none absolute left-0 bottom-0 select-none font-black leading-none"
          style={{
            fontSize: "clamp(100px, 18vw, 220px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(245,166,35,0.1)",
            fontFamily: "'Bebas Neue', cursive",
          }}
        >
          GROW
        </span>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.35em] uppercase mb-6 font-medium"
            style={{ color: "#F5A623" }}
          >
            — Let's Get Moving
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-black leading-none mb-10 text-white"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(52px, 8vw, 110px)",
            }}
          >
            READY TO
            <br />
            <span style={{ color: "#F5A623" }}>GROW?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:gap-5"
              style={{ background: "#F5A623", color: "#111" }}
            >
              Book a Meeting
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── SERVICE CARD COMPONENT ── */
function ServiceCard({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof allServices)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      id={service.slug}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl overflow-hidden scroll-mt-32"
      style={{
        background: isOpen ? "#fff" : "#EEEAE2",
        border: `1px solid ${isOpen ? "rgba(245,166,35,0.35)" : "rgba(0,0,0,0.07)"}`,
        transition: "background 0.3s, border-color 0.3s",
        boxShadow: isOpen ? "0 8px 40px rgba(0,0,0,0.07)" : "none",
      }}
    >
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-7 py-6 md:py-7 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-5 md:gap-8 min-w-0">
          <span
            className="font-black shrink-0 tabular-nums"
            style={{
              color: "#F5A623",
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(28px, 4vw, 42px)",
            }}
          >
            {service.num}
          </span>
          <div className="min-w-0">
            <p
              className="font-black leading-tight truncate"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(22px, 3.5vw, 38px)",
                color: "#111",
              }}
            >
              {service.title}
            </p>
            <p
              className="text-xs md:text-sm mt-0.5 truncate"
              style={{ color: "#888" }}
            >
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Toggle icon */}
        <div
          className="shrink-0 ml-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "#F5A623" : "rgba(0,0,0,0.08)",
          }}
        >
          <svg
            className="w-4 h-4 transition-transform duration-300"
            style={{
              color: isOpen ? "#111" : "#555",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {/* Expanded panel */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-7 pb-8">
          {/* Divider */}
          <div
            className="mb-8 h-[1px]"
            style={{ background: "rgba(0,0,0,0.08)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: description + features */}
            <div>
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: "#444" }}
              >
                {service.description}
              </p>

              <ul className="space-y-3 mb-10">
                {service.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -12 }}
                    transition={{ delay: fi * 0.035 + 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "#F5A623" }}
                    />
                    <span className="text-sm" style={{ color: "#333" }}>
                      {f}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-200 hover:gap-4"
                style={{ background: "#111", color: "#fff" }}
              >
                Get Started
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right: image */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ height: "clamp(220px, 28vw, 380px)" }}
            >
              <Image
                src={service.image}
                alt={`${service.title} service image for DPLUS Creator, a creative digital agency in India`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{ transition: "transform 0.7s ease" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLImageElement).style.transform = "scale(1.06)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLImageElement).style.transform = "scale(1)")
                }
              />
              {/* Amber tint overlay on corner */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at bottom right, rgba(245,166,35,0.3) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}