import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

type Variant = "primary" | "secondary" | "dark" | "outline-dark";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-lab-accent text-lab-navy shadow-glow-sm hover:bg-lab-ice " +
    "before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-[20deg] before:bg-white/40 " +
    "before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-[420%]",
  secondary:
    "border border-lab-accent/40 bg-lab-blue/30 text-lab-ice hover:border-lab-accent hover:bg-lab-blue/70",
  dark: "bg-lab-navy text-lab-ice hover:bg-lab-blue",
  "outline-dark":
    "border border-lab-navy/30 text-lab-navy hover:border-lab-navy hover:bg-lab-navy hover:text-lab-ice",
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
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
    <header className={cx("max-w-3xl", className)} data-reveal>
      <p className={cx("font-mono text-xs", light ? "text-lab-blue" : "text-lab-accent")}>{`~/${path}`}</p>
      <h2
        className={cx(
          "mt-4 text-[clamp(2rem,5.2vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-display",
          light ? "text-lab-navy" : "text-lab-ice",
        )}
      >
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h2>
      {children && (
        <p className={cx("mt-5 max-w-xl text-base leading-relaxed sm:text-lg", light ? "text-lab-blue" : "text-lab-ice/70")}>
          {children}
        </p>
      )}
    </header>
  );
}

/** Blinking terminal block cursor. */
export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx("ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-lab-accent animate-blink", className)}
    />
  );
}
