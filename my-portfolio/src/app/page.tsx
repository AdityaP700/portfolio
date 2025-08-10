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
      <header className="bg-background/90 backdrop-blur-md py-1 px-6 flex justify-between items-center text-white text-xs sm:text-sm select-none">
  <div className="text-[0.55rem] tracking-tight opacity-80">
    <PixelatedClock />
  </div>
  <div>
    <LocationWeather />
  </div>
</header>
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

            <div className="flex flex-col items-center sm:items-start space-y-1">
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
              Hey, I&apos;m{" "}
              <span className="font-bold text-foreground">Aditya</span>, a{" "}
              <span className="font-semibold text-foreground">
                20-year-old gmi dev
              </span>{" "}
              from{" "}
              <span className="font-semibold text-foreground">
                Bhubaneswar, Odisha
              </span>{" "}
              who jumps into things without all the answers , powered by coffee
              and late-night debugging sessions.
            </p>
            <p>
              Sometimes I ship features, sometimes I ship bugs... but we
              don&apos;t talk about the bugs.{" "}
              <span className="font-semibold text-foreground">Never bored</span>{" "}
              <span className="italic opacity-80">
                (shoutout to CSS for keeping me humble)
              </span>
              .
            </p>

            <p>
              I love{" "}
              <span className="font-bold text-foreground">chasing ideas</span>,
              exploring{" "}
              <span className="font-bold text-foreground">new tech</span>, and
              stalking{" "}
              <span className="font-bold hover:text-primary transition-colors">
                GitHub profiles
              </span>{" "}
              like it’s <span className="font-semibold">Netflix</span>. I
              contribute to{" "}
              <span className="font-bold text-primary">open source</span> when
              something catches my eye, always trying to turn{" "}
              <span className="italic">&quot;what if&quot;</span> into{" "}
              <span className="italic">&quot;shipped it.&quot;</span>
            </p>
            <p>
              Picking projects can take me ages, but breaking them should count
              as a hobby. When I&apos;m not breaking production, you&apos;ll
              find me you’ll usually find me{" "}
              <span className="font-semibold">reading articles</span>,{" "}
              <span className="font-semibold">listening to music</span>, or{" "}
              <span className="font-semibold hover:text-primary transition-colors">
                shitposting
              </span>
            </p>
          </section>
          {/* --- Action Buttons: Socials & Resume --- */}
          <section className="space-y-4 text-pretty text-muted-foreground text-sm leading-relaxed">
            <h2 className="text-xl font-semibold text-center sm:text-left text-foreground/90">
              Touch grass together (digitally):
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* GitHub */}
              <Button
                asChild
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <a
                  href="https://github.com/AdityaP700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  GitHub
                </a>
              </Button>

              {/* LinkedIn */}
              <Button
                asChild
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <a
                  href="https://www.linkedin.com/in/aditya-pattanayak-6b303b267/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  LinkedIn
                </a>
              </Button>

              {/* X */}
              <Button
                asChild
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <a
                  href="https://x.com/AdityaPat_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <svg
                    className="mr-2 h-4 w-4 group-hover:-rotate-12 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  X
                </a>
              </Button>

              {/* Email */}
              <Button
                asChild
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <a href="mailto:adityaa32078@gmail.com">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  Email
                </a>
              </Button>
            </div>
          </section>
          {/* Skills */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-center sm:text-left">
              My Tech Stack (Real)
            </h2>

            <div className="space-y-3">
              <h3 className="font-medium text-primary">Core</h3>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-muted"
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
                    className="flex items-center gap-2 px-3 py-1.5 text-sm
        transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-muted"
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
                    className="flex items-center gap-2 px-3 py-1.5 text-sm
        transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-muted"
                  >
                    <skill.icon className="h-4 w-4" />
                    <span>{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </section>
          {/* --- Projects Section --- */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-center sm:text-left">
              Proof of Work
            </h2>
            <div className="flex flex-col gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
          {/* --- GitHub Contributions Chart --- */}
          <section>
            <GitHubContributions
              theme={{
                light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"], // 5 colors
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"], // 5 colors for dark mode
              }}
              maxLevel={4} // maxLevel corresponds to number of color steps minus one
            />
          </section>

          <FinalCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}
