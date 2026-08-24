"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WritingsSection from "@/components/sections/WritingsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { GitHubContributions } from "@/components/GithubContributions";
import WorkExperience from "@/components/WorkExperience";
import LiveCommitFeed from "@/components/LiveCommitFeed";
import TechStackMarquee from "@/components/TechStackMarquee";
import ThemeToggle from "@/components/ThemeToggle";
import VisitorCounter from "@/components/VisitorCounter";
import NowPlaying from "@/components/NowPlaying";
import ResumePreview from "@/components/ResumePreview";

const navItems = ["home", "projects", "writing"] as const;
type ActiveView = (typeof navItems)[number];

const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function TopNav({ activeView, setActiveView }: { activeView: ActiveView; setActiveView: (view: ActiveView) => void }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setActiveView("home")}
          className="flex items-center gap-2 rounded-full text-sm font-semibold tracking-tight text-foreground"
        >
          <Image src="/X_pfp.jpg" alt="" width={28} height={28} className="rounded-full border border-border" />
          <span>Aditya</span>
        </button>

        <nav className="hidden items-center rounded-full border border-border/80 bg-card/70 p-1 text-sm text-foreground/58 shadow-lg shadow-black/10 backdrop-blur-md sm:flex">
          {navItems.map((item) => {
            const active = activeView === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setActiveView(item)}
                className={
                  "rounded-full px-4 py-2 capitalize transition-colors " +
                  (active ? "bg-foreground text-background" : "hover:text-foreground")
                }
              >
                {item === "writing" ? "Writing" : item}
              </button>
            );
          })}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              className="rounded-full px-4 py-2 text-foreground/58 transition-colors hover:text-foreground"
            >
              More
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-11 w-48 overflow-hidden rounded-lg border border-border bg-card/95 p-1 shadow-2xl backdrop-blur-xl">
                <ResumePreview label="Resume" className="h-9 w-full justify-start rounded-md border-0 bg-transparent px-3 text-sm text-foreground/72 hover:bg-foreground/10" />
                <a className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/72 hover:bg-foreground/10 hover:text-foreground" href="https://github.com/AdityaP700" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/72 hover:bg-foreground/10 hover:text-foreground" href="https://x.com/AdityaPat_" target="_blank" rel="noopener noreferrer">
                  <XIcon /> X / Twitter
                </a>
                <a className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/72 hover:bg-foreground/10 hover:text-foreground" href="mailto:adityaa32078@gmail.com">
                  <Mail className="h-4 w-4" /> Contact
                </a>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMoreOpen((value) => !value)}
            className="rounded-full border border-border bg-card/70 p-2 text-foreground/70 sm:hidden"
            aria-label="Open menu"
          >
            {moreOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {moreOpen && (
        <div className="border-t border-border bg-background/95 p-3 sm:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <button key={item} type="button" onClick={() => { setActiveView(item); setMoreOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm capitalize text-foreground/75 hover:bg-foreground/10">
                {item === "writing" ? "Writing" : item}
              </button>
            ))}
            <a className="rounded-md px-3 py-2 text-sm text-foreground/75 hover:bg-foreground/10" href="https://github.com/AdityaP700" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="rounded-md px-3 py-2 text-sm text-foreground/75 hover:bg-foreground/10" href="mailto:adityaa32078@gmail.com">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="section-block pt-10 sm:pt-14">
      <div className="hero-banner mb-8" />
      <div className="grid gap-8 md:grid-cols-[148px_1fr] md:items-start">
        <div className="relative w-max">
          <Image
            src="/X_pfp.jpg"
            alt="Aditya Pattanayak's profile picture"
            width={132}
            height={132}
            priority
            className="rounded-lg border border-border bg-card shadow-2xl shadow-black/30"
          />
          <div className="absolute -right-2 -top-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-emerald-300">
            building
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-foreground/48">
            <span>India</span>
            <span>/</span>
            <span>AI systems</span>
            <span>/</span>
            <span>open to internships</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Aditya Pattanayak
            </h1>
            <p className="font-mono text-lg text-foreground/62 sm:text-xl">AI Systems / Backend Engineer</p>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              Building reliable LLM infrastructure, retrieval systems, and AI products.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/52">
              Curious by default. I like understanding how things actually work, from retrieval failure modes to tool-calling reliability and backend systems that keep products honest.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs text-foreground/72 transition-colors hover:bg-foreground/10 hover:text-foreground" href="https://github.com/AdityaP700" target="_blank" rel="noopener noreferrer">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs text-foreground/72 transition-colors hover:bg-foreground/10 hover:text-foreground" href="https://www.linkedin.com/in/aditya-pattanayak-6b303b267/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <ResumePreview label="Preview Resume" />
            <a className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs text-foreground/72 transition-colors hover:bg-foreground/10 hover:text-foreground" href="mailto:adityaa32078@gmail.com">
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <VisitorCounter />
            <NowPlaying />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          ["Current", "Aegis", "agent reliability runtime"],
          ["Latest writing", "LLM -> Tool", "reliability layer notes"],
          ["Focus", "RAG / Backend", "evaluation and infra"],
        ].map(([label, value, detail]) => (
          <div key={label} className="rounded-lg border border-border/70 bg-card/60 p-4 backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">{label}</p>
            <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
            <p className="mt-1 text-xs text-foreground/48">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("home");

  return (
    <>
      <TopNav activeView={activeView} setActiveView={setActiveView} />
      <main className="w-full overflow-x-hidden px-3 sm:px-6">
        <div className="page-shell mx-auto w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === "home" && (
                <div>
                  <Hero />

                  <section className="section-block">
                    <div className="space-y-2">
                      <p className="section-kicker">01 / Experience</p>
                      <h2 className="section-heading">Backend work, infra habits, production trade-offs.</h2>
                    </div>
                    <div className="mt-6">
                      <WorkExperience />
                    </div>
                  </section>

                  <section className="section-block">
                    <div className="space-y-2">
                      <p className="section-kicker">02 / Featured Work</p>
                      <h2 className="section-heading">Projects that support the AI systems story.</h2>
                    </div>
                    <div className="mt-6 grid gap-4">
                      {projects.filter((p) => p.isFeatured).map((project) => (
                        <ProjectCard key={project.title} project={project} />
                      ))}
                    </div>
                  </section>

                  <section className="section-block">
                    <div className="space-y-2">
                      <p className="section-kicker">03 / Stack</p>
                      <h2 className="section-heading">Tools I use to build and ship.</h2>
                    </div>
                    <div className="mt-6">
                      <TechStackMarquee />
                    </div>
                  </section>

                  <section className="section-block">
                    <div className="space-y-2">
                      <p className="section-kicker">04 / Activity</p>
                      <h2 className="section-heading">Maintained in public.</h2>
                    </div>
                    <div className="mt-6 space-y-5">
                      <LiveCommitFeed />
                      <GitHubContributions
                        theme={{
                          light: ["#f5f3ed", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
                          dark: ["rgba(255, 255, 255, 0.05)", "#0e4429", "#006d32", "#26a641", "#39d353"],
                        }}
                        maxLevel={4}
                      />
                    </div>
                  </section>

                  <section className="section-block">
                    <WritingsSection />
                  </section>
                </div>
              )}

              {activeView === "projects" && (
                <div className="section-block pt-12">
                  <ProjectsSection />
                </div>
              )}

              {activeView === "writing" && (
                <div className="section-block pt-12">
                  <WritingsSection />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="section-block">
            <FinalCTA />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
