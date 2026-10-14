import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                 CONTAINER                                  */
/* -------------------------------------------------------------------------- */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div 
      className={cx(
        "relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 scroll-mt-24", 
        className
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                BUTTON LINK                                 */
/* -------------------------------------------------------------------------- */

type Variant = "primary" | "secondary" | "dark" | "outline-dark";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent focus-visible:ring-offset-2 focus-visible:ring-offset-lab-navy";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-lab-accent text-lab-navy shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.9)] " +
    // Premium Shine Effect
    "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent " +
    "before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full " +
    // Inner Ring on Hover
    "after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/0 after:transition-all after:duration-300 hover:after:ring-white/40",
  
  secondary:
    "border border-lab-accent/30 bg-lab-blue/20 text-lab-ice backdrop-blur-md " +
    "hover:border-lab-accent/60 hover:bg-lab-accent/10 hover:text-lab-accent hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]",
  
  dark: 
    "bg-lab-navy text-lab-ice border border-white/10 " +
    "hover:bg-lab-blue hover:border-white/20 hover:shadow-xl hover:shadow-black/40",
  
  "outline-dark":
    "border border-lab-navy/30 text-lab-navy bg-lab-ice/90 " +
    "hover:border-lab-navy hover:bg-lab-ice hover:text-lab-navy hover:shadow-lg hover:shadow-black/10",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  external = false,
  arrow = true,
  className,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cx(BASE, VARIANTS[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative z-10 size-4 transition-all duration-300 ease-out 
                     group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 group-hover/btn:scale-110"
        />
      )}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SECTION HEADING                               */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  path,
  lines,
  children,
  tone = "dark",
  className,
}: {
  path: string;
  lines: string[];
  children?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  
  return (
    <header className={cx("max-w-3xl relative", className)} data-reveal>
      {/* Terminal-style Path Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <span className={cx("h-px w-8 transition-all duration-500", light ? "bg-lab-blue/40" : "bg-lab-accent/40")} />
        <p className={cx("font-mono text-xs uppercase tracking-widest flex items-center gap-2", light ? "text-lab-blue" : "text-lab-accent")}>
          <span className="text-lab-accent/50 font-bold">➜</span>
          <span className={cx("size-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]", light ? "bg-lab-blue text-lab-blue" : "bg-lab-accent text-lab-accent")} />
          <span className="opacity-60">~/</span>
          <span className="font-semibold">{path}</span>
        </p>
      </div>
      
      {/* Main Heading with Gradient Text */}
      <h2
        className={cx(
          "text-[clamp(2rem,5.2vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-tight",
          light ? "text-lab-navy" : "text-lab-ice",
        )}
      >
        {lines.map((l, i) => (
          <span 
            key={l} 
            className={cx(
              "block",
              i === lines.length - 1 && "bg-clip-text text-transparent",
              i === lines.length - 1 && (light 
                ? "bg-gradient-to-r from-lab-navy to-lab-navy/60" 
                : "bg-gradient-to-r from-lab-ice via-lab-ice to-lab-accent"
              )
            )}
          >
            {l}
          </span>
        ))}
      </h2>
      
      {/* Subtitle */}
      {children && (
        <p className={cx("mt-6 max-w-xl text-base leading-relaxed sm:text-lg font-light", light ? "text-lab-blue/80" : "text-lab-ice/70")}>
          {children}
        </p>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 CURSOR                                     */
/* -------------------------------------------------------------------------- */

/** 
 * Blinking terminal block cursor. 
 * Uses Tailwind's built-in animate-pulse to avoid server-side build crashes.
 */
export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        "ml-1 inline-block h-[1.1em] w-[0.6em] translate-y-[0.15em] rounded-[1px] bg-lab-accent animate-pulse shadow-[0_0_12px_2px_rgba(99,102,241,0.6)]",
        className
      )}
    />
  );
}