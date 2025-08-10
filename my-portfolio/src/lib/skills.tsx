// src/lib/skills.tsx
import { SVGProps } from "react";
import { BrainCircuit, Database, GitBranch, Image as LucideImage } from "lucide-react";

// --- IMPORT ALL YOUR CUSTOM ICONS ---
// (Create these files in src/components/icons)
import { TypescriptIcon } from "@/components/icons/TypescriptIcon";
import { JavascriptIcon } from "@/components/icons/JavascriptIcon";
import { PythonIcon } from "@/components/icons/PythonIcon";
import { VercelIcon } from "@/components/icons/VercelIcon";
import { NodedotjsIcon } from "@/components/icons/NodedotjsIcon";
import { PrismaIcon } from "@/components/icons/PrismaIcon";
import { SolanaIcon } from "@/components/icons/SolanaIcon";
import { MongoDBIcons } from "@/components/icons/MongodbIcon";
import { DockerIcon } from "@/components/icons/DockerIcon";
import { GoogleCloudIcon } from "@/components/icons/GooglecloudIcon";
import { TensorFlowIcon } from "@/components/icons/TensorflowIcon";
import { GithubactionsIcon } from "@/components/icons/GithubactionsIcon";
import { PostmanIcon } from "@/components/icons/PostmanIcon";
import { CplusplusIcon } from "@/components/icons/CplusplusIcon";
import { ReactIcon } from "@/components/icons/ReactIcon";
import { NextdotJSIcons } from "@/components/icons/NextdotjsIcon";


// --- IMPORT LUCIDE ICONS ---
// A helper type for our skill objects
export type Skill = {
  name: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
};

// --- CORE SKILLS ---
export const coreSkills: Skill[] = [
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "JavaScript", icon: JavascriptIcon },
  { name: "Python", icon: PythonIcon },
  { name: "C++", icon: CplusplusIcon },
   { name: "React.js", icon: ReactIcon },
   { name: "Next.js", icon: NextdotJSIcons },
   { name: "Node.js", icon: NodedotjsIcon },
  { name: "SQL", icon: Database }, // Using Lucide icon
  { name: "MongoDB", icon: MongoDBIcons },
  { name: "Prisma", icon: PrismaIcon },
   { name: "Docker", icon: DockerIcon },
   { name: "Google Cloud", icon: GoogleCloudIcon },
   { name: "Vercel", icon: VercelIcon },
  { name: "Git", icon: GitBranch },

];

// --- CURRENTLY LEARNING ---
export const learningSkills: Skill[] = [
   { name: "Solana", icon: SolanaIcon },
];

// --- BONUS SKILLS ---
export const bonusSkills: Skill[] = [
   { name: "TensorFlow", icon: TensorFlowIcon },
  { name: "Machine Learning", icon: BrainCircuit }, // Using Lucide icon
  { name: "GenAI", icon: BrainCircuit }, // Using Lucide icon
  { name: "StyleGAN", icon: LucideImage }, // Using Lucide icon
   { name: "GitHub Actions", icon: GithubactionsIcon },
   { name: "Postman", icon: PostmanIcon },
];