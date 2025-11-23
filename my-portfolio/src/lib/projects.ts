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
  title: "Exora",
  category: "genAI",
  description: " Get real-time competitive, market positioning and insights in seconds.Decode Any Competitor. Instantly. Drop any company URL.",
  technologies: [
    "TypeScript",
    "Exa API",
    "Groq",
  ],
  isFeatured:true,
  image: "/Exora.png",
  link: "https://exora-task.vercel.app/",
  githubLink: "https://github.com/AdityaP700/Exora-task",
  isLive: true
},{
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
  image: "/Splitmate1.png",
    link: "https://split-mate-43.vercel.app/",
    githubLink: "https://github.com/AdityaP700/split-mate",
    isLive: true
  },
  {
    title: "OSINT Hub",
    category: "Web App",
    isFeatured:true,
    description:
      "Building a collaborative platform for cybersecurity analysts and OSINT researchers. Implementing version-controlled investigation workflows with LLM-based validation and credibility scoring to ensure data integrity before merge acceptance.",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "LLM Integration", "Git-like Versioning"],
    image: "/OHub.png", // Placeholder until dedicated asset is available
    link: "https://osinthub-delta.vercel.app/",
    githubLink:"https://github.com/AdityaP700/osinthub" ,
    isLive: true
  },
  {
  title: "SolTask",
  category: "Web3",
  isFeatured :true,
  description: "Your achievements, forever on the blockchain. Track your milestones with verifiable, permanent records on the Solana network. Your progress, your ownership.\n\nBuilt a dApp on Solana to master program-derived addresses (PDAs) and on-chain state management. Each counter is wallet-owned, demonstrating secure account creation and state mutation patterns in Rust with Anchor framework.",
  technologies: ["Solana", "Rust", "Anchor"],
  image: "/Soltask.png",
  link: "https://program-aditya-p700-gy3v.vercel.app/",
  githubLink: "https://github.com/AdityaP700/program-AdityaP700",
  isLive: true
},
  {
    title: "URLguard",
    category: "ML",
    description:
      "Built a browser extension against phishing attacks. Implemented on-device TensorFlow.js models and heuristic analysis to detect and block threats in real-time without compromising user privacy or requiring server communication.",
    technologies: [
      "JavaScript",
      "TensorFlow.js",
      "Heuristics",
      "Chrome API",
      "Security"
    ],
    image: "/PrivacyGuard (2).png",
    link: null,
    githubLink: "https://github.com/AdityaP700/PrivacyGuard",
    isLive: false
  },
  {
  title: "Sentimatrix",
  category: "Web App",
  description: "Real-time email sentiment analysis for the modern inbox. **Automated processing, instant insights, and interactive dashboards** — built for IIT Bombay TechFest Datamatics Hackathon.\n\nCombines RPA using TruBot for seamless email extraction with a .NET Core backend for powerful sentiment analysis and a modern WPF desktop client for real-time visualization via SignalR. Features include automated monitoring, HTML processing, Swagger-documented APIs, and a sidebar-driven UI for tracking emotions at scale.",
  technologies: [
    "TruBot RPA",
    ".NET 6.0",
    "ASP.NET Core",
    "WPF",
    "Swagger",
  ],
  image: "/sentimatrix.png",
  link: null,
  "githubLink": "https://github.com/AdityaP700/sentimatrix",
  isLive: false
}
  ,{
  title: "Botify",
  category: "genAI ",
  description: "An AI browser extension that helps users make informed shopping decisions through AI-powered product recommendations and comparisons.",
  technologies: [
    "Python",
    "FastAPI",
    "React.js",
    "Chrome Extension APIs"
  ],
  image: "/Botify.png",
  link: "botify.vercel.app",
  githubLink: "https://github.com/AdityaP700/botify",
  isLive: false
}

  ,
];