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
      whileHover={{ y: -4, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.25 }}
      className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-card"
    >
      <LeftWrapper>
        <div className="flex items-center justify-center w-[160px] h-[160px]">
          <PixelImage src={image} alt={title} className="object-contain w-full h-full" />
        </div>
      </LeftWrapper>

      <CardSpotlight className="flex flex-1 flex-col justify-between p-4 min-w-0 rounded-none border-none bg-transparent">
        <div className="flex items-start justify-between gap-2 relative z-10">
          <h3 className="text-l font-semibold text-foreground line-clamp-1 flex items-center gap-2">
            {title}
            {isLive && (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-500">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </span>
            )}
          </h3>

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
          )}
        </div>

        <div className="flex-1 mt-2 space-y-2 text-pretty text-muted-foreground text-sm leading-relaxed">
          <p className="line-clamp-3">{description}</p>
        </div>

        {technologies && technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 overflow-hidden">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-block rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="inline-block rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </CardSpotlight>
    </motion.div>
  );
}
