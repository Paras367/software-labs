import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { BUILDS } from "@/lib/content";

export function WhatWeBuild() {
  return (
    <section id="solutions" className="relative bg-lab-navy py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading path="solutions" lines={["We build the", "digital layer."]}>
            SoftwareLabs turns ideas, systems and code into production-ready digital products.
          </SectionHeading>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-lab-accent/15 bg-lab-accent/15 sm:grid-cols-2 lg:grid-cols-3">
          {BUILDS.map(({ n, icon: Icon, title, text }, i) => (
            <article
              key={n}
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
              className="group relative flex flex-col justify-between bg-lab-navy p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-lab-blue/25"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-lab-ice/35">{n}</span>
                  <Icon
                    aria-hidden
                    className="size-5 text-lab-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-6 text-lg font-bold text-lab-ice">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lab-ice/55">{text}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-lab-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore <ArrowUpRight className="size-3.5" aria-hidden />
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-none opacity-0 shadow-[inset_0_0_0_1px_#5B9BD5] transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
