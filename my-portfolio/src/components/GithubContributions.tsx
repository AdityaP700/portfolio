// src/components/GitHubContributions.tsx
"use client";

import React, { useState } from "react";
import GitHubCalendar from "react-github-calendar";
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
  const currentYear = new Date().getFullYear();

  // Selected year state (keep this as number because GitHubCalendar's Year type is numeric)
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Years to display
  const years = [currentYear, currentYear - 1, currentYear - 2];

  // Default themes (light/dark arrays). Each array has 5 colors (maxLevel 4 = 5 shades).
  const defaultTheme: ThemeInput = {
  light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

  // Use provided theme or fallback to defaults
  const themeToUse: ThemeInput = {
  light: theme?.light as ColorScale ?? defaultTheme.light,
  dark: theme?.dark as ColorScale ?? defaultTheme.dark,
};

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>My GitHub Activity</CardTitle>
        <CardDescription>Proof I actually code (sometimes)</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="max-w-full overflow-hidden">
            <GitHubCalendar
              username={username}
              year={selectedYear} // IMPORTANT: pass number, not string
              blockSize={12}
              blockMargin={2}
              fontSize={12}
              showWeekdayLabels={false}
              // Pass the light/dark arrays as the library/type expects
              theme={themeToUse} // cast only if TS complains about exact type shape
              // If your installed types accept maxLevel, forward it — otherwise remove
              maxLevel={maxLevel}
            />
          </div>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-2">
        {years.map((year) => (
          <Button
            key={year}
            variant={selectedYear === year ? "default" : "outline"}
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
