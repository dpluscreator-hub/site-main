"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const services = [
  { label: "Social Media Management", num: "01" },
  { label: "Graphic Design", num: "02" },
  { label: "Video Editing", num: "03" },
  { label: "Brand Identity", num: "04" },
  { label: "Web Design", num: "05" },
  { label: "Content Creation", num: "06" },
  { label: "Ads Creatives", num: "07" },
  { label: "Marketing", num: "08" },
];

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "3x", label: "Avg. Growth" },
  { value: "∞", label: "Ideas" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div
      ref={containerRef}
      className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
        {/* Ambient blob */}
        <motion.div

          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)",
            y: bgY
          }}
        />

        {/* Large ghost text */}
        <span
          className="pointer-events-none absolute right-0 bottom-0 text-[clamp(120px,18vw,220px)] font-black leading-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(245,166,35,0.12)",
            fontFamily: "'Bebas Neue', 'Anton', cursive",
            letterSpacing: "-0.02em",
          }}
        >
          ABOUT
        </span>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.35em] uppercase mb-8"
            style={{ color: "#F5A623" }}
          >
            — Who We Are
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(52px,8vw,110px)] font-black leading-[0.95] tracking-tight mb-10"
            style={{ fontFamily: "'Bebas Neue', 'Anton', cursive" }}
          >
            WE TURN
            <br />
            <span style={{ color: "#F5A623" }}>IDEAS</span> INTO
            <br />
            IMPACT.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/50 max-w-md leading-relaxed"
          >
            A creative social media agency obsessed with building brands that
            don't just exist online — they dominate.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex items-center gap-4"
          >
            <div className="w-10 h-[1px] bg-white/20" />
            <span className="text-xs tracking-widest text-white/30 uppercase">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-y border-white/10 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p
                  className="text-5xl md:text-6xl font-black mb-1"
                  style={{
                    color: "#F5A623",
                    fontFamily: "'Bebas Neue', 'Anton', cursive",
                  }}
                >
                  {s.value}
                </p>
                <p className="text-xs tracking-widest uppercase text-white/40">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="block text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "#F5A623" }}
              >
                01 / Identity
              </span>
              <h2
                className="text-5xl md:text-6xl font-black leading-none"
                style={{ fontFamily: "'Bebas Neue', 'Anton', cursive" }}
              >
                WHO
                <br />
                WE ARE
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-6">
                We are a{" "}
                <span className="text-white font-semibold">creative</span>{" "}
                social media agency that exists for one reason: to help brands{" "}
                <span style={{ color: "#F5A623" }} className="font-semibold">
                  grow
                </span>{" "}
                and carve out a distinct, powerful presence online.
              </p>
              <p className="text-base text-white/40 leading-relaxed">
                We don't just post — we position. Every piece of content we
                create is a deliberate step toward building something that
                lasts.
              </p>

              {/* Accent line */}
              <div
                className="mt-10 h-[2px] w-24"
                style={{ background: "#F5A623" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* BG fill */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(245,166,35,0.04)" }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: "#F5A623" }} />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="block text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "#F5A623" }}
              >
                02 / Process
              </span>
              <h2
                className="text-5xl md:text-6xl font-black leading-none"
                style={{ fontFamily: "'Bebas Neue', 'Anton', cursive" }}
              >
                HOW
                <br />
                WE WORK
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-8"
            >
              {[
                {
                  step: "Understand",
                  desc: "We immerse ourselves in your brand — your audience, your voice, your goals.",
                },
                {
                  step: "Create",
                  desc: "We develop content that sits at the intersection of your vision and what's trending right now.",
                },
                {
                  step: "Execute",
                  desc: "Every post ships with purpose. Clean design. Clear message. Real results.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <span
                    className="text-3xl font-black leading-none pt-1 shrink-0"
                    style={{
                      color: "#F5A623",
                      fontFamily: "'Bebas Neue', 'Anton', cursive",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-white mb-1">
                      {item.step}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="block text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "#F5A623" }}
              >
                03 / Edge
              </span>
              <h2
                className="text-5xl md:text-6xl font-black leading-none"
                style={{ fontFamily: "'Bebas Neue', 'Anton', cursive" }}
              >
                WHAT SETS
                <br />
                US APART
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {[
                {
                  title: "Creativity First",
                  desc: "We approach every brand with a fresh eye. No templates. No copy-paste.",
                },
                {
                  title: "Strategy Driven",
                  desc: "Beautiful content means nothing without direction. We combine both.",
                },
                {
                  title: "Clean Design",
                  desc: "Our aesthetics are sharp, modern, and always on-brand.",
                },
                {
                  title: "Personal Touch",
                  desc: "You're not a ticket. We build relationships and grow together.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-white/10 rounded-2xl p-6 hover:border-[#F5A623]/40 transition-colors duration-300 group"
                >
                  <div
                    className="w-8 h-[2px] mb-4 transition-all duration-300 group-hover:w-14"
                    style={{ background: "#F5A623" }}
                  />
                  <p className="text-white font-bold text-lg mb-2">
                    {card.title}
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <h2
              className="text-5xl md:text-7xl font-black leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Anton', cursive" }}
            >
              WHAT
              <br />
              <span style={{ color: "#F5A623" }}>WE DO</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xs">
              Eight disciplines. One unified goal: your growth.
            </p>
          </motion.div>

          <div className="divide-y divide-white/10">
            {services.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between py-5 group cursor-default"
              >
                <div className="flex items-center gap-6">
                  <span
                    className="text-xs tabular-nums"
                    style={{ color: "#F5A623" }}
                  >
                    {s.num}
                  </span>
                  <span className="text-lg md:text-2xl font-semibold text-white/70 group-hover:text-white transition-colors duration-200">
                    {s.label}
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-white/20 group-hover:text-[#F5A623] transition-colors duration-200 -rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,166,35,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.35em] uppercase mb-6"
            style={{ color: "#F5A623" }}
          >
            — Let's Build
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(48px,8vw,110px)] font-black leading-none mb-10"
            style={{ fontFamily: "'Bebas Neue', 'Anton', cursive" }}
          >
            READY TO
            <br />
            <span style={{ color: "#F5A623" }}>GROW?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:gap-5"
              style={{
                background: "#F5A623",
                color: "#0A0A0A",
              }}
            >
              Get in Touch
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}