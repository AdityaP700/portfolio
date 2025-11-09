// src/components/VisitorCounter.tsx
"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    // Fetch visitor count on mount
    fetch('/api/visitors')
      .then(res => res.json())
      .then(data => {
        setCount(data.count);
        setIsNewVisitor(data.isNewVisitor);
      })
      .catch(err => {
        console.error('Error fetching visitor count:', err);
      });
  }, []);

  if (count === null) {
    return (
      <div className="flex items-center gap-2 text-foreground/40 text-sm animate-pulse">
        <Eye size={16} />
        <span>Loading visitors...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex items-center gap-2 text-foreground/60">
        <Eye size={18} className="text-foreground/40" />
        <span className="text-2xl font-bold tabular-nums text-foreground">
          {count.toLocaleString()}
        </span>
      </div>
      <p className="text-xs text-foreground/50 max-w-[200px]">
        {isNewVisitor ? (
          <>Welcome! You&apos;re visitor <span className="font-semibold text-foreground/70">#{count.toLocaleString()}</span> 🎉</>
        ) : (
          <>curious souls wandered here before you 👀</>
        )}
      </p>
    </div>
  );
}
