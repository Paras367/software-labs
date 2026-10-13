"use client";

import { useState, useMemo } from "react";
import { Container, SectionHeading } from "@/components/ui";
import { STACK } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faSearch } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "AI"] as const;

/**
 * Authentic Brand Icons (Inline SVG)
 * Uses official paths for crisp rendering and inherits Tailwind text colors via `currentColor`.
 * Falls back to Lucide icons (from lib/content.ts) for niche tools.
 */
const BrandIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Next.js":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180ZM149.508 130.596L66.508 47.596V132.404H75.508V69.308L143.096 136.896L149.508 130.596ZM115.508 47.596H124.508V132.404H115.508V47.596Z" />
        </svg>
      );
    case "React":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="none" stroke="currentColor" strokeWidth="12">
          <ellipse cx="90" cy="90" rx="84" ry="30" transform="rotate(0 90 90)" />
          <ellipse cx="90" cy="90" rx="84" ry="30" transform="rotate(60 90 90)" />
          <ellipse cx="90" cy="90" rx="84" ry="30" transform="rotate(120 90 90)" />
          <circle cx="90" cy="90" r="12" fill="currentColor" stroke="none" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M24 24h132v132H24z" fill="#3178C6" /> {/* Fallback bg if needed, but currentColor is better */}
          <path d="M128.5 105.5v-9h-25v9h8.5v36h8v-36h8.5zM71.5 105.5v-9h-25v9h8.5v36h8v-36h8.5z" fill="white" /> 
          {/* Simplified TS representation for monochrome consistency */}
          <path d="M30 30h120v120H30z" fill="none" stroke="currentColor" strokeWidth="8" />
          <text x="55" y="115" fontSize="70" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">TS</text>
        </svg>
      );
    case "Tailwind":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M127.5 30c-15 0-25 10-30 20-5-10-15-20-30-20-20 0-35 15-35 35 0 25 25 35 35 45 10 10 15 20 15 20s5-10 15-20c10-10 35-20 35-45 0-20-15-35-35-35zm-60 55c-10 0-15-5-15-15s5-15 15-15 15 5 15 15-5 15-15 15zm60 0c-10 0-15-5-15-15s5-15 15-15 15 5 15 15-5 15-15 15z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M90 15L155 52.5v75L90 165l-65-37.5v-75L90 15zm0 12l-52 30v60l52 30 52-30v-60l-52-30z" />
          <path d="M90 45l26 15v30l-26 15-26-15v-30l26-15z" />
        </svg>
      );
    case "Python":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M89.5 20c-20 0-19 8.5-19 8.5v9h20v3h-29s-9-1-9 8.5v28s-1 9 9 9h5v-14s-1-9 9-9h15s9 0 9-9v-15s1-9-9-9h-1z" />
          <path d="M90.5 160c20 0 19-8.5 19-8.5v-9h-20v-3h29s9 1 9-8.5v-28s1-9-9-9h-5v14s1 9-9 9h-15s-9 0-9 9v15s-1 9 9 9h1z" />
          <circle cx="65" cy="45" r="5" fill="currentColor" />
          <circle cx="115" cy="135" r="5" fill="currentColor" />
        </svg>
      );
    case "Docker":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M150 90h-15v-15h15v15zm-20 0h-15v-15h15v15zm-20 0H95v-15h15v15zm-20 0H75v-15h15v15zm-20 0H55v-15h15v15zm-20 0H35v-15h15v15zm110-20h-15V55h15v15zm-20 0h-15V55h15v15zm-20 0H95V55h15v15zm-20 0H75V55h15v15zm-20 0H55V55h15v15zm-20 0H35V55h15v15zM30 120c-5 0-10 5-10 10v20c0 5 5 10 10 10h120c5 0 10-5 10-10v-20c0-5-5-10-10-10H30z" />
        </svg>
      );
    case "GitHub":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M90 10C45 10 10 45 10 90c0 36 23 66 55 77 4 1 5-2 5-4v-14c-22 5-27-10-27-10-4-9-9-12-9-12-7-5 1-5 1-5 8 1 12 8 12 8 7 12 18 9 23 7 1-5 3-9 5-11-18-2-36-9-36-40 0-9 3-16 8-22-1-2-4-10 1-21 0 0 7-2 22 8 6-2 13-3 20-3 7 0 14 1 20 3 15-10 22-8 22-8 5 11 2 19 1 21 5 6 8 13 8 22 0 31-19 38-37 40 3 3 5 7 5 14v21c0 2 1 5 5 4 32-11 55-41 55-77 0-45-35-80-80-80z" />
        </svg>
      );
    case "Vercel":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M90 20L160 150H20L90 20z" />
        </svg>
      );
    case "Supabase":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M70 160c-5 5-15 2-15-5V45c0-7 10-10 15-5l70 70c5 5 2 15-5 15H70z" opacity="0.8" />
          <path d="M110 20c5-5 15-2 15 5v110c0 7-10 10-15 5L40 70c-5-5-2-15 5-15h65z" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M90 20c-30 0-50 20-50 50 0 40 40 60 40 90h20c0-30 40-50 40-90 0-30-20-50-50-50zm0 20c15 0 25 10 25 25 0 20-20 30-25 45-5-15-25-25-25-45 0-15 10-25 25-25z" />
        </svg>
      );
    case "Stripe":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="currentColor">
          <path d="M130 60c-10 0-15 5-15 5v-5h-20v70h20v-30c0-5 5-10 10-10 5 0 5 5 5 10v30h20v-40c0-15-10-30-20-30zM50 60c-15 0-25 10-25 25s10 25 25 25c10 0 15-5 15-5v5h20V60H65v5s-5-5-15-5zm-5 25c0-5 5-5 5-5s5 0 5 5-5 5-5 5-5 0-5-5z" />
        </svg>
      );
    case "OpenAI / LLMs":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="none" stroke="currentColor" strokeWidth="12">
          <path d="M90 30 L140 60 L140 120 L90 150 L40 120 L40 60 Z" />
          <path d="M90 30 L90 150 M40 60 L140 120 M140 60 L40 120" />
          <circle cx="90" cy="90" r="20" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null; // Fallback to Lucide
  }
};

export function Stack() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredStack = useMemo(() => {
    return STACK.filter((tech) => {
      const matchesCategory = activeCategory === "All" || tech.category === activeCategory;
      const matchesSearch = 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
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
              // Try to get the custom brand icon, fallback to the Lucide icon from lib/content.ts
              const CustomIcon = BrandIcon({ name: tech.name, className: "size-6" });
              const FallbackIcon = tech.icon;
              
              return (
                <div
                  key={tech.name}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 30}ms` }}
                  className="group relative flex items-center gap-3 rounded-xl border border-lab-accent/10 bg-lab-blue/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-lab-accent/5"
                >
                  {/* Icon Box */}
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-ice transition-all duration-300 group-hover:border-lab-accent group-hover:bg-lab-accent group-hover:text-lab-navy group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-lab-accent/20">
                    {CustomIcon ? (
                      CustomIcon
                    ) : (
                      <FallbackIcon className="size-5" />
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
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} 
              className="mt-2 text-lab-accent hover:underline text-xs font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}