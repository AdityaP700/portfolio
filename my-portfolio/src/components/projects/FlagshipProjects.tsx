import React from "react";
import { projects } from "@/lib/projects";
import {
  ProjectEditorialCard,
  type EditorialProject,
} from "./ProjectEditorial";

function pick(title: string) {
  return projects.find((p) => p.title === title);
}

export function FlagshipProjects() {
  const aegis = pick("Aegis");
  const exora = pick("Exora");
  const tokaroo = pick("Tokaroo");
  const chunkdup = pick("ChunkdUp");

  const items: EditorialProject[] = [
    {
      title: "Aegis",
      number: "01",
      eyebrow: aegis?.eyebrow ?? "LLM Reliability",
      description:
        aegis?.description ??
        "A reliability runtime for LLM tool-calling agents.",
      evidence: aegis?.evidence,
      technologies: aegis?.technologies,
      image: aegis?.image,
      link: aegis?.link ?? null,
      githubLink: aegis?.githubLink,
      isLive: aegis?.isLive,
    },
    {
      title: "Exora",
      number: "02",
      eyebrow: exora?.eyebrow ?? "AI Product",
      description:
        exora?.description ??
        "Real-time competitive intelligence engine.",
      technologies: exora?.technologies,
      image: exora?.image,
      link: exora?.link ?? null,
      githubLink: exora?.githubLink,
      isLive: exora?.isLive,
    },
    {
      title: "Tokaroo",
      number: "03",
      eyebrow: tokaroo?.eyebrow ?? "Retrieval Evaluation",
      description:
        tokaroo?.description ??
        "Adaptive RAG evaluator and retrieval failure analysis.",
      technologies: tokaroo?.technologies,
      image: tokaroo?.image,
      link: tokaroo?.link ?? null,
      githubLink: tokaroo?.githubLink,
      isLive: tokaroo?.isLive,
    },
    {
      title: "ChunkdUp",
      number: "04",
      eyebrow: chunkdup?.eyebrow ?? "Memory Infrastructure",
      description:
        chunkdup?.description ??
        "Chunking strategy explorer for better context retrieval.",
      technologies: chunkdup?.technologies,
      image: chunkdup?.image,
      link: chunkdup?.link ?? null,
      githubLink: chunkdup?.githubLink,
      isLive: chunkdup?.isLive,
    },
  ];

  return (
    <div>
      <p className="text-sm text-foreground/55">A few things I&apos;ve been building.</p>

      <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {items.map((project) => (
          <ProjectEditorialCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
