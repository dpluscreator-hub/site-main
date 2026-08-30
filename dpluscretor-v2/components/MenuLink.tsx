"use client";

import Link from "next/link";
import React from "react";

interface MenuLinkProps {
  href: string;
  label: string;
}

export function MenuLink({ href, label }: MenuLinkProps) {
  return (
    <div className="overflow-hidden py-1">
      <Link
        href={href}
        className="menu-item-anim group relative flex items-center w-fit py-1 pl-0 hover:pl-10 gap-1.5 transition-[padding] duration-300 ease-out"
      >
        <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full group-hover:translate-x-0 w-6 h-6 md:w-10 md:h-8 rounded-sm bg-brand flex items-center justify-center transition-transform duration-300 ease-out">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-950 fill-zinc-950 translate-x-[0.5px]">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="text-[clamp(1.875rem,4vw,2.6rem)] max-w-max ml-0 group-hover:ml-1.5 font-bold tracking-normal text-white leading-none block">
          {label}
        </span>
      </Link>
    </div>
  );
}
