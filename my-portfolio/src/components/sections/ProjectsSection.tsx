"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsSectionProps {
  showTitle?: boolean;
}

const categories = ["All", "AI Infra", "LLM", "RAG", "ML", "Rust", "Web3"] as const;

export default function ProjectsSection({ showTitle = true }: ProjectsSectionProps) {
  const [selected, setSelected] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => selected === "All" ? projects : projects.filter((p) => p.category === selected),
    [selected]
  );

  return (
    <section id="projects" className="space-y-6">
      {showTitle && (
        <div className="space-y-2">
          <p className="section-kicker">02 / Selected Work</p>
          <h2 className="section-heading">Engineering evidence, not just screenshots.</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/58">
            AI infrastructure, retrieval systems, LLM products, and lower-priority supporting Web3/Rust work.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const active = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={
                "rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors " +
                (active
                  ? "border-foreground/25 bg-foreground/12 text-foreground"
                  : "border-border/70 bg-card/60 text-foreground/55 hover:border-foreground/20 hover:text-foreground")
              }
              aria-pressed={active}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} compact={!project.isFeatured} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border/70 py-10 text-center text-sm text-foreground/40">
          No projects found in this category.
        </div>
      )}
    </section>
  );
}
