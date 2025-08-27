"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Mail, Linkedin, Twitter, Github } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const year = new Date().getFullYear();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return toast.error("Please fill in all fields");

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

  return (
    // full-bleed background; content gutters handled by <Container>
    <footer className="w-full border-t border-border/50 bg-card/30">
      <Container>
        <div className="grid gap-12 lg:grid-cols-4 py-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Brain className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground">ArtiLect</h3>
                <p className="text-sm text-muted-foreground">AI Intelligence Newsletter</p>
              </div>
            </div>

            <p className="max-w-md leading-relaxed text-muted-foreground">
              Your trusted source for cutting-edge AI insights, research breakthroughs, and expert analysis.
              Join thousands of professionals staying ahead of the AI revolution.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Never miss an update</h4>
              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 font-medium sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
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
                      <Label htmlFor="footer-name">Full Name</Label>
                      <Input
                        id="footer-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer-email">Email Address</Label>
                      <Input
                        id="footer-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Enter your email"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Newsletter</h4>
            <nav className="flex flex-col space-y-3">
              <a href="#about" className="transition-colors duration-200 text-muted-foreground hover:text-foreground">
                About ArtiLect
              </a>
              <a href="#featured-topics" className="transition-colors duration-200 text-muted-foreground hover:text-foreground">
                Featured Topics
              </a>
              <a href="#archive" className="transition-colors duration-200 text-muted-foreground hover:text-foreground">
                Newsletter Archive
              </a>
              <a href="#privacy" className="transition-colors duration-200 text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <a href="mailto:info@artilectai.com" className="transition-colors duration-200 hover:text-foreground">
                  info@artilectai.com
                </a>
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://linkedin.com/company/artilectai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-background/50 p-2 text-muted-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/artilectai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-background/50 p-2 text-muted-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/artilectai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-background/50 p-2 text-muted-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary"
                  aria-label="Follow us on GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {year} ArtiLect AI. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#terms" className="transition-colors duration-200 hover:text-foreground">
              Terms of Service
            </a>
            <a href="#privacy" className="transition-colors duration-200 hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#unsubscribe" className="transition-colors duration-200 hover:text-foreground">
              Unsubscribe
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
