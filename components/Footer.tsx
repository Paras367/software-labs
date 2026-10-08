"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUp,
  faCheck,
  faChevronDown,
  faCopy,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDribbble,
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";
import { cx } from "@/lib/utils";

/* ───────────────────────── data + helpers ───────────────────────── */

const NAV_OFFSET = 88;
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent/60";

const SOCIALS = [
  { icon: faGithub, href: SITE.socials.github, label: "GitHub" },
  { icon: faLinkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { icon: faXTwitter, href: SITE.socials.twitter, label: "X (Twitter)" },
  { icon: faInstagram, href: SITE.socials.instagram, label: "Instagram" },
  { icon: faDribbble, href: SITE.socials.dribbble, label: "Dribbble" },
  { icon: faEnvelope, href: `mailto:${SITE.email}`, label: "Email" },
];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth anchor jump with navbar offset; returns true if it handled the href. */
function jumpTo(href: string): boolean {
  const behavior: ScrollBehavior = reducedMotion() ? "auto" : "smooth";
  const id = href.replace(/^#/, "");
  const el = id ? document.getElementById(id) : null;
  if (!el) {
    if (href === "#" || href === "#home") {
      window.scrollTo({ top: 0, behavior });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      return true;
    }
    return false;
  }
  window.scrollTo({
    top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET),
    behavior,
  });
  window.history.replaceState(null, "", href);
  return true;
}

/* ───────────────────────── small pieces ───────────────────────── */

/** Back-to-top button whose ring fills as you scroll (written straight to the DOM, no re-renders). */
function BackToTop({ className }: { className?: string }) {
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ringRef.current?.setAttribute("stroke-dashoffset", String(1 - p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href="#home"
      className={cx(
        "group/btn inline-flex items-center gap-2.5 rounded-lg border border-lab-accent/15 bg-lab-blue/20 py-1.5 pl-2 pr-3.5 text-[12px] font-medium text-lab-ice/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-ice",
        FOCUS_RING,
        className
      )}
    >
      <span className="relative grid size-7 place-items-center">
        <svg viewBox="0 0 24 24" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
          <circle
            ref={ringRef}
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="rgb(91,155,213)"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </svg>
        <FontAwesomeIcon
          icon={faArrowUp}
          className="size-2.5 text-lab-accent transition-transform duration-300 group-hover/btn:-translate-y-0.5"
        />
      </span>
      Back to top
    </a>
  );
}

/** One-tap copy for the contact email. Falls back to opening the mail app if clipboard is blocked. */
function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        "group inline-flex items-center gap-3 rounded-lg border border-lab-accent/25 bg-lab-accent/5 px-4 py-2.5 font-mono text-sm text-lab-ice transition-all duration-300 hover:border-lab-accent/50 hover:bg-lab-accent/10 hover:shadow-[0_0_20px_-4px_rgba(91,155,213,0.4)]",
        FOCUS_RING,
        className
      )}
    >
      <span className="truncate">{SITE.email}</span>
      <FontAwesomeIcon
        icon={copied ? faCheck : faCopy}
        className={cx("size-3.5 shrink-0", copied ? "text-emerald-400" : "text-lab-accent")}
      />
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email copied" : "Copy email address"}
      </span>
    </button>
  );
}

function SocialRow({ className, size = "size-9" }: { className?: string; size?: string }) {
  return (
    <div className={cx("flex flex-wrap items-center gap-2.5", className)}>
      {SOCIALS.map((s) => {
        const external = s.href.startsWith("http");
        return (
          <a
            key={s.label}
            href={s.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={external ? `${s.label} (opens in new tab)` : s.label}
            className={cx(
              "group flex items-center justify-center rounded-lg border border-lab-accent/15 bg-lab-blue/20 text-lab-ice/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_15px_-3px_rgba(91,155,213,0.4)]",
              size,
              FOCUS_RING
            )}
          >
            <FontAwesomeIcon icon={s.icon} className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        );
      })}
    </div>
  );
}

function AuthorCredit({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
        <p className="font-mono text-[10px] uppercase tracking-widest text-lab-ice/40">Built by</p>
      </div>
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(
          "inline-block rounded text-base font-semibold text-lab-ice/90 transition-all duration-300 hover:translate-x-0.5 hover:text-lab-accent",
          FOCUS_RING
        )}
      >
        {SITE.authorName}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
      <p className="mt-1 font-mono text-[11px] text-lab-accent/60">{SITE.authorHandle}</p>
    </div>
  );
}

function LegalLinks() {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider">
      <a href="#privacy" className={cx("rounded transition-colors duration-300 hover:text-lab-accent", FOCUS_RING)}>
        Privacy
      </a>
      <span className="text-lab-accent/30" aria-hidden="true">
        ·
      </span>
      <a href="#terms" className={cx("rounded transition-colors duration-300 hover:text-lab-accent", FOCUS_RING)}>
        Terms
      </a>
    </div>
  );
}

/* ───────────────────────── desktop footer (lg+) ───────────────────────── */

