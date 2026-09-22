"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, GitFork } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { ProductPreview } from "@/components/ProductPreview";
import { CATEGORY_LABEL, FILTERS, PRODUCTS, type Category } from "@/lib/products";
import { cx } from "@/lib/utils";

export function ProductStore() {
  const [active, setActive] = useState<"all" | Category>("all");

  const visible = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(active))),
    [active],
  );

  return (
    <section id="products" className="relative bg-lab-blue/10 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading path="products" lines={["Buy the code.", "Own the software."]}>
            Production-ready source code, templates and developer products built by engineers.
          </SectionHeading>

          <div role="tablist" aria-label="Filter products by category" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={active === f.id}
                onClick={() => setActive(f.id)}
                className={cx(
                  "rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-200",
                  active === f.id
                    ? "border-lab-accent bg-lab-accent text-lab-navy font-semibold"
                    : "border-lab-accent/30 text-lab-ice/60 hover:border-lab-accent/60 hover:text-lab-ice",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <article
              key={p.id}
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
              className="group flex flex-col overflow-hidden rounded-xl border border-lab-accent/15 bg-lab-navy/60 transition-all duration-300 hover:-translate-y-1 hover:border-lab-accent/60 hover:shadow-glow"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-lab-accent/15">
                <ProductPreview kind={p.preview} />
                <span className="absolute left-3 top-3 rounded bg-lab-navy/80 px-2 py-0.5 font-mono text-[10px] text-lab-accent backdrop-blur-sm">
                  {p.categories.map((c) => CATEGORY_LABEL[c]).join(" · ")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-xs text-lab-ice/35">{p.index}</span>
                  <span className="font-mono text-[11px] text-lab-ice/35">v{p.version}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-lab-ice">{p.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-lab-ice/55">{p.description}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-lab-accent/20 px-2 py-0.5 font-mono text-[10px] text-lab-ice/50"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between gap-3 border-t border-lab-accent/10 pt-4">
                  <div>
                    <p className="font-mono text-lg font-bold text-lab-accent">
                      ₹{p.price.inr} <span className="text-xs font-normal text-lab-ice/35">/ ${p.price.usd}</span>
                    </p>
                  </div>
                  <a
                    href={`#${p.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-lab-ice/70 transition-colors group-hover:text-lab-accent"
                  >
                    View Details <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 flex items-center justify-center gap-1.5 font-mono text-xs text-lab-ice/35">
          <GitFork className="size-3.5" aria-hidden /> full documentation ships with every purchase
        </p>
      </Container>
    </section>
  );
}
