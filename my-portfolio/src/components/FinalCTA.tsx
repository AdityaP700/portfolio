import { Button } from "@/components/ui/button";
import ResumePreview from "@/components/ResumePreview";
import { Github, Mail, Send } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section id="contact" className="relative mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-lg border border-border/70 bg-card/75 p-8 text-center shadow-lg backdrop-blur-xl sm:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="pointer-events-none absolute -inset-px rounded-lg ring-1 ring-border" />
        <div className="relative z-10 mx-auto max-w-xl space-y-4">
          <p className="section-kicker justify-center">Open to AI infra / backend / DevOps internships</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Building systems where reliability actually matters.
          </h2>
          <p className="text-sm leading-relaxed text-foreground/62">
            I am interested in LLM infrastructure, retrieval systems, backend platforms, and teams that care about measuring what they ship.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <Button
              asChild
              size="sm"
              className="h-9 rounded-full bg-foreground px-5 text-xs font-semibold text-background hover:bg-foreground/90"
            >
              <a href="mailto:adityaa32078@gmail.com">
                <Send className="h-3.5 w-3.5" />
                Say Hi
              </a>
            </Button>
            <ResumePreview label="Preview Resume" />
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-9 rounded-full border-border/70 bg-transparent px-4 text-xs text-foreground hover:bg-foreground/10"
            >
              <a href="https://github.com/AdityaP700" target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-9 rounded-full border-border/70 bg-transparent px-4 text-xs text-foreground hover:bg-foreground/10"
            >
              <a href="mailto:adityaa32078@gmail.com">
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
