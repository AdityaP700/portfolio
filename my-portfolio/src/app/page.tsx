"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
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

export default function Home() {
  const [activeView, setActiveView] = useState('home');

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
        <div className="max-w-2xl w-full">
          {/* --- START: CENTERED IDENTITY BLOCK --- */}
          <section className="flex flex-col items-center pt-12 space-y-4 text-center">
            {/* Profile Picture */}
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

            {/* Animated Name & Handle */}
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

          {/* Narrative Bio */}
          <section className="mt-8">
            {/* --- THE NEW, HUMANISTIC BIO --- */}
            <div className="text-pretty text-[0.95rem] leading-relaxed text-white/80 max-w-xl mx-auto text-center md:text-left">
              <p className="mb-4">
                I&apos;m Aditya, a 20-year-old builder who&apos;s fundamentally curious. Most days, you&apos;ll find me chasing an idea down a rabbit hole, reverse-engineering something I probably shouldn&apos;t, or wrestling with a complex system until it finally clicks.
              </p>
              <p>
                That&apos;s my entire playbook, really. It&apos;s how I&apos;ve approached the competitive thrill of hackathons—leading to wins at <span className="font-semibold text-white">Devpost</span> and top finishes at events by <span className="font-semibold text-white">IIT Kharagpur &amp; Bombay</span>. It&apos;s the same drive that had me shipping a dApp on the Solana mainnet, just to understand the nuts and bolts of the chain. Currently, that curiosity has me pointed squarely at the decentralized web.
              </p>
            </div>
          </section>

          {/* Animated Tech Stack Marquee */}
          <div className="mt-12">
            <TechStackMarquee />
          </div>
          {/* --- END: THE NEW CORE IDENTITY BLOCK --- */}

          {/* --- NEW: VISUAL SEPARATOR --- */}
          <hr className="my-12 border-white/10" />

          {/* --- NEW HOME HUB NAVIGATION --- */}
          <nav className="flex justify-center gap-8 border-b border-white/10">
            <button
              onClick={() => setActiveView('home')}
              className="relative py-4 text-sm font-medium text-white/60 hover:text-white transition-colors"
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
              className="relative py-4 text-sm font-medium text-white/60 hover:text-white transition-colors"
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
              className="relative py-4 text-sm font-medium text-white/60 hover:text-white transition-colors"
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
          <div className="w-full min-h-[600px]">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeView === 'home' && (
                  <div className="space-y-14">
                    {/* --- 1. WORK EXPERIENCE (moved above featured) --- */}
                    <section className="space-y-6">
                      <h2 className="text-base font-semibold tracking-wide text-white mb-2">Work Experience</h2>
                      <WorkExperience />
                    </section>

                    {/* --- 2. FEATURED PROJECTS --- */}
                    <section className="space-y-6">
                      <h2 className="text-base font-semibold tracking-wide text-white mb-2">Featured Projects</h2>
                      <div className="flex flex-col gap-4">
                        {projects.filter((p) => p.isFeatured).map((project) => (
                          <ProjectCard key={project.title} project={project} />
                        ))}
                      </div>
                    </section>

                    {/* --- 3. LIVE ACTIVITY --- */}
                    <section className="space-y-6">
                      <h2 className="text-base font-semibold tracking-wide text-white mb-2">Live Activity</h2>
                      <LiveCommitFeed />
                      <div className="mt-4">
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
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Consistency is key. I build regularly, learn in public, and ship when it matters.
                      </p>
                    </section>

                    {/* --- 4. LATEST WRITINGS --- */}
                    <section className="space-y-6">
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
          <div className="pt-16">
            <FinalCTA />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
