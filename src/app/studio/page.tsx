import { assertStudioAccess } from "@/lib/auth";

export default function StudioPage() {
  const hasAccess = assertStudioAccess();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        Overview
      </p>
      <h1 className="mt-4 text-5xl font-semibold leading-tight">
        Caesar Studio
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Placeholder dashboard for future content operations. Current access
        result: {hasAccess ? "available" : "not authenticated"}.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Now page editor", "Idea vault", "Case study builder"].map((item) => (
          <div key={item} className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-xl font-semibold">{item}</h2>
            <p className="mt-3 leading-7 text-muted">
              Future module only. No production write actions exist yet.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
