import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileDown, Mail, ExternalLink } from "lucide-react";
import AnimatedName from "@/components/ui/AnimatedText";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 md:p-20 bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <div className="max-w-2xl w-full space-y-12">
        
        {/* --- Header: PFP and Name --- */}
        <section className="flex flex-col sm:flex-row items-center gap-6 group">
          <div className="relative">
            <Image
              src="/X_pfp.jpg"
              alt="Aditya Pattanayak's profile picture"
              width={96}
              height={96}
              priority
              className="rounded-full border-2 border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="text-center sm:text-left space-y-2">
            <AnimatedName />
            <a
              href="https://x.com/AdityaPat_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-all duration-200 group/link"
            >
              @AdityaPat_
              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-all duration-200 transform group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </section>
{/* --- Introduction Text --- */}
<section className="space-y-4 text-pretty text-muted-foreground text-sm leading-relaxed">
  <p>
    Hyy, I&apos;m <span className="font-bold text-foreground">Aditya</span>.{" "}
    <span className="font-semibold text-foreground">20-year-old ngmi</span> from{" "}
    <span className="font-semibold text-foreground">Bhubaneswar, Odisha</span>{" "}
    the kind of person who jumps into things without knowing all the answers.
  </p>
  <p>
    Sometimes I land on my feet, sometimes I don&apos;t... but I&apos;m never{" "}
    <span className="font-semibold text-foreground">bored</span>{" "}
    <span className="italic opacity-80">(I guess)</span>.
  </p>
  <p>
    I love <span className="font-bold text-foreground">chasing ideas</span>, exploring{" "}
    <span className="font-bold text-foreground">new tech</span>, and yes, stalking{" "}
    <span className="font-bold hover:text-primary transition-colors">GitHub profiles</span>{" "}
    like it&apos;s <span className="font-semibold">Netflix</span>. I contribute to{" "}
    <span className="font-bold text-primary">open source</span> whenever something catches my eye, and
    I&apos;m always looking for ways to turn{" "}
    <span className="italic text-foreground">&quot;what if&quot;</span> into{" "}
    <span className="italic text-foreground">&quot;shipped it.&quot;</span>
  </p>
  <p>
    Picking a project idea can take me ages, but once I start, I break it so many times it should
    count as a hobby. Still, the end result? Usually something cool enough to make my friends call
    me <span className="font-bold text-primary">insane</span>{" "}
    <span className="opacity-75">(affectionately, I hope)</span>.
  </p>
  <p>
    When I&apos;m not busy, you&apos;ll find me <span className="font-semibold">reading articles</span>,{" "}
    <span className="font-semibold">listening to music</span>, or{" "}
    <span className="font-semibold hover:text-primary transition-colors">shitposting</span> my way
    through the internet.
  </p>
  <p className="font-medium text-foreground">
    Always <span className="text-primary font-bold">learning</span>, always{" "}
    <span className="text-primary font-bold">building</span>, and always a little{" "}
    <span className="text-primary font-bold">reckless</span>. If you&apos;ve got something{" "}
    <span className="font-semibold">bold</span> in mind, I&apos;m in.
  </p>
</section>

        {/* --- Action Buttons: Socials & Resume --- */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-center sm:text-left text-foreground/90">
            Well, you can locate me here
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button 
              asChild 
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <a href="https://github.com/AdityaPatro" target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" /> 
                GitHub
              </a>
            </Button>
            
            <Button 
              asChild
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <a href="https://linkedin.com/in/adityapattanayak" target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" /> 
                LinkedIn
              </a>
            </Button>
            
            <Button 
              asChild
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <a href="https://x.com/AdityaPat_" target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <svg className="mr-2 h-4 w-4 group-hover:-rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                X
              </a>
            </Button>
            
            <Button 
              asChild
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <a href="mailto:your.email@example.com">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" /> 
                Email
              </a>
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-center sm:text-left text-foreground/90">
            Looking for my credentials?
          </h2>
          <div className="flex justify-center sm:justify-start">
            <Button 
              variant="secondary" 
              asChild 
              className="group relative px-8 py-3 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-muted to-muted/80 hover:from-primary/10 hover:to-primary/5 border-2 border-border/40 hover:border-primary/30"
            >
              <a href="/Aditya_Resume.pdf" download className="flex items-center gap-2">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded"></div>
                <FileDown className="h-4 w-4 group-hover:animate-bounce" /> 
                <span className="font-medium">My CV</span>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}