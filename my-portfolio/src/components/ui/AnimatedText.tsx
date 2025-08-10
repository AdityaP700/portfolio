"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedName() {
  const [hovered, setHovered] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [currentText, setCurrentText] = useState("Aditya");
  const [eatenChars, setEatenChars] = useState(0);
  const [pacmanMouth, setPacmanMouth] = useState(false);

  const originalText = "Aditya";
  const altTexts = ["ngmi dev", "mad coder", "always building", "vibe coder", "pixel pusher"];

  useEffect(() => {
    let interval;
    if (isEating && eatenChars < originalText.length) {
      interval = setInterval(() => {
        setEatenChars(prev => prev + 1);
        setPacmanMouth(prev => !prev); // Animate mouth opening/closing
      }, 200);
    } else if (isEating && eatenChars >= originalText.length) {
      // Text fully eaten, show new text
      setTimeout(() => {
        const randomAlt = altTexts[Math.floor(Math.random() * altTexts.length)];
        setCurrentText(randomAlt);
        setIsEating(false);
        setEatenChars(0);
      }, 300);
    }
    
    return () => clearInterval(interval);
  }, [isEating, eatenChars, originalText.length, altTexts]);

  const handleMouseEnter = () => {
    setHovered(true);
    setTimeout(() => {
      setIsEating(true);
    }, 500); // Delay before eating starts
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setIsEating(false);
    setEatenChars(0);
    setCurrentText(originalText);
    setPacmanMouth(false);
  };

  const visibleText = isEating ? currentText.slice(eatenChars) : currentText;
  const pacmanPosition = isEating ? eatenChars * 0.6 : 0; // Approximate character width

  return (
    <div
      className="flex items-center gap-2 relative overflow-visible cursor-pointer h-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pac-Man */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="pacman"
            initial={{ x: -60, opacity: 0 }}
            animate={{ 
              x: pacmanPosition,
              opacity: 1,
              rotate: pacmanMouth ? 0 : 45 
            }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ 
              x: { duration: 0.2 },
              opacity: { duration: 0.3 },
              rotate: { duration: 0.1 }
            }}
            className="absolute z-10 text-2xl"
            style={{ left: `${pacmanPosition}em` }}
          >
            <div className="relative">
              {/* Pac-Man body */}
              <motion.div
                animate={{ 
                  clipPath: pacmanMouth 
                    ? "polygon(100% 74%, 44% 48%, 100% 21%)" 
                    : "polygon(100% 50%, 100% 50%, 100% 50%)"
                }}
                transition={{ duration: 0.1 }}
                className="w-6 h-6 bg-yellow-400 rounded-full relative"
              >
                {/* Eye */}
                <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crumbs animation */}
      <AnimatePresence>
        {isEating && (
          <motion.div
            className="absolute flex gap-1"
            style={{ left: `${pacmanPosition - 1}em` }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  y: [-10, -20, -30],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.3
                }}
                className="w-1 h-1 bg-orange-400 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text */}
      <motion.span
        className="font-bold text-2xl sm:text-3xl relative z-0"
        style={{ 
          paddingLeft: hovered ? '2rem' : '0',
          transition: 'padding-left 0.3s ease'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentText + eatenChars}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {isEating && eatenChars < originalText.length ? (
              <>
                {/* Eaten characters (invisible but maintain space) */}
                <span className="opacity-0">
                  {originalText.slice(0, eatenChars)}
                </span>
                {/* Remaining visible characters */}
                <span className="inline-block">
                  {originalText.slice(eatenChars)}
                </span>
              </>
            ) : (
              <span className="inline-block">
                {visibleText}
              </span>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      {/* Chomp sound effect visualization */}
      <AnimatePresence>
        {isEating && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 0] }}
            transition={{ 
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 0.1
            }}
            className="absolute text-xs font-bold text-yellow-600 opacity-70"
            style={{ left: `${pacmanPosition + 1}em`, top: '-1rem' }}
          >
            CHOMP!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}