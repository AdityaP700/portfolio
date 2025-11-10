// src/components/ProjectCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import MediaPreview from "@/components/ui/MediaPreview";
import { Github } from "lucide-react";

interface Project {
  title: string;
  icon?: React.ReactNode;
  description: string;
  technologies?: string[];
  image: string;                // path under /public or external (allowed by next.config)
  link?: string | null;        // may be null
  githubLink?: string;         // optional
  isLive?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, technologies, image, link, githubLink, isLive } =
    project;

  // Explicit children typing avoids using {} empty-object type
  const LeftWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
    link ? (
      <a
        href={link ?? undefined} // ensures href type is string | undefined, not null
        target="_blank"
        rel="noopener noreferrer"
        className="h-full w-full md:w-[260px] flex items-center justify-center bg-foreground/5 dark:bg-foreground/10 md:border-r border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </a>
    ) : (
      <div
        className="h-full w-full md:w-[260px] flex items-center justify-center bg-foreground/5 dark:bg-foreground/10 md:border-r border-border"
      >
        {children}
      </div>
    );

  return (
    <motion.div
      /* Card stays static; only image enlarges */
      className="group relative flex flex-col md:flex-row h-auto md:h-[180px] w-full overflow-hidden rounded border border-border bg-card backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.03)] transition-colors"
    style={{ borderRadius: 0 }}>
<div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-white/1 dark:bg-black/2" />
      <LeftWrapper>
        {/* Overflow hidden so preview zoom stays clipped */}
        <div className="relative w-full h-[200px] md:h-full overflow-hidden">
          <div className="h-full w-full origin-center transition-transform duration-500 ease-[cubic-bezier(.4,.1,.2,1)] group-hover:scale-[1.06]">
            <MediaPreview
              src={image}
              alt={title}
              width={260}
              height={180}
              rounded={false}
              chrome={true}
            />
          </div>
        </div>
      </LeftWrapper>

      <CardSpotlight className="relative flex flex-1 flex-col justify-between py-4 md:py-3 px-4 md:pr-4 md:pl-5 min-w-0 rounded-none border-none bg-transparent">
        <div className="flex items-start justify-between gap-3 relative z-10">
          <h3 className="text-lg md:text-[1.1rem] lg:text-[1.2rem] font-semibold tracking-tight text-foreground line-clamp-1 flex items-center gap-2">
            {title}
            {isLive && (
              <span className="inline-flex items-center gap-1 text-[0.55rem] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                LIVE
              </span>
            )}
          </h3>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-foreground/30 hover:text-foreground/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
          )}
        </div>
        <p className="mt-2 md:mt-1 text-sm md:text-[0.8rem] leading-relaxed text-foreground/65 line-clamp-2 md:line-clamp-2">
          {description}
        </p>
        {technologies && technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 overflow-hidden">
            {technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="inline-block rounded-full bg-foreground/6 backdrop-blur-sm border border-border px-2 py-0.5 text-[0.55rem] font-medium tracking-wide text-foreground/70 whitespace-nowrap hover:bg-foreground/10 transition-colors"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 5 && (
              <span className="inline-block rounded-full bg-foreground/6 backdrop-blur-sm border border-border px-2 py-0.5 text-[0.55rem] font-medium tracking-wide text-foreground/70">
                +{technologies.length - 5}
              </span>
            )}
          </div>
        )}
      </CardSpotlight>
    </motion.div>
  );
}
