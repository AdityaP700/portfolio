"use client";
import { ExternalLink } from "lucide-react";

// Micro–writings: short, formatted thought excerpts (no deep blog feel yet)
// Keep each entry intentionally concise – can expand later into full posts.
// Explicitly typed to avoid implicit any / never inference issues.
interface WritingEntry {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string; // external or internal; "#" denotes non-link placeholder
}

const writings: WritingEntry[] = [
  {
    title: "Momentum Over Perfection",
    excerpt:
      `Ship → Learn → Repeat.\nPlanning past first useful iteration stalls feedback loops.\nFocus: smallest version that teaches you something today.`,
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
    <section className="w-full space-y-6">
      {showTitle && (
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-base font-bold tracking-wide text-foreground">Writings & Thoughts</h2>
          <p className="text-[11px] tracking-wide text-foreground/50">Short thought drops. Full essays will live here later.</p>
        </div>
      )}

      <div className="space-y-3">
  {displayedWritings.map((w: WritingEntry, i: number) => {
          const isLinkable = w.url && w.url !== "#";
          const common = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold tracking-wide text-foreground/90 group-hover:text-foreground">{w.title}</h3>
                  <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-foreground/70">{w.excerpt}</pre>
                </div>
                {isLinkable && (
                  <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/35 group-hover:text-foreground/60" strokeWidth={2} />
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {w.tags.map((tag: string, tIndex: number) => (
                  <span
                    key={tIndex}
                    className="rounded-md border border-border/50 bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/50 group-hover:bg-foreground/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-[10px] font-medium text-foreground/40">{w.date}</span>
              </div>
            </>
          );

          return isLinkable ? (
            <a
              key={i}
              href={w.url}
              className="group relative block rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-3 shadow-[inset_0_0_0_1px_var(--border)] transition-colors hover:border-foreground/30 hover:bg-card hover:shadow-lg"
            >
              {common}
            </a>
          ) : (
            <div
              key={i}
              className="group relative block rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-3 shadow-[inset_0_0_0_1px_var(--border)] transition-colors hover:border-foreground/30 hover:bg-card hover:shadow-lg"
            >
              {common}
            </div>
          );
        })}
      </div>

      {/* Footer helper removed to avoid duplication; message moved under title. */}
    </section>
  );
}
