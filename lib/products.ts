/**
 * SOFTWARELABS Product Catalog
 * Pure data — optimized for filtering, sorting, and rich UI rendering.
 * 
 * NOTE: Ensure this file is named EXACTLY "products.ts" (with an 's') 
 * in your /lib directory to avoid module resolution errors.
 */

// --------------------------------------------------------------------------
// TYPES
// --------------------------------------------------------------------------

export type Category = "templates" | "saas" | "ai" | "dev-tools" | "ui-kits";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type License = "MIT" | "Commercial" | "Extended Commercial";

export type PreviewKind = "saas" | "ai" | "portfolio" | "commerce" | "admin" | "tools";

// Replaced fake metrics with realistic project details
export interface ProjectInfo {
  status: "Production Ready" | "Active Development" | "Maintenance";
  pages: number;        // e.g., 12
  components: number;   // e.g., 45
}

export interface ProductLinks {
  demo: string;         // Direct link to the live Vercel site
  repo?: string;        // Optional link to the source code repository
}

export interface Product {
  id: string;
  slug: string;         // SEO-friendly URL identifier
  index: string;        // Display order (e.g., "01")
  name: string;
  tagline: string;      // Short, punchy 1-liner for cards
  description: string;  // Longer description for detail pages/modals
  categories: Category[];
  preview: PreviewKind; 
  techStack: string[];  // Exact tools used to build the site
  features: string[];   // Key selling points of the code
  badges: ("New" | "Open Source" | "Production Ready")[];

  version: string;
  lastUpdated: string;  // ISO date string (YYYY-MM-DD)
  difficulty: Difficulty;
  license: License;

  projectInfo: ProjectInfo; // Clean, realistic project details
  links: ProductLinks;      // Direct links to live sites
  
  /** 
   * Product preview image URL. 
   * Using high-quality Unsplash placeholders that match the site's vibe.
   */
  image: string;
}

// --------------------------------------------------------------------------
// CONSTANTS & UI HELPERS
// --------------------------------------------------------------------------

export const CATEGORY_LABEL: Record<Category, string> = {
  templates: "Ready-To-Buy Templates",
  saas: "SaaS Starters",
  ai: "AI Systems",
  "dev-tools": "Developer Tools",
  "ui-kits": "UI Kits",
};

export const FILTERS: ReadonlyArray<{
  id: "all" | Category;
  label: string;
}> = [
  { id: "all", label: "All Projects" },
  { id: "templates", label: "Ready-To-Buy Templates" },
  { id: "saas", label: "SaaS Starters" },
  { id: "ai", label: "AI Systems" },
  { id: "dev-tools", label: "Developer Tools" },
  { id: "ui-kits", label: "UI Kits" },
];

export const SORT_OPTIONS = [
  { id: "newest", label: "Newest Added" },
  { id: "name", label: "Name (A-Z)" },
] as const;


export const TECH_COLORS: Record<string, string> = {
  "Next.js": "text-black dark:text-white",
  React: "text-cyan-400",
  Svelte: "text-orange-500", 
  TypeScript: "text-blue-500",
  "Tailwind CSS": "text-cyan-400",
  "Framer Motion": "text-pink-500",
  "Radix UI": "text-slate-300",
  "Lucide React": "text-emerald-400",
  Prisma: "text-slate-400",
  PostgreSQL: "text-blue-600",
  Stripe: "text-purple-500",
};



