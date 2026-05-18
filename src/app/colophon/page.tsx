import { Container } from "@/components/layout/Container";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Colophon",
  description:
    "How Caesar, Beck Kanno's portfolio and internet garden, was designed and built.",
  path: "/colophon",
});

export default function ColophonPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Colophon
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          Caesar is a portfolio built to keep changing.
        </h1>
        <div className="mt-10 space-y-6 text-lg leading-8 text-muted">
          <p>
            Caesar is my portfolio, internet garden, and personal playground.
          </p>
          <p>
            It is built to collect projects, notes, experiments, references, and
            the ongoing process of becoming a sharper product designer and
            builder.
          </p>
          <p>
            Designed in Figma. Built with Next.js, Tailwind CSS, Inter Tight,
            and Geist Mono.
          </p>
        </div>
      </div>
    </Container>
  );
}
