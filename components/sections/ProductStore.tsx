"use client";

import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faFileCode, 
  faLayerGroup,
  faExternalLinkAlt,
  faFilter,
  faSort
} from "@fortawesome/free-solid-svg-icons";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { ProductPreview } from "@/components/ProductPreview";
import { 
  PRODUCTS, 
  FILTERS, 
  SORT_OPTIONS, 
  CATEGORY_LABEL,
  TECH_COLORS,
  type Product 
} from "@/lib/products";

export function ProductStore() {
  const [activeFilter, setActiveFilter] = useState<"all" | string>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // 1. Filter by Category
    if (activeFilter !== "all") {
      result = result.filter((p) => p.categories.includes(activeFilter as any));
    }

    // 2. Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 3. Sort (Updated to remove price/rating)
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });
  }, [activeFilter, sortBy, searchQuery]);

  return (
    <section id="products" className="relative py-24 sm:py-32 bg-lab-navy">
      <Container>
        <SectionHeading
          path="products"
          lines={["Ready-To-Buy", "Source Code"]}
          tone="dark"
          className="mb-12"
        />
        <p className="max-w-2xl text-lg text-lab-ice/70 mb-12">
          Production-ready foundations. Skip the boilerplate and ship your next 
          project in days, not months.
        </p>

        {/* Controls: Search, Filter, Sort */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <FontAwesomeIcon 
              icon={faFilter} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-lab-ice/40 size-4" 
            />
            <input
              type="text"
              placeholder="Search products, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-lab-accent/20 bg-lab-blue/20 py-2.5 pl-10 pr-4 text-sm text-lab-ice placeholder-lab-ice/40 focus:border-lab-accent/50 focus:bg-lab-blue/30 focus:outline-none focus:ring-1 focus:ring-lab-accent/50 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === f.id
                    ? "bg-lab-accent text-lab-navy shadow-lg shadow-lab-accent/20"
                    : "bg-lab-blue/20 text-lab-ice/60 border border-lab-accent/20 hover:border-lab-accent/40 hover:text-lab-ice"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <FontAwesomeIcon 
              icon={faSort} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-lab-ice/40 size-3" 
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-lab-accent/20 bg-lab-blue/20 py-2.5 pl-9 pr-8 text-xs font-medium text-lab-ice focus:border-lab-accent/50 focus:outline-none focus:ring-1 focus:ring-lab-accent/50 transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-lab-navy">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p: Product) => (
              <article 
                key={p.id} 
                className="group relative flex flex-col rounded-xl border border-lab-accent/15 bg-lab-blue/10 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:shadow-xl hover:shadow-lab-accent/5 hover:-translate-y-1"
              >
                {/* Preview Image + Badges */}
                <ProductPreview product={p} />

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Header: Categories & Version */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-lab-accent/80">
                      {p.categories.map((c) => CATEGORY_LABEL[c]).join(" · ")}
                    </span>
                    <span className="font-mono text-[10px] text-lab-ice/40">
                      v{p.version}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-lab-ice mb-1 group-hover:text-lab-accent transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-lab-ice/60 mb-4 line-clamp-2">
                    {p.tagline}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.techStack.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className={`flex items-center gap-1.5 rounded-md bg-lab-navy/60 px-2 py-1 text-[11px] font-medium border border-white/5 ${TECH_COLORS[tech] || "text-lab-ice/70"}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="rounded-md bg-lab-navy/60 px-2 py-1 text-[11px] font-medium text-lab-ice/50 border border-white/5">
                        +{p.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Info Footer (Replaces fake metrics) */}
                  <div className="mt-auto pt-4 border-t border-lab-accent/10 flex items-center justify-between text-xs text-lab-ice/50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" title="Total Pages">
                        <FontAwesomeIcon icon={faFileCode} className="size-3" />
                        {p.projectInfo.pages} Pages
                      </span>
                      <span className="flex items-center gap-1" title="Total Components">
                        <FontAwesomeIcon icon={faLayerGroup} className="size-3" />
                        {p.projectInfo.components} Components
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      p.projectInfo.status === "Production Ready" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {p.projectInfo.status}
                    </span>
                  </div>

                  {/* Action Button */}
                  <a 
                    href={p.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-lab-accent/10 border border-lab-accent/20 px-4 py-2.5 text-sm font-semibold text-lab-accent transition-all duration-300 hover:bg-lab-accent hover:text-lab-navy hover:border-lab-accent hover:shadow-lg hover:shadow-lab-accent/20"
                  >
                    View Live Demo
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="size-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center border border-dashed border-lab-accent/20 rounded-xl bg-lab-blue/5">
            <p className="text-lab-ice/50 text-lg mb-2">No products found matching your criteria.</p>
            <button 
              onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
              className="text-lab-accent hover:underline text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
