import { Button } from "@/components/ui/button";
import { FileDown, Send, Sparkles } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="relative max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-lg bg-card backdrop-blur-xl border border-border p-10 text-center shadow-lg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute -inset-px rounded-lg ring-1 ring-border" />
        <h2 className="relative z-10 text-lg font-semibold tracking-tight text-foreground mb-3 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-400" />
          Want to Build Something Epic Together?
        </h2>
        <p className="relative z-10 text-sm leading-relaxed text-foreground/60 max-w-md mx-auto">
          Whether it&apos;s crafting something cool, debating the merits of yet another
          JavaScript framework, or helping you debug your life choices, I&apos;m here
          for it.
          <span className="block font-medium text-foreground/80 mt-3 tracking-wide uppercase text-[0.65rem]">
            Open for Collaboration & Freelance Work
          </span>
        </p>
        <div className="relative z-10 flex justify-center gap-4 mt-8">
          <Button
            asChild
            size="sm"
            className="h-9 px-5 rounded-full text-xs font-semibold tracking-wide bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-lg"
          >
            <a href="mailto:adityaa32078@gmail.com">
              <Send className="mr-2 h-3 w-3" /> Say Hi
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 px-5 rounded-full text-xs font-semibold tracking-wide bg-transparent border border-border text-foreground hover:bg-foreground/10 transition-colors shadow-md"
          >
            <a
              href="/Aditya_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileDown className="mr-2 h-3 w-3" /> View Résumé
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
