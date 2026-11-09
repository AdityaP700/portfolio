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
    eyebrow: "LLM Reliability Runtime",
    category: "AI Infra",
    isFeatured: true,
    description:
      "A deterministic reliability runtime for tool-calling LLM agents. Catches silent tool-execution failures, schema drift, and unhandled tool responses before they corrupt context or pass as false successes.",
    evidence:
      "Reduced silent tool-call failures from 6 → 0 across an initial 22-case benchmark.",
    technologies: ["Python", "Agents", "Tool Calling", "Reliability", "Benchmarking"],
    image: "/aegis.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/Aegis",
    isLive: false,
  },
  {
    title: "Exora",
    eyebrow: "AI Intelligence Engine",
    category: "LLM",
    isFeatured: true,
    description:
      "Real-time competitive intelligence engine orchestrating multi-LLM pipelines, server-sent events (SSE) streaming, and BYOK (Bring Your Own Key) architecture for low-latency market analysis.",
    technologies: ["TypeScript", "Next.js", "Exa API", "Groq", "SSE", "BYOK"],
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
      "Adaptive RAG evaluator and retrieval failure analysis engine. Combines BM25 lexical search with cross-encoder neural reranking, context compression, and automated recall degradation alerts.",
    technologies: ["Python", "RAG", "BM25", "Cross-Encoder", "Evaluation"],
    image: "/tokaroo.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/Tokaroo",
    isLive: false,
  },
  {
    title: "ChunkdUp",
    eyebrow: "Memory Infrastructure",
    category: "AI Infra",
    isFeatured: true,
    description:
      "Persistent memory infrastructure for autonomous agents. Features intelligent retention policies, semantic chunking, hybrid vector + keyword retrieval, and transactional PostgreSQL storage.",
    technologies: ["Python", "PostgreSQL", "Embeddings", "Hybrid Retrieval", "Agent Memory"],
    image: "/chunkdup.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/ChunkdUp",
    isLive: false,
  },
  {
    title: "URLGuard",
    eyebrow: "On-Device ML",
    category: "ML",
    isFeatured: true,
    description:
      "Zero-latency on-device phishing detector running client-side TensorFlow.js inference. Evaluates 16 lexical and structural features including homograph attacks with complete privacy and zero telemetry leakage.",
    evidence:
      "88.8% accuracy · Placed 13th / 925 participants at Amplicode hackathon.",
    technologies: ["TensorFlow.js", "TypeScript", "Chrome Extension API", "Security", "ML"],
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
      "From-scratch PyTorch implementation of multi-head attention and transformer blocks designed to inspect query-key-value mechanics, attention weight maps, and numerical stability.",
    technologies: ["Python", "PyTorch", "Transformers", "Self-Attention", "Linear Algebra"],
    image: "/qkv-otter.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/QKVOtter",
    isLive: false,
  },
  {
    title: "Shinobi",
    eyebrow: "High-Performance CLI",
    category: "Rust",
    isFeatured: false,
    description:
      "High-throughput asynchronous Rust CLI for Solana wallet forensics, transaction trace inspection, and token verification with sub-second RPC batching.",
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
      "On-chain group expense splitting protocol with Solana smart contracts, real-time WebSocket state synchronization, and automated cryptographic settlement.",
    technologies: ["React", "Node.js", "Solana Web3.js", "Socket.io", "MongoDB"],
    image: "/Splitmate1.png",
    link: "https://split-mate-43.vercel.app/",
    githubLink: "https://github.com/AdityaP700/split-mate",
    isLive: true,
  },
];
