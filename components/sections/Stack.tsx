"use client";

import { useState, useMemo } from "react";
import { Container, SectionHeading } from "@/components/ui";
import { STACK } from "@/lib/content";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, 
  SiSupabase, SiPostgresql, SiPython, SiStripe, SiPrisma, 
  SiFramer, SiVercel, SiCloudflare, SiDocker, SiGithub, 
  SiOpenai, SiRedis, SiRecharts, SiNodedotjs
} from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

// Map tech names to their official brand icons
const BRAND_ICONS: Record<string, any> = {
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Tailwind": SiTailwindcss,
  "Supabase": SiSupabase,
  "PostgreSQL": SiPostgresql,
  "Node.js": SiNodedotjs,
  "Python": SiPython,
  "Stripe": SiStripe,
  "Prisma": SiPrisma,
  "Framer Motion": SiFramer,
  "Vercel": SiVercel,
  "Cloudflare": SiCloudflare,
  "Docker": SiDocker,
  "GitHub": SiGithub,
  "OpenAI / LLMs": SiOpenai,
  "Redis": SiRedis,
  "Recharts": SiRecharts,
};

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "AI"] as const;

export function Stack() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredStack = useMemo(() => {
    return STACK.filter((tech) => {
      const matchesCategory = activeCategory === "All" || tech.category === activeCategory;
      const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tech.kind.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="developers" className="relative bg-lab-navy py-24 sm:py-32 overflow-hidden">
      {/* Subtle technical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <Container className="relative z-10">
        <SectionHeading 
          path="stack" 
          lines={["Our tech is", "our toolbox."]} 
          className="mb-12"
        >
          We use battle-tested, modern technologies to build fast, scalable, and secure products.
        </SectionHeading>

        {/* Controls: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-lab-accent text-lab-navy shadow-lg shadow-lab-accent/20"
                    : "bg-lab-blue/20 text-lab-ice/60 border border-lab-accent/20 hover:border-lab-accent/40 hover:text-lab-ice"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar (Desktop/Laptop Feature) */}
          <div className="relative w-full sm:w-64">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-lab-ice/40 size-3" 
            />
            <input
              type="text"
              placeholder="Search tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-lab-accent/20 bg-lab-blue/20 py-2 pl-9 pr-4 text-sm text-lab-ice placeholder-lab-ice/40 focus:border-lab-accent/50 focus:bg-lab-blue/30 focus:outline-none focus:ring-1 focus:ring-lab-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Tech Grid */}
        {filteredStack.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStack.map((tech, i) => {
              const Icon = BRAND_ICONS[tech.name] || tech.icon; // Fallback to Lucide if no brand icon
              
              return (
                <div
                  key={tech.name}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 30}ms` }}
                  className="group relative flex items-center gap-3 rounded-xl border border-lab-accent/10 bg-lab-blue/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-lab-accent/5"
                >
                  {/* Official Brand Icon */}
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-ice transition-all duration-300 group-hover:border-lab-accent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-lab-accent/20">
                    {typeof Icon === 'function' ? (
                      <Icon className="size-5" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </div>
                  
                  {/* Text Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-lab-ice transition-colors duration-300 group-hover:text-white">
                      {tech.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-lab-ice/40 transition-colors duration-300 group-hover:text-lab-accent">
                      {tech.kind}
                    </p>
                  </div>

                  {/* Laptop Feature: "Visit" Action on Hover */}
                  <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                    <FontAwesomeIcon 
                      icon={faArrowUpRightFromSquare} 
                      className="size-3 text-lab-accent/60 hover:text-lab-accent cursor-pointer" 
                    />
                  </div>

                  {/* Subtle Hover Glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_20px_-5px_rgba(99,102,241,0.15)]" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-lab-accent/20 rounded-xl bg-lab-blue/5">
            <p className="text-lab-ice/50 text-sm">No technologies found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery("")} 
              className="mt-2 text-lab-accent hover:underline text-xs font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}