"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Shivam Patil",
    role: "Creative Director",
  },
  {
    name: "Aman Sahani",
    role: "Digital Strategist",
  },
  {
    name: "Virendra Patidar",
    role: "Design Lead",
  },
  {
    name: "Prathviraj Singh Chouhan",
    role: "Marketing Specialist",
  },
];

export default function TeamPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 section-pattern">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-dark mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h1>
            <p className="text-lg text-dark/60 max-w-xl mx-auto">
              The creative minds behind DPLUS Creator
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-secondary/50 rounded-2xl p-6 hover:bg-secondary transition-colors duration-300">
                  <h3 className="text-xl font-display font-bold text-dark">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-16 md:py-20 bg-dark text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Join Our Team
            </h2>
            <p className="text-gray-400 mb-8">
              We're always looking for talented individuals who share our passion
              for creativity and innovation.
            </p>
            <a
              href="mailto:dpluscreator@gmail.com"
              className="inline-flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
