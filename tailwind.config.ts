import type { Config } from "tailwindcss";

/**
 * SOFTWARELABS design tokens.
 * Four brand colours, nothing else. Everything else is a transparent
 * version of these (use the /opacity syntax: bg-lab-accent/10).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lab: {
          navy: "#0B2545", // main background, navbar, footer
          blue: "#134074", // cards, buttons, secondary surfaces
          accent: "#5B9BD5", // highlights, glows, borders, icons
          ice: "#DCEAF7", // light sections, text on dark
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
        glow: "0 0 0 1px rgba(91,155,213,.55), 0 18px 48px -14px rgba(91,155,213,.5)",
        "glow-sm": "0 0 24px -4px rgba(91,155,213,.55)",
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
          "0%": { boxShadow: "0 0 0 0 rgba(91,155,213,.55)" },
          "100%": { boxShadow: "0 0 0 8px rgba(91,155,213,0)" },
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
      },
    },
  },
  plugins: [],
};

export default config;
