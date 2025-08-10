
"use client";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

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
  const { title, description, technologies, image, link, githubLink } = project;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.25 }}
      className="flex h-48 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white dark:bg-neutral-900"
    >
      {/* Left Side - Pixel Image */}
      <a
  href={link}
  target="_blank"
  rel="noopener noreferrer"
  className="h-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-800"
  style={{ width: '180px' }} // fixed width for consistency
>
  <div className="flex items-center justify-center w-[180px] h-[182px]">
    <PixelImage
      src={image}
      grid="8x8"
      grayscaleAnimation
      pixelFadeInDuration={600}
      maxAnimationDelay={1000}
      colorRevealDelay={300}
      className="object-contain w-full h-full"
    />
  </div>
</a>

      {/* Right Side */}
      <div className="flex flex-1 flex-col justify-between p-4 min-w-0">
        {/* Title and GitHub Icon */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
            {title}
          </h3>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-gray-600 hover:text-black dark:hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={20} />
            </a>
          )}
        </div>

        {/* Description */}
        <div className="flex-1 mt-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 overflow-hidden">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-block rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="inline-block rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}