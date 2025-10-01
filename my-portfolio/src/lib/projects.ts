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
};

// Updated projects list per latest curation:
export const projects: ProjectType[] = [
  {
    title: "SplitMate",
    category: "Web3",
    description:
      "A bill-splitting app revolutionizing shared expenses with blockchain technology, real-time messaging, and AI-powered intelligence for transparent and secure payments.",
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
      "A collaborative platform for cybersecurity analysts, journalists, and OSINT researchers to investigate, document, and refine intelligence in a secure, version-controlled environment. Uses AI to validate merge requests and assess credibility before acceptance.",
    technologies: ["TBA"],
    image: "/Logo.png", // Placeholder until dedicated asset is available
    link: null,
    githubLink: undefined,
    isLive: false
  },
  {
    title: "SolTask",
    category: "Web3",
    description:
      "A simple decentralized counter dApp built on Solana. Users can create personal counters, increment or reset them—each counter account tied to their wallet for ownership. Demonstrates PDAs, account creation & state management.",
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
      "A Chrome extension protecting users from phishing attacks using on‑device machine learning, heuristic analysis & homograph detection.",
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