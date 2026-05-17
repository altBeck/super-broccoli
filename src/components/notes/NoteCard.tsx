import Link from "next/link";
import type { Note } from "@/data/notes";

type NoteCardProps = {
  note: Note;
};

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="block border-t border-border py-6 transition hover:bg-surface"
    >
      <div className="grid gap-4 px-0 sm:grid-cols-[0.28fr_1fr]">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {note.date}
        </p>
        <div>
          <h3 className="text-2xl font-semibold">{note.title}</h3>
          <p className="mt-2 max-w-2xl leading-7 text-muted">{note.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
