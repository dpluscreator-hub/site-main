"use client"

import { motion } from "framer-motion";
import { HOMEPAGE_FAQS } from "@/lib/data/faqs";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-[#f8f8f8] py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl text-center mx-auto mb-12">
          <p className="text-sm uppercase tracking-[0.28em] text-dark/60 mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark">Questions clients ask before they start.</h2>
          <p className="mt-4 text-base md:text-lg text-dark/70">
            Answers to the most common questions about working with DPLUS Creator on branding, social, content and video campaigns.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {HOMEPAGE_FAQS.map((faq) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-dark mb-3">{faq.question}</h3>
              <p className="text-sm leading-relaxed text-dark/70">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
