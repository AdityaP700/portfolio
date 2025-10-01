import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import AnimatedName from "@/components/ui/AnimatedText";
import { Badge } from "@/components/ui/badge";
import { coreSkills, learningSkills, bonusSkills } from "@/lib/skills";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { GitHubContributions } from "@/components/GithubContributions";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import PixelatedClock from "@/components/timer";
import LocationWeather from "@/components/weather";
export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg py-1 px-6 flex justify-between items-center text-white text-base sm:text-sm select-none border-b border-white/10">
        <div className="text-[0.55rem] tracking-tight opacity-80">
          <PixelatedClock />
        </div>
        <div>
          <LocationWeather />
        </div>
      </header>
      <main className="flex flex-col items-center p-4 sm:p-8">
        <div className="max-w-2xl w-full space-y-16">
          <section className="flex flex-col items-center pt-16 space-y-4">
            <div className="relative group">
              <Image
                src="/X_pfp.jpg"
                alt="Aditya Pattanayak's profile picture"
                width={96}
                height={96}
                priority
                className="rounded-full border-2 border-white/20 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col items-center space-y-1">
              <AnimatedName />
              <a
                href="https://x.com/AdityaPat_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-all duration-200 group/link"
              >
                @AdityaPat_
                <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-all duration-200 transform group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </section>
          {/* --- Introduction Text --- */}
          <section className="space-y-5 text-pretty text-[0.9rem] sm:text-[0.95rem] leading-relaxed text-white/70">
            <p>
              I’m <span className="text-white font-semibold">Aditya</span> — a 20‑year‑old builder from
              <span className="text-white font-semibold"> Bhubaneswar</span> who ships fast, learns in public, and
              occasionally breaks things on purpose just to understand them better.
            </p>
            <p>
              Most days I’m hopping between <span className="text-white font-medium">web tech</span>,
              <span className="text-white font-medium"> Web3 experiments</span>, and little AI side quests.
              Sometimes it’s a feature; sometimes it’s a bug with a good story. Either way— momentum over perfection.
            </p>
            <p>
              I like chasing curiosities, reverse‑engineering stuff I probably shouldn’t, and reading other people’s
              GitHub like it’s a streaming platform. Open source grabs my attention when a problem feels real enough to poke.
            </p>
            <p>
              If I’m not building, I’m reading, listening, exploring, or writing half‑finished notes that may become something.
              Always iterating. Always shipping the next version of me.
            </p>
          </section>
          {/* --- Action Buttons: Socials & Resume --- */}
          <section className="space-y-4">
            <h2 className="font-semibold text-center sm:text-left text-white/90 text-sm tracking-wide uppercase">Connect</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {/* GitHub */}
              <Button
                asChild
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
              >
                <a
                  href="https://github.com/AdityaP700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              {/* LinkedIn */}
              <Button
                asChild
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
              >
                <a
                  href="https://www.linkedin.com/in/aditya-pattanayak-6b303b267/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
              {/* X */}
              <Button
                asChild
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
              >
                <a
                  href="https://x.com/AdityaPat_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X
                </a>
              </Button>
              {/* Email */}
              <Button
                asChild
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
              >
                <a href="mailto:adityaa32078@gmail.com">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
              </Button>
              {/* Collaboration */}
              <Button
                asChild
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:via-cyan-500/30 hover:to-blue-500/30 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-semibold rounded-xl"
              >
                <a href="#collaborate">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />
                  Open Group Collab
                </a>
              </Button>
            </div>
          </section>
          {/* Skills */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-center sm:text-left text-white">
              My Tech Stack (Real)
            </h2>

            <div className="space-y-3">
              <h3 className="font-medium text-primary">Core</h3>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/10 text-gray-300 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-white/20 text-sm"
                  >
                    <skill.icon className="h-4 w-4" />
                    <span>{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-primary">Down Bad For</h3>
              <div className="flex flex-wrap gap-2">
                {learningSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/10 border border-white/10 text-gray-300 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    <skill.icon className="h-4 w-4" />
                    <span>{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-primary">Side Quests</h3>
              <div className="flex flex-wrap gap-2">
                {bonusSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/10 border border-white/10 text-gray-300 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    <skill.icon className="h-4 w-4" />
                    <span>{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </section>
          {/* --- Projects Section --- */}
          <section className="space-y-8">
            <h2 className="font-bold text-center sm:text-left text-base text-white tracking-wide">Proof of Work</h2>
            {['Web3','ML','Web App'].map(category => {
              const list = projects.filter(p => p.category === category);
              if(!list.length) return null;
              return (
                <div key={category} className="space-y-4">
                  <div className="pt-2">
                    <h3 className="text-sm font-semibold text-white/80 tracking-wide flex items-center gap-2">
                      {category}
                      <span className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {list.map(project => (
                      <ProjectCard key={project.title} project={project} />
                    ))}
                  </div>
                </div>
              )
            })}
          </section>
          {/* --- GitHub Contributions Chart --- */}
          <section>
            <GitHubContributions
              theme={{
                light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
                dark: [
                  "rgba(255, 255, 255, 0.05)",
                  "#0e4429",
                  "#006d32",
                  "#26a641",
                  "#39d353",
                ],
              }}
              maxLevel={4}
            />
          </section>

          <FinalCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}
