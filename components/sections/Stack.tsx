"use client";

import { useState, useMemo } from "react";
import { Container, SectionHeading } from "@/components/ui";
import { STACK } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faSearch } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "AI"] as const;

/**
 * Authentic Brand Icons (Inline SVG)
 * Uses `.includes()` for flexible matching and `currentColor` for perfect theme inheritance.
 * Falls back to Lucide icons (from lib/content.ts) for niche tools.
 */
const BrandIcon = ({ name, className }: { name: string; className?: string }) => {
  const n = name.toLowerCase();
  
  if (n.includes("next")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h5.5l9.2 12.3V2H22v20h-5.5L7.3 9.7V22H2V2z"/><path d="M18.5 18.5 22 22h-3.5l-3.2-3.5h3.2z"/></svg>;
  }
  if (n.includes("react")) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></svg>;
  }
  if (n.includes("type")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm13.5 13.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-6-3h1.5v3h1.5v-3H15v-1.5h-4.5v1.5z" /></svg>;
  }
  if (n.includes("tailwind")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" /></svg>;
  }
  if (n.includes("node")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.5 3.75v7.14L12 18.82l-7.5-3.75V7.93L12 4.18zM12 7l-5 2.5v5L12 17l5-2.5v-5L12 7z" /></svg>;
  }
  if (n.includes("python")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 8 3.76 8 3.76V5.5h4.5v.5H6.5S5 5.84 5 7.5v3.5S4.84 12.5 6.5 12.5h1v-2.5S7.34 8.5 8.5 8.5H11s1.5 0 1.5-1.5V4.5S12.66 3 11 3h1zm2 5.5v2.5s.16 1.5-1.5 1.5H10s-1.5 0-1.5 1.5v2.5S8.34 17 10 17h2.5s1.5 0 1.5-1.5V13s.16-1.5-1.5-1.5H10v-1.5h4.5S16 10.16 16 8.5V6s.16-1.5-1.5-1.5H14zm-4 3.5a1 1 0 100 2 1 1 0 000-2zm4 5a1 1 0 100 2 1 1 0 000-2z" /></svg>;
  }
  if (n.includes("docker")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 3.5h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm9 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm9 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm12 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 3h18v2H3v-2z" /></svg>;
  }
  if (n.includes("github")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>;
  }
  if (n.includes("vercel")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z" /></svg>;
  }
  if (n.includes("supabase")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10.5 21.5l-7-7V4.5h7v17z" opacity="0.6" /><path d="M13.5 2.5l7 7v10h-7v-17z" /></svg>;
  }
  if (n.includes("postgres") || n.includes("sql")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>;
  }
  if (n.includes("stripe")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" /></svg>;
  }
  if (n.includes("openai") || n.includes("ai")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813l-.0048 6.7227z" /></svg>;
  }
  
  return null; // Fallback to Lucide
};

export function Stack() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredStack = useMemo(() => {
    // If no filters are active, return everything immediately
    if (activeCategory === "All" && !searchQuery.trim()) return STACK;

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
                  key={`${tech.name}-${activeCategory}-${searchQuery}`}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 30}ms` }}
                  className="group relative flex items-center gap-3 rounded-xl border border-lab-accent/10 bg-lab-blue/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-lab-accent/5"
                >
                  {/* Icon Box - Guaranteed to never be invisible */}
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