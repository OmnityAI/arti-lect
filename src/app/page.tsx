// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Decorative background: soft glow + subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* soft glow */}
        <div className="absolute left-1/2 top-[-12%] h-[620px] w-[980px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl opacity-30" />
        {/* faint grid */}
        <div className="absolute inset-0 [mask-image:radial-gradient(65%_65%_at_50%_20%,#000,transparent)] bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:26px_26px]" />
        {/* gentle top gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      </div>

      <section className="relative py-24 sm:py-28">
        <div className="container max-w-7xl px-6 md:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Headline + copy + CTAs */}
            <div>
              <h1 className="display mb-6">
                Stay Ahead of the{" "}
                <span className="bg-gradient-to-r from-[#B095FF] via-[#EADA9B] to-[#9B8CFF] bg-clip-text text-transparent">
                  AI
                </span>{" "}
                Revolution
              </h1>

              <p className="lead text-muted-foreground max-w-2xl">
                Get exclusive insights, cutting-edge research, and expert
                analysis on artificial intelligence, automation, and data
                ethics delivered directly to your inbox.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-xl px-6 py-5 text-base font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.06)] bg-gradient-to-r from-primary to-accent text-[#0b0c10] hover:from-primary/90 hover:to-accent/90"
                >
                  Subscribe Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-6 py-5 text-base"
                >
                  Explore Topics
                </Button>
              </div>
            </div>

            {/* Right: Glassy newsletter preview card */}
            <Card className="relative border-white/10 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/80 to-accent/70 grid place-items-center text-sm">
                    🧠
                  </div>
                  <div>
                    <div className="text-lg font-semibold">ArtiLect Weekly</div>
                    <div className="text-xs text-muted-foreground">
                      AI Insights Newsletter
                    </div>
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  This Week: The Future of Large Language Models in Enterprise
                </h3>

                <ul className="mb-5 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>OpenAI’s latest GPT developments and their implications</li>
                  <li>How Fortune 500s are integrating AI into operations</li>
                  <li>
                    New research on AI safety & alignment from leading institutions
                  </li>
                </ul>

                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    Weekly Insights
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    Industry Updates
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    Research Highlights
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>12k subscribers</span>
                  <span>Weekly delivery</span>
                  <span>5 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
