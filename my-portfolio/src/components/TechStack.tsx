import { coreToolkit, theFrontier, infrastructureAndOps } from "@/lib/skills";
import { Badge } from "@/components/ui/badge";

export const TechStack = () => {
  const allSkills = [...coreToolkit, ...theFrontier, ...infrastructureAndOps];

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-center md:text-left text-sm font-medium text-foreground/70 mb-4">Tools that I have used</h2>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {allSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Badge
              key={skill.name}
              variant="secondary"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-foreground/80 text-[0.9rem] transition-colors"
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{skill.name}</span>
            </Badge>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
