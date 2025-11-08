"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { techStackCarousel } from "@/lib/skills";

export default function TechStackCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % techStackCarousel.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const Current = techStackCarousel[index];
  const Icon = Current.icon as any;

  return (
    <div className="flex justify-center items-center text-sm text-foreground/60">
      <span className="mr-3">I build with</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={Current.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2"
        >
          <Icon className="h-6 w-6 text-foreground/80" />
          <span className="font-semibold text-foreground">{Current.name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
