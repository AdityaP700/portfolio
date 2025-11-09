"use client";
import React from "react";
import { coreToolkit, theFrontier, infrastructureAndOps, Skill } from "@/lib/skills";

function Row({ items, direction = "left", speed = 30 }: { items: Skill[]; direction?: "left" | "right"; speed?: number }) {
  const IconRow = (
    <div
      className={`flex items-center gap-2 sm:gap-3 pr-4 sm:pr-6`} // spacing between pills
      style={{
        animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
      }}
    >
      {items.map((skill, idx) => {
        const Icon = skill.icon;
        return (
          <div
            key={`${skill.name}-${idx}`}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-foreground/[0.06] hover:bg-foreground/[0.1] border border-border text-foreground/80 text-[0.75rem] sm:text-[0.9rem] transition-colors"
          >
            <span
              className="flex items-center justify-center h-4 w-4 sm:h-6 sm:w-6 shrink-0 rounded-md"
              style={{ animation: `fade-in-out 4s ease-in-out infinite`, animationDelay: `${(idx % 8) * 0.2}s` }}
            >
              <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </span>
            <span className="whitespace-nowrap">{skill.name}</span>
          </div>
        );
      })}
    </div>
  );

  // Duplicate row for seamless looping
  return (
    <div className="flex w-max">
      {IconRow}
      <div
        aria-hidden
        className="flex items-center gap-2 sm:gap-3 pr-4 sm:pr-6"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
          animationDelay: `${speed / 2}s`,
        }}
      >
        {items.map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <div
              key={`dupe-${skill.name}-${idx}`}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-foreground/[0.06] hover:bg-foreground/[0.1] border border-border text-foreground/80 text-[0.75rem] sm:text-[0.9rem] transition-colors"
            >
              <span
                className="flex items-center justify-center h-4 w-4 sm:h-6 sm:w-6 shrink-0 rounded-md"
                style={{ animation: `fade-in-out 4s ease-in-out infinite`, animationDelay: `${(idx % 8) * 0.2}s` }}
              >
                <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </span>
              <span className="whitespace-nowrap">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TechStackMarquee() {
  const all: Skill[] = [...coreToolkit, ...theFrontier, ...infrastructureAndOps];
  const midpoint = Math.ceil(all.length / 2);
  const top = all.slice(0, midpoint);
  const bottom = all.slice(midpoint);

  return (
    <section className="relative w-full max-w-5xl mx-auto overflow-hidden">
      <h2 className="text-center md:text-left text-sm font-medium text-foreground/70 mb-4 px-2">Tools that I have used</h2>
      <div className="relative w-full marquee-mask">
        <div className="flex flex-col gap-3 sm:gap-4">
          <Row items={top} direction="left" speed={28} />
          <Row items={bottom} direction="right" speed={34} />
        </div>
      </div>
    </section>
  );
}
