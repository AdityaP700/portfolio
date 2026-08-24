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

export default function WritingsSection({
  limit,
  showTitle = true,
}: WritingsSectionProps) {
  const featured = writings.find((w) => w.featured) ?? writings[0];
  const displayedWritings = limit ? [featured].slice(0, limit) : [featured];

  return (
    <section id="writing" className="w-full space-y-6">
      {showTitle && (
        <div className="space-y-2">
          <p className="section-kicker">05 / Writing</p>
          <h2 className="section-heading">Writing</h2>
        </div>
      )}

      <div className="border-t border-border/70 pt-8">
        {displayedWritings.map((w) => {
          const isExternal = w.url.startsWith("http");

          return (
            <a
              key={w.title}
              href={w.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group block"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                    <span>{w.source ?? "Note"}</span>
                    <span>/</span>
                    <span>{w.date}</span>
                  </div>
                  <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-foreground group-hover:underline sm:text-[22px]">
                    {w.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/70">
                    {w.excerpt}
                  </p>
                  <p className="mt-3 text-[12px] text-foreground/55">
                    {w.tags.slice(0, 4).join(" · ")}
                  </p>
                </div>
                <ExternalLink className="mt-2 h-4 w-4 shrink-0 text-foreground/35 transition-colors group-hover:text-foreground/75" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
