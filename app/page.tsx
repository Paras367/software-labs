import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { ProductStore } from "@/components/sections/ProductStore";
import { CodeIsProduct } from "@/components/sections/CodeIsProduct";
import { Culture } from "@/components/sections/Culture";
import { Stack } from "@/components/sections/Stack";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { SITE } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*                                 SEO METADATA                               */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "software development",
    "developer tools",
    "AI systems",
    "Next.js",
    "React",
    "TypeScript",
    "source code",
    "SaaS boilerplates",
    SITE.authorName,
  ],
  authors: [{ name: SITE.authorName, url: SITE.github }],
  creator: SITE.authorName,
  publisher: SITE.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/og-image.jpg`, // TODO: Add a 1200x630px og-image.jpg to /public
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Code. Build. Ship.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: `@${SITE.authorHandle}`,
    images: [`${SITE.url}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-search-console-verification-code",
  },
};

/* -------------------------------------------------------------------------- */
/*                            ADVANCED JSON-LD SCHEMA                         */
/* -------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/logo.png`, // TODO: Add logo.png to /public
      description: SITE.description,
      sameAs: [
        SITE.github,
        SITE.socials?.linkedin,
        SITE.socials?.twitter,
      ].filter(Boolean),
      founder: {
        "@type": "Person",
        name: SITE.authorName,
        alternateName: SITE.authorHandle,
        url: SITE.github,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#organization` },
      // Enables Google Sitelinks Search Box
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/#software`,
      name: `${SITE.name} Products`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web, Cross-Platform",
      offers: {
        "@type": "Offer",
        price: "0", // Update if you have specific pricing
        priceCurrency: "USD",
      },
      description: "Premium, production-ready source code, developer tools, and AI systems engineered for the modern web.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                              MAIN PAGE COMPONENT                           */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      {/* Advanced Structured Data for Rich Snippets */}
      {/* eslint-disable-next-line react/no-danger -- static, trusted JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Accessibility: Skip to main content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-lab-accent focus:px-4 focus:py-2 focus:text-lab-navy focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <RevealObserver />
      <Navbar />
      
      <main id="main-content" className="relative">
        <Hero />
        <Stats />
        <WhatWeBuild />
        <ProductStore />
        <CodeIsProduct />
        <Culture />
        <Stack />
        <Process />
        <CTA />
      </main>
      
      <Footer />
    </>
  );
}