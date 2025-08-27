"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { toast } from "sonner";

export default function Hero() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsSignupOpen(false);
        setEmail(""); setName("");
        toast.success("Welcome to ArtiLect Newsletter! You'll receive the latest AI insights directly in your inbox.");
      } else {
        if (data.code === "DUPLICATE_EMAIL") toast.error("You're already subscribed to our newsletter!");
        else if (data.code === "INVALID_EMAIL_FORMAT") toast.error("Please enter a valid email address");
        else toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollToArticles = () => {
    document.getElementById("featured-topics")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    /* The section itself owns centering */
    <section
      id="main-content"
      className="relative w-full overflow-hidden bg-background min-h-[calc(100svh-var(--header-h,80px))]"
    >
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-90" />
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(155,140,255)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(155,140,255)" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          {/* nodes */}
          <circle cx="120" cy="100" r="4" fill="url(#nodeGradient)" />
          <circle cx="280" cy="80" r="3" fill="url(#nodeGradient)" />
          <circle cx="450" cy="120" r="5" fill="url(#nodeGradient)" />
          <circle cx="620" cy="90" r="3" fill="url(#nodeGradient)" />
          <circle cx="720" cy="140" r="4" fill="url(#nodeGradient)" />
          <circle cx="80" cy="250" r="3" fill="url(#nodeGradient)" />
          <circle cx="220" cy="280" r="4" fill="url(#nodeGradient)" />
          <circle cx="380" cy="260" r="3" fill="url(#nodeGradient)" />
          <circle cx="540" cy="290" r="5" fill="url(#nodeGradient)" />
          <circle cx="680" cy="270" r="3" fill="url(#nodeGradient)" />
          <circle cx="160" cy="420" r="4" fill="url(#nodeGradient)" />
          <circle cx="320" cy="450" r="3" fill="url(#nodeGradient)" />
          <circle cx="480" cy="430" r="4" fill="url(#nodeGradient)" />
          <circle cx="640" cy="460" r="3" fill="url(#nodeGradient)" />
          {/* lines */}
          <line x1="120" y1="100" x2="280" y2="80" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="280" y1="80" x2="450" y2="120" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="450" y1="120" x2="620" y2="90" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="620" y1="90" x2="720" y2="140" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="120" y1="100" x2="220" y2="280" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.2" />
          <line x1="280" y1="80" x2="380" y2="260" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.2" />
          <line x1="450" y1="120" x2="540" y2="290" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.2" />
          <line x1="80" y1="250" x2="220" y2="280" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="220" y1="280" x2="380" y2="260" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="380" y1="260" x2="540" y2="290" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="540" y1="290" x2="680" y2="270" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="220" y1="280" x2="320" y2="450" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.2" />
          <line x1="380" y1="260" x2="480" y2="430" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.2" />
          <line x1="540" y1="290" x2="640" y2="460" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.2" />
          <line x1="160" y1="420" x2="320" y2="450" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="320" y1="450" x2="480" y2="430" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
          <line x1="480" y1="430" x2="640" y2="460" stroke="rgb(155,140,255)" strokeWidth="1" opacity="0.3" />
        </svg>

        <div className="absolute top-20 right-20 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl" />
        <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-accent/15 via-primary/10 to-transparent blur-3xl" />
      </div>

      {/* CENTER everything vertically */}
      <div className="relative z-10 flex min-h-[inherit] items-center">
        <Container>
          <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Slightly smaller headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight">
                  Stay Ahead of the{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    AI Revolution
                  </span>
                </h1>
                <p className="max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-muted-foreground">
                  Get exclusive insights, cutting-edge research, and expert analysis on artificial intelligence,
                  automation, and data ethics delivered directly to your inbox.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="px-8 py-6 text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl"
                      aria-label="Subscribe to ArtiLect newsletter"
                    >
                      Subscribe Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Subscribe to ArtiLect Newsletter
                      </DialogTitle>
                      <DialogDescription>
                        Join thousands of AI enthusiasts and professionals getting the latest insights weekly.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleNewsletterSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleScrollToArticles}
                  className="px-8 py-6 text-lg font-medium transition-all duration-200 border-primary/30 bg-background/20 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10"
                  aria-label="Explore featured topics and insights"
                >
                  Explore Topics
                </Button>
              </div>
            </div>

            {/* Right column - preview card */}
            <div className="relative">
              <div className="relative rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">ArtiLect Weekly</h3>
                    <p className="text-sm text-muted-foreground">AI Insights Newsletter</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold leading-tight text-foreground">
                    This Week: The Future of Large Language Models in Enterprise
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    • OpenAI&apos;s latest GPT developments and their business implications<br />
                    • How Fortune 500 companies are integrating AI into operations<br />
                    • New research on AI safety and alignment from leading institutions
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Weekly Insights</span>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent-foreground">Industry Updates</span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">Research Highlights</span>
                  </div>

                  <div className="border-border/50 pt-4">
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-muted-foreground">12k subscribers</span>
                      <span className="text-xs text-muted-foreground">Weekly delivery</span>
                      <span className="text-xs text-muted-foreground">5 min read</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-2 -top-2 -z-10 h-20 w-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
