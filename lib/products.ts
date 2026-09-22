/**
 * Code store catalogue. Pure data (no JSX) so the client-side filter stays light.
 * NOTE: prices and versions are PLACEHOLDERS — wire them to your real checkout.
 */
export type Category = "web" | "ai" | "dev-tools" | "templates";
export type PreviewKind = "saas" | "ai" | "portfolio" | "commerce" | "admin" | "tools";

export interface Product {
  id: string;
  index: string;
  name: string;
  description: string;
  categories: Category[];
  preview: PreviewKind;
  tech: string[];
  version: string;
  price: { inr: string; usd: string };
}

export const CATEGORY_LABEL: Record<Category, string> = {
  web: "Web",
  ai: "AI",
  "dev-tools": "Developer Tools",
  templates: "Templates",
};

export const FILTERS: ReadonlyArray<{ id: "all" | Category; label: string }> = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI" },
  { id: "dev-tools", label: "Developer Tools" },
  { id: "templates", label: "Templates" },
];

export const PRODUCTS: Product[] = [
  {
    id: "nextjs-saas-starter",
    index: "01",
    name: "Next.js SaaS Starter",
    description: "Production-ready Next.js application architecture.",
    categories: ["web", "dev-tools", "templates"],
    preview: "saas",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind"],
    version: "2.1.0",
    price: { inr: "7,999", usd: "99" },
  },
  {
    id: "ai-dashboard",
    index: "02",
    name: "AI Dashboard",
    description: "Modern AI application dashboard starter.",
    categories: ["ai", "web"],
    preview: "ai",
    tech: ["Next.js", "TypeScript", "Python", "Tailwind"],
    version: "1.4.0",
    price: { inr: "5,999", usd: "79" },
  },
  {
    id: "developer-portfolio",
    index: "03",
    name: "Developer Portfolio",
    description: "Premium developer portfolio system.",
    categories: ["templates"],
    preview: "portfolio",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    version: "1.2.0",
    price: { inr: "2,499", usd: "29" },
  },
  {
    id: "ecommerce-starter",
    index: "04",
    name: "E-Commerce Starter",
    description: "Full-stack commerce foundation.",
    categories: ["web", "templates"],
    preview: "commerce",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Payments"],
    version: "1.6.0",
    price: { inr: "8,999", usd: "109" },
  },
  {
    id: "admin-dashboard",
    index: "05",
    name: "Admin Dashboard",
    description: "Production-ready admin interface.",
    categories: ["templates", "web"],
    preview: "admin",
    tech: ["React", "TypeScript", "Tailwind"],
    version: "2.0.0",
    price: { inr: "4,499", usd: "55" },
  },
  {
    id: "ai-tools-starter",
    index: "06",
    name: "AI Tools Starter",
    description: "Build your next AI-powered product faster.",
    categories: ["ai", "dev-tools"],
    preview: "tools",
    tech: ["Python", "Next.js", "TypeScript", "AI"],
    version: "0.9.0",
    price: { inr: "5,499", usd: "65" },
  },
];
