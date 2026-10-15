"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faArrowUp,
  faBars,
  faBolt,
  faChevronDown,
  faCode,
  faCopy,
  faRocket,
  faSearch,
  faTerminal,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui";
import { NAV_LINKS } from "@/lib/site";
import { cx } from "@/lib/utils";

/* ───────────────────────── constants ───────────────────────── */

const SPRING_EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const NAV_OFFSET = 88; // fixed navbar height + breathing room for anchor jumps
const GITHUB_URL = "https://github.com/Paras367";
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent/60";
const FOCUSABLE = 'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])';

type Product = { label: string; href: string; icon: IconDefinition; desc: string };

const PRODUCTS: Product[] = [
  { label: "Source Code", href: "https://softwarelabs.vercel.app/#products", icon: faCode, desc: "Premium, reusable boilerplates" },
  { label: "AI Systems", href: "https://softwarelabs.vercel.app/#products", icon: faBolt, desc: "RAG-powered intelligent workflows" },
  { label: "Dev Tools", href: "https://softwarelabs.vercel.app/#products", icon: faTerminal, desc: "CLIs and SDKs for engineers" },
];

type PaletteItem = {
  id: string;
  group: "Jump to" | "Products" | "Quick actions";
  label: string;
  hint?: string;
  keywords?: string;
  icon: IconDefinition;
  run: () => void;
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ───────────────────────── helpers ───────────────────────── */

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scroll to #id with navbar offset, update URL, move focus for screen readers. */
function scrollToHash(href: string, instant = false): boolean {
  if (typeof window === "undefined") return false;
  const behavior: ScrollBehavior = instant || reducedMotion() ? "auto" : "smooth";
  const id = decodeURIComponent(href.replace(/^#/, ""));
  const el = id ? document.getElementById(id) : null;

  if (!el) {
    if (href === "https://softwarelabs.vercel.app/" || href === "#home") {
      window.scrollTo({ top: 0, behavior });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      return true;
    }
    return false;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
  window.history.replaceState(null, "", href);
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}

/** Keeps Tab / Shift+Tab inside `root` (used by the mobile drawer). */
function trapTab(e: KeyboardEvent | ReactKeyboardEvent, root: HTMLElement | null) {
  if (e.key !== "Tab" || !root) return;
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (n) => n.getClientRects().length > 0 && getComputedStyle(n).visibility !== "hidden"
  );
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || !root.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (active === last || !root.contains(active))) {
    e.preventDefault();
    first.focus();
  }
}

function filterItems(items: PaletteItem[], raw: string): PaletteItem[] {
  const q = raw.trim().toLowerCase();
  if (!q) return items;
  const terms = q.split(/\s+/);
  const scored: { item: PaletteItem; score: number }[] = [];
  for (const item of items) {
    const label = item.label.toLowerCase();
    const hay = `${label} ${item.keywords ?? ""} ${item.hint ?? ""}`.toLowerCase();
    if (!terms.every((t) => hay.includes(t))) continue;
    scored.push({ item, score: label.startsWith(terms[0]) ? 0 : label.includes(terms[0]) ? 1 : 2 });
  }
  return scored.sort((a, b) => a.score - b.score).map((s) => s.item);
}

/* ───────────────────────── command palette ───────────────────────── */

function CommandPalette({
  open,
  onClose,
  items,
  modKey,
}: {
  open: boolean;
  onClose: () => void;
  items: PaletteItem[];
  modKey: string;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => filterItems(items, query), [items, query]);
  const grouped = query.trim() === "";

  // open → remember who had focus, reset, focus input. close → give focus back.
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setIndex(0);
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    returnFocus.current?.focus?.();
    returnFocus.current = null;
  }, [open]);

  // keep highlighted row visible while arrowing through a long list
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [index, results]);

  const choose = (item: PaletteItem) => {
    returnFocus.current = null; // the action decides where focus goes
    onClose();
    window.setTimeout(item.run, 80);
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[index];
      if (item) choose(item);
    } else if (e.key === "Tab") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
      <div
        className="lab-fade absolute inset-0 bg-lab-navy/70 backdrop-blur-sm"
        aria-hidden="true"
        onMouseDown={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search SOFTWARELABS"
        onKeyDown={onKeyDown}
        className="lab-pop relative w-full max-w-xl overflow-hidden rounded-xl border border-lab-accent/25 bg-lab-navy/95 shadow-2xl shadow-black/60 backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <FontAwesomeIcon icon={faSearch} className="size-3.5 text-lab-accent" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-opt-${results[index].id}` : undefined}
            aria-label="Search sections, products and actions"
            placeholder="Search sections, products, actions…"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-sm text-lab-ice placeholder:text-lab-ice/40 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-lab-ice/50">
            esc
          </kbd>
        </div>

        <ul
          ref={listRef}
          id="palette-list"
          role="listbox"
          aria-label="Results"
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-lab-ice/50" role="presentation">
              Kuch nahi mila for “{query}”. Try “products” or “contact”.
            </li>
          )}

          {results.map((it, i) => (
            <li key={it.id} role="presentation">
              {grouped && (i === 0 || results[i - 1].group !== it.group) && (
                <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-lab-ice/35">
                  {it.group}
                </p>
              )}
              <div
                id={`palette-opt-${it.id}`}
                role="option"
                aria-selected={i === index}
                data-active={i === index}
                onMouseMove={() => i !== index && setIndex(i)}
                onClick={() => choose(it)}
                className={cx(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
                  i === index ? "bg-lab-accent/15 text-white" : "text-lab-ice/70"
                )}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-lab-blue/30 text-lab-accent">
                  <FontAwesomeIcon icon={it.icon} className="size-3" />
                </span>
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-medium">{it.label}</span>
                  {it.hint && <span className="ml-2 text-xs text-lab-ice/40">{it.hint}</span>}
                </span>
                {i === index && (
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-lab-ice/60">
                    ↵
                  </kbd>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[11px] text-lab-ice/40">
          <span className="font-mono">↑↓ move · ↵ open · {modKey}+K toggle</span>
          <span>Built with chai ☕ in India</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── navbar ───────────────────────── */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [mobileProducts, setMobileProducts] = useState(false);
  const [dropdown, setDropdown] = useState(false); // desktop products menu
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [hoverHref, setHoverHref] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number; show: boolean; instant: boolean } | null>(null);
  const [focusIn, setFocusIn] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [modKey, setModKey] = useState("Ctrl");

  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const toggleRef = useRef<HTMLButtonElement>(null);
  const productBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const toastTimer = useRef<number | undefined>(undefined);

  const sectionIds = useMemo(
    () =>
      NAV_LINKS.map((l) => l.href)
        .filter((h) => h.startsWith("#") && h.length > 1)
        .map((h) => h.slice(1)),
    []
  );

  /* platform-aware shortcut label (set after mount → no hydration mismatch) */
  useEffect(() => {
    setModKey(/Mac|iPhone|iPad/i.test(navigator.userAgent) ? "⌘" : "Ctrl");
  }, []);

  /* scroll: progress bar (no re-render), solid state, hide-on-scroll-down / show-on-scroll-up */
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
      setScrolled(y > 12);
      if (y < 80) setActiveId("");
      const delta = y - lastY;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 200);
        lastY = y;
      } else if (y <= 200) {
        setHidden(false);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* scrollspy: highlight the section sitting in a thin band near the top-middle of the viewport */
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        const current = els.find((el) => visible.has(el.id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds]);

  /* sliding pill follows hover / keyboard focus, falls back to the active section */
  const targetHref = hoverHref ?? (activeId ? `#${activeId}` : null);
  const measure = useCallback(() => {
    const el = targetHref ? itemRefs.current[targetHref] : null;
    if (!el) {
      setPill((p) => (p ? { ...p, show: false, instant: false } : null));
      return;
    }
    setPill((p) => ({
      left: el.offsetLeft,
      width: el.offsetWidth,
      show: true,
      instant: !p || !p.show, // first appearance snaps into place instead of flying in from the left
    }));
  }, [targetHref]);
  useIsoLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* deep links: land on the right offset on first load + back/forward hash changes */
  useEffect(() => {
    const onHash = () => scrollToHash(window.location.hash, true);
    let t: number | undefined;
    if (window.location.hash) t = window.setTimeout(onHash, 120);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  /* global shortcuts: ⌘/Ctrl+K toggles palette, "/" opens it, Esc closes drawer + dropdown */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(false);
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !paletteOpen && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target as HTMLElement | null;
        const typing = !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
        if (!typing) {
          e.preventDefault();
          setOpen(false);
          setPaletteOpen(true);
        }
        return;
      }
      if (e.key === "Escape") {
        if (open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
        setDropdown(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, paletteOpen]);

  /* auto-close drawer when the viewport grows to desktop */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  /* scroll lock (with scrollbar compensation so the page doesn't jump) */
  const lock = open || paletteOpen;
  useEffect(() => {
    if (!lock) return;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
    };
  }, [lock]);

  /* cleanup timers */
  useEffect(
    () => () => {
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(toastTimer.current);
    },
    []
  );

  /* ── dropdown hover intent ── */
  const openDropdown = () => {
    window.clearTimeout(closeTimer.current);
    setDropdown(true);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDropdown(false), 140);
  };

  const onMenuKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[(i + 1) % links.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      links[(i <= 0 ? links.length : i) - 1]?.focus();
    } else if (e.key === "Escape") {
      e.stopPropagation();
      setDropdown(false);
      productBtnRef.current?.focus();
    }
  };

  /* ── one click handler for every in-header anchor: smooth scroll + close menus ── */
  const onHeaderClick = (e: ReactMouseEvent<HTMLElement>) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("#") && scrollToHash(href)) e.preventDefault();
    setOpen(false);
    setDropdown(false);
  };

  /* ── toast + palette actions ── */
  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Link copied");
    } catch {
      flash("Couldn't copy — grab it from the address bar");
    }
  }, [flash]);

  const paletteItems = useMemo<PaletteItem[]>(() => {
    const hasContact = NAV_LINKS.some((l) => String(l.href) === "https://softwarelabs.vercel.app/#contact");
    return [
      ...NAV_LINKS.map<PaletteItem>((l) => ({
        id: `nav-${l.href}`,
        group: "Jump to",
        label: l.label,
        hint: l.href,
        icon: faArrowRight,
        run: () => void scrollToHash(l.href),
      })),
      ...(hasContact
        ? []
        : [
            {
              id: "contact",
              group: "Jump to" as const,
              label: "Contact",
              hint: "https://softwarelabs.vercel.app/#contact",
              icon: faArrowRight,
              run: () => void scrollToHash("https://softwarelabs.vercel.app/#contact"),
            },
          ]),
      ...PRODUCTS.map<PaletteItem>((p) => ({
        id: `prod-${p.label}`,
        group: "Products",
        label: p.label,
        hint: p.desc,
        keywords: "product buy store",
        icon: p.icon,
        run: () => void scrollToHash(p.href),
      })),
      {
        id: "top",
        group: "Quick actions",
        label: "Back to top",
        icon: faArrowUp,
        keywords: "home start scroll",
        run: () => void scrollToHash("https://softwarelabs.vercel.app/"),
      },
      {
        id: "copy",
        group: "Quick actions",
        label: "Copy page link",
        icon: faCopy,
        keywords: "share url clipboard",
        run: () => void copyLink(),
      },
      {
        id: "github",
        group: "Quick actions",
        label: "Open GitHub",
        hint: "github.com/Paras367",
        icon: faTerminal,
        keywords: "code repo source profile",
        run: () => void window.open(GITHUB_URL, "_blank", "noopener,noreferrer"),
      },
    ];
  }, [copyLink]);

  const openPalette = () => {
    setOpen(false);
    setPaletteOpen(true);
  };

  const solid = scrolled || open;
  const isHidden = hidden && !open && !paletteOpen && !dropdown && !focusIn;

  return (
    <>
      {/* 1 ─ Scroll progress (width written straight to the DOM, zero re-renders) */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-lab-navy/50" aria-hidden="true">
        <div
          ref={progressRef}
          className="relative h-full bg-lab-accent"
          style={{
            width: "0%",
            boxShadow: "0 0 12px 2px rgba(91,155,213,0.6), 0 0 20px 4px rgba(91,155,213,0.3)",
          }}
        >
          <div className="absolute right-0 top-1/2 h-full w-20 -translate-y-1/2 bg-gradient-to-l from-lab-accent/50 to-transparent blur-sm" />
        </div>
      </div>

      {/* 2 ─ Mobile backdrop (tap outside to close) */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cx(
          "fixed inset-0 z-40 bg-lab-navy/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* 3 ─ Floating navbar */}
      <header
        ref={headerRef}
        data-lab-nav
        onClick={onHeaderClick}
        onKeyDown={(e) => open && trapTab(e, headerRef.current)}
        onFocusCapture={(e) => {
          if ((e.target as HTMLElement).matches(":focus-visible")) setFocusIn(true);
        }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusIn(false);
        }}
        className={cx(
          "fixed inset-x-0 top-4 z-50 mx-auto max-w-7xl px-4 transition-transform duration-500 sm:px-6 lg:px-8",
          isHidden ? "-translate-y-[140%]" : "translate-y-0"
        )}
        style={{ transitionTimingFunction: SPRING_EASE }}
      >
        <div
          className={cx(
            "relative rounded-xl border transition-all duration-500",
            solid
              ? "border-lab-accent/20 bg-lab-navy/85 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              : "border-white/10 bg-lab-navy/40 backdrop-blur-xl"
          )}
          style={{ transitionTimingFunction: SPRING_EASE }}
        >
          {/* decorative layers live in their own clipped box so the dropdown can overflow the bar */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <nav
            aria-label="Primary"
            className={cx(
              "relative flex items-center justify-between px-4 transition-all duration-500 sm:px-5",
              solid ? "h-12" : "h-14"
            )}
            style={{ transitionTimingFunction: SPRING_EASE }}
          >
            {/* Left: logo + status */}
            <div className="flex items-center gap-4">
              <a
                href="#home"
                aria-label="SOFTWARELABS — home"
                className={cx(
                  "relative z-10 rounded-md transition-transform duration-300 hover:scale-105 active:scale-95",
                  FOCUS_RING
                )}
              >
                <Logo />
              </a>

              <div className="group hidden cursor-default items-center gap-2 rounded-full border border-lab-accent/20 bg-lab-accent/5 px-2.5 py-1 xl:flex">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-lab-accent/80 transition-colors group-hover:text-lab-accent">
                  Systems Online
                </span>
              </div>
            </div>

            {/* Center: desktop links with sliding pill */}
            <ul
              className="relative hidden items-center gap-1 lg:flex"
              onMouseLeave={() => setHoverHref(null)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHoverHref(null);
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 rounded-lg bg-lab-accent/10 ring-1 ring-inset ring-lab-accent/20"
                style={{
                  left: pill?.left ?? 0,
                  width: pill?.width ?? 0,
                  opacity: pill?.show ? 1 : 0,
                  transition: pill?.instant
                    ? "opacity 200ms ease"
                    : `left 300ms ${SPRING_EASE}, width 300ms ${SPRING_EASE}, opacity 200ms ease`,
                }}
              />

              {NAV_LINKS.map((l) => {
                const hasMenu = l.label.toLowerCase().includes("product");
                const isActive = activeId !== "" && l.href === `#${activeId}`;
                const lit = isActive || hoverHref === l.href;

                return (
                  <li
                    key={l.href}
                    ref={(el) => {
                      itemRefs.current[l.href] = el;
                    }}
                    className="relative z-10"
                    onMouseEnter={() => {
                      setHoverHref(l.href);
                      if (hasMenu) openDropdown();
                    }}
                    onMouseLeave={() => hasMenu && scheduleClose()}
                    onFocus={() => setHoverHref(l.href)}
                    onBlur={(e) => {
                      if (hasMenu && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) {
                        setDropdown(false);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <a
                        href={l.href}
                        aria-current={isActive ? "location" : undefined}
                        className={cx(
                          "rounded-lg py-1.5 pl-3.5 text-sm font-medium transition-colors duration-300",
                          hasMenu ? "pr-1" : "pr-3.5",
                          lit ? "text-white" : "text-lab-ice/70",
                          FOCUS_RING
                        )}
                      >
                        {l.label}
                      </a>

                      {hasMenu && (
                        <button
                          ref={productBtnRef}
                          type="button"
                          aria-label="Toggle products menu"
                          aria-haspopup="true"
                          aria-expanded={dropdown}
                          aria-controls="products-menu"
                          onClick={() => setDropdown((v) => !v)}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              setDropdown(true);
                              requestAnimationFrame(() => dropdownRef.current?.querySelector("a")?.focus());
                            }
                          }}
                          className={cx(
                            "mr-1 grid size-7 place-items-center rounded-md transition-colors duration-300",
                            lit ? "text-white" : "text-lab-ice/60",
                            FOCUS_RING
                          )}
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={cx("size-2.5 transition-transform duration-300", dropdown && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>

                    {hasMenu && dropdown && (
                      /* pt-3 acts as an invisible hover bridge so the menu doesn't flicker shut */
                      <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                        <div
                          id="products-menu"
                          ref={dropdownRef}
                          onKeyDown={onMenuKey}
                          className="lab-pop relative rounded-xl border border-lab-accent/20 bg-lab-navy/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl"
                        >
                          <div className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-l border-t border-lab-accent/30 bg-lab-navy/95" />
                          <div className="mb-1 border-b border-white/5 px-3 py-2.5">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-lab-ice/40">
                              Core Offerings
                            </p>
                          </div>
                          {PRODUCTS.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              className={cx(
                                "group/item flex items-start gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-lab-accent/10 focus-visible:bg-lab-accent/10",
                                FOCUS_RING
                              )}
                            >
                              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-lab-blue/30 text-lab-accent transition-all duration-200 group-hover/item:bg-lab-accent group-hover/item:text-lab-navy group-hover/item:shadow-lg group-hover/item:shadow-lab-accent/20">
                                <FontAwesomeIcon icon={item.icon} className="size-3.5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-lab-ice transition-colors group-hover/item:text-lab-accent">
                                  {item.label}
                                </p>
                                <p className="mt-0.5 text-xs leading-relaxed text-lab-ice/50">{item.desc}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right: desktop actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={openPalette}
                aria-label={`Open search (${modKey} K)`}
                aria-haspopup="dialog"
                className={cx(
                  "group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-lab-ice/60 transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-accent/10 hover:text-lab-ice hover:shadow-[0_0_15px_-3px_rgba(91,155,213,0.25)]",
                  FOCUS_RING
                )}
              >
                <FontAwesomeIcon icon={faSearch} className="size-3" />
                <span className="hidden xl:inline">Search…</span>
                <kbd className="hidden items-center gap-1 rounded border border-white/10 bg-lab-navy px-1.5 py-0.5 font-mono text-[10px] text-lab-ice/50 transition-colors group-hover:border-lab-accent/30 xl:inline-flex">
                  {modKey} K
                </kbd>
              </button>

              <a
                href="#contact"
                className={cx(
                  "rounded-lg px-3.5 py-1.5 text-sm font-medium text-lab-ice/80 transition-all duration-300 hover:bg-white/5 hover:text-white",
                  FOCUS_RING
                )}
              >
                Contact
              </a>

              <ButtonLink
                href="#products"
                className="group relative overflow-hidden !bg-lab-accent !px-4 !py-1.5 font-bold !text-lab-navy shadow-lg shadow-lab-accent/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lab-accent/40 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  Explore
                  <FontAwesomeIcon
                    icon={faRocket}
                    className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </ButtonLink>
            </div>

            {/* Mobile: search + menu toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={openPalette}
                aria-label="Open search"
                aria-haspopup="dialog"
                className={cx(
                  "grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-lab-ice transition-all duration-300 hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-accent",
                  FOCUS_RING
                )}
              >
                <FontAwesomeIcon icon={faSearch} className="size-3.5" />
              </button>

              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className={cx(
                  "relative grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-lab-ice transition-all duration-300 hover:border-lab-accent/40 hover:bg-lab-accent/10 hover:text-lab-accent",
                  FOCUS_RING
                )}
              >
                <span className="relative size-4">
                  <FontAwesomeIcon
                    icon={faBars}
                    className={cx(
                      "absolute inset-0 size-4 transition-all duration-300",
                      open ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                    )}
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={cx(
                      "absolute inset-0 size-4 transition-all duration-300",
                      open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>

        {/* 4 ─ Mobile drawer (always mounted → real enter/exit transitions; `invisible` removes it from tab order) */}
        <div
          id="mobile-menu"
          aria-hidden={!open}
          className={cx(
            "absolute left-4 right-4 top-[calc(100%+8px)] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-xl border border-lab-accent/20 bg-lab-navy/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-3xl transition-all duration-300 sm:left-6 sm:right-6 lg:hidden",
            open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"
          )}
          style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(91,155,213,0.15), transparent 70%)" }}
        >
          <button
            type="button"
            onClick={openPalette}
            className={cx(
              "mb-5 flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-left text-lab-ice/60",
              FOCUS_RING
            )}
          >
            <FontAwesomeIcon icon={faSearch} className="size-3.5" />
            <span className="text-sm">Search sections, products…</span>
          </button>

          <ul className="divide-y divide-white/5 border-y border-white/5">
            {NAV_LINKS.map((l, i) => {
              const hasMenu = l.label.toLowerCase().includes("product");
              const isActive = activeId !== "" && l.href === `#${activeId}`;
              return (
                <li
                  key={l.href}
                  className={cx(
                    "transition-all duration-500 ease-out",
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  )}
                  style={{ transitionDelay: open ? `${i * 60 + 80}ms` : "0ms" }}
                >
                  <div className="flex items-center">
                    <a
                      href={l.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cx(
                        "group flex flex-1 items-center justify-between py-4 text-lg font-semibold transition-colors duration-300 hover:text-lab-accent",
                        isActive ? "text-lab-accent" : "text-lab-ice/90",
                        FOCUS_RING
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cx(
                            "size-1.5 rounded-full transition-all duration-300",
                            isActive ? "bg-lab-accent shadow-[0_0_8px_rgba(91,155,213,0.8)]" : "bg-white/15"
                          )}
                        />
                        {l.label}
                      </span>
                      {!hasMenu && (
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="size-4 opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                        />
                      )}
                    </a>
                    {hasMenu && (
                      <button
                        type="button"
                        aria-label="Toggle products list"
                        aria-expanded={mobileProducts}
                        aria-controls="mobile-products"
                        onClick={() => setMobileProducts((v) => !v)}
                        className={cx("grid size-10 place-items-center rounded-lg text-lab-ice/70", FOCUS_RING)}
                      >
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={cx("size-3.5 transition-transform duration-300", mobileProducts && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>

                  {hasMenu && (
                    <div
                      id="mobile-products"
                      className={cx(
                        "grid transition-all duration-300 ease-out",
                        mobileProducts ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className={cx("overflow-hidden", !mobileProducts && "invisible")}>
                        <div className="space-y-1 pb-3">
                          {PRODUCTS.map((p) => (
                            <a
                              key={p.label}
                              href={p.href}
                              className={cx(
                                "flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-lab-accent/10",
                                FOCUS_RING
                              )}
                            >
                              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-lab-blue/30 text-lab-accent">
                                <FontAwesomeIcon icon={p.icon} className="size-3.5" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-lab-ice">{p.label}</span>
                                <span className="block text-xs text-lab-ice/50">{p.desc}</span>
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div
            className={cx(
              "mt-6 flex flex-col gap-3 transition-all duration-500 ease-out",
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
            style={{ transitionDelay: open ? `${NAV_LINKS.length * 60 + 160}ms` : "0ms" }}
          >
            <ButtonLink href="#products" className="w-full justify-center !py-2.5 text-sm shadow-lg shadow-lab-accent/20">
              Explore Products
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" className="w-full justify-center !py-2.5 text-sm">
              Contact Us
            </ButtonLink>
          </div>

          <p className="mt-8 flex items-center gap-1 font-mono text-[10px] text-lab-ice/40">
            <span className="text-lab-accent">softwarelabs@build</span>:<span className="text-lab-accent/70">~</span>$ code.
            build. ship.
            <span className="ml-1 inline-block size-1.5 animate-pulse rounded-sm bg-lab-accent align-middle shadow-[0_0_8px_rgba(91,155,213,0.8)] motion-reduce:animate-none" />
          </p>
        </div>
      </header>

      {/* 5 ─ Command palette (outside <header> so backdrop-blur/transform never traps its fixed positioning) */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        items={paletteItems}
        modKey={modKey}
      />

      {/* 6 ─ Toast */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4"
      >
        {toast && (
          <div className="lab-pop rounded-lg border border-lab-accent/25 bg-lab-navy/95 px-4 py-2 text-sm text-lab-ice shadow-xl shadow-black/50 backdrop-blur-xl">
            {toast}
          </div>
        )}
      </div>

      <style>{`
        @keyframes lab-pop {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes lab-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .lab-pop  { animation: lab-pop 0.2s ease-out both; }
        .lab-fade { animation: lab-fade 0.2s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .lab-pop, .lab-fade { animation: none; }
          [data-lab-nav], [data-lab-nav] * { transition-duration: 0.01ms !important; transition-delay: 0ms !important; }
        }
      `}</style>
    </>
  );
}