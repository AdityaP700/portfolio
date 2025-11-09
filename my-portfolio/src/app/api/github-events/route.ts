import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    "User-Agent": "AdityaP700-Portfolio",
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  try {
    const ghRes = await fetch(
      "https://api.github.com/users/AdityaP700/events/public?per_page=30",
      { headers, cache: "no-store" }
    );

    if (!ghRes.ok) {
      const text = await ghRes.text();
      return NextResponse.json({ error: text }, { status: ghRes.status });
    }

    const events = await ghRes.json();

    // Only show relevant events
    const filtered = events
      .filter((e: any) =>
        ["PushEvent", "PullRequestEvent"].includes(e.type)
      )
      .map((e: any) => ({
        repo: e.repo.name,
        type: e.type === "PushEvent" ? "Commit" : "Pull Request",
        title:
          e.type === "PushEvent"
            ? e.payload.commits?.[0]?.message ?? "Commit"
            : e.payload.pull_request?.title ?? "Pull Request",
        url:
          e.type === "PushEvent"
            ? e.payload.commits?.[0]?.url?.replace(
                "api.github.com/repos",
                "github.com"
              ) ?? `https://github.com/${e.repo.name}`
            : e.payload.pull_request?.html_url ??
              `https://github.com/${e.repo.name}`,
        timestamp: e.created_at,
      }));

    const res = NextResponse.json(filtered, { status: 200 });
    res.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
