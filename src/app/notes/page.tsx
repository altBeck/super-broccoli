import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NoteCard } from "@/components/notes/NoteCard";
import { publicNotes } from "@/data/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Working notes from Beck Kanno on design, systems, and building Caesar.",
};

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
          Placeholder notes live here for now. The structure is ready for MDX
          later without pretending to be a full CMS today.
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
