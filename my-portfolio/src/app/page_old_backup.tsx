"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import AnimatedName from "@/components/ui/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WritingsSection from "@/components/sections/WritingsSection";
import ActivitySection from "@/components/sections/ActivitySection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import PixelatedClock from "@/components/timer";
import LocationWeather from "@/components/weather";
import DynamicTechStack from "@/components/DynamicTechStack";

export default function Home() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg py-1 px-6 flex justify-between items-center text-foreground text-base sm:text-sm select-none border-b border-white/10">
        <div className="text-[0.55rem] tracking-tight opacity-80">
          <PixelatedClock />
        </div>
        <div>
          <LocationWeather />
        </div>
      </header>
      <main className="flex flex-col items-center p-4 sm:p-8">
        <div className="max-w-2xl w-full space-y-16">
          {/* --- CORE CONTENT BLOCK --- */}
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
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-foreground transition-all duration-200 group/link"
              >
                @AdityaPat_
                <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-all duration-200 transform group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </section>

          {/* --- NEW NARRATIVE BIO --- */}
          <section className="space-y-5 text-pretty text-center text-[0.9rem] sm:text-[0.95rem] leading-relaxed text-foreground/70 max-w-xl mx-auto">
            <p>
              I build insightful, non-trivial products. I&apos;ve shipped a decentralized app on the Solana mainnet,
              developed a Chrome extension using on-device ML, and thrive on turning complex problems into elegant
              solutions. I&apos;m currently focused on the frontier of the decentralized web.
            </p>
            <div className="pt-2 flex justify-center">
              <DynamicTechStack />
            </div>
          </section>

          {/* --- NEW INTERACTIVE HUB --- */}
          <nav className="flex justify-center gap-4 my-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-400/20'
                  : 'text-foreground/50 hover:bg-white/10 hover:text-foreground'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('writings')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === 'writings'
                  ? 'bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-400/20'
                  : 'text-foreground/50 hover:bg-white/10 hover:text-foreground'
              }`}
            >
              Writings
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === 'activity'
                  ? 'bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-400/20'
                  : 'text-foreground/50 hover:bg-white/10 hover:text-foreground'
              }`}
            >
              Activity
            </button>
          </nav>

          {/* --- DYNAMIC CONTENT PANE --- */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'projects' && <ProjectsSection />}
                {activeTab === 'writings' && <WritingsSection />}
                {activeTab === 'activity' && <ActivitySection />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Action Buttons: Socials & Resume --- */}
          <section className="space-y-4 pt-8">
            <h2 className="font-semibold text-center sm:text-left text-foreground/90 text-sm tracking-wide uppercase">Connect</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {/* GitHub */}
              <Button
                asChild
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-foreground transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
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
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-foreground transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
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
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-foreground transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
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
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-foreground transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-medium rounded-xl"
              >
                <a href="mailto:adityaa32078@gmail.com">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
              </Button>
              {/* Collaboration */}
              <Button
                asChild
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:via-cyan-500/30 hover:to-blue-500/30 border border-white/10 text-foreground transition-all duration-300 hover:-translate-y-1 shadow-lg h-11 text-[0.7rem] font-semibold rounded-xl"
              >
                <a href="#collaborate">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />
                  Open Group Collab
                </a>
              </Button>
            </div>
          </section>

          <FinalCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}
