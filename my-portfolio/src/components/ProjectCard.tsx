"use client";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { CardSpotlight } from "@/components/ui/card-spotlight";

// Mock PixelImage component for demonstration
const PixelImage = ({ src, className, ...props }) => (
  <img src={src} alt="" className={className} {...props} />
);

interface Project {
  title: string;
  icon?: React.ReactNode;
  description: string;
  technologies?: string[];
  image: string;
  link?: string;
  githubLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
const { title, description, technologies, image, link, githubLink, isLive } = project;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.25 }}
      className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Left Side - Pixel Image */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="h-full flex items-center justify-center bg-muted"
        style={{ width: "160px" }} // slightly smaller for balance
      >
        <div className="flex items-center justify-center w-[160px] h-[160px]">
          <PixelImage
            src={image}
            className="object-contain w-full h-full"
          />
        </div>
      </a>

      {/* Right Side */}
      {/* Right Side with spotlight */}
<CardSpotlight className="flex flex-1 flex-col justify-between p-4 min-w-0 rounded-none border-none bg-transparent">
  {/* Title and GitHub Icon */}
  <div className="flex items-start justify-between gap-2">
  <h3 className="text-l font-semibold text-foreground line-clamp-1 flex items-center gap-2">
    {title}
    {isLive && (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-500">
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        Live
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
        <FaGithub size={20} />
      </a>
    )}
  </div>

  {/* Description */}
  <div className="flex-1 mt-2 space-y-2 text-pretty text-muted-foreground text-sm leading-relaxed">
    <p className="line-clamp-3">{description}</p>
  </div>

  {/* Technologies */}
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
