"use client";

import React from "react";

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-24 bg-zinc-950 min-h-screen text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">Join the Team section 1</h1>
        <p className="text-zinc-400 max-w-xl text-lg leading-relaxed">
          We are always looking for talented designers, developers, and animators. Explore opportunities to grow with us.
        </p>
      </div>    
      <div className="flex-1 flex flex-col items-center justify-center p-24 bg-zinc-950 min-h-screen text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white mb-6">Join the Team section 2</h1>
        <p className="text-zinc-400 max-w-xl text-lg leading-relaxed">
          We are always looking for talented designers, developers, and animators. Explore opportunities to grow with us.
        </p>
      </div>
    </div>
  );
}
