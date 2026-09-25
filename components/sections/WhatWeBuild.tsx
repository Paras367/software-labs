import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { BUILDS } from "@/lib/content";

export function WhatWeBuild() {
  return (
    <section id="solutions" className="relative bg-lab-navy py-24 sm:py-32">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end mb-16">
          <SectionHeading path="solutions" lines={["We build the", "digital layer."]}>
            SoftwareLabs turns ideas, systems, and code into production-ready digital products.
          </SectionHeading>
        </div>

        {/* Changed from gap-px to gap-6 for better floating card hover effects */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUILDS.map(({ n, icon: Icon, title, text, tags, gradient }, i) => (
            <article
              key={n}
              data-reveal
              style={{ ["--d" as string]: `${i * 100}ms` }}
              className="group relative flex flex-col justify-between rounded-xl border border-lab-accent/10 bg-lab-navy/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:shadow-2xl hover:shadow-lab-accent/5"
            >
              {/* Dynamic Top Gradient Glow */}
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              
              <div>
                {/* Header: Index & Icon */}
                <div className="flex items-start justify-between mb-5">
                  <span className="font-mono text-xs font-medium text-lab-ice/30">{n}</span>
                  <div className={`rounded-lg bg-gradient-to-br ${gradient} p-2 text-lab-navy shadow-lg opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:shadow-lab-accent/20`}>
                    <Icon aria-hidden className="size-5" />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-lab-ice mb-2 transition-colors duration-300 group-hover:text-lab-accent">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-lab-ice/60">
                  {text}
                </p>
              </div>

              {/* Footer: Tags & CTA */}
              <div className="mt-8 pt-6 border-t border-lab-accent/10">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="rounded-md bg-lab-blue/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-lab-ice/70 border border-white/5 transition-colors duration-300 group-hover:border-lab-accent/20 group-hover:text-lab-ice"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Reveal CTA */}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lab-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  Explore solutions <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </div>

              {/* Subtle inner glow on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 shadow-[inset_0_0_20px_-5px_rgba(99,102,241,0.15)] transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}