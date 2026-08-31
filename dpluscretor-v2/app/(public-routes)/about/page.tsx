"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 sm:px-12 md:px-24 bg-background min-h-screen text-center">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-brand/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-3xl w-full z-10 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-heading text-foreground">
            About <span className="text-brand">DPlus Creator</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-subtext">
            We are a creative technology studio dedicated to building high-end interactive spaces and premium user experiences.
          </p>
        </div>

        {/* Demo Content Cards for Transition Testing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
          <div className="p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md">
            <h3 className="text-lg font-bold text-foreground mb-2">Our Vision</h3>
            <p className="text-sm text-muted-foreground font-subtext leading-relaxed">
              Crafting premium digital platforms that blend cutting-edge technology with high-end aesthetic storytelling.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md">
            <h3 className="text-lg font-bold text-foreground mb-2">Our Work</h3>
            <p className="text-sm text-muted-foreground font-subtext leading-relaxed">
              From fluid animations to custom Web apps, we help modern brands grow and scale with absolute confidence.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-mono text-sm tracking-wider hover:bg-brand hover:text-background transition-colors duration-300 shadow-lg shadow-black/10"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}