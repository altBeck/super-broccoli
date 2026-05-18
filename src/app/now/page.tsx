import { Container } from "@/components/layout/Container";
import { now } from "@/data/now";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Now",
  description:
    "What Beck Kanno is currently building, thinking about, reading, and exploring across product design, AI tools, and internet garden experiments.",
  path: "/now",
});

export default function NowPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Now / Updated {now.updatedAt}
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          {now.currentMode}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          A living snapshot of what I&apos;m building, thinking about, and
          exploring right now.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <NowPanel title="Building" items={now.building} />
        <NowPanel title="Thinking about" items={now.thinkingAbout} />
        <NowPanel
          title="Reading"
          items={now.reading.length ? now.reading : ["Open stack"]}
        />
        <NowPanel
          title="Listening to"
          items={now.listeningTo.length ? now.listeningTo : ["Quiet focus"]}
        />
      </div>
    </Container>
  );
}

function NowPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {title}
      </h2>
      <ul className="mt-5 space-y-3 text-2xl font-semibold">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
