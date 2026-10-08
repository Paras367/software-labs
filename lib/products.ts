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

// Kept for backwards compatibility with existing ProductPreview.tsx
export type PreviewKind = "saas" | "ai" | "portfolio" | "commerce" | "admin" | "tools";

export interface ProductMetrics {
  rating: number;       // e.g., 4.9
  reviews: number;      // e.g., 128
  downloads: number;    // e.g., 3400
  githubStars: number;  // e.g., 850
}

export interface ProductPricing {
  inr: number;
  usd: number;
  originalInr?: number; // For displaying strikethrough sale prices
  originalUsd?: number;
}

export interface Product {
  id: string;
  slug: string;         // SEO-friendly URL identifier
  index: string;        // Display order (e.g., "01")
  name: string;
  tagline: string;      // Short, punchy 1-liner for cards
  description: string;  // Longer description for detail pages/modals
  categories: Category[];
  preview: PreviewKind; // Kept for UI component compatibility
  techStack: string[];
  features: string[];   // Key selling points
  badges: ("New" | "Featured" | "Trending" | "Sale")[];

  version: string;
  lastUpdated: string;  // ISO date string (YYYY-MM-DD)
  difficulty: Difficulty;
  license: License;

  metrics: ProductMetrics;
  pricing: ProductPricing;
  
  /** 
   * Product preview image URL. 
   * Currently using high-quality Unsplash placeholders. 
   * TODO: Replace with local optimized WebP images (e.g., /products/saas.webp) before production launch.
   */
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
    description: "A production-ready, full-stack Next.js architecture complete with authentication, database, payments, and email workflows. Built for scale.",
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
    // Unsplash: Clean analytics/dashboard UI
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-rag-dashboard",
    slug: "ai-rag-dashboard",
    index: "02",
    name: "AI RAG Dashboard",
    tagline: "Build intelligent, context-aware AI apps.",
    description: "A modern AI application dashboard featuring RAG workflows, vector search, document processing, and a polished streaming chat interface.",
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
    // Unsplash: Abstract AI / Neural Network
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "developer-portfolio",
    slug: "developer-portfolio",
    index: "03",
    name: "Developer Portfolio",
    tagline: "Showcase your work with elite design.",
    description: "A premium, highly animated, and SEO-optimized developer portfolio system. Includes MDX blog, project showcases, and a contact form.",
    categories: ["templates"],
    preview: "portfolio",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    features: ["MDX Blog Support", "Smooth Animations", "100/100 Lighthouse", "Easy Content Management"],
    badges: ["Trending"],
    version: "1.2.0",
    lastUpdated: "2026-09-15",
    difficulty: "Beginner",
    license: "MIT",
    metrics: { rating: 5.0, reviews: 215, downloads: 5100, githubStars: 1200 },
    pricing: { inr: 2499, usd: 29, originalInr: 3999, originalUsd: 49 }, // Shows a sale!
    // Unsplash: Clean laptop workspace / code
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ecommerce-starter",
    slug: "ecommerce-starter",
    index: "04",
    name: "E-Commerce Starter",
    tagline: "Full-stack commerce foundation.",
    description: "A robust, headless e-commerce foundation with cart management, checkout flows, inventory tracking, and an admin panel.",
    categories: ["saas", "templates"],
    preview: "commerce",
    techStack: ["Next.js", "PostgreSQL", "TypeScript", "Stripe", "Prisma"],
    features: ["Shopping Cart State", "Stripe Checkout", "Admin Dashboard", "Inventory Management"],
    badges: ["Featured"],
    version: "1.6.0",
    lastUpdated: "2026-09-12",
    difficulty: "Advanced",
    license: "Extended Commercial",
    metrics: { rating: 4.7, reviews: 67, downloads: 1200, githubStars: 410 },
    pricing: { inr: 8999, usd: 109 },
    // Unsplash: E-commerce / Payment UI
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "admin-dashboard",
    slug: "admin-dashboard",
    index: "05",
    name: "Admin Dashboard",
    tagline: "Production-ready internal tools.",
    description: "A comprehensive, data-dense admin interface featuring advanced data tables, charts, user management, and role-based access control.",
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
    // Unsplash: Data charts / analytics
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-tools-starter",
    slug: "ai-tools-starter",
    index: "06",
    name: "AI Tools Starter",
    tagline: "Build your next AI-powered product faster.",
    description: "A specialized starter kit for building micro-SaaS AI tools (e.g., image generators, text summarizers) with credit systems and rate limiting.",
    categories: ["ai", "dev-tools"],
    preview: "tools",
    techStack: ["Python", "Next.js", "TypeScript", "OpenAI", "Redis"],
    features: ["OpenAI API Integration", "Credit/Token System", "Rate Limiting", "Webhook Support"],
    badges: ["New", "Sale"],
    version: "0.9.0",
    lastUpdated: "2026-09-22",
    difficulty: "Intermediate",
    license: "Commercial",
    metrics: { rating: 4.8, reviews: 15, downloads: 340, githubStars: 120 },
    pricing: { inr: 4199, usd: 49, originalInr: 5499, originalUsd: 65 },
    // Unsplash: Code / Terminal / Matrix
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
];