// src/components/ui/TiltImage.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const TiltImage: React.FC<TiltImageProps> = ({
  src,
  alt,
  width = 160,
  height = 160
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)",
        }}
      >
        {/* Glassmorphism backdrop */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 backdrop-blur-sm border border-white/10 dark:border-white/5"
          style={{
            transform: "translateZ(-20px)",
          }}
        />

        {/* Image */}
        <div className="relative w-full h-full p-3">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-contain w-full h-full drop-shadow-2xl"
            style={{
              filter: isHovered
                ? "drop-shadow(0 20px 40px rgba(0,0,0,0.3))"
                : "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
            }}
          />
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.div>
    </motion.div>
  );
};
