"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faXmark, 
  faArrowRight, 
  faChevronDown, 
  faSearch, 
  faCode, 
  faRocket, 
  faTerminal,
  faBolt
} from "@fortawesome/free-solid-svg-icons";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui";
import { NAV_LINKS } from "@/lib/site";
import { cx } from "@/lib/utils";

// Mock rich data for the "Products" dropdown
const RICH_PRODUCTS = [
  { label: "Source Code", href: "#products", icon: faCode, desc: "Premium, reusable boilerplates" },
  { label: "AI Systems", href: "#products", icon: faBolt, desc: "RAG-powered intelligent workflows" },
  { label: "Dev Tools", href: "#products", icon: faTerminal, desc: "CLIs and SDKs for engineers" },
];

// Premium spring-like easing curve
const SPRING_EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Scroll & Progress Tracker
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile Menu Lock & Escape Key
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
    <>
      {/* 1. Global Scroll Progress Bar (Top Edge of Viewport) */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-lab-navy/50">
        <div 
          className="h-full bg-lab-accent shadow-[0_0_12px_2px_rgba(99,102,241,0.6)] transition-all duration-100 ease-linear"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 2. Floating Detached Navbar Container */}
      <header className="fixed top-4 inset-x-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cx(
            "relative rounded-xl border transition-all duration-500",
            solid
              ? "border-lab-accent/20 bg-lab-navy/85 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              : "border-white/10 bg-lab-navy/40 backdrop-blur-xl"
          )}
          style={{ transitionTimingFunction: SPRING_EASE }}
        >
          {/* Subtle Technical Grid Overlay */}
          <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
          
          {/* Dynamic Height Wrapper */}
          <nav 
            aria-label="Primary" 
            className={cx(
              "relative flex items-center justify-between px-4 sm:px-5 transition-all duration-500",
              solid ? "h-12" : "h-14"
            )}
            style={{ transitionTimingFunction: SPRING_EASE }}
          >
            {/* Left: Logo & Systems Status */}
            <div className="flex items-center gap-4">
              <a 
                href="#home" 
                aria-label="SOFTWARELABS — home" 
                onClick={() => setOpen(false)}
                className="group relative z-10 transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Logo />
              </a>
              
              {/* Tiny "SYSTEMS ONLINE" Indicator (Desktop Only) */}
              <div className="hidden items-center gap-2 px-2.5 py-1 rounded-full border border-lab-accent/20 bg-lab-accent/5 lg:flex">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-lab-accent/80">Systems Online</span>
              </div>
            </div>

            {/* Center: Desktop Navigation with Animated Pill */}
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => {
                const isProducts = l.label.toLowerCase().includes("product");
                
                return (
                  <li 
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => isProducts && setActiveDropdown("products")}
                    onMouseLeave={() => isProducts && setActiveDropdown(null)}
                  >
                    <a
                      href={l.href}
                      className="group relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium text-lab-ice/70 transition-colors duration-300 hover:text-white"
                    >
                      {l.label}
                      {isProducts && (
                        <FontAwesomeIcon 
                          icon={faChevronDown} 
                          className={cx("size-2.5 transition-transform duration-300", activeDropdown === "products" ? "rotate-180" : "")} 
                        />
                      )}
                      
                      {/* Animated Hover Pill Background */}
                      <span className="absolute inset-0 rounded-lg bg-lab-accent/0 transition-colors duration-300 group-hover:bg-lab-accent/10" />
                    </a>

                    {/* Premium Products Mega-Menu */}
                    {isProducts && activeDropdown === "products" && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-xl border border-lab-accent/20 bg-lab-navy/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl animate-[fadeIn_0.2s_ease-out]">
                        {/* Arrow Pointer */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 border-l border-t border-lab-accent/20 bg-lab-navy/95" />
                        
                        {/* Menu Header */}
                        <div className="px-3 py-2 border-b border-white/5 mb-1">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-lab-ice/40">Core Offerings</p>
                        </div>

                        {RICH_PRODUCTS.map((item, i) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-lab-accent/10 group/item"
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-lab-blue/30 text-lab-accent group-hover/item:bg-lab-accent group-hover/item:text-lab-navy transition-colors duration-200">
                              <FontAwesomeIcon icon={item.icon} className="size-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-lab-ice group-hover/item:text-lab-accent transition-colors">
                                {item.label}
                              </p>
                              <p className="text-xs text-lab-ice/50 mt-0.5 leading-relaxed">{item.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right: Desktop Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              {/* ⌘K Command Search Trigger */}
              <button 
                className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-lab-ice/60 transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-accent/10 hover:text-lab-ice"
                aria-label="Open search"
              >
                <FontAwesomeIcon icon={faSearch} className="size-3" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden md:inline-flex items-center gap-1 rounded border border-white/10 bg-lab-navy px-1.5 py-0.5 font-mono text-[10px] text-lab-ice/50 group-hover:border-lab-accent/30 transition-colors">
                  <span>⌘</span>K
                </kbd>
              </button>

              <a
                href="#contact"
                className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-lab-ice/80 transition-all duration-300 hover:text-white hover:bg-white/5"
              >
                Contact
              </a>
              
              <ButtonLink 
                href="#products" 
                className="group relative !py-1.5 !px-4 overflow-hidden !bg-lab-accent !text-lab-navy font-bold shadow-lg shadow-lab-accent/20 transition-all duration-300 hover:shadow-lab-accent/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  Explore
                  <FontAwesomeIcon icon={faRocket} className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                {/* Button Shine Effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </ButtonLink>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="group relative grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-lab-ice transition-all duration-300 hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-accent lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                {open ? (
                  <FontAwesomeIcon icon={faXmark} className="size-4" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="size-4" />
                )}
              </span>
            </button>
          </nav>
        </div>

        {/* Mobile Menu Panel (Drops down from floating navbar) */}
        {open && (
          <div
            id="mobile-menu"
            className="absolute top-[calc(100%+8px)] inset-x-0 rounded-xl border border-lab-accent/20 bg-lab-navy/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-3xl lg:hidden"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)"
            }}
          >
            {/* Mobile Search Bar */}
            <div className="mb-5 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-lab-ice/50">
              <FontAwesomeIcon icon={faSearch} className="size-3.5" />
              <span className="text-sm">Search products, docs...</span>
              <kbd className="ml-auto px-1.5 py-0.5 rounded border border-white/10 bg-lab-navy font-mono text-[10px]">⌘K</kbd>
            </div>

            <ul className="divide-y divide-white/5 border-y border-white/5">
              {NAV_LINKS.map((l, i) => (
                <li 
                  key={l.href}
                  className="transform transition-all duration-500 ease-out"
                  style={{ 
                    transitionDelay: `${i * 75}ms`,
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(8px)"
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-4 text-lg font-semibold text-lab-ice/90 transition-colors duration-300 hover:text-lab-accent"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] font-normal text-lab-accent/60 transition-colors duration-300 group-hover:text-lab-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </span>
                    <FontAwesomeIcon 
                      icon={faArrowRight} 
                      className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" 
                    />
                  </a>
                </li>
              ))}
            </ul>
            
            <div 
              className="mt-6 flex flex-col gap-3 transform transition-all duration-500 ease-out"
              style={{ 
                transitionDelay: `${NAV_LINKS.length * 75 + 100}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)"
              }}
            >
              <ButtonLink href="#products" className="w-full justify-center !py-2.5 text-sm shadow-lg shadow-lab-accent/20">
                Explore Products
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" className="w-full justify-center !py-2.5 text-sm">
                Contact Us
              </ButtonLink>
            </div>
            
            {/* Enhanced Terminal Footer */}
            <p 
              className="mt-8 font-mono text-[10px] text-lab-ice/40 transition-all duration-500 ease-out flex items-center gap-1"
              style={{ 
                transitionDelay: `${NAV_LINKS.length * 75 + 200}ms`,
                opacity: open ? 1 : 0
              }}
            >
              <span className="text-lab-accent">softwarelabs@build</span>:<span className="text-blue-400">~</span>$ code. build. ship.<span className="inline-block size-1.5 animate-pulse bg-lab-accent align-middle ml-1 rounded-sm" />
            </p>
          </div>
        )}
      </header>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </>
  );
}