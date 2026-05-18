import { Container } from "@/components/layout/Container";
import { NoteCard } from "@/components/notes/NoteCard";
import { publicNotes } from "@/data/notes";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Notes",
  description:
    "Notes by Beck Kanno on product design, UX architecture, AI tools, complex workflows, systems thinking, and building Caesar.",
  path: "/notes",
});

export default function NotesPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mb-12 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Notes
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
          A writing garden, prepared lightly.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Notes on product design, systems, AI, workflows, and building Caesar.
        </p>
      </div>
      <div>
        {publicNotes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </Container>
  );
}
