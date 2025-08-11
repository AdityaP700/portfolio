import { Button } from "@/components/ui/button";
import { FileDown, Send } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="space-y-4 py-8 max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-bold text-foreground">
        Want to Build Something Epic Together?
      </h2>
      <p className="text-muted-foreground leading-relaxed text-sm">
        Whether it’s crafting something cool, debating the merits of yet another
        JavaScript framework, or helping you debug your life choices I’m here
        for it.
        <span className="block font-semibold text-foreground mt-1">
          Open for Collaboration & Freelance Work
        </span>
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <Button asChild variant="secondary">
          <a href="https://x.com/AdityaPat_">
            <Send className="mr-2 h-4 w-4" /> Say Hi
          </a>
        </Button>
        <Button asChild variant="secondary">
          <a
            href="/Aditya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileDown className="mr-2 h-4 w-4" /> View Résumé
          </a>
        </Button>
      </div>
    </section>
  );
};
