import Image from "next/image";
import React from "react";
import { ArrowUpRight, Github } from "lucide-react";

export type EditorialProject = {
  title: string;
  number: string;
  eyebrow?: string;
  description: string;
  evidence?: string;
  technologies?: string[];
  image?: string;
  link?: string | null;
  githubLink?: string;
  isLive?: boolean;
};

function TechLine({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <p className="mt-3 text-[12px] leading-relaxed text-foreground/55">
      {items.slice(0, 5).join(" · ")}
    </p>
  );
}

function Links({ link, githubLink }: { link?: string | null; githubLink?: string }) {
  if (!link && !githubLink) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-sm">
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
          <ArrowUpRight className="h-4 w-4 opacity-60" />
        </a>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground"
        >
          <span>Live</span>
          <ArrowUpRight className="h-4 w-4 opacity-60" />
        </a>
      )}
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-foreground/[0.025] p-6 text-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
          {title}
        </p>
        <p className="mt-2 text-xs text-foreground/35">Project image coming soon</p>
      </div>
    </div>
  );
}

export function ProjectEditorialFeatured({ project }: { project: EditorialProject }) {
  return (
    <article className="border-t border-border/70 pt-8">
      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-sm border border-border/60 bg-card/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority={false}
          />
        ) : (
          <Placeholder title={project.title} />
        )}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[32px] font-semibold tracking-tight text-foreground sm:text-[38px]">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] tracking-[0.22em] text-foreground/40">
              {project.number}
            </span>
          </div>
          {project.eyebrow && (
            <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.22em] text-foreground/45">
              {project.eyebrow}
            </p>
          )}
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-foreground/70">
            {project.description}
          </p>

          {project.evidence && (
            <p className="mt-3 text-[13px] text-foreground/60">
              <span className="font-mono">6 → 0</span>
              <span className="text-foreground/45">&nbsp;silent failures</span>
              <span className="text-foreground/35"> · </span>
              <span className="font-mono">22</span>
              <span className="text-foreground/45">&nbsp;cases</span>
            </p>
          )}

          <TechLine items={project.technologies} />
          <Links link={project.link} githubLink={project.githubLink} />
        </div>
      </div>
    </article>
  );
}

export function ProjectEditorialCard({ project }: { project: EditorialProject }) {
  const visualHref = project.link ?? project.githubLink;

  const visual = (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/65 bg-card/20">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
          priority={false}
        />
      ) : (
        <Placeholder title={project.title} />
      )}
      {project.isLive && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 border border-border/70 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/70 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live
        </span>
      )}
    </div>
  );

  return (
    <article className="group overflow-hidden border border-border/70 bg-card/20 transition-colors hover:border-foreground/25">
      {visualHref ? (
        <a
          href={visualHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="block"
        >
          {visual}
        </a>
      ) : (
        visual
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[24px] font-semibold tracking-tight text-foreground sm:text-[27px]">
              {project.title}
            </h3>
            {project.eyebrow && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                {project.eyebrow}
              </p>
            )}
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/30">
            {project.number}
          </span>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-foreground/68">
          {project.description}
        </p>

        {project.evidence && (
          <p className="mt-3 border-l border-emerald-400/60 pl-3 text-[12px] leading-relaxed text-foreground/58">
            {project.evidence}
          </p>
        )}

        <TechLine items={project.technologies} />
        <Links link={project.link} githubLink={project.githubLink} />
      </div>
    </article>
  );
}
