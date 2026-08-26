import { FooterEmail } from "./FooterEmail";
import { FooterWordmark } from "./FooterWordmark";

const LINKEDIN = "https://linkedin.com/in/kanno-beck";
const TWITTER = "https://x.com/";

/** Solid heart for the "Made With" sign-off — currentColor so it themes. */
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__totop">
            <span className="site-footer__totop-label">
              Back
              <br />
              to Top
            </span>
            <a className="site-footer__totop-btn" href="#top" aria-label="Back to top">
              <span className="site-footer__totop-icon" aria-hidden="true" />
            </a>
          </div>

          <div className="site-footer__contact">
            <h3 className="site-footer__heading">Contact</h3>
            <FooterEmail />
          </div>

          <nav
            className="site-footer__nav site-footer__col--nav"
            aria-label="Footer navigation"
          >
            <h3 className="site-footer__heading">Navigation</h3>
            <ul className="site-footer__links">
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#about-me">About</a>
              </li>
              <li>
                <span className="site-footer__soon">
                  Gallery
                  <span className="site-footer__pill">Coming Soon</span>
                </span>
              </li>
            </ul>
          </nav>

          <nav
            className="site-footer__nav site-footer__col--social"
            aria-label="Social links"
          >
            <h3 className="site-footer__heading">Socials</h3>
            <ul className="site-footer__links">
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={TWITTER} target="_blank" rel="noreferrer">
                  X (Twitter)
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <span className="site-footer__copy">&copy; 2026</span>
          <span className="site-footer__made">
            Made With
            <HeartIcon />
          </span>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
