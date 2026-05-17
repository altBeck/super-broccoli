export type Note = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  draft?: boolean;
};

export const notes: Note[] = [
  {
    title: "Designing complex products",
    slug: "designing-complex-products",
    excerpt:
      "A working note on turning messy workflows into durable product systems.",
    date: "2026-05-17",
    tags: ["Product Design", "Systems"],
  },
  {
    title: "Why dashboards fail",
    slug: "why-dashboards-fail",
    excerpt:
      "Dashboards become useful when they move from display surfaces to decision surfaces.",
    date: "2026-05-17",
    tags: ["Dashboards", "UX"],
  },
  {
    title: "Turning ambiguity into product systems",
    slug: "turning-ambiguity-into-product-systems",
    excerpt:
      "Notes on framing uncertainty before it becomes interface debt.",
    date: "2026-05-17",
    tags: ["Strategy", "Process"],
  },
  {
    title: "Building Caesar as an internet garden",
    slug: "building-caesar-as-an-internet-garden",
    excerpt:
      "The scaffolding notes behind a portfolio designed to keep growing.",
    date: "2026-05-17",
    tags: ["Caesar", "Build Notes"],
  },
];

export const publicNotes = notes.filter((note) => !note.draft);

export function getPublicNote(slug: string) {
  return publicNotes.find((note) => note.slug === slug);
}
