import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-lab-accent/15 bg-[#081b34]">
      <div className="ruler text-lab-accent" aria-hidden />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-lab-ice/50">Software engineered with intent.</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-lab-accent">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-lab-ice/55 transition-colors hover:text-lab-ice"
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-lab-accent/10 pt-8 text-xs text-lab-ice/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.year} {SITE.name}. All rights reserved.{" "}
            <span className="font-mono text-lab-ice/30">{"// Built with code."}</span>
          </p>
          <p>
            By{" "}
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lab-ice/60 transition-colors hover:text-lab-accent"
            >
              {SITE.authorName} ({SITE.authorHandle})
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
