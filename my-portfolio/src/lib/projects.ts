// src/lib/projects.ts
export type ProjectType = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string | null;
  githubLink?: string;
  isLive?: boolean;    // new optional flag to mark live projects
};

export const projects: ProjectType[] = [
  {
    title: "PrivacyGuard",
    description: "An intelligent Chrome extension protecting users from phishing attacks using on-device Machine Learning, heuristic analysis, and homograph detection.",
    technologies: ["JavaScript", "TensorFlow.js", "Machine Learning", "Chrome API", "HTML/CSS"],
    image: "/PrivacyGuard.png", // TODO: Add image path
    link: null, // TODO: Add link to Chrome Web Store or demo video
    githubLink: "https://github.com/AdityaP700/PrivacyGuard",
    isLive: false,  // example: not live
 // TODO: Update link
  },
  {
    title: "SplitMate",
    description: "A bill-splitting app revolutionizing shared expenses with blockchain tech, real-time messaging, and AI intelligence for transparent and secure payments.",
    technologies: ["React", "Node.js", "Web3.js", "Socket.io", "MongoDB", "AI"],
    image: "/SplitMate.png",
    link: "https://split-mate-43.vercel.app/", // TODO: Update link
    githubLink: "https://github.com/AdityaP700/split-mate",
    isLive: true,   // TODO: Update link
  },
  {
    title: "VibeCraft",
    description: "An AI-driven collaborative art platform for neurodiverse artists, using StyleGAN and eye-tracking to create a comfortable, adaptive, and creative experience.",
    technologies: ["MERN Stack", "Socket.io", "StyleGAN", "MediaPipe", "TensorFlow.js"],
    image: "/VibeCraft.png", // TODO: Add image path
    link: "https://vibecraft-kappa.vercel.app/", // TODO: Update link
    githubLink: "https://github.com/adityajha2005/vibecraft",
    isLive: true, // TODO: Update link
  },
];