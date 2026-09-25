"use client";

import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faStar, 
  faDownload, 
  faFilter,
  faSort
} from "@fortawesome/free-solid-svg-icons";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { ProductPreview } from "@/components/ProductPreview"; // Ensure this path is correct
import { 
  PRODUCTS, 
  FILTERS, 
  SORT_OPTIONS, 
  CATEGORY_LABEL,
  TECH_COLORS,
  type Product // Import the Product type
} from "@/lib/products";

export function ProductGrid() { // Rename this export to match your file (e.g., ProductPreview or ProductStore)
  const [activeFilter, setActiveFilter] = useState<"all" | string>("all");
  const [sortBy, setSortBy] = useState("popular");
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

    // 3. Sort
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.pricing.inr - b.pricing.inr;
        case "price-desc": return b.pricing.inr - a.pricing.inr;
        case "rating": return b.metrics.rating - a.metrics.rating;
        case "newest": return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "popular": 
        default: return b.metrics.downloads - a.metrics.downloads;
      }
    });
  }, [activeFilter, sortBy, searchQuery]);

  return (
    <section id="products" className="relative py-24 sm:py-32 bg-lab-navy">
      <Container>
        <SectionHeading
          path="products"
          lines={["Premium", "Source Code"]}
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
                {/* ✅ THIS IS THE FIXED LINE (Line 56 in your error) ✅ */}
                <ProductPreview product={p} />

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Header: Categories & Price */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-lab-accent/80">
                      {p.categories.map((c) => CATEGORY_LABEL[c]).join(" · ")}
                    </span>
                    <div className="text-right">
                      {p.pricing.originalInr ? (
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-lab-ice/40 line-through">
                            ₹{p.pricing.originalInr.toLocaleString('en-IN')}
                          </span>
                          <span className="text-lg font-bold text-lab-ice">
                            ₹{p.pricing.inr.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-lab-ice">
                          ₹{p.pricing.inr.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
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

                  {/* Metrics Footer */}
                  <div className="mt-auto pt-4 border-t border-lab-accent/10 flex items-center justify-between text-xs text-lab-ice/50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 size-3" />
                        {p.metrics.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faDownload} className="size-3" />
                        {p.metrics.downloads.toLocaleString()}
                      </span>
                    </div>
                    <span className="font-mono text-[10px]">v{p.version}</span>
                  </div>

                  {/* Action Button */}
                  <ButtonLink 
                    href={`/products/${p.slug}`} 
                    className="mt-6 w-full justify-center"
                  >
                    View Details
                    <FontAwesomeIcon icon={faArrowRight} className="size-3" />
                  </ButtonLink>
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