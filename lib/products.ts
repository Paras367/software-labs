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

export type Category = "saas" | "ai" | "dev-tools" | "templates" | "ui-kits";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type License = "MIT" | "Commercial" | "Extended Commercial";

// Re-added for backwards compatibility with existing ProductPreview.tsx
export type PreviewKind = "saas" | "ai" | "portfolio" | "commerce" | "admin" | "tools";

export interface ProductMetrics {
  rating: number;
  reviews: number;
  downloads: number;
  githubStars: number;
}

export interface ProductPricing {
  inr: number;
  usd: number;
  originalInr?: number;
  originalUsd?: number;
}

export interface Product {
  id: string;
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  categories: Category[];
  preview: PreviewKind; // Kept for UI component compatibility
  techStack: string[];
  features: string[];
  badges: ("New" | "Featured" | "Trending" | "Sale")[];

  version: string;
  lastUpdated: string;
  difficulty: Difficulty;
  license: License;

  metrics: ProductMetrics;
  pricing: ProductPricing;
  
  /** Local product preview image path (e.g., /products/saas-demo.png) */
  image: string;
}

// --------------------------------------------------------------------------
// CONSTANTS & UI HELPERS
// --------------------------------------------------------------------------

export const CATEGORY_LABEL: Record<Category, string> = {
  saas: "SaaS Starters",
  ai: "AI Systems",
  "dev-tools": "Developer Tools",
  templates: "Templates",
  "ui-kits": "UI Kits",
};

export const FILTERS: ReadonlyArray<{
  id: "all" | Category;
  label: string;
}> = [
  { id: "all", label: "All Products" },
  { id: "saas", label: "SaaS Starters" },
  { id: "ai", label: "AI Systems" },
  { id: "dev-tools", label: "Developer Tools" },
  { id: "templates", label: "Templates" },
  { id: "ui-kits", label: "UI Kits" },
];

export const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest Added" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
] as const;

// Maps tech stack names to Tailwind text colors for dynamic UI rendering
export const TECH_COLORS: Record<string, string> = {
  "Next.js": "text-black dark:text-white",
  React: "text-cyan-400",
  TypeScript: "text-blue-500",
  Tailwind: "text-cyan-400",
  Supabase: "text-emerald-500",
  PostgreSQL: "text-blue-600",
  Python: "text-yellow-400",
  Stripe: "text-purple-500",
  Prisma: "text-slate-400",
  "Framer Motion": "text-pink-500",
  LangChain: "text-emerald-400",
  OpenAI: "text-emerald-500",
  Redis: "text-red-500",
  "TanStack Table": "text-red-400",
  Recharts: "text-pink-400",
};

