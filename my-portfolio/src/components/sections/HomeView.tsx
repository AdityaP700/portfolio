import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { GitHubContributions } from "@/components/GithubContributions";
import WritingsSection from "./WritingsSection";

export default function HomeView() {
  // Filter for featured projects
  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <div className="space-y-16">
      {/* Featured Projects Section */}
      <section className="space-y-8">
        <h2 className="text-base font-semibold tracking-wide text-foreground">
          Featured Projects
        </h2>
        <div className="flex flex-col gap-4">
          {featuredProjects.map(project => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* GitHub Activity Section - Always Visible */}
      <section className="space-y-6">
        <h2 className="text-base font-semibold tracking-wide text-foreground">
          GitHub Activity
        </h2>
        <GitHubContributions
          theme={{
            light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
            dark: [
              "rgba(255, 255, 255, 0.05)",
              "#0e4429",
              "#006d32",
              "#26a641",
              "#39d353",
            ],
          }}
          maxLevel={4}
        />
        <div className="pt-4">
          <p className="text-sm text-foreground/60 leading-relaxed">
            Consistency is key. I believe in building regularly, learning in public,
            and contributing to open source when a problem feels real enough to solve.
          </p>
        </div>
      </section>

      {/* Latest Writings Section */}
      <section className="space-y-8">
        <h2 className="text-base font-semibold tracking-wide text-foreground">
          Latest Writings
        </h2>
        <WritingsSection limit={2} />
      </section>
    </div>
  );
}
