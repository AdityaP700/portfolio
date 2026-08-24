"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WritingsSection from "@/components/sections/WritingsSection";

import { Footer } from "@/components/Footer";

import { FlagshipProjects } from "@/components/projects/FlagshipProjects";
import { GitHubContributions } from "@/components/GithubContributions";
import WorkExperience from "@/components/WorkExperience";

import StaticTechStack from "@/components/StaticTechStack/StaticTechStack";
import ThemeToggle from "@/components/ThemeToggle";
import VisitorCounter from "@/components/VisitorCounter";
import NowPlaying from "@/components/NowPlaying";
import ResumePreview from "@/components/ResumePreview";

const navItems = ["home", "projects", "writing"] as const;
type ActiveView = (typeof navItems)[number];

const XIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function TopNav({
  activeView,
  setActiveView,
}: {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setActiveView("home")}
          className="flex items-center gap-2 rounded-full text-sm font-semibold tracking-tight text-foreground"
        >
          <Image
            src="/X_pfp.jpg"
            alt=""
            width={28}
            height={28}
            className="rounded-full border border-border"
          />
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
                  (active
                    ? "bg-foreground text-background"
                    : "hover:text-foreground")
                }
              >
                {item === "writing" ? "Writing" : item}
              </button>
            );
          })}

        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-full border border-border bg-card/70 p-2 text-foreground/70 sm:hidden"
            aria-label="Open menu"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background/95 p-3 sm:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setActiveView(item);
                  setMobileOpen(false);
                }}
                className="rounded-md px-3 py-2 text-left text-sm capitalize text-foreground/75 hover:bg-foreground/10"
              >
                {item === "writing" ? "Writing" : item}
              </button>
            ))}
            <a
              className="rounded-md px-3 py-2 text-sm text-foreground/75 hover:bg-foreground/10"
              href="https://github.com/AdityaP700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="rounded-md px-3 py-2 text-sm text-foreground/75 hover:bg-foreground/10"
              href="mailto:adityaa32078@gmail.com"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="section-block pt-10 sm:pt-14">
      <div className="hero-banner mb-8">
        {/* The supplied GIF is a personal visual signature, not decorative UI. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://github.com/user-attachments/assets/bef5e226-e90d-476e-876c-617af679fce3"
          alt="Animated personal banner"
          className="h-full w-full object-cover"
        />
      </div>
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
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Aditya Pattanayak
            </h1>
            <p className="font-mono text-base text-foreground/62 sm:text-lg">
              AI Systems / Backend Engineer
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/70">
              I like building things, breaking them, and figuring out why they
              broke.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/55">
              Recent rabbit holes: tool-calling reliability, retrieval failure
              modes, and backend systems that keep products honest.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs text-foreground/72 transition-colors hover:bg-foreground/10 hover:text-foreground"
              href="https://github.com/AdityaP700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs text-foreground/72 transition-colors hover:bg-foreground/10 hover:text-foreground"
              href="https://www.linkedin.com/in/aditya-pattanayak-6b303b267/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs text-foreground/72 transition-colors hover:bg-foreground/10 hover:text-foreground"
              href="https://x.com/AdityaPat_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon /> X
            </a>
            <ResumePreview label="Resume" />
            <a
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs text-foreground/72 transition-colors hover:bg-foreground/10 hover:text-foreground"
              href="mailto:adityaa32078@gmail.com"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <VisitorCounter />
            <NowPlaying />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border/65 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
          About
        </p>
        <ul className="mt-5 max-w-4xl space-y-4 text-[15px] leading-relaxed text-foreground/70 sm:text-base">
          <li className="grid grid-cols-[12px_1fr] gap-3">
            <span className="mt-[0.65em] h-1 w-1 rounded-full bg-foreground/35" />
            <p>
              I&apos;m an engineering student who learns by building first, then
              pulling the system apart until I understand why it works.
            </p>
          </li>
          <li className="grid grid-cols-[12px_1fr] gap-3">
            <span className="mt-[0.65em] h-1 w-1 rounded-full bg-foreground/35" />
            <p>
              I work mostly around AI systems, backend infrastructure, retrieval,
              and reliability, especially the quiet failures that make software
              look healthy when it isn&apos;t.
            </p>
          </li>
          <li className="grid grid-cols-[12px_1fr] gap-3">
            <span className="mt-[0.65em] h-1 w-1 rounded-full bg-foreground/35" />
            <p>
              I enjoy turning fuzzy ideas into working products, measuring what
              breaks, and refining the details until the result feels simple.
            </p>
          </li>
        </ul>
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
        <div className="page-shell mx-auto w-full max-w-6xl">
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
                      <h2 className="section-heading">Experience</h2>
                    </div>
                    <div className="mt-6">
                      <WorkExperience />
                    </div>
                  </section>

                  <section className="section-block">
                    <div className="space-y-2">
                      <p className="section-kicker">02 / Projects</p>
                      <h2 className="section-heading">Projects</h2>
                    </div>
                    <div className="mt-8">
                      <FlagshipProjects />
                    </div>
                  </section>

                  <section className="section-block">
                    <div className="space-y-2">
                      <p className="section-kicker">03 / Stack</p>
                      <h2 className="section-heading">Stack</h2>
                    </div>
                    <div className="mt-6">
                      <StaticTechStack />
                    </div>
                  </section>

                  <section className="section-block">
                    <div className="space-y-2">
                      <p className="section-kicker">04 / GitHub</p>
                      <h2 className="section-heading">GitHub Activity</h2>
                    </div>
                    <p className="mt-3 text-sm text-foreground/55">
                      A little proof that I&apos;m usually building something.
                    </p>
                    <div className="mt-8">
                      <GitHubContributions
                        theme={{
                          light: [
                            "#f5f3ed",
                            "#c6e48b",
                            "#7bc96f",
                            "#239a3b",
                            "#196127",
                          ],
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

        </div>
        <Footer />
      </main>
    </>
  );
}
