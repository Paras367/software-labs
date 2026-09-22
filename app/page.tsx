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

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  sameAs: [SITE.github],
  founder: { "@type": "Person", name: SITE.authorName, alternateName: SITE.authorHandle },
};

export default function HomePage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- static, trusted JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RevealObserver />
      <Navbar />
      <main>
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