// --------------------------------------------------------------------------
// PRODUCT DATA
// --------------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  {
    id: "nextjs-saas-starter",
    slug: "nextjs-saas-starter",
    index: "01",
    name: "Next.js SaaS Starter",
    tagline: "Ship your SaaS in days, not months.",
    description:
      "A production-ready full-stack Next.js architecture with authentication, database, payments, email workflows, and a scalable foundation.",
    categories: ["saas", "dev-tools", "templates"],
    preview: "saas",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Stripe", "Prisma"],
    features: ["Authentication Ready", "Stripe Billing", "PostgreSQL Database", "SEO Optimized", "Dark Mode"],
    badges: ["Featured", "Trending"],
    version: "2.1.0",
    lastUpdated: "2026-09-20",
    difficulty: "Intermediate",
    license: "Commercial",
    metrics: { rating: 4.9, reviews: 128, downloads: 3400, githubStars: 850 },
    pricing: { inr: 7999, usd: 99 },
    image: "/products/saas-starter-demo.png",
  },
  {
    id: "ai-rag-dashboard",
    slug: "ai-rag-dashboard",
    index: "02",
    name: "AI RAG Dashboard",
    tagline: "Build intelligent, context-aware AI apps.",
    description:
      "A modern AI application dashboard featuring RAG workflows, vector search, document processing, and a polished streaming chat interface.",
    categories: ["ai", "saas"],
    preview: "ai",
    techStack: ["Next.js", "TypeScript", "Python", "Tailwind", "LangChain"],
    features: ["Vector Search", "Streaming AI Chat", "Document Processing", "API Rate Limiting"],
    badges: ["New"],
    version: "1.4.0",
    lastUpdated: "2026-09-18",
    difficulty: "Advanced",
    license: "Commercial",
    metrics: { rating: 4.8, reviews: 42, downloads: 890, githubStars: 320 },
    pricing: { inr: 5999, usd: 79 },
    image: "/products/ai-dashboard-demo.png",
  },
  {
    id: "developer-portfolio",
    slug: "developer-portfolio",
    index: "03",
    name: "Developer Portfolio",
    tagline: "Showcase your work with elite design.",
    description:
      "A premium animated developer portfolio with project showcases, blog support, SEO optimization, smooth transitions, and responsive layouts.",
    categories: ["templates"],
    preview: "portfolio",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    features: ["MDX Blog", "Smooth Animations", "SEO Optimized", "Easy Content Management"],
    badges: ["Trending"],
    version: "1.2.0",
    lastUpdated: "2026-09-15",
    difficulty: "Beginner",
    license: "MIT",
    metrics: { rating: 5.0, reviews: 215, downloads: 5100, githubStars: 1200 },
    pricing: { inr: 2499, usd: 29, originalInr: 3999, originalUsd: 49 },
    image: "/products/portfolio-demo.png",
  },
  {
    id: "ecommerce-starter",
    slug: "ecommerce-starter",
    index: "04",
    name: "E-Commerce Starter",
    tagline: "Full-stack commerce foundation.",
    description:
      "A robust headless e-commerce foundation with cart management, checkout flows, inventory tracking, product management, and an admin interface.",
    categories: ["saas", "templates"],
    preview: "commerce",
    techStack: ["Next.js", "PostgreSQL", "TypeScript", "Stripe", "Prisma"],
    features: ["Shopping Cart", "Checkout System", "Admin Dashboard", "Inventory Management"],
    badges: ["Featured"],
    version: "1.6.0",
    lastUpdated: "2026-09-12",
    difficulty: "Advanced",
    license: "Extended Commercial",
    metrics: { rating: 4.7, reviews: 67, downloads: 1200, githubStars: 410 },
    pricing: { inr: 8999, usd: 109 },
    image: "/products/ecommerce-demo.png",
  },
  {
    id: "admin-dashboard",
    slug: "admin-dashboard",
    index: "05",
    name: "Admin Dashboard",
    tagline: "Production-ready internal tools.",
    description:
      "A comprehensive admin interface with advanced tables, analytics, charts, user management, responsive navigation, and role-based access.",
    categories: ["templates", "ui-kits"],
    preview: "admin",
    techStack: ["React", "TypeScript", "Tailwind", "TanStack Table", "Recharts"],
    features: ["Role-Based Access", "Advanced Data Tables", "Interactive Charts", "Responsive Sidebar"],
    badges: [],
    version: "2.0.0",
    lastUpdated: "2026-09-10",
    difficulty: "Intermediate",
    license: "Commercial",
    metrics: { rating: 4.6, reviews: 89, downloads: 2100, githubStars: 560 },
    pricing: { inr: 4499, usd: 55 },
    image: "/products/admin-dashboard-demo.png",
  },
  {
    id: "ai-tools-starter",
    slug: "ai-tools-starter",
    index: "06",
    name: "AI Tools Starter",
    tagline: "Build your next AI-powered product faster.",
    description:
      "A specialized starter kit for building AI micro-SaaS products with credit systems, usage limits, API integrations, and scalable workflows.",
    categories: ["ai", "dev-tools"],
    preview: "tools",
    techStack: ["Python", "Next.js", "TypeScript", "OpenAI", "Redis"],
    features: ["AI API Integration", "Credit System", "Rate Limiting", "Webhook Support"],
    badges: ["New", "Sale"],
    version: "0.9.0",
    lastUpdated: "2026-09-22",
    difficulty: "Intermediate",
    license: "Commercial",
    metrics: { rating: 4.8, reviews: 15, downloads: 340, githubStars: 120 },
    pricing: { inr: 4199, usd: 49, originalInr: 5499, originalUsd: 65 },
    image: "/products/ai-tools-demo.png",
  },
];