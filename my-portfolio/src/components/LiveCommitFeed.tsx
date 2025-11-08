"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Contribution = {
  type: "Commit" | "Pull Request";
  repo: string;
  title: string;
  url: string;
  timestamp: string;
};

// Minimal GitHub event typing for the subset we use
interface PushEventPayload {
  commits?: { message: string; sha: string }[];
}
interface PullRequestPayload {
  action?: string;
  pull_request?: { title: string; html_url: string };
}
interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: PushEventPayload & PullRequestPayload & Record<string, unknown>;
  created_at: string;
}

function formatDate(d: Date, pattern: "header" | "year") {
  if (pattern === "header") {
    return d.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return d.getFullYear().toString();
}

async function fetchLatestContributions(): Promise<Contribution[]> {
  try {
    const res = await fetch("https://api.github.com/users/AdityaP700/events/public");
    if (!res.ok) return [];
    const events: GitHubEvent[] = await res.json();
    const contributions: Contribution[] = events
      .filter((event) => event.type === "PushEvent" || event.type === "PullRequestEvent")
      .slice(0, 4)
      .map((event): Contribution | null => {
        if (event.type === "PushEvent" && event.payload.commits && event.payload.commits[0]) {
          return {
            type: "Commit",
            repo: event.repo.name,
            title: event.payload.commits[0].message,
            url: `https://github.com/${event.repo.name}/commit/${event.payload.commits[0].sha}`,
            timestamp: event.created_at,
          };
        }
        if (event.type === "PullRequestEvent" && event.payload.pull_request) {
          return {
            type: "Pull Request",
            repo: event.repo.name,
            title: event.payload.pull_request.title,
            url: event.payload.pull_request.html_url,
            timestamp: event.created_at,
          };
        }
        return null;
      })
      .filter((c: Contribution | null): c is Contribution => c !== null);
    return contributions;
  } catch {
    return [];
  }
}

const LiveCommitFeed: React.FC = () => {
  const [items, setItems] = useState<Contribution[] | null>(null);

  useEffect(() => {
    fetchLatestContributions().then(setItems);
  }, []);

  const today = new Date();

  if (!items) {
    return <p className="text-sm text-white/40">Loading recent activity…</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-white/40">No recent public contributions found.</p>;
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-white/50 mb-4">
        Recent Contributions • {formatDate(today, "header")}
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <a
            href={item.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-transparent border border-white/10 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90 truncate group-hover:text-white">
                  {item.title}
                </p>
                <p className="text-xs text-white/50 mt-1">
                  {item.type === "Commit" ? "Committed to" : "Contributed to"} {item.repo}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-xs text-white/40">{formatDate(new Date(item.timestamp), "year")}</span>
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <ArrowUpRight className="h-4 w-4 text-white/60" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LiveCommitFeed;
