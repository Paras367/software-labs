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

// Mock rich data for the "Products" dropdown to show off the feature
const RICH_PRODUCTS = [
  { label: "Source Code", href: "#products", icon: faCode, desc: "Premium, reusable boilerplates" },
  { label: "AI Systems", href: "#products", icon: faBolt, desc: "RAG-powered intelligent workflows" },
  { label: "Dev Tools", href: "#products", icon: faTerminal, desc: "CLIs and SDKs for engineers" },
];

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
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out">
      {/* 1. Scroll Progress Bar (Top Edge) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-50 bg-lab-navy">
        <div 
          className="h-full bg-lab-accent shadow-[0_0_10px_2px_rgba(99,102,241,0.6)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 2. Ambient Glow Effect */}
      <div 
        className={cx(
          "absolute inset-x-0 top-[2px] h-px transition-opacity duration-500",
          solid ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(var(--lab-accent-rgb, 99, 102, 241), 0.8), transparent)",
          boxShadow: "0 0 20px 2px rgba(var(--lab-accent-rgb, 99, 102, 241), 0.3)"
        }}
      />

      <div
        className={cx(
          "border-b transition-all duration-500 ease-out",
          solid
            ? "border-lab-accent/20 bg-lab-navy/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          
          {/* Logo */}
          <a 
            href="#home" 
            aria-label="SOFTWARELABS — home" 
            onClick={() => setOpen(false)}
            className="group relative z-10 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <Logo />
          </a>

          {/* Desktop Navigation with Rich Dropdown Support */}
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
                    className={cx(
                      "group relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isProducts ? "text-lab-ice" : "text-lab-ice/70 hover:text-white"
                    )}
                  >
                    {l.label}
                    {isProducts && (
                      <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className={cx("size-3 transition-transform duration-300", activeDropdown === "products" ? "rotate-180" : "")} 
                      />
                    )}
                    
                    {/* Animated Underline */}
                    <span className="absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-gradient-to-r from-lab-accent to-lab-accent/50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    <span className="absolute inset-0 rounded-lg bg-lab-accent/0 transition-colors duration-300 group-hover:bg-lab-accent/10" />
                  </a>

                  {/* Rich Dropdown Menu (Appears on Hover) */}
                  {isProducts && activeDropdown === "products" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl border border-lab-accent/20 bg-lab-navy/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-4 rotate-45 border-l border-t border-lab-accent/20 bg-lab-navy/95" />
                      {RICH_PRODUCTS.map((item, i) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-lab-accent/10 group/item"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-lab-blue/30 text-lab-accent group-hover/item:bg-lab-accent group-hover/item:text-lab-navy transition-colors duration-200">
                            <FontAwesomeIcon icon={item.icon} className="size-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-lab-ice group-hover/item:text-lab-accent transition-colors">
                              {item.label}
                            </p>
                            <p className="text-xs text-lab-ice/50 mt-0.5">{item.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Cmd+K Search Trigger */}
            <button 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-md border border-lab-accent/20 bg-lab-blue/20 text-lab-ice/60 text-sm hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-ice transition-all duration-300"
              aria-label="Open search"
            >
              <FontAwesomeIcon icon={faSearch} className="size-3" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-lab-navy border border-lab-accent/20 text-[10px] font-mono text-lab-ice/50 group-hover:border-lab-accent/40 transition-colors">
                <span>⌘</span>K
              </kbd>
            </button>

            <a
              href="#contact"
              className="relative rounded-md px-4 py-2 text-sm font-semibold text-lab-ice/80 transition-colors duration-300 hover:text-white hover:bg-white/5"
            >
              Contact
            </a>
            
            <ButtonLink 
              href="#products" 
              className="group relative !py-2 overflow-hidden !bg-lab-accent !text-lab-navy font-bold shadow-lg shadow-lab-accent/25 transition-all duration-300 hover:shadow-lab-accent/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
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
            className="group relative grid size-10 place-items-center rounded-lg border border-lab-accent/30 bg-lab-blue/20 text-lab-ice transition-all duration-300 hover:border-lab-accent hover:bg-lab-accent/10 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {open ? (
                <FontAwesomeIcon icon={faXmark} className="size-5" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="size-5" />
              )}
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Panel with Staggered Animations */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-lab-accent/20 bg-lab-navy/95 px-5 pb-10 pt-6 backdrop-blur-3xl lg:hidden"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)"
          }}
        >
          {/* Mobile Search Bar */}
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-lab-accent/20 bg-lab-blue/20 px-4 py-3 text-lab-ice/50">
            <FontAwesomeIcon icon={faSearch} className="size-4" />
            <span className="text-sm">Search products, docs...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded bg-lab-navy border border-lab-accent/20 text-[10px] font-mono">⌘K</kbd>
          </div>

          <ul className="divide-y divide-lab-accent/10 border-y border-lab-accent/10">
            {NAV_LINKS.map((l, i) => (
              <li 
                key={l.href}
                className="transform transition-all duration-500 ease-out"
                style={{ 
                  transitionDelay: `${i * 75}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(12px)"
                }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-5 text-2xl font-bold tracking-tight text-lab-ice/90 transition-colors duration-300 hover:text-lab-accent"
                >
                  <span className="font-mono text-xs font-normal text-lab-accent/60 transition-colors duration-300 group-hover:text-lab-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="ml-auto size-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" 
                  />
                </a>
              </li>
            ))}
          </ul>
          
          <div 
            className="mt-8 flex flex-col gap-3 transform transition-all duration-500 ease-out"
            style={{ 
              transitionDelay: `${NAV_LINKS.length * 75 + 100}ms`,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)"
            }}
          >
            <ButtonLink href="#products" className="w-full justify-center !py-3 text-base shadow-lg shadow-lab-accent/20">
              Explore Products
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" className="w-full justify-center !py-3 text-base">
              Contact Us
            </ButtonLink>
          </div>
          
          {/* Enhanced Terminal Footer with Pulsing Cursor */}
          <p 
            className="mt-10 font-mono text-xs text-lab-ice/40 transition-all duration-500 ease-out"
            style={{ 
              transitionDelay: `${NAV_LINKS.length * 75 + 200}ms`,
              opacity: open ? 1 : 0
            }}
          >
            <span className="text-lab-accent">softwarelabs@build</span>:<span className="text-blue-400">~</span>$ code. build. ship.<span className="inline-block size-2 animate-pulse bg-lab-accent align-middle ml-1 rounded-sm" />
          </p>
        </div>
      )}

      {/* Inline Keyframes for Dropdown Fade */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </header>
  );
}