import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Contact",
  description:
    "Contact Beck Kanno for product design, UX architecture, design systems, and build-ready interface work.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Contact
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
            For focused product work, start with a short note.
          </h1>
        </div>
        <div className="space-y-6 text-lg leading-8 text-muted">
          <p>Have a project in mind?</p>
          <p>
            I&apos;m open to thoughtful product design, UX architecture, and
            design engineering work, especially around fintech, AI tools,
            compliance, workflow-heavy products, and early-stage product
            systems.
          </p>
          <p>
            Send a note and we can figure out if there&apos;s a useful fit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`mailto:${siteConfig.email}`}
              className="rounded-full bg-foreground px-4 py-2 text-sm text-background transition hover:opacity-85"
            >
              Email Beck
            </Link>
            {siteConfig.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-foreground"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
