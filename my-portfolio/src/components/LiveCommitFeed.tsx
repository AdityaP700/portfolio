"use client";

import React, { useEffect, useState } from "react";
import { GitCommit, GitPullRequest, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type Contribution = {
  type: "Commit" | "Pull Request";
  repo: string;
  title: string;
  url: string;
  timestamp: string;
};

interface CommitItem { message: string; sha: string; url?: string }
interface PushEventPayload { commits?: CommitItem[] }
interface PullRequestData { title: string; html_url: string }
interface PullRequestPayload { pull_request?: PullRequestData }
interface BaseEvent { type: string; repo: { name: string }; created_at: string }
interface PushEvent extends BaseEvent { type: "PushEvent"; payload: PushEventPayload }
interface PullRequestEvent extends BaseEvent { type: "PullRequestEvent"; payload: PullRequestPayload }
type GitHubEvent = PushEvent | PullRequestEvent | (BaseEvent & { payload: Record<string, unknown> })

function formatDateDistance(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatDateHeader() {
  return new Date().toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function fetchLatestContributions(): Promise<Contribution[]> {
  try {
    const res = await fetch("/api/github-events", { next: { revalidate: 60 } });
    if (!res.ok) return [];

  const events: GitHubEvent[] = await res.json();
    console.log("Raw GitHub events:", events);

    const unique = new Map();
    const contributions: Contribution[] = events
      .filter((e): e is PushEvent | PullRequestEvent => e.type === "PushEvent" || e.type === "PullRequestEvent")
      .flatMap((e) => {
        if (e.type === "PushEvent" && Array.isArray(e.payload.commits)) {
          return e.payload.commits.map<Contribution>((c) => ({
            type: "Commit" as const,
            repo: e.repo.name,
            title: c.message.split("\n")[0],
            url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
            timestamp: e.created_at,
          }));
        }
        if (e.type === "PullRequestEvent" && e.payload.pull_request) {
          const pr = e.payload.pull_request;
          return [{
            type: "Pull Request" as const,
            repo: e.repo.name,
            title: pr.title,
            url: pr.html_url,
            timestamp: e.created_at,
          }];
        }
        return [] as Contribution[];
      })
      .filter((item) => {
        const key = `${item.type}-${item.repo}-${item.title}`;
        if (unique.has(key)) return false;
        unique.set(key, true);
        return true;
      })
      .slice(0, 6);

    console.log("Filtered & mapped contributions:", contributions);
    return contributions;
  } catch (err) {
    console.error("Error fetching contributions:", err);
    return [];
  }
}

const LiveCommitFeed: React.FC = () => {
  const [items, setItems] = useState<Contribution[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await fetchLatestContributions();
        if (active) setItems(data);
      } catch {
        if (active) setError(true);
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (error)
    return <p className="text-sm text-red-400">Failed to load activity.</p>;
  if (!items)
    return <p className="text-sm text-foreground/40">Loading recent activity…</p>;
  if (items.length === 0)
    return <p className="text-sm text-foreground/40">No recent public contributions.</p>;

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-foreground/50 mb-4">
        Recent Contributions • {formatDateHeader()}
      </h3>

      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between p-4 rounded-xl border border-border hover:border-foreground/20 hover:bg-foreground/[0.03] transition-all group"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`p-2 rounded-lg ${
                  item.type === "Commit"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-blue-500/10 text-blue-500"
                }`}
              >
                {item.type === "Commit" ? (
                  <GitCommit size={16} />
                ) : (
                  <GitPullRequest size={16} />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground/90 truncate group-hover:text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-foreground/50 mt-1 truncate">
  {item.type === "Commit" ? "Committed to" : "Opened PR in"}{" "}
  <a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/70 hover:text-foreground hover:underline transition-colors"
  onClick={(e) => e.stopPropagation()}>
    {item.repo}
 </a>

                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 ml-3 flex-shrink-0">
              <span className="text-xs text-foreground/40 whitespace-nowrap">
                {formatDateDistance(item.timestamp)}
              </span>
              <div className="p-2 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition">
                <ArrowUpRight className="h-4 w-4 text-foreground/60" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default LiveCommitFeed;
