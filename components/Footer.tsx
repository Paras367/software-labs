import { ArrowRight, ArrowUp } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-lab-navy pt-20 pb-12 overflow-hidden">
      {/* Cinematic Top Border & Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lab-accent/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-40 bg-lab-accent/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="transition-transform duration-300 hover:scale-105 origin-left">
              <Logo />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-lab-ice/60">
              Software engineered with intent. We transform complex challenges 
              into elegant, scalable digital solutions.
            </p>
            
            {/* Minimal Social Proof */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex size-9 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                >
                  <path d="M12 .6a11.4 11.4 0 0 0-3.6 22.2c.57.1.78-.25.78-.55v-2.14c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.54-.29-5.2-1.27-5.2-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.4-2.67 5.36-5.21 5.65.41.36.77 1.06.77 2.14v3.17c0 .3.2.66.78.55A11.4 11.4 0 0 0 12 .6Z" />
                </svg>
              </a>
              {/* Add more social icons here if available in SITE (e.g., Twitter, LinkedIn) */}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="group/column">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-lab-accent/80 mb-5 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-lab-accent/40 transition-colors duration-300 group-hover/column:bg-lab-accent" />
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group/link flex items-center gap-2 text-sm text-lab-ice/55 transition-all duration-300 hover:text-lab-ice hover:translate-x-1"
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                        <ArrowRight 
                          aria-hidden 
                          className="size-3 opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0" 
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Bottom Bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-lab-accent/10 pt-8 text-xs text-lab-ice/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-lab-accent animate-pulse shadow-[0_0_8px_1px_rgba(99,102,241,0.6)]" />
              © {SITE.year} {SITE.name}. All rights reserved.
            </p>
            <p className="font-mono text-lab-ice/30 hidden sm:block">{"// Built with code & intent."}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lab-ice/60 transition-colors duration-300 hover:text-lab-accent"
            >
              {SITE.authorName} <span className="text-lab-ice/30">({SITE.authorHandle})</span>
            </a>
            
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group/btn inline-flex items-center gap-1.5 rounded-md border border-lab-accent/20 bg-lab-blue/20 px-3 py-1.5 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent/50 hover:bg-lab-accent/10 hover:text-lab-ice"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}