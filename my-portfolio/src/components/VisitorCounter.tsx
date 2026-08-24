// src/components/VisitorCounter.tsx
"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type VisitorPayload = {
  count?: number;
  isNewVisitor?: boolean;
};

export default function VisitorCounter() {
  const [data, setData] = useState<VisitorPayload | null>(null);

  useEffect(() => {
    fetch("/api/visitors", { cache: "no-store" })
      .then((res) => res.json())
      .then((payload: VisitorPayload) => setData(payload))
      .catch(() => setData({ count: 0, isNewVisitor: false }));
  }, []);

  const count = data?.count ?? 0;

  // Never show a fabricated count. If backend isn't configured or fails, hide.
  if (data !== null && count === 0) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs text-foreground/60 backdrop-blur-md">
      <Eye size={14} className="text-foreground/40" />
      <span className="font-mono tabular-nums text-foreground/80">
        {data === null ? "--" : count.toLocaleString()}
      </span>
      <span>{data?.isNewVisitor ? "new visitor" : "visits"}</span>
    </div>
  );
}
