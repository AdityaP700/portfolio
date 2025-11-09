"use client";
import React, { useState } from "react";
import Image from "next/image";
import AnimatedName from "@/components/ui/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";
// Home view will be inlined for a more professional narrative
import ProjectsSection from "@/components/sections/ProjectsSection";
import WritingsSection from "@/components/sections/WritingsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import PixelatedClock from "@/components/timer";
import LocationWeather from "@/components/weather";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { GitHubContributions } from "@/components/GithubContributions";
import WorkExperience from "@/components/WorkExperience";
import LiveCommitFeed from "@/components/LiveCommitFeed";
import TechStackMarquee from "@/components/TechStackMarquee";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [activeView, setActiveView] = useState('home');

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-lg py-1 px-3 sm:px-6 flex justify-between items-center text-theme-primary text-base sm:text-sm select-none border-b border-border">
        <div className="text-[0.5rem] sm:text-[0.55rem] tracking-tight opacity-80">
          <PixelatedClock />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <LocationWeather />
        </div>
      </header>
      <main className="flex flex-col items-center p-3 sm:p-4 md:p-8 w-full overflow-x-hidden">
        <div className="max-w-2xl w-full">{/* --- START: CENTERED IDENTITY BLOCK --- */}
          {/* --- START: CENTERED IDENTITY BLOCK --- */}
          <section className="flex flex-col items-center pt-8 sm:pt-12 space-y-4 text-center">
            {/* Profile Picture */}
            <div className="relative group">
              <Image
                src="/X_pfp.jpg"
                alt="Aditya Pattanayak's profile picture"
                width={96}
                height={96}
                priority
                className="rounded-full border-2 border-border shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Name & Handle */}
            <div className="flex flex-col items-center space-y-1">
              <AnimatedName />
            </div>
          </section>

          {/* Narrative Bio */}
            <div className="text-pretty text-sm sm:text-[0.95rem] leading-relaxed text-foreground/80 max-w-xl mx-auto text-center md:text-center">
  <p className="mb-4">
    I’m 20, and honestly, I just love figuring things out. Most days, I’m either chasing some random idea that popped into my head, breaking down how something works, or getting lost in a system until that “ohhh, now it makes sense” moment hits.
  </p>
  <p>
    That curiosity has taken me to some wild places  from late-night hackathon sprints to building and deploying a dApp on Solana just to see what really happens under the hood.
    These days, that same itch to learn has me exploring the decentralized web and everything it might become.
  </p>
</div>


          {/* Animated Tech Stack Marquee */}
          <div className="mt-8 sm:mt-12 w-full">
            <TechStackMarquee />
          </div>
          {/* --- END: THE NEW CORE IDENTITY BLOCK --- */}

          {/* --- NEW: VISUAL SEPARATOR --- */}
          <hr className="my-12 border-border" />

          {/* --- NEW HOME HUB NAVIGATION --- */}
          <nav className="flex justify-center gap-4 sm:gap-8 border-b border-border overflow-x-auto">
            <button
              onClick={() => setActiveView('home')}
              className="relative py-3 sm:py-4 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap"
            >
              Home
              {activeView === 'home' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveView('projects')}
              className="relative py-3 sm:py-4 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap"
            >
              Projects
              {activeView === 'projects' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveView('blogs')}
              className="relative py-3 sm:py-4 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap"
            >
              Blogs
              {activeView === 'blogs' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </nav>

          {/* --- DYNAMIC CONTENT PANE --- */}
          <div className="w-full min-h-[400px] sm:min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pt-6 sm:pt-8"
              >
                {activeView === 'home' && (
                  <div className="space-y-10 sm:space-y-14">
                    {/* --- 1. WORK EXPERIENCE (moved above featured) --- */}
                    <section className="space-y-4 sm:space-y-6">
                      <h2 className="text-base font-semibold tracking-wide text-foreground mb-2">Work Experience</h2>
                      <WorkExperience />
                    </section>

                    {/* --- 2. FEATURED PROJECTS --- */}
                    <section className="space-y-4 sm:space-y-6">
                      <h2 className="text-base font-semibold tracking-wide text-foreground mb-2">Featured Projects</h2>
                      <div className="flex flex-col gap-4">
                        {projects.filter((p) => p.isFeatured).map((project) => (
                          <ProjectCard key={project.title} project={project} />
                        ))}
                      </div>
                    </section>

                    {/* --- 3. LIVE ACTIVITY --- */}
                    <section className="space-y-4 sm:space-y-6">
                      <h2 className="text-base font-semibold tracking-wide text-foreground mb-2">Live Activity</h2>
                      <LiveCommitFeed />
                      <div className="mt-4">
                      <GitHubContributions
                        theme={{
                          light: ["#f5f3ed", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
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
                      <p className="text-sm text-foreground/60 leading-relaxed">
                        Consistency is key. I build regularly, learn in public, and ship when it matters.
                      </p>
                    </section>

                    {/* --- 4. LATEST WRITINGS --- */}
                    <section className="space-y-4 sm:space-y-6">
                      <WritingsSection limit={3} showTitle={true} />
                    </section>
                  </div>
                )}
                {activeView === 'projects' && <ProjectsSection showTitle={false} />}
                {activeView === 'blogs' && <WritingsSection showTitle={false} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- FINAL CTA --- */}
          <div className="pt-12 sm:pt-16">
            <FinalCTA />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
