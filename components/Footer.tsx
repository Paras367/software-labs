import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative bg-lab-navy pt-16 pb-10 overflow-hidden">
      {/* Faint Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Subtle Thin Top Border & Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lab-accent/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-lab-accent/5 blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr_1fr]">
          
          {/* Left: Brand */}
          <div className="flex flex-col">
            <div className="transition-transform duration-300 hover:scale-105 origin-left">
              <Logo />
            </div>
            <p className="mt-5 max-w-[280px] text-sm leading-relaxed text-lab-ice/60">
              Developer-built software for the real world.
            </p>
          </div>

          {/* Middle: Navigation Columns (from site.ts) */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="group/column">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-lab-accent/80 mb-4 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-lab-accent/40 transition-colors duration-300 group-hover/column:bg-lab-accent" />
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group/link flex items-center gap-2 text-[13px] text-lab-ice/55 transition-all duration-300 hover:text-lab-ice hover:translate-x-0.5"
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                        {l.external && (
                          <FontAwesomeIcon 
                            icon={faArrowRight}
                            aria-hidden 
                            className="size-2.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0" 
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Socials + Author */}
          <div className="flex flex-col items-start lg:items-end gap-6">
            <div className="flex items-center gap-3">
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-8 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_12px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon icon={faGithub} className="size-3.5" />
              </a>
              
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-8 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_12px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon icon={faLinkedin} className="size-3.5" />
              </a>
              
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                className="flex size-8 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_12px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon icon={faEnvelope} className="size-3.5" />
              </a>
            </div>
            
            <div className="text-left lg:text-right">
              <p className="font-mono text-[10px] uppercase tracking-widest text-lab-ice/30 mb-1">Built by</p>
              <a 
                href={SITE.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-semibold text-lab-ice/80 transition-colors duration-300 hover:text-lab-accent"
              >
                {SITE.authorName}
              </a>
              <p className="font-mono text-[11px] text-lab-accent/60 mt-0.5">{SITE.authorHandle}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-lab-accent/10 pt-8 text-xs text-lab-ice/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-lab-accent/60" />
            © {SITE.year} {SITE.name}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider">
            <a href="#privacy" className="hover:text-lab-accent transition-colors duration-300">Privacy</a>
            <span className="text-lab-accent/30">·</span>
            <a href="#terms" className="hover:text-lab-accent transition-colors duration-300">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}