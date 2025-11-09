// src/components/ui/MediaPreview.tsx
"use client";

import Image from "next/image";
import React from "react";

interface MediaPreviewProps {
  src: string;
  alt?: string;
  width?: number; // container width in px (visual) - used for Next Image sizes
  height?: number; // container height in px (visual) - deprecated, use CSS instead
}

/**
 * Compact "app window" style preview that fits screenshots nicely
 * Works in both light/dark themes with subtle glass + border.
 */
export const MediaPreview: React.FC<MediaPreviewProps> = ({
  src,
  alt = "",
  width = 220,
}) => {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-lg border border-border bg-foreground/[0.04] dark:bg-foreground/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.03)]"
    >
      {/* Window chrome */}
      <div className="absolute inset-x-0 top-0 h-5 sm:h-6 border-b border-border/70 bg-foreground/[0.06] dark:bg-foreground/[0.08] flex items-center gap-1 sm:gap-1.5 pl-2 sm:pl-3 pr-2">
        <span className="size-2 sm:size-2.5 rounded-full bg-red-400/60" />
        <span className="size-2 sm:size-2.5 rounded-full bg-amber-300/60" />
        <span className="size-2 sm:size-2.5 rounded-full bg-emerald-400/60" />
        <span className="ml-auto h-2.5 sm:h-3 rounded-full bg-foreground/15 px-1.5 sm:px-2 text-[9px] sm:text-[10px] leading-[10px] sm:leading-3 text-foreground/60">preview</span>
      </div>

      {/* Image area */}
      <div className="absolute inset-x-0 bottom-0 top-5 sm:top-6">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${width}px`}
          priority={false}
        />
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_100%_0%,rgba(255,255,255,0.06),transparent_60%)] dark:bg-[radial-gradient(100%_60%_at_100%_0%,rgba(255,255,255,0.09),transparent_60%)]" />
    </div>
  );
};

export default MediaPreview;
