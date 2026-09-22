import type { PreviewKind } from "@/lib/products";

/**
 * Abstract, brand-coloured "screenshot" for each product — built from
 * shapes, not a stock photo, so every card stays on-palette and feels
 * like a real interface sketch rather than template chrome.
 */
export function ProductPreview({ kind }: { kind: PreviewKind }) {
  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="190" fill="#081b34" />
      <rect width="320" height="190" fill="url(#dotgrid)" opacity="0.5" />
      <defs>
        <pattern id="dotgrid" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#5B9BD5" opacity="0.35" />
        </pattern>
      </defs>
      {kind === "saas" && (
        <g>
          <rect x="18" y="18" width="72" height="154" rx="6" fill="#134074" />
          {[42, 62, 82, 102].map((y) => (
            <rect key={y} x="30" y={y} width="48" height="7" rx="2" fill="#5B9BD5" opacity="0.55" />
          ))}
          <rect x="104" y="18" width="198" height="70" rx="6" fill="#134074" opacity="0.7" />
          <polyline points="112,74 140,50 168,62 196,34 224,54 252,40 280,58" fill="none" stroke="#5B9BD5" strokeWidth="2.5" />
          <rect x="104" y="96" width="94" height="76" rx="6" fill="#134074" opacity="0.7" />
          <rect x="206" y="96" width="96" height="76" rx="6" fill="#134074" opacity="0.7" />
        </g>
      )}
      {kind === "ai" && (
        <g>
          <circle cx="160" cy="95" r="46" fill="none" stroke="#5B9BD5" strokeWidth="1.4" opacity="0.6" />
          <circle cx="160" cy="95" r="30" fill="none" stroke="#5B9BD5" strokeWidth="1.4" opacity="0.4" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = 46;
            const x = 160 + r * Math.cos((deg * Math.PI) / 180);
            const y = 95 + r * Math.sin((deg * Math.PI) / 180);
            return <circle key={deg} cx={x} cy={y} r="3.5" fill="#DCEAF7" />;
          })}
          <rect x="20" y="150" width="280" height="24" rx="5" fill="#134074" />
          <rect x="30" y="158" width="140" height="8" rx="3" fill="#5B9BD5" opacity="0.6" />
        </g>
      )}
      {kind === "portfolio" && (
        <g>
          <circle cx="52" cy="60" r="20" fill="#134074" stroke="#5B9BD5" strokeWidth="1.5" />
          <rect x="86" y="46" width="120" height="10" rx="3" fill="#DCEAF7" opacity="0.85" />
          <rect x="86" y="64" width="80" height="7" rx="3" fill="#5B9BD5" opacity="0.5" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={20 + i * 100} y="104" width="86" height="66" rx="6" fill="#134074" opacity="0.7" />
          ))}
        </g>
      )}
      {kind === "commerce" && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={20 + i * 74} y="20" width="62" height="62" rx="6" fill="#134074" />
              <rect x={20 + i * 74} y="88" width="62" height="8" rx="3" fill="#DCEAF7" opacity="0.7" />
              <rect x={20 + i * 74} y="100" width="34" height="8" rx="3" fill="#5B9BD5" opacity="0.7" />
            </g>
          ))}
          <rect x="20" y="130" width="280" height="40" rx="6" fill="#134074" opacity="0.6" />
          <rect x="34" y="146" width="120" height="8" rx="3" fill="#5B9BD5" />
        </g>
      )}
      {kind === "admin" && (
        <g>
          <rect x="18" y="18" width="60" height="154" rx="6" fill="#134074" />
          <rect x="94" y="18" width="208" height="34" rx="6" fill="#134074" opacity="0.7" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={94 + i * 72} y="62" width="62" height="46" rx="6" fill="#134074" opacity="0.7" />
          ))}
          <rect x="94" y="118" width="208" height="52" rx="6" fill="#134074" opacity="0.5" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={106 + i * 36} y={128 + (i % 2 === 0 ? 0 : 10)} width="20" height={30 - (i % 2 === 0 ? 0 : 10)} fill="#5B9BD5" opacity="0.6" />
          ))}
        </g>
      )}
      {kind === "tools" && (
        <g fontFamily="monospace" fontSize="9" fill="#5B9BD5">
          <rect x="18" y="18" width="284" height="154" rx="6" fill="#0B2545" stroke="#5B9BD5" strokeOpacity="0.3" />
          <text x="30" y="40">import {`{ tool }`} from &quot;@labs/ai&quot;</text>
          <text x="30" y="58" fill="#DCEAF7" opacity="0.8">const result = await tool.run({`{`}</text>
          <text x="42" y="74">mode: &quot;production&quot;,</text>
          <text x="42" y="90">stream: true,</text>
          <text x="30" y="106" fill="#DCEAF7" opacity="0.8">{`});`}</text>
          <text x="30" y="130" fill="#5B9BD5" opacity="0.7">{"// ✓ 3 tools connected"}</text>
        </g>
      )}
    </svg>
  );
}
