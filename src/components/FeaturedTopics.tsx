"use client";

import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Brain, LayoutGrid, PanelsLeftBottom, Tag } from "lucide-react";
import { toast } from "sonner";

const topics = [
  { id: "ai-machine-learning", title: "AI & Machine Learning", description: "Explore the latest in artificial intelligence and ML innovations", icon: Brain, slug: "ai-machine-learning" },
  { id: "data-analytics", title: "Data Analytics", description: "Unlock insights from data with advanced analytics techniques", icon: LayoutGrid, slug: "data-analytics" },
  { id: "automation-business", title: "Automation in Business", description: "Transform operations with intelligent automation solutions", icon: PanelsLeftBottom, slug: "automation-business" },
  { id: "data-ethics-policy", title: "Data Ethics & Policy", description: "Navigate the ethical landscape of data and AI governance", icon: Tag, slug: "data-ethics-policy" },
];

export default function FeaturedTopics() {
  const handleTopicClick = (title: string) => toast.info(`Opening ${title} topics`);

  return (
    // Full-bleed band; background stretches edge-to-edge
    <section id="featured-topics" className="relative w-full bg-background py-20">
      {/* Any full-bleed decorations can be absolutely-positioned here */}

      {/* Content respects 120px gutters on xl+ */}
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Explore Featured Topics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the most important areas shaping the future of technology and business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map(({ id, title, description, icon: Icon, slug }) => (
            <Link
              key={id}
              href={`/tags/${slug}`}
              onClick={() => handleTopicClick(title)}
              className="group"
            >
              <Card className="relative h-full overflow-hidden border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:ring-2 hover:ring-ring/50 transition-all duration-200">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                <CardContent className="flex h-full flex-col p-8">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3 transition-colors duration-200 group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary transition-colors duration-200 group-hover:text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-heading text-xl font-semibold text-card-foreground transition-colors duration-200 group-hover:text-foreground">
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
