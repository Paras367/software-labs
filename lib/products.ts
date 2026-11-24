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
   * TODO: Replace with local optimized WebP images (e.g., /products/bevenu.webp) before production launch.
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
  templates: "Ready-To-Buy Templates", // ✅ Updated to match your request
  "ui-kits": "UI Kits",
};

export const FILTERS: ReadonlyArray<{
  id: "all" | Category;
  label: string;
}> = [
  { id: "all", label: "All Products" },
  { id: "templates", label: "Ready-To-Buy Templates" }, // ✅ Prioritized
  { id: "saas", label: "SaaS Starters" },
  { id: "ai", label: "AI Systems" },
  { id: "dev-tools", label: "Developer Tools" },
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
  "Radix UI": "text-slate-300",
};

// --------------------------------------------------------------------------
// PRODUCT DATA (Verified from Live Sites)
// --------------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  {
    id: "bevenu-fashion",
    slug: "bevenu-fashion",
    index: "01",
    name: "Bevenu Fashion Store",
    tagline: "Premium fashion e-commerce with flash sales.",
    description: "A modern, high-converting fashion e-commerce template featuring flash sale countdowns, category browsing, customer reviews, and seamless checkout flows. Perfect for clothing and accessory brands.",
    categories: ["templates"],
    preview: "commerce",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    features: ["Flash Sale Countdown", "Category Filtering", "Customer Reviews", "Secure Checkout", "Mobile-First Design"],
    badges: ["Featured", "New"],
    version: "1.0.0",
    lastUpdated: "2024-05-15",
    difficulty: "Beginner",
    license: "Commercial",
    metrics: { rating: 4.8, reviews: 45, downloads: 320, githubStars: 150 },
    pricing: { inr: 4999, usd: 59 },
    // Unsplash: Premium fashion retail
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kaarvan-marketplace",
    slug: "kaarvan-marketplace",
    index: "02",
    name: "Kaarvan Multi-Category Store",
    tagline: "Versatile marketplace for electronics, fashion, and home.",
    description: "A comprehensive multi-category e-commerce template designed for diverse product ranges. Includes dynamic filtering, flash deals, and a robust product discovery experience for Indian markets.",
    categories: ["templates"],
    preview: "commerce",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
    features: ["Multi-Category Navigation", "Dynamic Flash Sales", "Advanced Product Search", "Wishlist & Cart", "Responsive Grid"],
    badges: ["Trending"],
    version: "1.2.0",
    lastUpdated: "2024-06-01",
    difficulty: "Intermediate",
    license: "Commercial",
    metrics: { rating: 4.9, reviews: 62, downloads: 410, githubStars: 210 },
    pricing: { inr: 6999, usd: 89 },
    // Unsplash: Diverse e-commerce marketplace
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nexora-coffee",
    slug: "nexora-coffee",
    index: "03",
    name: "Nexora Coffee Brand",
    tagline: "Ethical, premium coffee brand template with impact tracking.",
    description: "A beautiful, story-driven e-commerce template tailored for specialty coffee, food, or sustainable brands. Features subscription flows, social impact metrics, and elegant product showcases.",
    categories: ["templates"],
    preview: "commerce",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Stripe"],
    features: ["Subscription Support", "Impact Metrics Dashboard", "Story-Driven Layout", "Product Filtering", "Elegant Typography"],
    badges: ["Featured"],
    version: "1.0.0",
    lastUpdated: "2024-05-20",
    difficulty: "Beginner",
    license: "Commercial",
    metrics: { rating: 5.0, reviews: 38, downloads: 280, githubStars: 180 },
    pricing: { inr: 3999, usd: 49 },
    // Unsplash: Premium coffee beans / brewing
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nova-mercado",
    slug: "nova-mercado",
    index: "04",
    name: "Nova Mercado Premium Store",
    tagline: "Curated, high-end everyday commerce template.",
    description: "A sleek, premium multi-category store template focused on curated electronics, fashion, and home essentials. Features budget filtering, deep discount sections, and prominent trust badges.",
    categories: ["templates", "ui-kits"],
    preview: "commerce",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Radix UI"],
    features: ["Budget-Based Filtering", "Deep Discount Sections", "Trust Badges", "Quick Add to Cart", "Brand Showcase"],
    badges: ["New", "Sale"],
    version: "1.1.0",
    lastUpdated: "2024-06-10",
    difficulty: "Intermediate",
    license: "Extended Commercial",
    metrics: { rating: 4.7, reviews: 55, downloads: 390, githubStars: 195 },
    pricing: { inr: 7999, usd: 99, originalInr: 9999, originalUsd: 129 }, // Shows a sale!
    // Unsplash: Premium modern retail store
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
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    features: ["MDX Blog Support", "Smooth Animations", "100/100 Lighthouse", "Easy Content Management"],
    badges: ["Trending"],
    version: "1.2.0",
    lastUpdated: "2024-05-10",
    difficulty: "Beginner",
    license: "MIT",
    metrics: { rating: 5.0, reviews: 215, downloads: 5100, githubStars: 1200 },
    pricing: { inr: 2499, usd: 29, originalInr: 3999, originalUsd: 49 },
    // Unsplash: Clean laptop workspace / code
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
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Stripe", "Prisma"],
    features: ["Authentication Ready", "Stripe Billing", "PostgreSQL Database", "SEO Optimized", "Dark Mode"],
    badges: ["Featured"],
    version: "2.1.0",
    lastUpdated: "2024-06-15",
    difficulty: "Intermediate",
    license: "Commercial",
    metrics: { rating: 4.9, reviews: 128, downloads: 3400, githubStars: 850 },
    pricing: { inr: 7999, usd: 99 },
    // Unsplash: Clean analytics/dashboard UI
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
];
