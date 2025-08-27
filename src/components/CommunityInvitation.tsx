"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Star, Mail } from "lucide-react";
import { toast } from "sonner";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  company?: string; // optional
};

export default function CommunityInvitation() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return toast.error("Please fill in all fields");
    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSignupOpen(false);
        setEmail("");
        setName("");
        toast.success(
          "Welcome to ArtiLect Newsletter! You'll receive the latest AI insights directly in your inbox."
        );
      } else {
        if (data.code === "DUPLICATE_EMAIL") toast.error("You're already subscribed to our newsletter!");
        else if (data.code === "INVALID_EMAIL_FORMAT") toast.error("Please enter a valid email address");
        else toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter signup error:", err);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const testimonials: Testimonial[] = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Director",
      quote:
        "ArtiLect Newsletter has become my go-to source for staying current with AI research. The curation is exceptional.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Engineering",
      quote:
        "The weekly insights help me make informed decisions about our AI strategy. Absolutely essential reading.",
      rating: 5,
    },
    {
      name: "Prof. Emily Watson",
      role: "Computer Science",
      quote:
        "Finally, a newsletter that cuts through the AI hype and delivers real, actionable intelligence.",
      rating: 5,
    },
  ];

  return (
    // Full-bleed background band
    <section className="relative w-full bg-card/30 py-24">
      {/* Content with 120px gutters on xl+ */}
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-heading font-bold lg:text-5xl">
            Join the{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Intelligence
            </span>{" "}
            Community
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Thousands of AI professionals, researchers, and innovators trust ArtiLect Newsletter to keep them
            informed and ahead of the curve.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-border/50 bg-card/50 transition-all duration-300 hover:bg-card/70">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6 italic leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <span className="text-sm font-semibold text-primary-foreground">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* ✅ no trailing comma if company is missing */}
                      {[t.role, t.company].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-card/60 p-12 shadow-2xl backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>

            <h3 className="mb-4 text-3xl font-bold">
              Start receiving{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI insights
              </span>{" "}
              today
            </h3>

            <p className="mb-8 leading-relaxed text-muted-foreground">
              Join 12,000+ AI professionals who get their weekly dose of intelligence every Tuesday. Free, curated,
              and always valuable.
            </p>

            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="px-12 py-6 text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl"
                >
                  Subscribe to Newsletter
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
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <p className="mt-4 text-xs text-muted-foreground">No spam. Unsubscribe anytime. We respect your privacy.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
