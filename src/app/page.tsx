// src/app/page.tsx
"use client";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Above-the-fold (keep SSR)
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Below-the-fold: code-split with graceful fallbacks
const SocialProof = dynamic(
  () => import("@/components/SocialProof").then((m) => ({ default: m.SocialProof })),
  { loading: () => <div className="container py-16 opacity-70">Loading…</div> }
);

const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <div className="container py-16 opacity-70">Loading…</div>,
});

const NewsletterPreview = dynamic(
  () =>
    import("@/components/NewsletterPreview").then((m) => ({
      default: m.NewsletterPreview,
    })),
  { loading: () => <div className="container py-16 opacity-70">Loading…</div> }
);

const WhyArtiLect = dynamic(() => import("@/components/WhyArtiLect"), {
  loading: () => <div className="container py-16 opacity-70">Loading…</div>,
});

const FeaturedTopics = dynamic(() => import("@/components/FeaturedTopics"), {
  loading: () => <div className="container py-16 opacity-70">Loading…</div>,
});

const FOMOSection = dynamic(
  () => import("@/components/FOMOSection").then((m) => ({ default: m.FOMOSection })),
  { loading: () => <div className="container py-16 opacity-70">Loading…</div> }
);

const CommunityInvitation = dynamic(() => import("@/components/CommunityInvitation"), {
  loading: () => <div className="container py-16 opacity-70">Loading…</div>,
});

const FAQSection = dynamic(
  () => import("@/components/FAQ").then((m) => ({ default: m.FAQSection })),
  { loading: () => <div className="container py-16 opacity-70">Loading…</div> }
);

// Client-only helpers (no SSR)
const ScrollToTop = dynamic(
  () => import("@/components/ScrollToTop").then((m) => ({ default: m.ScrollToTop })),
  { ssr: false }
);

const ExitIntentPopup = dynamic(
  () => import("@/components/ExitIntentPopup").then((m) => ({ default: m.ExitIntentPopup })),
  { ssr: false }
);

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="container py-8" />,
});

// ──────────────────────────────────────────────────────────────────────────────
// Metadata
// ──────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://artilectai.com"),
  title: "ArtiLect – AI Intelligence Newsletter | Weekly AI Insights & Analysis",
  description:
    "Stay ahead of the AI revolution with ArtiLect Newsletter. Curated insights, expert analysis, and breaking research on AI, ML, and data—delivered weekly.",
  keywords: [
    "AI newsletter",
    "artificial intelligence",
    "machine learning",
    "data analytics",
    "AI insights",
    "tech newsletter",
    "AI research",
    "automation",
    "data ethics",
    "technology trends",
  ],
  authors: [{ name: "ArtiLect Team" }],
  creator: "ArtiLect",
  publisher: "ArtiLect",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ArtiLect – AI Intelligence Newsletter",
    description:
      "Weekly AI insights and analysis for professionals, researchers, and enthusiasts.",
    url: "https://artilectai.com",
    siteName: "ArtiLect",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArtiLect – AI Intelligence Newsletter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtiLect – AI Intelligence Newsletter",
    description:
      "Weekly AI insights and analysis for professionals, researchers, and enthusiasts.",
    images: ["/twitter-image.jpg"],
    creator: "@artilectai",
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
  category: "technology",
};

// ──────────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Header />

      <main id="main-content" className="flex flex-col">
        {/* Above-the-fold hero */}
        <Hero />

        {/* Section stack */}
        <div className="space-y-20 md:space-y-24">
          <section aria-labelledby="social-proof" className="py-16">
            <h2 id="social-proof" className="sr-only">
              Trusted by readers
            </h2>
            <SocialProof />
          </section>

          <section aria-labelledby="how" className="py-16">
            <h2 id="how" className="sr-only">
              How ArtiLect works
            </h2>
            <HowItWorks />
          </section>

          <section aria-labelledby="preview" className="py-16">
            <h2 id="preview" className="sr-only">
              Newsletter preview
            </h2>
            <NewsletterPreview />
          </section>

          <section aria-labelledby="why" className="py-16">
            <h2 id="why" className="sr-only">
              Why choose ArtiLect
            </h2>
            <WhyArtiLect />
          </section>

          <section id="featured-topics" aria-labelledby="topics" className="py-16">
            <h2 id="topics" className="sr-only">
              Featured topics
            </h2>
            <FeaturedTopics />
          </section>

          <section aria-labelledby="fomo" className="py-16">
            <h2 id="fomo" className="sr-only">
              Don’t miss out
            </h2>
            <FOMOSection />
          </section>

          <section aria-labelledby="community" className="py-16">
            <h2 id="community" className="sr-only">
              Join the community
            </h2>
            <CommunityInvitation />
          </section>

          <section aria-labelledby="faq" className="py-16">
            <h2 id="faq" className="sr-only">
              Frequently asked questions
            </h2>
            <FAQSection />
          </section>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <ExitIntentPopup />
    </div>
  );
}
