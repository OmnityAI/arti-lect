// src/app/tags/[slug]/page.tsx
import type { Metadata } from "next";

type PageProps = {
  // Next 15: params (and searchParams) are Promises in server components
  params: Promise<{ slug: string }>;
  // Include if you also need search params (safe to keep even if unused)
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-5xl py-16 px-6">
      <h1 className="text-3xl font-bold">Tag: {slug}</h1>
      {/* TODO: Render posts for this tag */}
      <p className="text-muted-foreground mt-4">
        Articles and insights tagged with “{slug}”.
      </p>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `#${slug} – ArtiLect`,
    description: `Posts tagged “${slug}” on ArtiLect.`,
  };
}

// (Optional) If you statically prebuild known tags:
// export async function generateStaticParams() {
//   return [{ slug: "ai" }, { slug: "llm" }, { slug: "ethics" }];
// }
