import Image from "next/image";
import type { Product, PreviewKind } from "@/lib/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCode } from "@fortawesome/free-solid-svg-icons";

interface ProductPreviewProps {
  product: Product;
  className?: string;
}

export function ProductPreview({ product, className = "" }: ProductPreviewProps) {
  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-lab-navy group ${className}`}>
      
      {/* 1. Floating Badges (Updated to match new simplified types) */}
      {product.badges.length > 0 && (
        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm backdrop-blur-md border transition-all duration-300 ${
                badge === "New" 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                  : badge === "Open Source" 
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30" 
                  : "bg-lab-accent/10 text-lab-accent border-lab-accent/30" // Production Ready
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* 2. Primary Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src={product.image}
          alt={`${product.name} preview`}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) parent.querySelector(".svg-fallback")?.classList.remove("hidden");
          }}
        />
      </div>

      {/* 3. Abstract SVG Fallback */}
      <div className="svg-fallback absolute inset-0 z-0 hidden">
        <AbstractPreview kind={product.preview} />
      </div>

      {/* 4. Premium Hover Overlay with Actions */}
      <div className="absolute inset-0 z-20 bg-lab-navy/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
        <a 
          href={product.links.demo} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-lab-accent text-lab-navy text-xs font-bold shadow-lg shadow-lab-accent/20 hover:scale-105 active:scale-95 transition-transform"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} className="size-3" />
          Live Demo
        </a>
        {product.links.repo && (
          <a 
            href={product.links.repo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-lab-blue border border-lab-accent/30 text-lab-ice text-xs font-bold hover:bg-lab-accent/10 hover:border-lab-accent hover:text-lab-accent transition-all"
          >
            <FontAwesomeIcon icon={faCode} className="size-3" />
            Source
          </a>
        )}
      </div>

      {/* 5. Premium Shine Effect on Hover */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>

      {/* 6. Gradient Overlay & Hover Border Glow */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-lab-navy via-lab-navy/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-30 rounded-t-xl border border-transparent transition-all duration-500 group-hover:border-lab-accent/40 group-hover:shadow-[inset_0_0_30px_-5px_rgba(99,102,241,0.2)] pointer-events-none" />
    </div>
  );
}

function AbstractPreview({ kind }: { kind: PreviewKind }) {
  const accent = "#6366f1";
  const navy = "#081b34";
  const blue = "#134074";
  const ice = "#e2e8f0";

  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="200" fill={navy} />
      <rect width="320" height="200" fill="url(#dotgrid)" opacity="0.4" />
      <defs>
        <pattern id="dotgrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={accent} opacity="0.3" />
        </pattern>
      </defs>
      {kind === "saas" && (
        <g>
          <rect x="16" y="16" width="72" height="168" rx="6" fill={blue} />
          {[40, 64, 88, 112].map((y) => <rect key={y} x="28" y={y} width="48" height="6" rx="2" fill={accent} opacity="0.4" />)}
          <rect x="104" y="16" width="200" height="72" rx="6" fill={blue} opacity="0.6" />
          <polyline points="112,72 144,48 176,60 208,32 240,52 272,38 296,56" fill="none" stroke={accent} strokeWidth="2" />
          <rect x="104" y="100" width="96" height="84" rx="6" fill={blue} opacity="0.6" />
          <rect x="212" y="100" width="92" height="84" rx="6" fill={blue} opacity="0.6" />
        </g>
      )}
      {kind === "ai" && (
        <g>
          <circle cx="160" cy="90" r="48" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
          <circle cx="160" cy="90" r="32" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.3" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = 48;
            const x = 160 + r * Math.cos((deg * Math.PI) / 180);
            const y = 90 + r * Math.sin((deg * Math.PI) / 180);
            return <circle key={deg} cx={x} cy={y} r="3" fill={ice} opacity="0.8" />;
          })}
          <rect x="24" y="152" width="272" height="28" rx="6" fill={blue} />
          <rect x="36" y="162" width="120" height="8" rx="3" fill={accent} opacity="0.6" />
        </g>
      )}
      {kind === "portfolio" && (
        <g>
          <circle cx="56" cy="56" r="24" fill={blue} stroke={accent} strokeWidth="1.5" />
          <rect x="96" y="44" width="120" height="10" rx="3" fill={ice} opacity="0.7" />
          <rect x="96" y="64" width="80" height="8" rx="3" fill={accent} opacity="0.5" />
          {[0, 1, 2].map((i) => <rect key={i} x={24 + i * 96} y="104" width="80" height="72" rx="6" fill={blue} opacity="0.6" />)}
        </g>
      )}
      {kind === "commerce" && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={24 + i * 72} y="24" width="56" height="56" rx="6" fill={blue} />
              <rect x={24 + i * 72} y="92" width="56" height="8" rx="3" fill={ice} opacity="0.6" />
              <rect x={24 + i * 72} y="108" width="32" height="8" rx="3" fill={accent} opacity="0.6" />
            </g>
          ))}
          <rect x="24" y="144" width="272" height="36" rx="6" fill={blue} opacity="0.5" />
          <rect x="36" y="158" width="100" height="8" rx="3" fill={accent} />
        </g>
      )}
      {kind === "admin" && (
        <g>
          <rect x="16" y="16" width="64" height="168" rx="6" fill={blue} />
          <rect x="96" y="16" width="208" height="36" rx="6" fill={blue} opacity="0.6" />
          {[0, 1, 2].map((i) => <rect key={i} x={96 + i * 68} y="64" width="56" height="48" rx="6" fill={blue} opacity="0.6" />)}
          <rect x="96" y="124" width="208" height="60" rx="6" fill={blue} opacity="0.4" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={108 + i * 36} y={136 + (i % 2 === 0 ? 0 : 12)} width="20" height={36 - (i % 2 === 0 ? 0 : 12)} fill={accent} opacity="0.5" />)}
        </g>
      )}
      {kind === "tools" && (
        <g fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontSize="9" fill={accent}>
          <rect x="16" y="16" width="288" height="168" rx="6" fill="#0B2545" stroke={accent} strokeOpacity="0.3" />
          <text x="28" y="40">import {"{ tool }"} from "@labs/ai"</text>
          <text x="28" y="60" fill={ice} opacity="0.8">const result = await tool.run({"{"}</text>
          <text x="40" y="78">mode: "production",</text>
          <text x="40" y="96">stream: true,</text>
          <text x="28" y="114" fill={ice} opacity="0.8">{"}"});</text>
          <text x="28" y="140" fill={accent} opacity="0.7">{"// ✓ 3 tools connected"}</text>
        </g>
      )}
    </svg>
  );
}
