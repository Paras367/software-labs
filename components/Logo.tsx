import { cx } from "@/lib/utils";

/** Squared "S" drawn from two bracket strokes — top half ice, bottom half accent. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="7" stroke="#5B9BD5" strokeOpacity=".55" strokeWidth="1.5" />
      <path d="M22.5 9.5H11v6.5h5" stroke="#DCEAF7" strokeWidth="2.6" strokeLinejoin="miter" />
      <path d="M16 16h5.5v6.5H9.5" stroke="#5B9BD5" strokeWidth="2.6" strokeLinejoin="miter" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-8" />
      <span className="text-[15px] font-extrabold tracking-[-0.03em] text-lab-ice">
        SOFTWARE<span className="text-lab-accent">LABS</span>
      </span>
    </span>
  );
}
