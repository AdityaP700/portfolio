import React from "react";
import { projects } from "@/lib/projects";
import {
  ProjectEditorialCard,
  type EditorialProject,
} from "./ProjectEditorial";

export function FlagshipProjects() {
  const featured = projects.filter((p) => p.isFeatured);

  const items: EditorialProject[] = featured.map((project, index) => ({
    title: project.title,
    number: String(index + 1).padStart(2, "0"),
    eyebrow: project.eyebrow,
    description: project.description,
    evidence: project.evidence,
    technologies: project.technologies,
    image: project.image,
    link: project.link,
    githubLink: project.githubLink,
    isLive: project.isLive,
  }));

  return (
    <div>
      <p className="text-sm text-foreground/55">
        Production systems, agent runtimes, and evaluation infrastructure I&apos;ve designed and built.
      </p>

      <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {items.map((project) => (
          <ProjectEditorialCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
