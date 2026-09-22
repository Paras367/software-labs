"use client";

import { useEffect, useState } from "react";
import { Cursor } from "@/components/ui";

const LINES = [
  { text: "Initializing project", ok: true, delay: 550 },
  { text: "Installing dependencies", ok: true, delay: 950 },
  { text: "Configuring architecture", ok: true, delay: 650 },
  { text: "Building components", ok: true, delay: 800 },
] as const;

const LABELS = ["NEXT.JS", "REACT", "TYPESCRIPT", "SUPABASE", "AI"];

/**
 * Terminal panel: the boot lines type in once on mount (progressive —
 * server renders every line already so it never looks broken without JS),
 * then a blinking cursor idles. Kept to one animation pass per the
 * "single orchestrated moment" rule rather than looping forever.
 */
export function TerminalPanel() {
  const [shown, setShown] = useState<number>(LINES.length);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setShown(0);
    setReady(false);
    const timers = LINES.map((l, i) =>
      setTimeout(() => {
        setShown(i + 1);
        if (i === LINES.length - 1) setTimeout(() => setReady(true), 260);
      }, LINES.slice(0, i + 1).reduce((a, b) => a + b.delay, 0)),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative">
      <div
        className="crop relative rounded-xl border border-lab-accent/25 bg-[#081b34]/90 p-5 font-mono text-[13px] shadow-glow backdrop-blur-sm sm:p-6"
        role="img"
        aria-label="Terminal showing a SOFTWARELABS project being initialized and marked ready"
      >
        <div className="mb-4 flex items-center justify-between border-b border-lab-accent/15 pb-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-lab-accent/30" />
            <span className="size-2.5 rounded-full bg-lab-accent/30" />
            <span className="size-2.5 rounded-full bg-lab-accent/50" />
          </div>
          <span className="text-[11px] tracking-wide text-lab-ice/45">SOFTWARELABS_TERMINAL</span>
        </div>

        <p className="text-lab-ice/85">
          <span className="text-lab-accent">$</span> npm create softwarelabs@latest
        </p>

        <ul className="mt-3 space-y-1.5">
          {LINES.map((l, i) => (
            <li key={l.text} className={i < shown ? "text-lab-ice/70" : "text-transparent"} aria-hidden={i >= shown}>
              <span className="text-emerald-400">✓</span> {l.text}
            </li>
          ))}
        </ul>

        <p className={`mt-4 font-semibold tracking-wide text-lab-accent transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
          STATUS: READY
        </p>

        <p className="mt-3 text-lab-ice/85">
          <span className="text-lab-accent">$</span> <Cursor />
        </p>
      </div>

      <ul aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {LABELS.map((label, i) => {
          const pos = [
            "-left-14 top-6",
            "-right-10 top-24",
            "-left-10 bottom-24",
            "-right-16 bottom-10",
            "left-1/2 -top-6",
          ][i];
          return (
            <li
              key={label}
              className={`absolute ${pos} animate-float rounded-md border border-lab-accent/25 bg-lab-blue/60 px-2.5 py-1 font-mono text-[10px] tracking-wider text-lab-ice/70 shadow-glow-sm`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
