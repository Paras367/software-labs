import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faInstagram, faXTwitter, faDribbble } from "@fortawesome/free-brands-svg-icons";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

const SOCIALS = [
  { icon: faGithub, href: SITE.socials.github, label: "GitHub" },
  { icon: faLinkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { icon: faXTwitter, href: SITE.socials.twitter, label: "X (Twitter)" },
  { icon: faInstagram, href: SITE.socials.instagram, label: "Instagram" },
  { icon: faDribbble, href: SITE.socials.dribbble, label: "Dribbble" },
  { icon: faEnvelope, href: `mailto:${SITE.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative bg-lab-navy pt-20 pb-10 overflow-hidden">
      {/* Refined Technical Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)" }}
      />
      
      {/* Subtle Top Border with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lab-accent/50 to-transparent" />
      
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-lab-accent/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          
          {/* Left Column: Brand + Socials + Author */}
          <div className="flex flex-col">
            {/* Logo with subtle hover */}
            <a href="#home" className="transition-transform duration-300 hover:scale-105 origin-left inline-block">
              <Logo />
            </a>
            
            {/* Tagline */}
            <p className="mt-6 max-w-[280px] text-sm leading-relaxed text-lab-ice/60">
              Developer-built software for the real world.
            </p>
            
            {/* Social Icons with Staggered Hover */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              {SOCIALS.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="group flex size-9 items-center justify-center rounded-lg border border-lab-accent/15 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] hover:-translate-y-0.5"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <FontAwesomeIcon icon={social.icon} className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
            
            {/* Author Info with Status Indicator */}
            <div className="mt-10 pt-8 border-t border-lab-accent/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-lab-ice/40">Built by</p>
              </div>
              <a 
                href={SITE.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-base font-semibold text-lab-ice/90 transition-all duration-300 hover:text-lab-accent hover:translate-x-0.5"
              >
                {SITE.authorName}
              </a>
              <p className="font-mono text-[11px] text-lab-accent/60 mt-1">{SITE.authorHandle}</p>
            </div>
          </div>

          {/* Right: Navigation Columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="group/column">
                {/* Column Header with Refined Dot */}
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-lab-accent/80 mb-5 flex items-center gap-2.5">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-lab-accent/40 transition-all duration-300 group-hover/column:bg-lab-accent group-hover/column:scale-150" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-lab-accent/60" />
                  </span>
                  {col.title}
                </p>
                
                {/* Links with Sliding Background */}
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group/link relative inline-flex items-center gap-2 text-[13px] text-lab-ice/55 transition-all duration-300 hover:text-lab-ice"
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {/* Subtle background pill on hover */}
                        <span className="absolute inset-0 -mx-2 -my-1 rounded-md bg-lab-accent/0 transition-colors duration-300 group-hover/link:bg-lab-accent/5" />
                        
                        <span className="relative">{l.label}</span>
                        
                        {l.external && (
                          <FontAwesomeIcon 
                            icon={faArrowRight}
                            aria-hidden 
                            className="relative size-2.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0" 
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="mt-16 flex flex-col gap-6 border-t border-lab-accent/10 pt-8 text-xs text-lab-ice/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-lab-accent/60" />
            © {SITE.year} {SITE.name}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {/* Legal Links */}
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider">
              <a href="#privacy" className="hover:text-lab-accent transition-colors duration-300">Privacy</a>
              <span className="text-lab-accent/30">·</span>
              <a href="#terms" className="hover:text-lab-accent transition-colors duration-300">Terms</a>
            </div>
            
            {/* Back to Top Button */}
            <a
              href="#home"
              className="group/btn inline-flex items-center gap-2 rounded-lg border border-lab-accent/15 bg-lab-blue/20 px-3 py-1.5 text-[11px] font-medium text-lab-ice/60 transition-all duration-300 hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-ice hover:-translate-y-0.5"
            >
              <span>Back to top</span>
              <FontAwesomeIcon 
                icon={faArrowUp}
                className="size-2.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" 
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}