// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";

export const metadata: Metadata = {
  title: "ArtiLect — AI Newsletter",
  description: "Stay ahead of the AI revolution.",
  icons: [{ rel: "icon", url: "/icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}
