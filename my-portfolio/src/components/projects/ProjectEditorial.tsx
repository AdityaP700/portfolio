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
    <div className="mt-4 flex flex-wrap gap-1.5">
      {items.slice(0, 6).map((tech) => (
        <span
          key={tech}
          className="rounded-md border border-border/60 bg-foreground/[0.03] px-2 py-0.5 font-mono text-[11px] text-foreground/65 transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function Links({ link, githubLink }: { link?: string | null; githubLink?: string }) {
  if (!link && !githubLink) return null;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs">
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3.5 py-1.5 font-medium text-foreground/75 shadow-sm transition-all hover:border-foreground/35 hover:bg-foreground/5 hover:text-foreground"
        >
          <Github className="h-3.5 w-3.5" />
          <span>Code</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
        </a>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 font-medium text-emerald-600 dark:text-emerald-400 shadow-sm transition-all hover:border-emerald-500/60 hover:bg-emerald-500/20"
        >
          <span>Live Demo</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
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
        <p className="mt-2 text-xs text-foreground/35">Project image preview</p>
      </div>
    </div>
  );
}

export function ProjectEditorialFeatured({ project }: { project: EditorialProject }) {
  return (
    <article className="border-t border-border/70 pt-8">
      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-lg border border-border/60 bg-card/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            loading="lazy"
            className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
          />
        ) : (
          <Placeholder title={project.title} />
        )}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[30px] font-semibold tracking-tight text-foreground sm:text-[34px]">
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
            <div className="mt-3.5 flex items-center gap-2 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[12px]">{project.evidence}</span>
            </div>
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
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-card/20">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          loading="lazy"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <Placeholder title={project.title} />
      )}
      {project.isLive && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/80 backdrop-blur-md shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      )}
    </div>
  );

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border/70 bg-card/30 transition-all duration-300 hover:border-foreground/30 hover:shadow-lg hover:shadow-black/5">
      <div>
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
              <h3 className="text-[22px] font-semibold tracking-tight text-foreground sm:text-[25px]">
                {project.title}
              </h3>
              {project.eyebrow && (
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                  {project.eyebrow}
                </p>
              )}
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/35">
              {project.number}
            </span>
          </div>

          <p className="mt-3.5 text-[14px] leading-relaxed text-foreground/70 sm:text-[15px]">
            {project.description}
          </p>

          {project.evidence && (
            <div className="mt-3.5 flex items-center gap-2 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-mono text-[11px] leading-snug">{project.evidence}</span>
            </div>
          )}

          <TechLine items={project.technologies} />
        </div>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
        <Links link={project.link} githubLink={project.githubLink} />
      </div>
    </article>
  );
}
