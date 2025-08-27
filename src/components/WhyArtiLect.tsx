"use client";

import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Shield, Clock } from "lucide-react";

export default function WhyArtiLect() {
  const features = [
    {
      icon: Brain,
      title: "Deep AI Insights",
      description:
        "Get analysis that goes beyond surface-level news. We dive deep into the implications and future possibilities of AI developments.",
      gradient: "from-primary to-accent",
    },
    {
      icon: Clock,
      title: "Time-Saving Curation",
      description:
        "Skip the noise. Our team reads hundreds of sources weekly to bring you only the most important AI updates and breakthroughs.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Zap,
      title: "Actionable Intelligence",
      description:
        "Every newsletter includes practical takeaways you can apply to your work, whether you're in tech, business, or research.",
      gradient: "from-primary via-accent to-primary",
    },
    {
      icon: Shield,
      title: "Trusted by Experts",
      description:
        "Join thousands of AI researchers, startup founders, and industry leaders who rely on ArtiLect for their weekly AI intelligence.",
      gradient: "from-accent via-primary to-accent",
    },
  ];

  return (
    // Full-bleed grey band
    <section id="about" className="relative w-full bg-[#121115] py-24">
      {/* (Optional) full-bleed decorations can go here as absolute elements */}

      {/* Content respects 120px gutters */}
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Why{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ArtiLect Newsletter
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The most trusted source for AI intelligence. No fluff, no hype — just the insights that matter.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                className="bg-card/50 border-border/50 transition-all duration-300 hover:bg-card/70 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-3 text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
              12K+
            </div>
            <p className="text-muted-foreground">Subscribers</p>
          </div>
          <div className="text-center">
            <div className="mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
              150+
            </div>
            <p className="text-muted-foreground">Weekly Issues</p>
          </div>
          <div className="text-center">
            <div className="mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
              98%
            </div>
            <p className="text-muted-foreground">Open Rate</p>
          </div>
          <div className="text-center">
            <div className="mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
              5 min
            </div>
            <p className="text-muted-foreground">Average Read</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
