import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Offline",
  description: "Caesar offline fallback page.",
  path: "/offline",
  noIndex: true,
});

export default function OfflinePage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Offline
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
            Caesar is temporarily out of reach.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            This page is ready for a future offline caching strategy for
            projects and notes.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <Image
            src="/offline.svg"
            alt="Abstract Caesar offline placeholder"
            width={1200}
            height={800}
            className="h-auto w-full"
          />
        </div>
      </div>
    </Container>
  );
}
