import Image from "next/image";
import Link from "next/link";
import { CuttingMatBehavior } from "./CuttingMatBehavior";
import { ThemeToggle } from "./ThemeToggle";

export function CuttingMatNav() {
  return (
    <header className="cutting-mat">
      <CuttingMatBehavior />
      <Image
        className="cutting-mat__asset"
        src="/media/frame-2.webp"
        alt=""
        fill
        sizes="100vw"
        unoptimized
      />

      <nav className="cutting-mat__nav" aria-label="Primary navigation">
        <Link className="cutting-mat__brand" href="/">
          Beck.
        </Link>

        <div className="cutting-mat__links">
          <a href="#work">Work</a>
          <a href="#about-me">About</a>
          <button
            className="cutting-mat__gallery-link"
            type="button"
            aria-label="Gallery"
            aria-describedby="gallery-tooltip"
          >
            Gallery
            <span id="gallery-tooltip" className="cutting-mat__tooltip" role="tooltip">
              Coming Soon
            </span>
          </button>
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}
