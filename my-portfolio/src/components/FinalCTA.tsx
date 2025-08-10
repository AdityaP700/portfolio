import { Button } from "@/components/ui/button";
import { FileDown, Send } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="space-y-3 py-8 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-foreground">
  Want to build some banger together?
</h2>
<p className="text-muted-foreground leading-relaxed text-sm">
Whether you want to build something cool, argue about JavaScript frameworks, or just need someone to debug your life choices - I&apos;m your guy.
</p>

      <div className="flex gap-4 mt-4">
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
