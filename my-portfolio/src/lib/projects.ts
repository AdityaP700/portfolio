// src/lib/projects.ts
export type ProjectType = {
  title: string;
  eyebrow?: string;
  description: string;
  evidence?: string;
  technologies: string[];
  image?: string;
  link: string | null;
  githubLink?: string;
  isLive?: boolean;
  category?: string;
  isFeatured?: boolean;
};

export const projects: ProjectType[] = [
  {
    title: "Aegis",
    eyebrow: "LLM Reliability",
    category: "AI Infra",
    isFeatured: true,
    description:
      "A reliability runtime for LLM tool-calling agents, focused on catching silent execution failures before they disappear into successful-looking runs.",
    evidence:
      "Reduced silent tool-call failures from 6 -> 0 across an initial 22-case benchmark.",
    technologies: ["Python", "Agents", "Tool Calling", "Reliability", "Benchmarks"],
    image: "/aegis.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/Aegis",
    isLive: false,
  },
  {
    title: "Exora",
    eyebrow: "AI Product",
    category: "LLM",
    description:
      "Real-time competitive intelligence engine - multi-LLM pipelines, SSE streaming, and BYOK architecture.",
    technologies: ["TypeScript", "Exa API", "Groq", "SSE", "BYOK"],
    isFeatured: true,
    image: "/Exora.png",
    link: "https://exora-task.vercel.app/",
    githubLink: "https://github.com/AdityaP700/Exora-task",
    isLive: true,
  },
  {
    title: "Tokaroo",
    eyebrow: "Retrieval Evaluation",
    category: "RAG",
    isFeatured: true,
    description:
      "Adaptive RAG evaluator - retrieval failure analysis, BM25 + cross-encoder reranking, and context compression.",
    technologies: ["Python", "RAG", "BM25", "Reranking", "Evaluation"],
    image: "/tokaroo.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/Tokaroo",
    isLive: false,
  },
  {
    title: "ChunkdUp",
    eyebrow: "Memory Infrastructure",
    category: "ML",
    isFeatured: true,
    description:
      "Chunking strategy explorer - how LLMs process and retrieve context, without abstraction layers.",
    technologies: ["Python", "Chunking", "Retrieval", "Embeddings", "Context"],
    image: "/chunkdup.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/ChunkdUp",
    isLive: false,
  },
  {
    title: "URLGuard",
    eyebrow: "On-device ML",
    category: "ML",
    isFeatured: true,
    description:
      "On-device phishing detector - TF.js model, 16 lexical features, homograph detection, 88.8% accuracy, and 13th / 925 at Amplicode.",
    technologies: ["TensorFlow.js", "Security", "Chrome API", "ML", "Privacy"],
    image: "/PrivacyGuard (2).png",
    link: null,
    githubLink: "https://github.com/AdityaP700/URLGuard",
    isLive: false,
  },
  {
    title: "QKVOtter",
    eyebrow: "Transformer Fundamentals",
    category: "ML",
    isFeatured: false,
    description:
      "A from-scratch attention learning project for understanding query, key, value mechanics instead of treating model internals as a black box.",
    technologies: ["Python", "Transformers", "Attention", "QKV", "Learning"],
    image: "/qkv-otter.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/QKVOtter",
    isLive: false,
  },
  {
    title: "Shinobi",
    eyebrow: "Rust CLI",
    category: "Rust",
    isFeatured: false,
    description: "High-performance CLI for Solana NFT and wallet forensics.",
    technologies: ["Rust", "Solana", "Tokio", "CLI", "RPC"],
    image: "/shinobi.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/shinobi",
    isLive: false,
  },
  {
    title: "SplitMate",
    eyebrow: "Web3 Product",
    category: "Web3",
    isFeatured: false,
    description:
      "On-chain expense splitting - Solana smart contracts, Socket.io real-time sync, and AI validation.",
    technologies: ["React", "Node.js", "Web3.js", "Socket.io", "MongoDB"],
    image: "/Splitmate1.png",
    link: "https://split-mate-43.vercel.app/",
    githubLink: "https://github.com/AdityaP700/split-mate",
    isLive: true,
  },
];
