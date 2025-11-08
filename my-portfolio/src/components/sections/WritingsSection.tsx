"use client";
import { ExternalLink } from "lucide-react";

// Placeholder writings data - you can replace this with actual blog posts
const writings = [
  {
    title: "Building on Solana: Lessons from the Mainnet",
    description: "What I learned shipping my first decentralized app on the Solana blockchain, from transaction optimization to user experience.",
    date: "Coming Soon",
    url: "#",
    tags: ["Web3", "Solana", "Development"]
  },
  {
    title: "On-Device ML in Chrome Extensions",
    description: "Exploring the possibilities and constraints of running machine learning models directly in the browser.",
    date: "Coming Soon",
    url: "#",
    tags: ["ML", "Chrome Extensions", "JavaScript"]
  },
  {
    title: "Momentum Over Perfection",
    description: "Why shipping fast and iterating beats endless planning. My philosophy on building products and learning in public.",
    date: "Coming Soon",
    url: "#",
    tags: ["Philosophy", "Product", "Learning"]
  }
];

interface WritingsSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export default function WritingsSection({ limit, showTitle = true }: WritingsSectionProps) {
  const displayedWritings = limit ? writings.slice(0, limit) : writings;

  return (
    <section className="space-y-6">
      {showTitle && (
        <h2 className="font-bold text-center sm:text-left text-base text-white tracking-wide">
          Writings & Thoughts
        </h2>
      )}
      <div className="space-y-4">
        {displayedWritings.map((writing, index) => (
          <a
            key={index}
            href={writing.url}
            className="group block p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {writing.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {writing.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {writing.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-white/40">{writing.date}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      {!limit && (
        <p className="text-center text-sm text-white/40 italic pt-4">
          More writings coming soon. Building in public, one post at a time.
        </p>
      )}
    </section>
  );
}
