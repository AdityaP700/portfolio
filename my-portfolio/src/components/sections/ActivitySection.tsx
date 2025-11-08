import { GitHubContributions } from "@/components/GithubContributions";

export default function ActivitySection() {
  return (
    <section className="space-y-6">
      <h2 className="font-bold text-center sm:text-left text-base text-foreground tracking-wide">
        GitHub Activity
      </h2>
      <GitHubContributions
        theme={{
          light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
          dark: [
            "rgba(255, 255, 255, 0.05)",
            "#0e4429",
            "#006d32",
            "#26a641",
            "#39d353",
          ],
        }}
        maxLevel={4}
      />
      <div className="pt-4 space-y-3">
        <p className="text-sm text-foreground/60 leading-relaxed">
          Consistency is key. I believe in building regularly, learning in public,
          and contributing to open source when a problem feels real enough to solve.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-foreground/40">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#39d353] rounded-sm"></div>
            <span>High Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#26a641] rounded-sm"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#006d32] rounded-sm"></div>
            <span>Light</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[rgba(255,255,255,0.05)] rounded-sm border border-white/10"></div>
            <span>No Activity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
