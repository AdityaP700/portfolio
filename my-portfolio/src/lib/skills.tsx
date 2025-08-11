// src/lib/skills.tsx
import { SVGProps } from "react";
import {
  BrainCircuit,
  Database,
  GitBranch,
  Image as LucideImage,
} from "lucide-react";
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


export type Skill = {
  name: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
};

export const coreSkills: Skill[] = [
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "JavaScript", icon: JavascriptIcon },
  { name: "Python", icon: PythonIcon },
  { name: "C++", icon: CplusplusIcon },
  { name: "React.js", icon: ReactIcon },
  { name: "Next.js", icon: NextdotJSIcons },
  { name: "Node.js", icon: NodedotjsIcon },
  { name: "SQL", icon: Database }, 
  { name: "MongoDB", icon: MongoDBIcons },
  { name: "Prisma", icon: PrismaIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Google Cloud", icon: GoogleCloudIcon },
  { name: "Vercel", icon: VercelIcon },
  { name: "Git", icon: GitBranch },
];

export const learningSkills: Skill[] = [{ name: "Solana", icon: SolanaIcon }];

export const bonusSkills: Skill[] = [
  { name: "TensorFlow", icon: TensorFlowIcon },
  { name: "Machine Learning", icon: BrainCircuit }, 
  { name: "GenAI", icon: BrainCircuit }, 
  { name: "StyleGAN", icon: LucideImage }, 
  { name: "GitHub Actions", icon: GithubactionsIcon },
  { name: "Postman", icon: PostmanIcon },
];
