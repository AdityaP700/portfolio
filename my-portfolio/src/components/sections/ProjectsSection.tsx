import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsSectionProps {
  showTitle?: boolean;
}

export default function ProjectsSection({ showTitle = true }: ProjectsSectionProps) {
  return (
    <section className="space-y-8">
      {showTitle && (
        <h2 className="font-bold text-center sm:text-left text-base text-white tracking-wide">
          Proof of Work
        </h2>
      )}
      {['Web3', 'ML', 'Web App'].map(category => {
        const list = projects.filter(p => p.category === category);
        if (!list.length) return null;
        return (
          <div key={category} className="space-y-4">
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-white/80 tracking-wide flex items-center gap-2">
                {category}
                <span className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {list.map(project => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
