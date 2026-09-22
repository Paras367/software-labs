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
  type LucideIcon,
} from "lucide-react";

/* ---------------------------- What we build ---------------------------- */
export const BUILDS: ReadonlyArray<{
  n: string;
  icon: LucideIcon;
  title: string;
  text: string;
  tags: string[]; // Added for UI pill badges
}> = [
  { 
    n: "01", 
    icon: AppWindow, 
    title: "Web Applications", 
    text: "Full-stack, production-grade web applications engineered for scale, speed, and conversion.",
    tags: ["Next.js", "React", "Full-Stack"]
  },
  { 
    n: "02", 
    icon: Wrench, 
    title: "Developer Tools", 
    text: "High-performance CLIs, SDKs, and internal tools designed to make engineering teams 10x faster.",
    tags: ["DX", "Automation", "CLI"]
  },
  { 
    n: "03", 
    icon: BrainCircuit, 
    title: "AI Systems", 
    text: "Practical, RAG-powered AI applications and autonomous workflows that solve real business problems.",
    tags: ["LLMs", "RAG", "Agents"]
  },
  { 
    n: "04", 
    icon: FileCode2, 
    title: "Source Code", 
    text: "Premium, highly reusable, and meticulously documented source-code products and boilerplates.",
    tags: ["SaaS Kits", "Boilerplates"]
  },
  { 
    n: "05", 
    icon: Settings2, 
    title: "Custom Software", 
    text: "Bespoke software engineered from the ground up around your specific operational requirements.",
    tags: ["Enterprise", "Bespoke"]
  },
  { 
    n: "06", 
    icon: Gauge, 
    title: "Digital Experiences", 
    text: "Award-winning, high-performance marketing sites and digital platforms that convert visitors.",
    tags: ["Webflow", "Framer", "Motion"]
  },
];

/* ---------------------------- Culture ---------------------------------- */
export const PRINCIPLES: ReadonlyArray<{
  icon: LucideIcon;
  name: string;
  text: string;
  category: "Engineering" | "Product" | "Security"; // Added for UI grouping/filtering
}> = [
  { 
    icon: Layers, 
    name: "Clean Architecture", 
    text: "Strict boundaries, cohesive modules, and code that documents itself.",
    category: "Engineering"
  },
  { 
    icon: Terminal, 
    name: "Developer Experience", 
    text: "Frictionless setup, honest documentation, and sensible defaults out of the box.",
    category: "Engineering"
  },
  { 
    icon: Gauge, 
    name: "Ruthless Performance", 
    text: "Lean bundles, edge computing, and a sub-100ms first paint from day one.",
    category: "Product"
  },
  { 
    icon: ShieldCheck, 
    name: "Zero-Trust Security", 
    text: "Validated input, least-privilege access, and absolutely no secrets in source control.",
    category: "Security"
  },
  { 
    icon: Zap, 
    name: "Infinite Scalability", 
    text: "Structured to grow seamlessly from a weekend prototype to millions of users.",
    category: "Engineering"
  },
  { 
    icon: Lock, 
    name: "Privacy by Design", 
    text: "Collect the bare minimum. Encrypt what you keep. Respect the user always.",
    category: "Security"
  },
  { 
    icon: Puzzle, 
    name: "Open Standards", 
    text: "Web standards, portable formats, and open APIs over proprietary lock-in.",
    category: "Product"
  },
];

/* ---------------------------- Pipeline --------------------------------- */
export const PIPELINE: ReadonlyArray<{
  stage: string;
  note: string;
  icon: LucideIcon; // Added for visual pipeline rendering
}> = [
  { stage: "Ideation", note: "Defining the problem worth solving.", icon: Lightbulb },
  { stage: "Design", note: "Mapping flows, screens, and constraints.", icon: PenTool },
  { stage: "Architecture", note: "Establishing boundaries, data, and contracts.", icon: Network },
  { stage: "Development", note: "Writing typed, reviewed, and readable code.", icon: GitBranch },
  { stage: "Quality Assurance", note: "Breaking it before the users do.", icon: TestTube2 },
  { stage: "Deployment", note: "Shipping, monitoring, and iterating.", icon: Rocket },
];

/* ---------------------------- Stack ------------------------------------ */
export const STACK: ReadonlyArray<{
  symbol: string;
  name: string;
  kind: string;
  icon: LucideIcon; // Added for rich stack grid rendering
}> = [
  { symbol: "Nx", name: "Next.js", kind: "Framework", icon: AppWindow },
  { symbol: "Re", name: "React", kind: "Library", icon: Layers },
  { symbol: "Ts", name: "TypeScript", kind: "Language", icon: FileCode2 },
  { symbol: "Nd", name: "Node.js", kind: "Runtime", icon: Server },
  { symbol: "Cf", name: "Cloudflare", kind: "Edge", icon: Zap },
  { symbol: "Sb", name: "Supabase", kind: "Backend", icon: Database },
  { symbol: "Pg", name: "PostgreSQL", kind: "Database", icon: Database },
  { symbol: "Py", name: "Python", kind: "Language", icon: Terminal },
  { symbol: "Tw", name: "Tailwind", kind: "Styling", icon: Wrench },
  { symbol: "Gh", name: "GitHub", kind: "Workflow", icon: GitBranch },
  { symbol: "Ai", name: "AI / LLMs", kind: "Intelligence", icon: BrainCircuit },
  { symbol: "Dk", name: "Docker", kind: "Containers", icon: Puzzle },
];

/* ---------------------------- Process ---------------------------------- */
export const STEPS: ReadonlyArray<{
  n: string;
  title: string;
  text: string;
  output: string;
  icon: LucideIcon; // Added for step-by-step UI rendering
}> = [
  { 
    n: "01", 
    title: "Discover", 
    text: "Deep-dive into your business logic, users, and technical constraints.", 
    output: "spec.md",
    icon: Search
  },
  { 
    n: "02", 
    title: "Engineer", 
    text: "Architect the system and build the core features with precision.", 
    output: "src/",
    icon: Cpu
  },
  { 
    n: "03", 
    title: "Test", 
    text: "Rigorous automated testing, edge-case hunting, and performance tuning.", 
    output: "ci: passing",
    icon: Bug
  },
  { 
    n: "04", 
    title: "Ship", 
    text: "Deploy to production, configure monitoring, and hand over the keys.", 
    output: "v1.0.0",
    icon: Rocket
  },
];

/* ---------------------------- Stats ------------------------------------ */
export const STATS = [
  { value: "10+", label: "Projects Shipped", icon: Rocket, trend: "+4 this year" },
  { value: "∞", label: "Lines of Code", icon: FileCode2, trend: "And counting" },
  { value: "24/7", label: "Build Mode", icon: Cpu, trend: "Always on" },
  { value: "100%", label: "Engineered", icon: Settings2, trend: "Zero bloat" },
] as const;