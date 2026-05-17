import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/site";
import toggleIcon from "@/images/toggle.svg";

export function Header() {
  return (
    <header className="sticky top-8 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-[1080px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="text-[17px] font-semibold leading-none sm:text-xl">
          {siteConfig.owner}
        </Link>
        <ThemeToggle>
          <Image
            src={toggleIcon}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 dark:invert"
            aria-hidden="true"
          />
        </ThemeToggle>
      </div>
    </header>
  );
}
