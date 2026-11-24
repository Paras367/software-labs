import type { Config } from "tailwindcss";

/**
 * SOFTWARELABS design tokens.
 * Vibrant, modern color palette driven by CSS variables in globals.css.
 * Use opacity syntax for transparency (e.g., bg-lab-accent/10).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lab: {
          navy: "var(--lab-navy)",       // Deep background, navbar, footer
          blue: "var(--lab-blue)",       // Cards, buttons, secondary surfaces
          ice: "var(--lab-ice)",         // Bright, clean text (improved contrast)
          slate: "var(--lab-slate)",     // Muted text for descriptions
          accent: "var(--lab-accent)",   // Electric Indigo (Primary highlights, glows)
          cyan: "var(--lab-cyan)",       // Vibrant Cyan (Tech highlights, icons)
          success: "var(--lab-success)", // Emerald Green (Online, Success, Production)
          warning: "var(--lab-warning)", // Amber/Orange (Trending, Beta, Warning)
          danger: "var(--lab-danger)",   // Rose Red (Sale, Errors, Critical)
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        display: "-0.045em",
      },
      boxShadow: {
        // Updated to use the new vibrant indigo/cyan glows
        glow: "0 0 0 1px rgba(129,140,248,.55), 0 18px 48px -14px rgba(129,140,248,.5)",
        "glow-sm": "0 0 24px -4px rgba(129,140,248,.55)",
        "glow-accent": "0 0 20px -5px rgba(129, 140, 248, 0.5)",
        "glow-cyan": "0 0 20px -5px rgba(34, 211, 238, 0.4)",
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%,100%": { opacity: ".15" },
          "50%": { opacity: ".85" },
        },
        trace: { to: { strokeDashoffset: "-640" } },
        drift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          // Updated from old blue to vibrant indigo
          "0%": { boxShadow: "0 0 0 0 rgba(129,140,248,.55)" },
          "100%": { boxShadow: "0 0 0 8px rgba(129,140,248,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        blink: "blink 1.05s steps(1) infinite",
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        trace: "trace 9s linear infinite",
        drift: "drift 18s ease-in-out infinite",
        rise: "rise .8s cubic-bezier(.2,.7,.2,1) both",
        "pulse-dot": "pulseDot 2s ease-out infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
