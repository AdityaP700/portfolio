"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dynamicSkillsForSpinner } from "@/lib/skills";

export default function DynamicTechStack() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dynamicSkillsForSpinner.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center justify-center text-sm sm:text-base">
      <span className="mr-2 text-white/70">I build with</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={dynamicSkillsForSpinner[index]}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-white min-w-[120px] text-left"
        >
          {dynamicSkillsForSpinner[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
