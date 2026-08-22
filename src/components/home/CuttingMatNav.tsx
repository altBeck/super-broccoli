"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function CuttingMatNav() {
  return (
    <header className="cutting-mat">
      <Image
        className="cutting-mat__asset"
        src="/media/frame-2.svg"
        alt=""
        fill
        priority
        sizes="100vw"
      />

      <nav className="cutting-mat__nav" aria-label="Primary navigation">
        <a className="cutting-mat__brand" href="#top">
          Beck.
        </a>

        <div className="cutting-mat__links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}
