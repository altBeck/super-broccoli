import Link from "next/link";
import { studioNav } from "@/data/nav";

export function StudioSidebar() {
  return (
    <aside className="border-b border-border pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Studio
      </p>
      <nav aria-label="Studio navigation" className="mt-5">
        <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {studioNav.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="block rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground hover:text-foreground lg:rounded-md"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
