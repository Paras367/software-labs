/** Fine grid + radial glow + dot scatter + one traced circuit path. Pure SVG/CSS, no JS. */
export function HeroBackground() {
  const dots = [
    [8, 14], [22, 62], [38, 24], [52, 78], [64, 12], [78, 48], [90, 30], [15, 88], [70, 90], [46, 6],
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark mask-radial" />
      <div className="glow-field absolute inset-0" />
      <div className="sheen absolute inset-0 animate-drift opacity-60" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path
          d="M0 70 H22 V40 H48 V58 H100"
          fill="none"
          stroke="#5B9BD5"
          strokeWidth="0.15"
          strokeDasharray="1.4 2.2"
          className="animate-trace"
          pathLength={640}
        />
      </svg>

      {dots.map(([x, y], i) => (
        <span
          key={`${x}-${y}`}
          className="absolute size-1 rounded-full bg-lab-accent animate-twinkle"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.45}s` }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-lab-navy to-transparent" />
    </div>
  );
}
