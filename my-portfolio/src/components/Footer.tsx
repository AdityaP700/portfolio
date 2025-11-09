// src/components/Footer.tsx
import { Github, Linkedin, Mail } from "lucide-react";
// import VisitorCounter from "./VisitorCounter";

const XIcon = () => (
  // Simple X icon component
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
  <footer className="border-t border-border mt-20 w-full">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 max-w-4xl">
        {/* Visitor Counter */}
        <div className="flex justify-center mb-6 sm:mb-8">
          {/* <VisitorCounter /> */}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            <p className="mb-2">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                Next.js
              </a>
              , fueled by curiosity (and coffee).
            </p>
            <p className="text-xs">
              © {year} Aditya Pattanayak. All rights reserved (even the
              questionable commits)..
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://x.com/AdityaPat_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter/X"
            >
              <XIcon />
            </a>
            <a
              href="https://github.com/AdityaP700"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-pattanayak-6b303b267/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:adityaa32078@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
