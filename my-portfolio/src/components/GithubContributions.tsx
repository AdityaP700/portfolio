// src/components/GitHubContributions.tsx
"use client";

import { useState } from "react";
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

export const GitHubContributions = () => {
  const githubUsername = "AdityaP700"; // Your GitHub username
  const currentYear = new Date().getFullYear();
  
  // State to manage the selected year. Default to the current year.
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // An array of years you want to show as options
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  // Custom theme for the calendar
  const explicitTheme = {
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'], // <-- Provide 5 colors here
};


  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>My GitHub Activity</CardTitle>
        <CardDescription>
          Proof I actually code (sometimes)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
            <div className="max-w-full overflow-hidden">
          <GitHubCalendar
  username={githubUsername}
  year={selectedYear.toString()}
  blockSize={12}          // Smaller squares (default is often 14)
  blockMargin={2}        // Tighter spacing
  fontSize={12}          // Smaller font size
  showWeekdayLabels={false}  // Hide weekday labels for minimalism (if supported)
  theme={explicitTheme}

  // optionally disable tooltips for cleaner UI
  tooltipDataAttrs={() => null}  
/>
</div>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-2">
        {years.map((year) => (
          <Button
            key={year}
            variant={selectedYear === year ? "default" : "outline"} // Highlight the active year
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};