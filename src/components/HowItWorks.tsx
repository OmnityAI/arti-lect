"use client";

import Container from "@/components/Container";
import { Mail, Users, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  return (
    // full-bleed background; content gets 120px gutters via <Container>
    <section id="why-subscribe" className="relative w-full bg-card/30 py-24">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-heading font-bold lg:text-5xl">
            Why Subscribe to{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ArtiLect Newsletter
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Get curated AI insights, expert analysis, and breaking research delivered weekly. 
            Stay informed without the noise.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {/* Curated Content */}
          <div className="group text-center">
            <div className="relative mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 transition-all duration-300 group-hover:from-primary/30 group-hover:to-accent/30">
                <Mail className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold transition-colors duration-300 group-hover:text-primary">
              Curated Weekly Insights
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Hand-picked articles, research papers, and industry updates from the most important voices in AI. 
              No spam, just value.
            </p>
          </div>

          {/* Expert Analysis */}
          <div className="group text-center">
            <div className="relative mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 transition-all duration-300 group-hover:from-accent/30 group-hover:to-primary/30">
                <Users className="h-10 w-10 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-gradient-to-br from-accent to-primary opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold transition-colors duration-300 group-hover:text-accent">
              Expert Commentary
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Exclusive insights from AI researchers, industry leaders, and thought leaders who are 
              shaping the future of artificial intelligence.
            </p>
          </div>

          {/* Stay Ahead */}
          <div className="group text-center">
            <div className="relative mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 transition-all duration-300 group-hover:from-primary/30 group-hover:to-accent/30">
                <TrendingUp className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold transition-colors duration-300 group-hover:text-primary">
              Stay Ahead of Trends
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Be the first to know about breakthrough research, emerging technologies, and paradigm shifts 
              that will define the next decade of AI.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
