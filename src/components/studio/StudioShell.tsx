import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { studioEnabled } from "@/lib/studio";

export function StudioShell({ children }: { children: ReactNode }) {
  if (!studioEnabled) {
    return (
      <Container className="py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Studio unavailable
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-6xl">
            Caesar Studio is prepared, but not enabled.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            This route is a future workspace for managing Caesar. It is hidden
            from public navigation and should not be treated as secure until
            real authentication and database rules are added.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <StudioSidebar />
        <section>{children}</section>
      </div>
    </Container>
  );
}
