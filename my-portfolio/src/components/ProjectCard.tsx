// src/components/ProjectCard.tsx
"use client";

import Image, { ImageProps } from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
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

/**
 * PixelImage: wrapper for next/image.
 * Use Next's ImageProps so TS knows 'src' etc. types.
 * The parent must provide fixed width/height (we use a wrapper div w/ h).
 */
const PixelImage: React.FC<
  Pick<ImageProps, "src" | "alt" | "className" | "priority" | "placeholder">
> = ({ src, alt = "", className, ...props }) => {
  return (
    <div className="relative w-[160px] h-[160px]">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}
        className={className}
        {...(props as Omit<ImageProps, "src" | "alt" | "className">)}
      />
    </div>
  );
};

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
        className="h-full flex items-center justify-center bg-muted"
        style={{ width: 160 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </a>
    ) : (
      <div
        className="h-full flex items-center justify-center bg-muted"
        style={{ width: 160 }}
      >
        {children}
      </div>
    );

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.4,0.1,0.2,1] }}
      className="group relative flex h-44 w-full overflow-hidden rounded-lg border border-border bg-card backdrop-blur-xl shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.08),transparent_60%)]" />
      <LeftWrapper>
        <div className="flex items-center justify-center w-[160px] h-[160px] p-3">
          <PixelImage
            src={image}
            alt={title}
            className="object-contain w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
          />
        </div>
      </LeftWrapper>

      <CardSpotlight className="relative flex flex-1 flex-col justify-between py-3 pr-4 pl-5 min-w-0 rounded-none border-none bg-transparent">
        <div className="flex items-start justify-between gap-3 relative z-10">
          <h3 className="text-[0.95rem] font-semibold tracking-tight text-foreground line-clamp-1 flex items-center gap-2">
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
        <p className="mt-1.5 text-[0.68rem] leading-relaxed text-foreground/55 line-clamp-2">
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
