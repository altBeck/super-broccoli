import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { getPublicNote, publicNotes } from "@/data/notes";
import { createSeoMetadata } from "@/lib/seo";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publicNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublicNote(slug);

  if (!note) {
    return {
      title: "Note not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createSeoMetadata({
    title: note.title,
    description: note.excerpt,
    path: `/notes/${note.slug}`,
  });
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getPublicNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <Container className="py-14 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {note.date}
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          {note.title}
        </h1>
        <p className="mt-8 text-2xl leading-tight text-muted">{note.excerpt}</p>
        <div className="mt-12 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-3xl font-semibold">This note is a stub.</h2>
          <p className="mt-4 leading-8 text-muted">
            Caesar is ready for deeper MDX notes later. This placeholder keeps
            the route stable while the writing system stays lightweight in v1.
          </p>
        </div>
      </article>
    </Container>
  );
}
