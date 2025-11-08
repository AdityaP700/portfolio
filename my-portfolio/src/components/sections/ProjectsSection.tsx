"use client";
import { useState } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsSectionProps {
  showTitle?: boolean;
}

export default function ProjectsSection({ showTitle = true }: ProjectsSectionProps) {
  const categories = ["All", "Web3", "ML", "Web App"] as const;
  const [selected, setSelected] = useState<(typeof categories)[number]>("All");

  const filtered = selected === "All"
    ? projects
    : projects.filter((p) => p.category === selected);

  return (
    <section className="space-y-6">
      {showTitle && (
        <h2 className="font-bold text-center sm:text-left text-base text-white tracking-wide">
          Proof of Work
        </h2>
      )}

      {/* Filter Bar */}
  <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const active = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border " +
                (active
                  ? "bg-white/15 text-white border-white/20"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10")
              }
              aria-pressed={active}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
