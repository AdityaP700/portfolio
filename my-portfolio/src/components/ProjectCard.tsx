// src/components/ProjectCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import MediaPreview from "@/components/ui/MediaPreview";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  eyebrow?: string;
  description: string;
  evidence?: string;
  technologies?: string[];
  image?: string;
  link?: string | null;
  githubLink?: string;
  isLive?: boolean;
}

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <MediaPreview
        src={project.image}
        alt={project.title}
        width={420}
        height={260}
        rounded={false}
        chrome={true}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-[210px] w-full flex-col justify-between overflow-hidden border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,255,255,.24)_1px,transparent_1px)] [background-size:14px_14px]" />
      <div className="absolute inset-x-0 top-0 h-7 border-b border-border/70 bg-background/40" />
      <div className="relative z-10 mt-8 space-y-3 font-mono text-xs text-foreground/55">
        <p>$ inspect --project {project.title.toLowerCase()}</p>
        <p className="text-emerald-300/80">status: actively maintained</p>
        <p>focus: {project.eyebrow ?? "system design"}</p>
      </div>
      <div className="relative z-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/35">case file</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{project.title}</p>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const { title, eyebrow, description, evidence, technologies, link, githubLink, isLive } = project;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-lg border border-border/70 bg-card/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.04)] transition-colors hover:border-foreground/25"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.25 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(500px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(16,185,129,.12),transparent_45%)]" />
      <div className={compact ? "grid gap-0" : "grid gap-0 lg:grid-cols-[0.95fr_1.05fr]"}>
        <div className={compact ? "hidden" : "relative min-h-[230px] overflow-hidden bg-foreground/[0.03]"}>
          {(link || githubLink) ? (
            <a
              href={link ?? githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
              aria-label={`Open ${title}`}
            >
              <ProjectVisual project={project} />
            </a>
          ) : (
            <ProjectVisual project={project} />
          )}
        </div>

        <CardSpotlight className="relative flex min-h-[230px] flex-col justify-between rounded-none border-none bg-transparent p-5 sm:p-6">
          <div className="relative z-10 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                {eyebrow && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40">{eyebrow}</p>
                )}
                <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h3>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {isLive && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Live
                  </span>
                )}
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border/70 p-2 text-foreground/45 transition-colors hover:border-foreground/30 hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${title} GitHub repository`}
                  >
                    <Github size={17} />
                  </a>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border/70 p-2 text-foreground/45 transition-colors hover:border-foreground/30 hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${title} live project`}
                  >
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-foreground/68 sm:text-[15px]">{description}</p>

            {evidence && (
              <div className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2 font-mono text-xs leading-relaxed text-emerald-100/85">
                {evidence}
              </div>
            )}
          </div>

          {technologies && technologies.length > 0 && (
            <div className="relative z-10 mt-5 flex flex-wrap gap-2">
              {technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-border/70 bg-foreground/[0.045] px-2.5 py-1 font-mono text-[11px] text-foreground/62 transition-colors group-hover:bg-foreground/[0.07]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </CardSpotlight>
      </div>
    </motion.article>
  );
}
