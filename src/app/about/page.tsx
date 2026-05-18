import { Container } from "@/components/layout/Container";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "About Beck",
  description:
    "About Beck Kanno, a product designer focused on complex products, fintech, compliance, AI tools, UX architecture, and build-ready product systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            About
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
            Designing clarity into complex systems.
          </h1>
        </div>
        <div className="space-y-6 text-lg leading-8 text-muted">
          <p>
            I&apos;m Beck Kanno, a product designer who likes working where
            products are still messy.
          </p>
          <p>
            Most of my work sits in the space between product strategy, UX
            architecture, and interface design. I help teams take ambiguous
            ideas, dense workflows, and edge cases, then shape them into systems
            people can understand, build, and use.
          </p>
          <p>
            I&apos;ve worked across fintech, trade finance, compliance, AI
            tools, mobility, productivity tools, and internal business systems.
            The common thread is complexity. I&apos;m usually drawn to products
            where the hard part is not just making screens look good, but
            figuring out how the system should work.
          </p>
          <p>
            I care about clarity, logic, strong information architecture, and
            interfaces that are honest about the complexity behind them. I also
            care about making work build-ready, because design that cannot
            survive implementation is just decoration.
          </p>
          <p>
            Caesar is my portfolio, internet garden, and personal playground. It
            is where I collect work, notes, experiments, and the ongoing process
            of becoming a sharper designer-builder.
          </p>
        </div>
      </div>
    </Container>
  );
}
