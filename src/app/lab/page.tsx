import { Container } from "@/components/layout/Container";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Lab",
  description:
    "Experiments, prototypes, tiny tools, and unfinished product ideas by Beck Kanno.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Lab
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          Experiments will live here.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Small experiments, prototypes, tools, and unfinished thoughts.
        </p>
      </div>
    </Container>
  );
}
