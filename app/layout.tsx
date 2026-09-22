import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*                                 FONTS                                      */
/* -------------------------------------------------------------------------- */

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
  preload: true,
});

/* -------------------------------------------------------------------------- */
/*                                VIEWPORT                                    */
/* -------------------------------------------------------------------------- */

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B2545" },
  ],
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

/* -------------------------------------------------------------------------- */
/*                                METADATA                                    */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.authorName, url: SITE.github }],
  creator: SITE.authorName,
  publisher: SITE.name,
  keywords: [
    "software development company",
    "source code marketplace",
    "developer tools",
    "Next.js starter kits",
    "AI applications",
    "custom software engineering",
    "TypeScript",
    "React",
    "SaaS boilerplates",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#6366f1" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE.name,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: SITE.title,
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: `@${SITE.authorHandle}`,
    images: ["/og.svg"],
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
    google: "Coy8EDe0asgJ53OPW8SuXW6RcZOTxjx33E-QiWITZYA",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: SITE.url,
  },
};

/* -------------------------------------------------------------------------- */
/*                              ROOT LAYOUT                                   */
/* -------------------------------------------------------------------------- */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for analytics/CDN */}
        <link rel="dns-prefetch" href={SITE.url} />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Safari pinned tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6366f1" />
        
        {/* Theme color for browsers */}
        <meta name="theme-color" content="#0B2545" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        
        {/* Prevent FOUC (Flash of Unstyled Content) */}
        <style>{`
          html { scroll-behavior: smooth; }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </head>
      
      <body className="min-h-screen bg-lab-navy text-lab-ice selection:bg-lab-accent/30 selection:text-lab-ice">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-lab-accent focus:px-4 focus:py-2 focus:text-lab-navy focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-lab-accent focus:ring-offset-2 focus:ring-offset-lab-navy"
        >
          Skip to main content
        </a>

        {/* JS detection flag - runs before any content renders */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`
            document.documentElement.classList.add('js');
            // Remove no-js class if it exists
            document.documentElement.classList.remove('no-js');
          `}
        </Script>

        {/* Performance monitoring script */}
        <Script id="perf-monitor" strategy="afterInteractive">
          {`
            // Log Core Web Vitals in development
            if (process.env.NODE_ENV === 'development') {
              if ('performance' in window) {
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    const perf = performance.getEntriesByType('navigation')[0];
                    if (perf) {
                      console.log('🚀 Page Load Performance:', {
                        'DNS Lookup': Math.round(perf.domainLookupEnd - perf.domainLookupStart) + 'ms',
                        'TCP Connection': Math.round(perf.connectEnd - perf.connectStart) + 'ms',
                        'DOM Interactive': Math.round(perf.domInteractive) + 'ms',
                        'DOM Complete': Math.round(perf.domComplete) + 'ms',
                        'Load Event': Math.round(perf.loadEventEnd) + 'ms',
                      });
                    }
                  }, 0);
                });
              }
            }
          `}
        </Script>

        {/* Main content area */}
        {children}

        {/* Live region for screen reader announcements */}
        <div
          id="live-region"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        />
      </body>
    </html>
  );
}