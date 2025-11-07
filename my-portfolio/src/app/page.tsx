"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import AnimatedName from "@/components/ui/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";
import HomeView from "@/components/sections/HomeView";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WritingsSection from "@/components/sections/WritingsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import PixelatedClock from "@/components/timer";
import LocationWeather from "@/components/weather";
import DynamicTechStack from "@/components/DynamicTechStack";

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
          {/* --- START: THE NEW CORE IDENTITY BLOCK --- */}
          <section className="flex flex-col items-center pt-16 space-y-4 text-center">
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
          <section className="mt-8 text-pretty text-[0.9rem] sm:text-[0.95rem] leading-relaxed text-center text-white/70 max-w-xl mx-auto">
            <p>
              I build insightful, non-trivial products. I&apos;ve shipped a decentralized app on the Solana mainnet, 
              developed a Chrome extension using on-device ML, and thrive on turning complex problems into elegant 
              solutions. I&apos;m currently focused on the frontier of the decentralized web.
            </p>
          </section>

          {/* NEW: CURRENT WORK EXPERIENCE SECTION */}
          <section className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-sm text-white/80">
                Currently Backend Engineer at a stealth startup.
              </p>
            </div>
          </section>

          {/* Dynamic Tech Stack */}
          <section className="mt-4 flex justify-center">
            <DynamicTechStack />
          </section>
          {/* --- END: THE NEW CORE IDENTITY BLOCK --- */}

          {/* --- NEW HOME HUB NAVIGATION --- */}
          <nav className="flex justify-center gap-8 my-12 border-b border-white/10">
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
                {activeView === 'home' && <HomeView />}
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
