// src/components/GitHubContributions.tsx
"use client";

import React, { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
type ColorScale = [string, string, string, string, string];

export type ThemeArrays = {
  light?: string[];
  dark?: string[];
};
interface ThemeInput {
  light?: ColorScale;
  dark: ColorScale;
}
export interface GitHubContributionsProps {
  username?: string;
  theme?: ThemeArrays;
  maxLevel?: number; // typically 1..4 (0..4 levels -> 5 colors) or 1..2 for 2 colors usage
}

export const GitHubContributions: React.FC<GitHubContributionsProps> = ({
  username = "AdityaP700",
  theme,
  maxLevel = 4,
}) => {
  const { resolvedTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  // Selected year state (keep this as number because GitHubCalendar's Year type is numeric)
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Years to display
  const years = [currentYear, currentYear - 1, currentYear - 2];

  // Default themes (light/dark arrays). Each array has 5 colors (maxLevel 4 = 5 shades).
  const defaultTheme: ThemeInput = {
    // Light palette with higher contrast against warm off‑white backgrounds
    light: ["#e9e5dc", "#ffd76a", "#ffae42", "#ff8c2b", "#f76b15"],
    // GitHub-like dark palette
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  // Use provided theme or fallback to defaults
  const themeToUse: ThemeInput = {
    light: (theme?.light as ColorScale) ?? defaultTheme.light!,
    dark: (theme?.dark as ColorScale) ?? defaultTheme.dark,
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Card className="border-border bg-card backdrop-blur-xl shadow-[0_0_0_1px_rgba(0,0,0,0.04)] relative overflow-hidden group">
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="text-sm font-semibold tracking-wide">My GitHub Activity</CardTitle>
        <CardDescription className="text-[0.7rem]">Proof I actually code (sometimes)</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 pt-0">
        <TooltipProvider>
          <div className="w-full overflow-x-auto overflow-y-hidden -mx-2 px-2 pb-2">
            <div className="min-w-[280px] sm:min-w-0">
              {mounted && (
                <GitHubCalendar
                  username={username}
                  year={selectedYear}
                  blockSize={11}
                  blockMargin={3}
                  fontSize={10}
                  showWeekdayLabels={false}
                  theme={themeToUse}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  maxLevel={maxLevel}
                />
              )}
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
      {/* Subtle strokes around cells for visibility on warm light backgrounds */}
      <style jsx global>{`
        .gh-cal rect {
          stroke: rgba(0, 0, 0, 0.08);
          stroke-width: 0.5px;
        }
        html.dark .gh-cal rect {
          stroke: rgba(255, 255, 255, 0.08);
        }
      `}</style>
      <CardFooter className="relative z-10 justify-center gap-2 pt-4 flex-wrap">
        {years.map((year) => (
          <Button
            key={year}
            size="sm"
            variant={selectedYear === year ? "default" : "ghost"}
            className={`h-7 px-3 rounded-full text-[0.65rem] font-medium tracking-wide transition-colors ${selectedYear === year ? 'shadow-[0_0_0_1px_rgba(0,0,0,0.15)]' : 'bg-foreground/0 hover:bg-foreground/10'}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};

export default GitHubContributions;
