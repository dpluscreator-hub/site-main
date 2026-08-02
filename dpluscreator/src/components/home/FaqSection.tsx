import { motion } from "framer-motion";

export const HOMEPAGE_FAQS = [
  {
    question: "What services does DPLUS Creator offer?",
    answer:
      "We provide branding, social media strategy, content creation, video production, digital campaigns and performance marketing for brands that want to grow online.",
  },
  {
    question: "Do you work with clients across India?",
    answer:
      "Yes. DPLUS Creator is based in India and serves clients nationally, supporting remote collaboration and campaign delivery for brands across the country.",
  },
  {
    question: "How long does a branding or content project take?",
    answer:
      "Typical projects take 6–12 weeks depending on scope, with strategy, design, production and launch milestones tailored to each client.",
  },
  {
    question: "Can you help with social media and video marketing together?",
    answer:
      "Absolutely. Our approach combines creative social media strategy with video-led content and performance marketing to build awareness and conversions.",
  },
  {
    question: "How can I book a meeting with DPLUS Creator?",
    answer:
      "Use the Book a meeting button on the homepage, or reach out via contact form on /contact to start a project conversation.",
  },
];

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
