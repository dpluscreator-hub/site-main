"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { DarkContactForm } from "@/components/ContactForm";

const contactItems = [
  {
    icon: FiMail,
    label: "Email",
    value: "dpluscreator@gmail.com",
    href: "mailto:dpluscreator@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 7693063186",
    href: "tel:+917693063186",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@d_pluscreator",
    href: "https://www.instagram.com/d_pluscreator",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div
      className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24 pb-16">
        {/* Amber ambient blob */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Ghost watermark */}
        <span
          className="pointer-events-none absolute right-0 bottom-0 select-none leading-none font-black"
          style={{
            fontSize: "clamp(140px, 22vw, 280px)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(245,166,35,0.10)",
            fontFamily: "'Bebas Neue', 'Anton', cursive",
            letterSpacing: "-0.02em",
          }}
        >
          TALK
        </span>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.35em] uppercase mb-8 font-medium"
            style={{ color: "#F5A623" }}
          >
            — Get In Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-[0.92] tracking-tight mb-8"
            style={{
              fontFamily: "'Bebas Neue', 'Anton', cursive",
              fontSize: "clamp(64px, 10vw, 130px)",
            }}
          >
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span style={{ color: "#F5A623" }}>GREAT.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Ready to take your brand to the next level? Drop us a message
            and we'll get back to you within 24 hours.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-16 flex items-center gap-4"
          >
            <div className="w-10 h-[1px] bg-white/20" />
            <span className="text-xs tracking-widest text-white/30 uppercase">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 md:gap-20 items-start">

            {/* ── LEFT: Contact Info ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span
                className="block text-xs tracking-[0.3em] uppercase mb-6 font-medium"
                style={{ color: "#F5A623" }}
              >
                01 / Contact
              </span>
              <h2
                className="font-black leading-none mb-4"
                style={{
                  fontFamily: "'Bebas Neue', 'Anton', cursive",
                  fontSize: "clamp(40px, 5vw, 60px)",
                }}
              >
                REACH
                <br />
                OUT
              </h2>
              <div className="w-12 h-[2px] mb-10" style={{ background: "#F5A623" }} />

              <p
                className="text-sm md:text-base leading-relaxed mb-14"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Have a project in mind? We'd love to hear from you.
                Fill out the form or use any of the channels below.
              </p>

              {/* Contact Items */}
              <div className="space-y-10">
                {contactItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-5 group"
                    >
                      {/* Icon circle */}
                      <div
                        className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#F5A623]"
                        style={{ background: "rgba(245,166,35,0.12)" }}
                      >
                        <Icon
                          className="w-4 h-4 transition-colors duration-300 group-hover:text-[#111]"
                          style={{ color: "#F5A623" }}
                        />
                      </div>

                      <div>
                        <p
                          className="text-xs tracking-widest uppercase mb-1 font-medium"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {item.label}
                        </p>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="text-base font-semibold transition-colors duration-200"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLAnchorElement).style.color = "#F5A623")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLAnchorElement).style.color =
                              "rgba(255,255,255,0.85)")
                          }
                        >
                          {item.value}
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Tagline block */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-16 border-l-2 pl-6"
                style={{ borderColor: "#F5A623" }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  We typically respond within{" "}
                  <span className="text-white font-semibold">24 hours.</span>{" "}
                  For urgent projects, call us directly.
                </p>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span
                className="block text-xs tracking-[0.3em] uppercase mb-6 font-medium"
                style={{ color: "#F5A623" }}
              >
                02 / Message
              </span>
              <h2
                className="font-black leading-none mb-4"
                style={{
                  fontFamily: "'Bebas Neue', 'Anton', cursive",
                  fontSize: "clamp(40px, 5vw, 60px)",
                }}
              >
                SEND A
                <br />
                MESSAGE
              </h2>
              <div className="w-12 h-[2px] mb-10" style={{ background: "#F5A623" }} />

              {/* Form wrapper styled for dark theme */}
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <DarkContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM STRIP ──
      <section className="border-t border-white/10 py-10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            D+ Creator — Social Media Agency
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </section> */}
    </div>
  );
}
