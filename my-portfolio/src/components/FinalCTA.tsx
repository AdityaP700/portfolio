import { Button } from "@/components/ui/button";
import { FileDown, Send } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="relative max-w-2xl mx-auto mt-20">
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-white/10" />
        <h2 className="relative z-10 text-lg font-semibold tracking-tight text-white mb-3">
          Want to Build Something Epic Together?
        </h2>
        <p className="relative z-10 text-[0.75rem] leading-relaxed text-white/60 max-w-md mx-auto">
          Whether it’s crafting something cool, debating the merits of yet another
          JavaScript framework, or helping you debug your life choices— I’m here
          for it.
          <span className="block font-medium text-white/80 mt-3 tracking-wide uppercase text-[0.6rem]">
            Open for Collaboration & Freelance Work
          </span>
        </p>
        <div className="relative z-10 flex justify-center gap-3 mt-8">
          <Button
            asChild
            size="sm"
            className="h-8 px-4 rounded-full text-[0.65rem] font-medium tracking-wide bg-white/10 hover:bg-white/20 border border-white/10"
          >
            <a href="https://x.com/AdityaPat_">
              <Send className="mr-2 h-3 w-3" /> Say Hi
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-8 px-4 rounded-full text-[0.65rem] font-medium tracking-wide bg-white/10 hover:bg-white/20 border border-white/10"
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
