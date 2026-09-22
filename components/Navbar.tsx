"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui";
import { NAV_LINKS } from "@/lib/site";
import { cx } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    // NOTE: backdrop-blur must live on this inner bar, not on <header> itself —
    // backdrop-filter on an ancestor creates a new containing block for
    // position:fixed children, which would collapse the mobile menu panel
    // below to the bar's own height instead of the full viewport.
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          "border-b transition-all duration-300",
          solid
            ? "border-lab-accent/15 bg-lab-navy/80 shadow-[0_10px_30px_-18px_rgba(0,0,0,.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#home" aria-label="SOFTWARELABS — home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative px-3.5 py-2 text-sm font-medium text-lab-ice/75 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-lab-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#contact"
            className="rounded-md px-4 py-2 text-sm font-semibold text-lab-ice/80 transition-colors hover:text-white"
          >
            Contact
          </a>
          <ButtonLink href="#products" className="!py-2">
            Explore Products
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-md border border-lab-accent/30 text-lab-ice transition-colors hover:border-lab-accent lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </nav>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-lab-accent/15 bg-lab-navy/95 px-5 pb-10 pt-6 backdrop-blur-xl sm:px-8 lg:hidden"
        >
          <ul className="divide-y divide-lab-accent/15 border-y border-lab-accent/15">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 text-2xl font-bold tracking-tight text-lab-ice transition-colors hover:text-lab-accent"
                >
                  <span className="font-mono text-xs font-normal text-lab-accent">{String(i).padStart(2, "0")}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href="#products" className="w-full">
              Explore Products
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" className="w-full">
              Contact
            </ButtonLink>
          </div>
          <p className="mt-10 font-mono text-xs text-lab-ice/40">softwarelabs@build:~$ code. build. ship.</p>
        </div>
      )}
    </header>
  );
}
