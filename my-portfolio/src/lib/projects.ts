// src/lib/projects.ts
export type ProjectType = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string | null;
  githubLink?: string;
  isLive?: boolean;
  category?: string; // Added optional category for grouping (e.g., 'Web3', 'Web App')
  isFeatured?: boolean; // Identifies the main case study project for special treatment
};

// Updated projects list with storytelling-driven descriptions
export const projects: ProjectType[] = [
  {
    title: "SplitMate",
    category: "Web3",
    isFeatured: true, // Main case study project
    description:
      "Engineered a real-time, on-chain bill-splitting dApp. Solved for payment transparency and security using Solana smart contracts, a real-time messaging layer with Socket.io, and AI-powered validation to ensure accurate expense tracking.",
    technologies: [
      "React",
      "Node.js",
      "Web3.js",
      "Socket.io",
      "MongoDB",
      "AI"
    ],
    image: "/SplitMate.png",
    link: "https://split-mate-43.vercel.app/",
    githubLink: "https://github.com/AdityaP700/split-mate",
    isLive: true
  },
  {
    title: "OSINT Hub",
    category: "Web App",
    description:
      "Building a collaborative intelligence platform for cybersecurity analysts and OSINT researchers. Implementing version-controlled investigation workflows with LLM-based validation and credibility scoring to ensure data integrity before merge acceptance.",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "LLM Integration", "Git-like Versioning"],
    image: "/Logo.png", // Placeholder until dedicated asset is available
    link: null,
    githubLink: undefined,
    isLive: false
  },
  {
    title: "SolTask",
    category: "Web3",
    description:
      "Built a decentralized counter dApp on Solana to master program-derived addresses (PDAs) and on-chain state management. Each counter is wallet-owned, demonstrating secure account creation and state mutation patterns in Rust with Anchor framework.",
    technologies: ["Solana", "Rust", "Anchor"],
    image: "/Logo.png", // Placeholder (add /SolTask.png when ready)
    link: null,
    githubLink: undefined,
    isLive: false
  },
  {
    title: "PrivacyGuard",
    category: "ML",
    description:
      "Built a browser shield against phishing attacks. Implemented on-device TensorFlow.js models and heuristic analysis to detect and block threats in real-time without compromising user privacy or requiring server communication.",
    technologies: [
      "JavaScript",
      "TensorFlow.js",
      "Heuristics",
      "Chrome API",
      "Security"
    ],
    image: "/PrivacyGuard.png",
    link: null,
    githubLink: "https://github.com/AdityaP700/PrivacyGuard",
    isLive: false
  }
];