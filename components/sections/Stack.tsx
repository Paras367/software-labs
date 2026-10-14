"use client";

import { useState, useMemo } from "react";
import { Container, SectionHeading } from "@/components/ui";
import { STACK } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCode } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "AI"] as const;

/**
 * Authentic Brand Icons (Inline SVG)
 * Returns a valid React JSX element or null.
 */
const BrandIcon = ({ name, className }: { name: string; className?: string }) => {
  const n = name.toLowerCase();
  
  if (n.includes("next")) {
   return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="12"/><path d="M6.5 6.5h2.2l7.1 9.4V6.5H18v11h-2.2L8.7 8.1v9.4H6.5z" fill="white"/><path d="m13.5 13.5 4.8 6.3 1.2-.9-4.8-6.3z" fill="currentColor"/></svg>;
  }
  if (n.includes("react")) {
   return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/></svg>;
  }
  if (n.includes("type")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm9.5 5H7v1.8h2.3V16h1.9V9.8h2.3V8zm5.8 2.2c-.5-.2-1-.3-1.5-.3-1.8 0-2.8.9-2.8 2.2 0 1.1.8 1.7 2.1 2l.6.2c.6.2.8.4.8.7 0 .4-.4.6-1.1.6-.8 0-1.5-.3-2.1-.7l-.8 1.4c.8.5 1.8.8 2.9.8 1.9 0 3-.9 3-2.3 0-1.1-.7-1.7-2-2.1l-.7-.2c-.6-.2-.8-.3-.8-.6s.3-.5.9-.5c.6 0 1.2.2 1.7.5l.8-1.3z"/></svg>;
  }
  if (n.includes("tailwind")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>;
  }
  if (n.includes("node")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.5 3.75v7.14L12 18.82l-7.5-3.75V7.93L12 4.18z"/></svg>;
  }
  if (n.includes("python")) {
   return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2.5 0-2.5 2-2.5 2v2h3v.5H6s-1.5 0-1.5 1.5v3s0 1.5 1.5 1.5h1v-2s0-1.5 1.5-1.5h2s1.5 0 1.5-1.5V4s0-2-2-2h1zm2 5v2s0 1.5-1.5 1.5h-2s-1.5 0-1.5 1.5v2s0 1.5 1.5 1.5h2s1.5 0 1.5-1.5v-1.5s0-1.5-1.5-1.5h-1V11h3s1.5 0 1.5-1.5V6s0-1.5-1.5-1.5h-1.5z"/></svg>;
  }
  if (n.includes("docker")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2.5h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm9 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm9 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm12 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 3h18v2H3v-2z"/></svg>;
  }
  if (n.includes("github")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.58 9.58 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>;
  }
  if (n.includes("vercel")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>;
  }
  if (n.includes("supabase")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10.5 21.5l-7-7V4.5h7v17z" opacity="0.6"/><path d="M13.5 2.5l7 7v10h-7v-17z"/></svg>;
  }
  if (n.includes("postgres") || n.includes("sql")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
  }
  if (n.includes("stripe")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 10c0-2.5-2-3.5-4-3.5-1.5 0-2.5.5-3.5 1l-.5-2c1-.5 2.5-1 4.5-1 3 0 5.5 1.5 5.5 4.5 0 3.5-4 4-4 6.5 0 1 .5 2 2 2 1 0 2-.5 3-1l.5 2c-1 .5-2.5 1-4 1-3 0-5-1.5-5-4.5 0-3.5 4-4 4-6.5z"/></svg>;
  }
  if (n.includes("openai") || (n.includes("ai") && !n.includes("tailwind"))) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.98 4.182a5.985 5.985 0 00-3.997 2.9 6.046 6.046 0 00.743 7.096 5.98 5.98 0 00.51 4.912 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073z"/></svg>;
  }
  if (n.includes("redis")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 3.5 2 5.5V19c0 2 4.48 3.5 10 3.5s10-1.5 10-3.5V5.5C22 3.5 17.52 2 12 2zm0 2c4.5 0 8 .9 8 1.5S16.5 7 12 7s-8-.9-8-1.5S7.5 4 12 4zm0 14c-4.5 0-8-.9-8-1.5V8.5C4 9.1 7.5 10 12 10s8-.9 8-1.5v8c0 .6-3.5 1.5-8 1.5z"/></svg>;
  }
  if (n.includes("prisma")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19.5 8 12 11.5 4.5 8 12 4.5zM4 9.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"/></svg>;
  }
  if (n.includes("framer")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>;
  }
  if (n.includes("cloudflare") || n.includes("cloud")) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>;
  }
  
  return null; // Fallback to Lucide
};

export function Stack() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");

  // Simple, bulletproof filtering by category only
  const filteredStack = useMemo(() => {
    if (activeCategory === "All") return STACK;
    return STACK.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="developers" className="relative bg-lab-navy py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <Container className="relative z-10">
        <SectionHeading 
          path="stack" 
          lines={["Our tech is", "our toolbox."]} 
          className="mb-12"
        >
          We use battle-tested, modern technologies to build fast, scalable, and secure products.
        </SectionHeading>

        {/* Centered Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-lab-accent text-lab-navy shadow-lg shadow-lab-accent/20"
                  : "bg-lab-blue/20 text-lab-ice/60 border border-lab-accent/20 hover:border-lab-accent/40 hover:text-lab-ice"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 text-center text-sm text-lab-ice/50">
          Showing {filteredStack.length} technologies
        </div>

        {filteredStack.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStack.map((tech, i) => {
              const CustomIcon = BrandIcon({ name: tech.name, className: "size-6" });
              
              return (
                <div
                  key={`${tech.name}-${tech.category}`}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 30}ms` }}
                  className="group relative flex items-center gap-3 rounded-xl border border-lab-accent/10 bg-lab-blue/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-lab-accent/5"
                >
                  {/* Bulletproof Icon Rendering Logic */}
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-ice transition-all duration-300 group-hover:border-lab-accent group-hover:bg-lab-accent group-hover:text-lab-navy group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-lab-accent/20">
                    {CustomIcon ? (
                      CustomIcon
                    ) : typeof tech.icon === 'function' ? (
                      <tech.icon className="size-5" />
                    ) : (
                      <FontAwesomeIcon icon={faCode} className="size-5" />
                    )}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-lab-ice transition-colors duration-300 group-hover:text-white">
                      {tech.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-lab-ice/40 transition-colors duration-300 group-hover:text-lab-accent">
                      {tech.kind}
                    </p>
                  </div>

                  <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                    <FontAwesomeIcon 
                      icon={faArrowUpRightFromSquare} 
                      className="size-3 text-lab-accent/60 hover:text-lab-accent cursor-pointer" 
                    />
                  </div>

                  <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_20px_-5px_rgba(99,102,241,0.15)]" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-lab-accent/20 rounded-xl bg-lab-blue/5">
            <p className="text-lab-ice/50 text-sm mb-2">
              No technologies found in "{activeCategory}" category
            </p>
            <button 
              onClick={() => setActiveCategory("All")} 
              className="text-lab-accent hover:underline text-xs font-medium"
            >
              View all technologies
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}