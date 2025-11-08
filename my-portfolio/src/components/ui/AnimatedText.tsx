"use client";

import React from "react";
import { Special_Elite } from "next/font/google";

const typewriterFont = Special_Elite({
  subsets: ["latin"],
  weight: "400",
});

export default function AnimatedName() {
  return (
    <a
      href="https://x.com/AdityaPat_"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block select-none ${typewriterFont.className} group`}
      aria-label="Aditya Pattanayak - @AdityaPat_"
    >
      <span className="font-bold text-lg text-foreground group-hover:text-emerald-400 transition-colors duration-200">
        Aditya Pattanayak
      </span>
    </a>
  );
}
