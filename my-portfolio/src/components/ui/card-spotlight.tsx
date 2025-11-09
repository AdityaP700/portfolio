"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
// import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 400,
  intensity = 0.1, // tuned for subtlety; higher values looked harsh in light mode
  className,
  softenEdge = true,
  ...props
}: {
  radius?: number;
  intensity?: number;
  softenEdge?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-md border px-6 py-5 transition-colors",
        "dark:border-neutral-800 border-neutral-200/70 bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
      style={{
        color: "rgba(0,0,0,0.82)",
      }}
    >
      {/* Unified adaptive hover aura */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-md transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovering ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${`rgba(255,255,255,${intensity})`} 0%,
              ${softenEdge ? `rgba(255,255,255,${intensity * 0.5})` : `rgba(255,255,255,${intensity * 0.7})`} 35%,
              transparent 70%
            )
          `,
          mixBlendMode: 'overlay',
          filter: 'brightness(1.08) contrast(1.02)',
        }}
      />
      {/* Light mode subtle inner shadow to prevent washed look */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-md transition-opacity duration-300 ease-out dark:hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              ${Math.round(radius * 0.55)}px circle at ${mouseX}px ${mouseY}px,
              rgba(0,0,0,0.08) 0%,
              rgba(0,0,0,0.03) 55%,
              transparent 90%
            )
          `,
          mixBlendMode: 'multiply'
        }}
      />
      {/* Dark mode gentle accent tint */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-md transition-opacity duration-300 ease-out hidden dark:block"
        style={{
          opacity: isHovering ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              ${Math.round(radius * 0.65)}px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.18) 0%,
              rgba(255,255,255,0.08) 60%,
              transparent 90%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};