export const PRODUCTS: Product[] = [
  {
    id: "bevenu-fashion",
    slug: "bevenu-fashion",
    index: "01",
    name: "Bevenu Fashion Store",
    tagline: "Premium fashion e-commerce with flash sales.",
    description: "A modern, high-converting fashion e-commerce template featuring flash sale countdowns, category browsing, customer reviews, and seamless checkout flows.",
    categories: ["templates"],
    preview: "commerce",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    features: ["Flash Sale Countdown", "Category Filtering", "Customer Reviews", "Mobile-First Design"],
    badges: ["New", "Production Ready"],
    version: "1.0.0",
    lastUpdated: "2024-05-15",
    difficulty: "Beginner",
    license: "Commercial",
    projectInfo: { status: "Production Ready", pages: 14, components: 42 },
    links: {
      demo: "https://bevenu.vercel.app",
      repo: "https://github.com/Paras367"
    },
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kaarvan-marketplace",
    slug: "kaarvan-marketplace",
    index: "02",
    name: "Kaarvan Multi-Category Store",
    tagline: "Versatile marketplace for electronics, fashion, and home.",
    description: "A comprehensive multi-category e-commerce template designed for diverse product ranges. Includes dynamic filtering, flash deals, and robust product discovery.",
    categories: ["templates"],
    preview: "commerce",
    techStack: ["Next.js", "React", "Tailwind CSS", "Lucide React"],
    features: ["Multi-Category Navigation", "Dynamic Flash Sales", "Advanced Product Search", "Wishlist & Cart"],
    badges: ["Production Ready"],
    version: "1.2.0",
    lastUpdated: "2024-06-01",
    difficulty: "Intermediate",
    license: "Commercial",
    projectInfo: { status: "Production Ready", pages: 18, components: 56 },
    links: {
      demo: "https://kaarvan.vercel.app",
      repo: "https://github.com/Paras36"
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nexora-coffee",
    slug: "nexora-coffee",
    index: "03",
    name: "Nexora Coffee Brand",
    tagline: "Ethical, premium coffee brand template with impact tracking.",
    description: "A beautiful, story-driven e-commerce template tailored for specialty coffee, food, or sustainable brands. Features subscription flows and social impact metrics.",
    categories: ["templates"],
    preview: "commerce",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    features: ["Subscription Support", "Impact Metrics Dashboard", "Story-Driven Layout", "Elegant Typography"],
    badges: ["Production Ready"],
    version: "1.0.0",
    lastUpdated: "2024-05-20",
    difficulty: "Beginner",
    license: "Commercial",
    projectInfo: { status: "Production Ready", pages: 10, components: 35 },
    links: {
      demo: "https://nexora-coffee.vercel.app",
      repo: "https://github.com/Paras367/nexora"
    },
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nova-mercado",
    slug: "nova-mercado",
    index: "04",
    name: "Nova Mercado Premium Store",
    tagline: "Curated, high-end everyday commerce template.",
    description: "A sleek, premium multi-category store template focused on curated electronics, fashion, and home essentials. Features budget filtering and deep discount sections.",
    categories: ["templates", "ui-kits"],
    preview: "commerce",
    techStack: ["Next.js", "React", "Tailwind CSS", "Radix UI", "Framer Motion"],
    features: ["Budget-Based Filtering", "Deep Discount Sections", "Trust Badges", "Quick Add to Cart"],
    badges: ["New", "Production Ready"],
    version: "1.1.0",
    lastUpdated: "2024-06-10",
    difficulty: "Intermediate",
    license: "Extended Commercial",
    projectInfo: { status: "Production Ready", pages: 22, components: 68 },
    links: {
      demo: "https://nova-mercado-store.vercel.app",
      repo: "https://github.com/Paras367"
    },
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "developer-portfolio",
    slug: "developer-portfolio",
    index: "05",
    name: "Developer Portfolio Pro",
    tagline: "Showcase your work with elite, animated design.",
    description: "A premium, highly animated, and SEO-optimized developer portfolio system. Includes MDX blog support, project showcases, and a built-in contact form.",
    categories: ["templates"],
    preview: "portfolio",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    features: ["MDX Blog Support", "Smooth Animations", "100/100 Lighthouse", "Easy Content Management"],
    badges: ["Open Source"],
    version: "1.2.0",
    lastUpdated: "2024-05-10",
    difficulty: "Beginner",
    license: "MIT",
    projectInfo: { status: "Production Ready", pages: 6, components: 24 },
    links: {
      demo: "https://paras367.github.io",
      repo: "https://github.com/Paras367"
    },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "saas-launchpad",
    slug: "saas-launchpad",
    index: "06",
    name: "SaaS Launchpad Starter",
    tagline: "Ship your SaaS in days, not months.",
    description: "A production-ready, full-stack Next.js architecture complete with authentication, database, payments, and email workflows. Built for scale.",
    categories: ["templates", "saas"],
    preview: "saas",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    features: ["Authentication Ready", "Stripe Billing", "PostgreSQL Database", "SEO Optimized", "Dark Mode"],
    badges: ["Production Ready"],
    version: "2.1.0",
    lastUpdated: "2024-06-15",
    difficulty: "Intermediate",
    license: "Commercial",
    projectInfo: { status: "Production Ready", pages: 16, components: 52 },
    links: {
      demo: "https://paras367.github.io",
      repo: "https://github.com/Paras367"
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
];
