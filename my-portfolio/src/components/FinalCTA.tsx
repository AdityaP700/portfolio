import { Button } from "@/components/ui/button";
import { FileDown, Send } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="relative max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 p-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute -inset-px rounded-lg ring-1 ring-white/10" />
        <h2 className="relative z-10 text-lg font-semibold tracking-tight text-white mb-3">
          Want to Build Something Epic Together?
        </h2>
        <p className="relative z-10 text-sm leading-relaxed text-white/60 max-w-md mx-auto">
          Whether it&apos;s crafting something cool, debating the merits of yet another
          JavaScript framework, or helping you debug your life choices— I&apos;m here
          for it.
          <span className="block font-medium text-white/80 mt-3 tracking-wide uppercase text-[0.65rem]">
            Open for Collaboration & Freelance Work
          </span>
        </p>
        <div className="relative z-10 flex justify-center gap-4 mt-8">
          <Button
            asChild
            size="sm"
            className="h-9 px-5 rounded-full text-xs font-semibold tracking-wide bg-white text-black hover:bg-gray-200 transition-colors shadow-none"
          >
            <a href="mailto:adityaa32078@gmail.com">
              <Send className="mr-2 h-3 w-3" /> Say Hi
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 px-5 rounded-full text-xs font-semibold tracking-wide bg-transparent border-2 border-white/20 text-white hover:bg-white/10 transition-colors shadow-none"
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
