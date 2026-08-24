"use client";

import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  BrainCircuit,
  Cloud,
  Database,
  Gauge,
  Search,
  Server,
  Workflow,
  Zap,
} from "lucide-react";
import { PythonIcon } from "@/components/icons/PythonIcon";
import { TypescriptIcon } from "@/components/icons/TypescriptIcon";
import { NodedotjsIcon } from "@/components/icons/NodedotjsIcon";
import { DockerIcon } from "@/components/icons/DockerIcon";
import { GithubactionsIcon } from "@/components/icons/GithubactionsIcon";
import { MongoDBIcons } from "@/components/icons/MongodbIcon";
import { ReactIcon as RedisIcon } from "@/components/icons/RedisIcon";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type Category = "All" | "AI / Retrieval" | "Backend" | "Infrastructure" | "Data";
type Tool = { name: string; icon: Icon; category: Exclude<Category, "All"> };

const categories: Category[] = ["All", "AI / Retrieval", "Backend", "Infrastructure", "Data"];

const tools: Tool[] = [
  { name: "RAG", icon: BrainCircuit, category: "AI / Retrieval" },
  { name: "Embeddings", icon: Workflow, category: "AI / Retrieval" },
  { name: "BM25", icon: Search, category: "AI / Retrieval" },
  { name: "Reranking", icon: Gauge, category: "AI / Retrieval" },
  { name: "Evaluation", icon: Zap, category: "AI / Retrieval" },
  { name: "Python", icon: PythonIcon, category: "Backend" },
  { name: "FastAPI", icon: Server, category: "Backend" },
  { name: "Node.js", icon: NodedotjsIcon, category: "Backend" },
  { name: "TypeScript", icon: TypescriptIcon, category: "Backend" },
  { name: "Docker", icon: DockerIcon, category: "Infrastructure" },
  { name: "AWS", icon: Cloud, category: "Infrastructure" },
  { name: "GitHub Actions", icon: GithubactionsIcon, category: "Infrastructure" },
  { name: "Redis", icon: RedisIcon, category: "Infrastructure" },
  { name: "PostgreSQL", icon: Database, category: "Data" },
  { name: "MongoDB", icon: MongoDBIcons, category: "Data" },
  { name: "Elasticsearch", icon: Search, category: "Data" },
];

export default function StaticTechStack() {
  const [selected, setSelected] = useState<Category>("All");
  const visibleTools = useMemo(
    () => selected === "All" ? tools : tools.filter((tool) => tool.category === selected),
    [selected],
  );

  return (
    <div className="border-y border-border/65 py-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-mono text-[11px] tracking-[0.08em] text-foreground/42">
          tools that have earned a place in the toolbox
        </p>

        <div className="flex flex-wrap gap-x-1 gap-y-2" aria-label="Filter technology stack">
          {categories.map((category) => {
            const active = selected === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelected(category)}
                aria-pressed={active}
                className={
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors " +
                  (active
                    ? "bg-foreground text-background"
                    : "text-foreground/52 hover:bg-foreground/[0.06] hover:text-foreground")
                }
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex min-h-24 flex-wrap content-start gap-2.5">
        {visibleTools.map((tool) => {
          const ToolIcon = tool.icon;
          return (
            <div
              key={tool.name}
              className="group inline-flex h-10 items-center gap-2.5 rounded-md border border-border/70 bg-foreground/[0.025] px-3 text-sm text-foreground/66 transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-foreground/[0.055] hover:text-foreground"
            >
              <span className="flex h-5 w-5 items-center justify-center overflow-hidden text-foreground/52 group-hover:text-emerald-400 [&>svg]:h-4 [&>svg]:w-4">
                <ToolIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>{tool.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
