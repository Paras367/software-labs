/**
 * Single source of truth for site-wide constants.
 * SoftwareLabs — Engineered with intent.
 * 
 * TODO before launch: 
 * 1. Set NEXT_PUBLIC_SITE_URL in your .env.local
 * 2. Replace placeholder social URLs with actual SoftwareLabs profiles
 * 3. Update CONTACT_EMAIL to a real business address
 */

import { 
  faGithub, 
  faLinkedin, 
  faInstagram, 
  faXTwitter, 
  faDribbble,
  type IconDefinition 
} from "@fortawesome/free-brands-svg-icons";

export const SITE = {
  name: "SOFTWARELABS",
  tagline: "Code. Build. Ship.",
  title: "SOFTWARELABS — Code. Build. Ship.",
  description:
    "SoftwareLabs engineers production-ready software, premium source code, developer tools, and scalable digital products for the modern web.",
  keywords: "software development, developer tools, AI systems, Next.js, React, TypeScript, source code, SaaS boilerplates",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://softwarelabs.vercel.app",
  email: "softwarelabschd@gmail.com", 
  
  // Kept at the root for backward compatibility with Hero.tsx and Footer.tsx
  github: "https://github.com/Paras367", 

  // Centralized Author & Brand Info
  authorName: "Paras Dhiman",
  authorHandle: "CyberVex",
  year: new Date().getFullYear(), // Automatically updates

 
  socials: {
    github: "https://github.com/Paras367",
    linkedin: "#", 
    instagram: "#",
    twitter: "#", 
    dribbble: "#", 
  } as const,
} as const;

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { label: "Home", href: "#home", description: "Return to the main dashboard" },
  { label: "Products", href: "#products", description: "Explore our premium source code & tools" },
  { label: "Solutions", href: "#solutions", description: "Custom software engineering services" },
  { label: "Developers", href: "#developers", description: "APIs, docs, and open-source resources" },
  { label: "About", href: "#about", description: "Our mission, culture, and engineering principles" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                    Footer                                  */
/* -------------------------------------------------------------------------- */

type FooterLink = { 
  label: string; 
  href: string; 
  external?: boolean;
  icon?: IconDefinition; 
};

type FooterColumn = {
  title: string;
  links: ReadonlyArray<FooterLink>;
};

export const FOOTER_COLUMNS: ReadonlyArray<FooterColumn> = [
  {
    title: "Products",
    links: [
      { label: "Source Code", href: "#products" },
      { label: "SaaS Templates", href: "#products" },
      { label: "Developer Tools", href: "#products" },
      { label: "AI Integrations", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Engineering Process", href: "#process" },
      { label: "Get in Touch", href: "#contact" },
      { label: "Careers", href: "#careers" }, // Added for pro feel
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#developers" },
      { label: "API Reference", href: "#developers" },
      { label: "Changelog", href: "#developers" },
      { label: "System Status", href: "#status" }, // Added for pro feel
    ],
  },
  {
    title: "Connect",
    links: [
      { 
        label: "GitHub", 
        href: SITE.socials.github, 
        external: true,
        icon: faGithub 
      },
      { 
        label: "LinkedIn", 
        href: SITE.socials.linkedin, 
        external: true,
        icon: faLinkedin 
      },
      { 
        label: "Instagram", 
        href: SITE.socials.instagram, 
        external: true,
        icon: faInstagram 
      },
      { 
        label: "X (Twitter)", 
        href: SITE.socials.twitter, 
        external: true,
        icon: faXTwitter 
      },
      { 
        label: "Dribbble", 
        href: SITE.socials.dribbble, 
        external: true,
        icon: faDribbble 
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                              Legal / Misc                                  */
/* -------------------------------------------------------------------------- */

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
] as const;