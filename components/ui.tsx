import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

type Variant = "primary" | "secondary" | "dark" | "outline-dark";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent focus-visible:ring-offset-2 focus-visible:ring-offset-lab-navy";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-lab-accent text-lab-navy shadow-lg shadow-lab-accent/20 hover:shadow-xl hover:shadow-lab-accent/40 " +
    "before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-[20deg] before:bg-white/40 " +
    "before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-[420%] " +
    "after:absolute after:inset-0 after:rounded-md after:ring-1 after:ring-inset after:ring-white/0 after:transition-all after:duration-300 hover:after:ring-white/30",
  secondary:
    "border border-lab-accent/40 bg-lab-blue/30 text-lab-ice backdrop-blur-md hover:border-lab-accent hover:bg-lab-blue/50 hover:shadow-lg hover:shadow-lab-accent/20",
  dark: "bg-lab-navy text-lab-ice border border-white/5 hover:bg-lab-blue hover:border-white/10 hover:shadow-xl hover:shadow-black/30",
  "outline-dark":
    "border border-lab-navy/30 text-lab-navy hover:border-lab-navy hover:bg-lab-navy hover:text-lab-ice hover:shadow-lg hover:shadow-black/10",
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
          className="relative z-10 size-4 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 group-hover/btn:scale-110"
        />
      )}
    </a>
  );
}

/**
 * Section heading. `path` renders like a file path (~/solutions) so the label
 * tells you where you are in the "repo" rather than just decorating.
 */
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
      <div className="flex items-center gap-3 mb-6">
        <span className={cx("h-px w-8", light ? "bg-lab-blue/40" : "bg-lab-accent/40")} />
        <p className={cx("font-mono text-xs uppercase tracking-widest flex items-center gap-2", light ? "text-lab-blue" : "text-lab-accent")}>
          <span className={cx("size-1.5 rounded-full animate-pulse", light ? "bg-lab-blue" : "bg-lab-accent")} />
          {`~/${path}`}
        </p>
      </div>
      
      <h2
        className={cx(
          "text-[clamp(2rem,5.2vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-display",
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
                ? "bg-gradient-to-r from-lab-navy to-lab-navy/50" 
                : "bg-gradient-to-r from-lab-ice to-lab-accent"
              )
            )}
          >
            {l}
          </span>
        ))}
      </h2>
      {children && (
        <p className={cx("mt-6 max-w-xl text-base leading-relaxed sm:text-lg font-light", light ? "text-lab-blue/80" : "text-lab-ice/70")}>
          {children}
        </p>
      )}
    </header>
  );
}

/** Blinking terminal block cursor with a color-matched glow. */
export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        "ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-lab-accent animate-blink shadow-[0_0_12px_2px_var(--tw-shadow-color)] shadow-lab-accent/60",
        className
      )}
    />
  );
}