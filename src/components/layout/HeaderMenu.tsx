"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const menuLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Lab", href: "/lab" },
  { label: "Contact", href: "/contact" },
];

export function HeaderMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-5">
      <div
        className={`relative flex h-11 items-center justify-end overflow-hidden transition-[width] duration-200 ease-out ${
          open ? "w-[330px]" : "w-[46px]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="primary-menu"
          className={`absolute right-0 text-[16px] font-semibold leading-none text-[#3c3c3c] transition duration-150 ease-out hover:-translate-y-px hover:text-foreground active:translate-y-0 dark:text-[#f1f4ee] dark:hover:text-white ${
            open
              ? "pointer-events-none -translate-x-5 opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          Menu
        </button>

        <nav
          id="primary-menu"
          aria-label="Primary"
          className={`absolute right-0 flex items-center gap-5 whitespace-nowrap text-[16px] font-semibold leading-none text-[#3c3c3c] transition duration-200 ease-out dark:text-[#f1f4ee] ${
            open
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-6 opacity-0"
          }`}
        >
          {menuLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`transition duration-150 ease-out hover:-translate-y-px hover:text-foreground active:translate-y-0 dark:hover:text-white ${
                open
                  ? "translate-x-0 opacity-100"
                  : "translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${index * 18}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={`transition duration-150 ease-out hover:-translate-y-px hover:text-foreground active:translate-y-0 dark:hover:text-white ${
              open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${menuLinks.length * 18}ms` : "0ms" }}
          >
            Close
          </button>
        </nav>
      </div>

      <ThemeToggle />
    </div>
  );
}
