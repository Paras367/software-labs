/**
 * Single source of truth for site-wide constants.
 * TODO before launch: set NEXT_PUBLIC_SITE_URL and replace CONTACT_EMAIL.
 */
export const SITE = {
  name: "SOFTWARELABS",
  tagline: "Code. Build. Ship.",
  title: "SOFTWARELABS — Code. Build. Ship.",
  description:
    "SoftwareLabs builds and sells production-ready software, source code, developer tools and digital products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://softwarelabs.dev",
  email: "hello@softwarelabs.dev", // placeholder — swap for your real inbox
  github: "https://github.com/Paras367",
  authorName: "Paras Dhiman",
  authorHandle: "CyberVex",
  year: 2026,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Developers", href: "#developers" },
  { label: "About", href: "#about" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "Source Code", href: "#products" },
      { label: "Templates", href: "#products" },
      { label: "Developer Tools", href: "#products" },
      { label: "AI Products", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Engineering", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#developers" },
      { label: "GitHub", href: "https://github.com/Paras367", external: true },
      { label: "API", href: "#developers" },
      { label: "Changelog", href: "#developers" },
    ],
  },
  {
    title: "Social",
    links: [
      // Swap these for the real SOFTWARELABS profiles.
      { label: "GitHub", href: "https://github.com/Paras367", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
      { label: "Instagram", href: "https://www.instagram.com", external: true },
      { label: "X", href: "https://x.com", external: true },
    ],
  },
] as ReadonlyArray<{
  title: string;
  links: ReadonlyArray<{ label: string; href: string; external?: boolean }>;
}>;
