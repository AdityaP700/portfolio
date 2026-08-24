"use client";

import { ExternalLink } from "lucide-react";

interface WritingEntry {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string;
  source?: string;
  featured?: boolean;
}

const writings: WritingEntry[] = [
  {
    title: "What Happens Between an LLM and a Tool?",
    excerpt:
      "Building a reliability layer for AI agents: tool calls, silent failures, retries, and the engineering space between model intent and execution.",
    date: "Aug 2026",
    tags: ["AI Agents", "Tool Calling", "Reliability", "LLM Infra"],
    url: "https://medium.com/@adityaa32078/what-happens-between-an-llm-and-a-tool-building-a-reliability-layer-for-ai-agents-fe56c1d22cb7",
    source: "Medium",
    featured: true,
  },
  {
    title: "Momentum Over Perfection",
    excerpt:
      "Ship -> Learn -> Repeat. Planning past first useful iteration stalls feedback loops. Focus on the smallest version that teaches you something today.",
    date: "Nov 9, 2025",
    tags: ["Philosophy", "Building", "Learning"],
    url: "/blogs/momentum-over-perfection",
  },
];

interface WritingsSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export default function WritingsSection({ limit, showTitle = true }: WritingsSectionProps) {
  const displayedWritings = limit ? writings.slice(0, limit) : writings;

  return (
    <section id="writing" className="w-full space-y-6">
      {showTitle && (
        <div className="space-y-2">
          <p className="section-kicker">03 / Writing</p>
          <h2 className="section-heading">Writing from the systems I am building.</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/58">
            Notes on AI agents, retrieval, reliability, and the parts of engineering that only become clear after building.
          </p>
        </div>
      )}

      <div className="grid gap-3">
        {displayedWritings.map((w) => {
          const isExternal = w.url.startsWith("http");

          return (
            <a
              key={w.title}
              href={w.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={
                "group relative block overflow-hidden rounded-lg border bg-card/75 p-5 backdrop-blur-md transition-colors hover:border-foreground/25 " +
                (w.featured ? "border-emerald-400/25" : "border-border/70")
              }
            >
              <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/42">
                    <span>{w.source ?? "Note"}</span>
                    <span>/</span>
                    <span>{w.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-emerald-100 sm:text-xl">
                    {w.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-foreground/64">{w.excerpt}</p>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-foreground/35 transition-colors group-hover:text-foreground/75" />
              </div>
              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {w.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/70 bg-foreground/[0.045] px-2.5 py-1 font-mono text-[11px] text-foreground/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
