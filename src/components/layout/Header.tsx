"use client";

import Link from "next/link";
import { useState } from "react";
import { HeaderMenu } from "@/components/layout/HeaderMenu";
import { siteConfig } from "@/data/site";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-8 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div
        className={`mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between px-5 sm:px-8 md:gap-6 ${
          menuOpen ? "gap-0" : "gap-6"
        }`}
      >
        <Link
          href="/"
          className={`overflow-hidden whitespace-nowrap text-[18px] font-medium leading-none transition-[width,opacity,transform] duration-200 ease-out md:w-auto md:translate-x-0 md:opacity-100 md:pointer-events-auto ${
            menuOpen
              ? "pointer-events-none w-0 -translate-x-2 opacity-0"
              : "w-[112px] translate-x-0 opacity-100"
          }`}
        >
          {siteConfig.owner}
        </Link>
        <HeaderMenu open={menuOpen} onOpenChange={setMenuOpen} />
      </div>
    </header>
  );
}
