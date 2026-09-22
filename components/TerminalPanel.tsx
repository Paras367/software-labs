"use client";

import { useEffect, useState } from "react";
import { Cursor } from "@/components/ui";

const LINES = [
  { text: "Initializing project architecture", ok: true, delay: 550 },
  { text: "Installing core dependencies", ok: true, delay: 950 },
  { text: "Configuring environment variables", ok: true, delay: 650 },
  { text: "Building production components", ok: true, delay: 800 },
] as const;

const LABELS = ["NEXT.JS", "REACT", "TYPESCRIPT", "SUPABASE", "AI"];

export function TerminalPanel() {
  const [shown, setShown] = useState<number>(LINES.length);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setShown(0);
    setReady(false);
    const timers = LINES.map((l, i) =>
      setTimeout(() => {
        setShown(i + 1);
        if (i === LINES.length - 1) setTimeout(() => setReady(true), 400);
      }, LINES.slice(0, i + 1).reduce((a, b) => a + b.delay, 0)),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative group">
      {/* Ambient Glow Behind Terminal */}
      <div className="absolute -inset-4 bg-gradient-to-r from-lab-accent/20 via-lab-blue/20 to-lab-accent/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-1000 pointer-events-none" />

      <div className="relative">
        {/* Main Terminal Shell */}
        <div
          className="relative rounded-xl border border-lab-accent/30 bg-[#081b34]/90 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl"
          role="img"
          aria-label="Terminal showing a SOFTWARELABS project being initialized"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />

          {/* Terminal Header (macOS style) */}
          <div className="relative flex items-center justify-between border-b border-lab-accent/20 bg-lab-navy/80 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-transform hover:scale-110" />
                <span className="size-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)] transition-transform hover:scale-110" />
                <span className="size-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-transform hover:scale-110" />
              </div>
              <span className="text-[11px] font-medium text-lab-ice/40 tracking-wide">~/softwarelabs — zsh</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-lab-accent/80">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-lab-accent/10 border border-lab-accent/20">
                <span className="size-1.5 rounded-full bg-lab-accent animate-pulse" /> 
                LIVE
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="relative p-5 sm:p-6 font-mono text-[13px] min-h-[260px]">
            {/* Initial Command */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lab-accent font-bold">➜</span>
              <span className="text-blue-400">~/projects</span>
              <span className="text-lab-ice/90">npm create softwarelabs@latest</span>
            </div>

            {/* Execution Logs */}
            <ul className="space-y-2.5">
              {LINES.map((l, i) => (
                <li 
                  key={l.text} 
                  className={`flex items-start gap-3 transition-all duration-500 ease-out ${
                    i < shown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  aria-hidden={i >= shown}
                >
                  <span className="text-lab-ice/20 text-[11px] mt-0.5 font-mono">
                    [{String(i + 1).padStart(2, "0")}:00]
                  </span>
                  {l.ok ? (
                    <span className="flex items-center gap-2.5 text-lab-ice/80">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {l.text}
                    </span>
                  ) : (
                    <span className="text-lab-ice/80">{l.text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* System Ready Badge */}
            <div className={`mt-8 flex items-center gap-4 transition-all duration-700 ease-out ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lab-accent/50 to-transparent" />
              <span className="px-4 py-1.5 rounded-full bg-lab-accent/10 border border-lab-accent/40 text-[11px] font-bold tracking-widest text-lab-accent uppercase flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]">
                <span className="size-1.5 rounded-full bg-lab-accent animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                System Ready
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-lab-accent/50 to-transparent" />
            </div>

            {/* Active Prompt */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-lab-accent font-bold">➜</span>
              <span className="text-blue-400">~/softwarelabs</span>
              <Cursor />
            </div>
          </div>

          {/* Terminal Footer (VS Code Style Metrics) */}
          <div className="relative flex items-center justify-between border-t border-lab-accent/20 bg-lab-navy/90 px-4 py-2 text-[10px] font-mono text-lab-ice/40 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <span>CPU: <span className="text-lab-accent font-medium">12%</span></span>
              <span>MEM: <span className="text-lab-accent font-medium">48MB</span></span>
              <span>NET: <span className="text-lab-accent font-medium">1.2GB/s</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span className="text-lab-accent/30">|</span>
              <span>TypeScript</span>
              <span className="text-lab-accent/30">|</span>
              <span className="flex items-center gap-1 text-lab-accent/60">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure
              </span>
            </div>
          </div>
        </div>

        {/* Holographic Floating Labels */}
        <ul aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {LABELS.map((label, i) => {
            const pos = [
              "-left-16 top-10",
              "-right-12 top-28",
              "-left-12 bottom-32",
              "-right-20 bottom-16",
              "left-1/2 -top-8 -translate-x-1/2",
            ][i];
            return (
              <li
                key={label}
                className={`absolute ${pos} animate-[float_6s_ease-in-out_infinite] rounded-lg border border-lab-accent/30 bg-lab-navy/80 px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-lab-ice/80 shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] backdrop-blur-md`}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className="text-lab-accent mr-1.5">●</span>
                {label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Inline Keyframes for Floating Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}