import { ArrowRight, GitFork } from "lucide-react";
import { Container, ButtonLink } from "@/components/ui";
import { HeroBackground } from "@/components/HeroBackground";
import { TerminalPanel } from "@/components/TerminalPanel";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <HeroBackground />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-lab-accent/35 bg-lab-blue/40 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-lab-accent">
            <span className="size-1.5 rounded-full bg-lab-accent animate-pulse-dot" aria-hidden />
            SOFTWARELABS // ENGINEERING LAB
          </span>

          <h1 className="mt-6 text-[clamp(2.6rem,6.4vw,4.75rem)] font-extrabold uppercase leading-[0.94] tracking-display text-lab-ice">
            We build
            <br />
            software that
            <br />
            <span className="text-lab-accent">does the work.</span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-lab-ice/70">
            Developer-built software, digital products and code engineered for the real world.
          </p>
          <p className="mt-2 font-mono text-sm text-lab-ice/45">From source code to production.</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="#products">Explore Products</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Build With Us
            </ButtonLink>
          </div>

          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-lab-ice/50 transition-colors hover:text-lab-accent"
          >
            <GitFork aria-hidden className="size-4" />
            View GitHub
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <TerminalPanel />
        </div>
      </Container>
    </section>
  );
}