function DesktopFooter() {
  return (
    <div className="hidden lg:block">
      {/* contact band */}
      <div className="flex items-end justify-between gap-10 border-b border-lab-accent/10 pb-12">
        <div>
          <p className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-lab-ice">
            Got something to build? Let’s ship it together.
          </p>
          <p className="mt-3 text-sm text-lab-ice/50">Tap the address to copy it, or write to us directly.</p>
        </div>
        <CopyEmail className="shrink-0" />
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-16 pt-14">
        {/* brand column */}
        <div className="flex flex-col">
          <a href="#home" className={cx("inline-block origin-left rounded-md transition-transform duration-300 hover:scale-105", FOCUS_RING)}>
            <Logo />
          </a>
          <p className="mt-6 max-w-[280px] text-sm leading-relaxed text-lab-ice/60">
            Developer-built software for the real world.
          </p>
          <SocialRow className="mt-8" />
          <AuthorCredit className="mt-10 border-t border-lab-accent/10 pt-8" />
        </div>

        {/* link columns */}
        <div className="grid grid-cols-4 gap-x-10">
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="group/column">
              <p className="mb-5 flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-lab-accent/80">
                <span className="size-1.5 rounded-full bg-lab-accent/60 transition-all duration-300 group-hover/column:scale-150 group-hover/column:bg-lab-accent" />
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className={cx(
                        "group/link relative inline-flex items-center gap-2 text-[13px] text-lab-ice/55 transition-colors duration-300 hover:text-lab-ice",
                        FOCUS_RING,
                        "rounded"
                      )}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="pointer-events-none absolute inset-0 -mx-2 -my-1 rounded-md bg-lab-accent/0 transition-colors duration-300 group-hover/link:bg-lab-accent/5" />
                      <span className="relative">{l.label}</span>
                      {l.external && (
                        <>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            aria-hidden
                            className="relative size-2.5 -translate-x-1 -rotate-45 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                          />
                          <span className="sr-only">(opens in new tab)</span>
                        </>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="mt-16 flex items-center justify-between border-t border-lab-accent/10 pt-8 text-xs text-lab-ice/40">
        <p className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-lab-accent/60" />© {SITE.year} {SITE.name}. All rights reserved.
          <span className="text-lab-ice/30">· Built with chai ☕ in India</span>
        </p>
        <div className="flex items-center gap-6">
          <LegalLinks />
          <BackToTop />
        </div>
      </div>

      {/* oversized wordmark: the one loud thing in the footer */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-6 mt-10 select-none bg-gradient-to-b from-lab-accent/25 to-transparent bg-clip-text text-center font-mono text-[clamp(3rem,12.5vw,12rem)] font-bold leading-[0.85] tracking-tighter text-transparent"
      >
        SOFTWARELABS
      </p>
    </div>
  );
}

/* ───────────────────────── mobile footer (<lg) ───────────────────────── */

function MobileFooter() {
  const [openCol, setOpenCol] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <a href="#home" className={cx("inline-block rounded-md", FOCUS_RING)}>
        <Logo />
      </a>
      <p className="mt-4 text-sm leading-relaxed text-lab-ice/60">Developer-built software for the real world.</p>

      <CopyEmail className="mt-6 w-full justify-between" />

      <SocialRow className="mt-5 [&>a]:flex-1" size="h-11 min-w-11" />

      {/* accordion link columns */}
      <div className="mt-8 divide-y divide-lab-accent/10 border-y border-lab-accent/10">
        {FOOTER_COLUMNS.map((col) => {
          const isOpen = openCol === col.title;
          const panelId = `footer-col-${col.title.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <div key={col.title}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenCol(isOpen ? null : col.title)}
                className={cx(
                  "flex w-full items-center justify-between py-4 text-left font-mono text-[12px] font-semibold uppercase tracking-widest transition-colors duration-300",
                  isOpen ? "text-lab-accent" : "text-lab-ice/80",
                  FOCUS_RING
                )}
              >
                {col.title}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={cx("size-3 transition-transform duration-300", isOpen && "rotate-180")}
                />
              </button>

              <div
                id={panelId}
                className={cx(
                  "grid transition-all duration-300 ease-out motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className={cx("overflow-hidden", !isOpen && "invisible")}>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 pb-4">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className={cx(
                            "flex min-h-11 items-center gap-2 rounded-md text-[14px] text-lab-ice/70 transition-colors hover:text-lab-accent",
                            FOCUS_RING
                          )}
                          {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {l.label}
                          {l.external && (
                            <>
                              <FontAwesomeIcon icon={faArrowRight} aria-hidden className="size-2.5 -rotate-45 opacity-60" />
                              <span className="sr-only">(opens in new tab)</span>
                            </>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AuthorCredit className="mt-8" />

      <div className="mt-8 flex flex-col gap-5 border-t border-lab-accent/10 pt-6 text-xs text-lab-ice/40">
        <div className="flex items-center justify-between">
          <LegalLinks />
          <BackToTop />
        </div>
        <p className="flex items-center gap-2.5">
          <span className="size-1.5 shrink-0 rounded-full bg-lab-accent/60" />
          <span>
            © {SITE.year} {SITE.name}. All rights reserved.
            <span className="block text-lab-ice/30">Built with chai ☕ in India</span>
          </span>
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── footer ───────────────────────── */

export function Footer() {
  /* footer anchors get the same offset-aware smooth scroll as the navbar */
  const onClick = (e: ReactMouseEvent<HTMLElement>) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("#") && jumpTo(href)) e.preventDefault();
  };

  return (
    <footer onClick={onClick} className="relative overflow-hidden bg-lab-navy pb-10 pt-16 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-lab-accent/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-full max-w-4xl -translate-x-1/2 bg-lab-accent/5 blur-[120px]"
      />

      <Container className="relative z-10">
        <DesktopFooter />
        <MobileFooter />
      </Container>
    </footer>
  );
}