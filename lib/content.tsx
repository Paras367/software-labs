import {
  AppWindow,
  BrainCircuit,
  FileCode2,
  Gauge,
  Layers,
  Lock,
  Puzzle,
  Settings2,
  ShieldCheck,
  Terminal,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------- What we build ---------------------------- */
export const BUILDS: ReadonlyArray<{ n: string; icon: LucideIcon; title: string; text: string }> = [
  { n: "01", icon: AppWindow, title: "Web Applications", text: "Modern production-ready web applications." },
  { n: "02", icon: Wrench, title: "Developer Tools", text: "Tools designed to make developers faster." },
  { n: "03", icon: BrainCircuit, title: "AI Systems", text: "Practical AI-powered applications and workflows." },
  { n: "04", icon: FileCode2, title: "Source Code", text: "Premium, reusable source-code products." },
  { n: "05", icon: Settings2, title: "Custom Software", text: "Software engineered around specific business requirements." },
  { n: "06", icon: Gauge, title: "Digital Experiences", text: "High-performance websites and digital platforms." },
];

/* ---------------------------- Culture ---------------------------------- */
export const PRINCIPLES: ReadonlyArray<{ icon: LucideIcon; name: string; text: string }> = [
  { icon: Layers, name: "Clean architecture", text: "Clear boundaries and small modules. Code that explains itself." },
  { icon: Terminal, name: "Developer experience", text: "Fast setup, honest docs, sensible defaults." },
  { icon: Gauge, name: "Performance", text: "Lean bundles and a fast first paint from day one." },
  { icon: ShieldCheck, name: "Security", text: "Validated input, least privilege, no secrets in source." },
  { icon: Zap, name: "Scalability", text: "Structured to grow from prototype to production." },
  { icon: Lock, name: "Privacy", text: "Collect less. Protect what you keep." },
  { icon: Puzzle, name: "Open standards", text: "Web standards and portable formats over lock-in." },
];

export const PIPELINE: ReadonlyArray<{ stage: string; note: string }> = [
  { stage: "Idea", note: "A problem worth solving, written down." },
  { stage: "Design", note: "Flows, screens and constraints." },
  { stage: "Architecture", note: "Boundaries, data and contracts." },
  { stage: "Code", note: "Typed, reviewed, readable." },
  { stage: "Test", note: "Find the breakage before users do." },
  { stage: "Ship", note: "Deploy, monitor, repeat." },
];

/* ---------------------------- Stack ------------------------------------ */
export const STACK: ReadonlyArray<{ symbol: string; name: string; kind: string }> = [
  { symbol: "Nx", name: "Next.js", kind: "framework" },
  { symbol: "Re", name: "React", kind: "library" },
  { symbol: "Ts", name: "TypeScript", kind: "language" },
  { symbol: "Nd", name: "Node.js", kind: "runtime" },
  { symbol: "Cf", name: "Cloudflare", kind: "edge" },
  { symbol: "Sb", name: "Supabase", kind: "backend" },
  { symbol: "Pg", name: "PostgreSQL", kind: "database" },
  { symbol: "Py", name: "Python", kind: "language" },
  { symbol: "Tw", name: "Tailwind CSS", kind: "styling" },
  { symbol: "Gh", name: "GitHub", kind: "workflow" },
  { symbol: "Ai", name: "AI", kind: "models" },
  { symbol: "Dk", name: "Docker", kind: "containers" },
];

/* ---------------------------- Process ---------------------------------- */
export const STEPS: ReadonlyArray<{ n: string; title: string; text: string; output: string }> = [
  { n: "01", title: "Discover", text: "Understand the problem.", output: "spec.md" },
  { n: "02", title: "Engineer", text: "Design and build the system.", output: "src/" },
  { n: "03", title: "Test", text: "Break it. Fix it. Improve it.", output: "ci: passing" },
  { n: "04", title: "Ship", text: "Deploy it into the real world.", output: "v1.0.0" },
];

/* ---------------------------- Stats ------------------------------------ */
export const STATS = [
  { value: "10+", label: "Projects built" },
  { value: "inf", label: "Lines of code" },
  { value: "24/7", label: "Build mode" },
  { value: "100%", label: "Engineered" },
] as const;
