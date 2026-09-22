import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Base URL for the site.
 */
const baseUrl = SITE.url;

/**
 * Helper to construct full URLs.
 */
const getUrl = (path: string) => `${baseUrl}${path}`;

/**
 * Core application routes (from NAV_LINKS).
 * High priority as these are the main conversion pages.
 */
const CORE_ROUTES = [
  { path: "/products", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/solutions", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/developers", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.6 },
];

/**
 * Developer & Documentation routes.
 * Medium priority, updated frequently as the API evolves.
 */
const DEVELOPER_ROUTES = [
  { path: "/developers/docs", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/developers/api", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/developers/changelog", changeFrequency: "daily" as const, priority: 0.6 },
  { path: "/developers/status", changeFrequency: "hourly" as const, priority: 0.5 },
];

/**
 * Legal & Utility routes.
 * Low priority, rarely updated.
 */
const LEGAL_ROUTES = [
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Homepage (Highest Priority)
  const homepage: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  // 2. Map all other routes
  const corePages: MetadataRoute.Sitemap = CORE_ROUTES.map((route) => ({
    url: getUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const developerPages: MetadataRoute.Sitemap = DEVELOPER_ROUTES.map((route) => ({
    url: getUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const legalPages: MetadataRoute.Sitemap = LEGAL_ROUTES.map((route) => ({
    url: getUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // TODO: Add dynamic routes here (e.g., individual products, blog posts)
  // const dynamicProducts: MetadataRoute.Sitemap = await getProducts().then(products => 
  //   products.map(p => ({ url: getUrl(`/products/${p.slug}`), lastModified: p.updatedAt, priority: 0.8 }))
  // );

  return [
    homepage,
    ...corePages,
    ...developerPages,
    ...legalPages,
    // ...dynamicProducts,
  ];
}