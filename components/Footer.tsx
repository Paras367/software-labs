import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { 
  faGithub, 
  faInstagram, 
  faPinterest, 
  faTwitter, 
  faLinkedin, 
  faDribbble 
} from "@fortawesome/free-brands-svg-icons";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export function Footer() {
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
            
            {/* Social Media Icons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex size-9 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon 
                  icon={faGithub} 
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group flex size-9 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon 
                  icon={faTwitter} 
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex size-9 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon 
                  icon={faLinkedin} 
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex size-9 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon 
                  icon={faInstagram} 
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="group flex size-9 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon 
                  icon={faPinterest} 
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dribbble"
                className="group flex size-9 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
              >
                <FontAwesomeIcon 
                  icon={faDribbble} 
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
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
                        <FontAwesomeIcon 
                          icon={faArrowRight}
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
            
            <a
              href="#home"
              className="group/btn inline-flex items-center gap-1.5 rounded-md border border-lab-accent/20 bg-lab-blue/20 px-3 py-1.5 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent/50 hover:bg-lab-accent/10 hover:text-lab-ice"
            >
              <span>Back to top</span>
              <FontAwesomeIcon 
                icon={faArrowUp}
                className="size-3 transition-transform duration-300 group-hover/btn:-translate-y-0.5" 
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}