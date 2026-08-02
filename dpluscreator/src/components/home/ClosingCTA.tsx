"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function ClosingCTA() {
  const reduce = useReducedMotion();

  return (
    <section data-nav-theme="light" className="relative overflow-hidden py-12 md:py-20 lg:py-24" aria-label="Start a project">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0.4 : 0.8 }}
          className="bg-gradient-to-br from-dark via-gray-900 to-dark rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-purple-600 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6">
              Ready to create something amazing?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-5 md:mb-8 max-w-xl md:max-w-2xl mx-auto">
              Let&apos;s bring your vision to life with creative work that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-dark px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Your Project
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-white/10 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}