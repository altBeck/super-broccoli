import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";
import cursorIcon from "@/images/icon-apps/cursor.png";
import figmaIcon from "@/images/icon-apps/figma.png";
import nextIcon from "@/images/icon-apps/nextjs.png";
import tailwindIcon from "@/images/icon-apps/tailwind_css.png";

const toolIcons = [
  { src: cursorIcon, alt: "Cursor" },
  { src: nextIcon, alt: "Next.js" },
  { src: tailwindIcon, alt: "Tailwind CSS" },
  { src: figmaIcon, alt: "Figma" },
];

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Now", href: "/now" },
  { label: "Notes", href: "/notes" },
  { label: "Lab", href: "/lab" },
];

export function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-fg">
      <Container className="min-h-[602px] py-11 sm:py-20 md:min-h-[522px] md:py-[70px]">
        <div className="hidden items-baseline justify-center gap-10 md:flex">
          <h2 className="text-[64px] font-normal leading-none tracking-[-0.02em]">
            Beck Kanno
          </h2>
          <span className="h-px w-[126px] bg-footer-fg" aria-hidden="true" />
          <p className="font-display text-[64px] italic leading-none tracking-[-0.04em]">
            Product Engineer
          </p>
        </div>

        <div className="mt-0 max-w-[424px] md:mt-[92px]">
          <p className="text-[20px] leading-normal tracking-[-0.02em] text-footer-fg/80">
            Have a project in mind you want to talk about? Shoot me an email and
            we can work something out.
          </p>

          <div className="mt-8 flex flex-col gap-5 text-[20px] font-semibold tracking-[-0.02em] sm:flex-row sm:items-center sm:gap-[68px]">
            <Link
              href="/about"
              className="w-fit transition duration-150 ease-out hover:translate-x-1 active:scale-[0.98]"
            >
              About Me <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="w-fit sm:hidden transition duration-150 ease-out hover:translate-x-1 active:scale-[0.98]"
            >
              {siteConfig.email} <span aria-hidden="true">□</span>
            </Link>
            <Link
              href="/contact"
              className="hidden w-fit transition duration-150 ease-out hover:translate-x-1 active:scale-[0.98] sm:inline-block"
            >
              Contact <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>

          <nav
            aria-label="Footer"
            className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-[15px] font-semibold tracking-[-0.02em] text-footer-fg/80"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-footer-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-14 space-y-4 text-[15px] leading-5 tracking-[-0.04em] text-footer-fg/80 md:mt-14">
            <p>Made with sleepless nights and procrastination</p>
            <p>Designed in Figma. Built with Next.js and Tailwind CSS.</p>
            <div className="flex flex-wrap items-center gap-3">
              <span>Designed using</span>
              {toolIcons.map((icon) => (
                <Image
                  key={icon.alt}
                  src={icon.src}
                  alt={icon.alt}
                  width={24}
                  height={24}
                  className="h-5 w-5 rounded-full"
                />
              ))}
            </div>
          </div>

          <p className="mt-24 text-[15px] leading-5 tracking-[-0.04em] text-footer-fg/70 md:hidden">
            ©2026
          </p>
        </div>
      </Container>
    </footer>
  );
}
