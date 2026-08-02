"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { JsonLd } from "@/lib/seo/JsonLd";
import { workCollectionSchema } from "@/lib/seo/schema";

const workProjects = [
  {
    id: 1,
    category: "Reels & Short-Form",
    title: "Viral Social Media Campaign",
    client: "Fashion Brand",
    description: "A series of high-energy reels that generated over 500K views and increased engagement by 300%.",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    driveLink: "https://drive.google.com/drive/folders/1mWoAqHazyyGZDNq0Om1-NbWX9IfEUYb5?usp=sharing",
    tags: ["Reels", "Instagram", "TikTok"],
  },
  {
    id: 2,
    category: "Motion Graphics",
    title: "Brand Explainer Video",
    client: "Tech Startup",
    description: "Engaging motion graphics that simplified complex tech concepts into an easy-to-understand visual story.",
    thumbnail: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&q=80",
    driveLink: "https://drive.google.com/drive/folders/190h5pjK1xNVZFPNYdgUOQAc0HOpU0wrA?usp=sharing",
    tags: ["Motion Design", "Explainer", "Branding"],
  },
  {
    id: 3,
    category: "3D & Visual Effects",
    title: "Product Visualization",
    client: "E-commerce Brand",
    description: "Stunning 3D product renders that increased online sales by 45% and reduced return rates.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    driveLink: "https://drive.google.com/drive/folders/1wNe4VejFd6zwM_CdeF5SBN7tYe9-3DL9?usp=sharing",
    tags: ["3D Design", "Product", "CGI"],
  },
  {
    id: 4,
    category: "Reels & Short-Form",
    title: "Behind The Scenes Series",
    client: "Creative Agency",
    description: "Authentic behind-the-scenes content that humanized the brand and built community trust.",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    driveLink: "https://drive.google.com/drive/folders/1mWoAqHazyyGZDNq0Om1-NbWX9IfEUYb5?usp=sharing",
    tags: ["BTS", "Story", "Content"],
  },
  {
    id: 5,
    category: "Motion Graphics",
    title: "Animated Logo & Brand Identity",
    client: "Restaurant Chain",
    description: "Dynamic brand animation that brought personality to every digital touchpoint.",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    driveLink: "https://drive.google.com/drive/folders/190h5pjK1xNVZFPNYdgUOQAc0HOpU0wrA?usp=sharing",
    tags: ["Animation", "Branding", "Identity"],
  },
  {
    id: 6,
    category: "3D & Visual Effects",
    title: "Immersive Brand Experience",
    client: "Luxury Brand",
    description: "A virtual 3D environment that let customers explore products in an immersive digital space.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    driveLink: "https://drive.google.com/drive/folders/1wNe4VejFd6zwM_CdeF5SBN7tYe9-3DL9?usp=sharing",
    tags: ["3D", "VFX", "Experience"],
  },
];

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Reels & Short-Form", "Motion Graphics", "3D & Visual Effects"];

  const filteredProjects =
    filter === "All"
      ? workProjects
      : workProjects.filter((project) => project.category === filter);

  return (
    <div className="pt-24">
      <JsonLd
        data={workCollectionSchema(
          workProjects.map((p) => ({ title: p.title, category: p.category }))
        )}
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Our Portfolio
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Work That <span className="gradient-text">Speaks</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Every project tells a story. From viral social content to stunning 3D animations,
              explore the creative work that&apos;s helped brands grow and connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b sticky top-20 z-40 shadow-sm bg-[#FBF7F0]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  filter === category
                    ? "bg-dark text-white shadow-lg scale-105"
                    : "bg-white/50 text-dark hover:bg-white/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <a
                    href={project.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-64 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-600/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} portfolio image by DPLUS Creator`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/95 backdrop-blur-sm text-dark px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* View Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
                        <span className="text-dark font-semibold flex items-center gap-2 text-sm">
                          View Project
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
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-primary font-semibold text-sm mb-2">
                      {project.client}
                    </p>
                    <h3 className="text-2xl font-bold text-dark mb-3">
                      {project.title}
                    </h3>
                    <p className="text-dark/70 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-dark/70 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark via-gray-900 to-dark rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to create something amazing?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Let&apos;s bring your vision to life with creative work that drives real results.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-dark px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Start Project
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
