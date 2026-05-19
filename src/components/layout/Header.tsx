import Link from "next/link";
import { HeaderMenu } from "@/components/layout/HeaderMenu";
import { siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-8 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="text-[18px] font-medium leading-none">
          {siteConfig.owner}
        </Link>
        <HeaderMenu />
      </div>
    </header>
  );
}
