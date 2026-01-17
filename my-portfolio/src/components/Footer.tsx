// src/components/Footer.tsx
import { Github, Linkedin, Mail, Heart, Coffee } from "lucide-react";
// import VisitorCounter from "./VisitorCounter";

const XIcon = () => (
  // Simple X icon component
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://x.com/AdityaPat_",
      icon: <XIcon />,
      label: "Twitter/X",
      hoverColor: "hover:text-blue-400",
    },
    {
      href: "https://github.com/AdityaP700",
      icon: <Github size={20} />,
      label: "GitHub",
      hoverColor: "hover:text-purple-400",
    },
    {
      href: "https://www.linkedin.com/in/aditya-pattanayak-6b303b267/",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      hoverColor: "hover:text-blue-500",
    },
    {
      href: "mailto:adityaa32078@gmail.com",
      icon: <Mail size={20} />,
      label: "Email",
      hoverColor: "hover:text-red-400",
    },
  ];

  return (
    <footer className="relative border-t border-border/40 mt-20 w-full overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="container relative mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 max-w-5xl">
        {/* Visitor Counter */}
        <div className="flex justify-center mb-8 sm:mb-10">
          {/* <VisitorCounter /> */}
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-8 mb-8">
          {/* Social Links - Featured */}
          <div className="flex items-center gap-4 sm:gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className={`text-muted-foreground transition-all duration-300 hover:scale-110 ${link.hoverColor} p-2 rounded-lg hover:bg-accent/50`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Bio Section */}
          {/* <div className="text-center max-w-2xl">
            <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
              Built with{" "}
              <Heart className="inline h-4 w-4 text-red-500 animate-pulse" />{" "}
              using{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
              >
                Next.js
              </a>
              , fueled by curiosity & endless{" "}
              <Coffee className="inline h-4 w-4 text-amber-600" />
            </p>
          </div> */}
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-6">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-muted-foreground">
            <p className="text-center sm:text-left">
              © {year} Aditya Pattanayak. All rights reserved.
            </p>
            <p className="text-center sm:text-right opacity-75">
              Crafted with passion, one commit at a time
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
