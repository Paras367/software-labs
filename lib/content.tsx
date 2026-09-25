import {
  AppWindow,
  BrainCircuit,
  Bug,
  Cpu,
  Database,
  FileCode2,
  Gauge,
  GitBranch,
  Layers,
  Lightbulb,
  Lock,
  Network,
  PenTool,
  Puzzle,
  Rocket,
  Search,
  Server,
  Settings2,
  ShieldCheck,
  Terminal,
  TestTube2,
  Wrench,
  Zap,
  Cloud,
  Shield,
  Code,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               WHAT WE BUILD                                */
/* -------------------------------------------------------------------------- */

export const BUILDS: ReadonlyArray<{
  n: string;
  icon: LucideIcon;
  title: string;
  text: string;
  tags: string[];
  gradient: string; // For dynamic UI card backgrounds
}> = [
  { 
    n: "01", 
    icon: AppWindow, 
    title: "Web Applications", 
    text: "Full-stack, production-grade web applications engineered for scale, speed, and conversion.",
    tags: ["Next.js", "React", "Full-Stack"],
    gradient: "from-blue-500 to-cyan-400"
  },
  { 
    n: "02", 
    icon: Wrench, 
    title: "Developer Tools", 
    text: "High-performance CLIs, SDKs, and internal tools designed to make engineering teams 10x faster.",
    tags: ["DX", "Automation", "CLI"],
    gradient: "from-emerald-500 to-teal-400"
  },
  { 
    n: "03", 
    icon: BrainCircuit, 
    title: "AI Systems", 
    text: "Practical, RAG-powered AI applications and autonomous workflows that solve real business problems.",
    tags: ["LLMs", "RAG", "Agents"],
    gradient: "from-purple-500 to-pink-400"
  },
  { 
    n: "04", 
    icon: FileCode2, 
    title: "Source Code", 
    text: "Premium, highly reusable, and meticulously documented source-code products and boilerplates.",
    tags: ["SaaS Kits", "Boilerplates"],
    gradient: "from-orange-500 to-red-400"
  },
  { 
    n: "05", 
    icon: Settings2, 
    title: "Custom Software", 
    text: "Bespoke software engineered from the ground up around your specific operational requirements.",
    tags: ["Enterprise", "Bespoke"],
    gradient: "from-indigo-500 to-blue-400"
  },
  { 
    n: "06", 
    icon: Gauge, 
    title: "Digital Experiences", 
    text: "Award-winning, high-performance marketing sites and digital platforms that convert visitors.",
    tags: ["Framer Motion", "WebGL", "SEO"],
    gradient: "from-rose-500 to-orange-400"
  },
];

/* -------------------------------------------------------------------------- */
/*                                CULTURE                                     */
/* -------------------------------------------------------------------------- */

export const PRINCIPLES: ReadonlyArray<{
  icon: LucideIcon;
  name: string;
  text: string;
  category: "Engineering" | "Product" | "Security";
  impact: string; // Added for credibility metrics
}> = [
  { 
    icon: Layers, 
    name: "Clean Architecture", 
    text: "Strict boundaries, cohesive modules, and code that documents itself.",
    category: "Engineering",
    impact: "40% faster onboarding"
  },
  { 
    icon: Terminal, 
    name: "Developer Experience", 
    text: "Frictionless setup, honest documentation, and sensible defaults out of the box.",
    category: "Engineering",
    impact: "Zero-config starts"
  },
  { 
    icon: Gauge, 
    name: "Ruthless Performance", 
    text: "Lean bundles, edge computing, and a sub-100ms first paint from day one.",
    category: "Product",
    impact: "99+ Lighthouse scores"
  },
  { 
    icon: ShieldCheck, 
    name: "Zero-Trust Security", 
    text: "Validated input, least-privilege access, and absolutely no secrets in source control.",
    category: "Security",
    impact: "SOC-2 ready patterns"
  },
  { 
    icon: Zap, 
    name: "Infinite Scalability", 
    text: "Structured to grow seamlessly from a weekend prototype to millions of users.",
    category: "Engineering",
    impact: "Horizontal scaling"
  },
  { 
    icon: Lock, 
    name: "Privacy by Design", 
    text: "Collect the bare minimum. Encrypt what you keep. Respect the user always.",
    category: "Security",
    impact: "GDPR compliant"
  },
  { 
    icon: Puzzle, 
    name: "Open Standards", 
    text: "Web standards, portable formats, and open APIs over proprietary lock-in.",
    category: "Product",
    impact: "Future-proof code"
  },
];

/* -------------------------------------------------------------------------- */
/*                               PIPELINE                                     */
/* -------------------------------------------------------------------------- */

export const PIPELINE: ReadonlyArray<{
  stage: string;
  note: string;
  icon: LucideIcon;
  duration: string; // Added for realistic timeline rendering
}> = [
  { stage: "Ideation", note: "Defining the problem worth solving.", icon: Lightbulb, duration: "Week 1" },
  { stage: "Design", note: "Mapping flows, screens, and constraints.", icon: PenTool, duration: "Week 2" },
  { stage: "Architecture", note: "Establishing boundaries, data, and contracts.", icon: Network, duration: "Week 3" },
  { stage: "Development", note: "Writing typed, reviewed, and readable code.", icon: GitBranch, duration: "Weeks 4-6" },
  { stage: "Quality Assurance", note: "Breaking it before the users do.", icon: TestTube2, duration: "Week 7" },
  { stage: "Deployment", note: "Shipping, monitoring, and iterating.", icon: Rocket, duration: "Week 8" },
];

/* -------------------------------------------------------------------------- */
/*                                STACK                                       */
/* -------------------------------------------------------------------------- */

export const STACK: ReadonlyArray<{
  symbol: string;
  name: string;
  kind: string;
  category: "Frontend" | "Backend" | "DevOps" | "AI"; // Added for grouping/filtering
  icon: LucideIcon;
}> = [
  // Frontend
  { symbol: "Nx", name: "Next.js", kind: "Framework", category: "Frontend", icon: AppWindow },
  { symbol: "Re", name: "React", kind: "Library", category: "Frontend", icon: Layers },
  { symbol: "Ts", name: "TypeScript", kind: "Language", category: "Frontend", icon: FileCode2 },
  { symbol: "Tw", name: "Tailwind", kind: "Styling", category: "Frontend", icon: Wrench },
  { symbol: "Fm", name: "Framer Motion", kind: "Animation", category: "Frontend", icon: Zap },
  
  // Backend
  { symbol: "Nd", name: "Node.js", kind: "Runtime", category: "Backend", icon: Server },
  { symbol: "Py", name: "Python", kind: "Language", category: "Backend", icon: Terminal },
  { symbol: "Pg", name: "PostgreSQL", kind: "Database", category: "Backend", icon: Database },
  { symbol: "Pr", name: "Prisma", kind: "ORM", category: "Backend", icon: Code },
  { symbol: "Sb", name: "Supabase", kind: "Backend", category: "Backend", icon: Cloud },
  
  // DevOps
  { symbol: "Vc", name: "Vercel", kind: "Hosting", category: "DevOps", icon: Cloud },
  { symbol: "Cf", name: "Cloudflare", kind: "Edge", category: "DevOps", icon: Zap },
  { symbol: "Dk", name: "Docker", kind: "Containers", category: "DevOps", icon: Puzzle },
  { symbol: "Gh", name: "GitHub", kind: "Workflow", category: "DevOps", icon: GitBranch },
  
  // AI
  { symbol: "Ai", name: "OpenAI / LLMs", kind: "Intelligence", category: "AI", icon: BrainCircuit },
  { symbol: "Vd", name: "Vector DBs", kind: "Memory", category: "AI", icon: Database },
];

/* -------------------------------------------------------------------------- */
/*                               PROCESS                                      */
/* -------------------------------------------------------------------------- */

export const STEPS: ReadonlyArray<{
  n: string;
  title: string;
  text: string;
  output: string;
  artifact: string; // Added for realistic engineering file names
  icon: LucideIcon;
}> = [
  { 
    n: "01", 
    title: "Discover", 
    text: "Deep-dive into your business logic, users, and technical constraints.", 
    output: "Requirements Spec",
    artifact: "spec.md",
    icon: Search
  },
  { 
    n: "02", 
    title: "Engineer", 
    text: "Architect the system and build the core features with precision.", 
    output: "Core Codebase",
    artifact: "src/",
    icon: Cpu
  },
  { 
    n: "03", 
    title: "Test", 
    text: "Rigorous automated testing, edge-case hunting, and performance tuning.", 
    output: "CI/CD Passing",
    artifact: ".github/workflows/",
    icon: Bug
  },
  { 
    n: "04", 
    title: "Ship", 
    text: "Deploy to production, configure monitoring, and hand over the keys.", 
    output: "Live Release",
    artifact: "v1.0.0",
    icon: Rocket
  },
];

/* -------------------------------------------------------------------------- */
/*                                STATS                                       */
/* -------------------------------------------------------------------------- */

export const STATS = [
  { 
    value: "10+", 
    label: "Projects Shipped", 
    icon: Rocket, 
    trend: "+4 this year",
    trendDirection: "up" as const 
  },
  { 
    value: "∞", 
    label: "Lines of Code", 
    icon: FileCode2, 
    trend: "And counting",
    trendDirection: "up" as const 
  },
  { 
    value: "24/7", 
    label: "Build Mode", 
    icon: Cpu, 
    trend: "Always on",
    trendDirection: "neutral" as const 
  },
  { 
    value: "100%", 
    label: "Engineered", 
    icon: Settings2, 
    trend: "Zero bloat",
    trendDirection: "up" as const 
  },
] as const;