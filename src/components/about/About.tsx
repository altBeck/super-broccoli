"use client";

import { useState } from "react";
import { DitheredImage } from "./DitheredImage";

const GITHUB = "https://github.com/altBeck";
const LINKEDIN = "https://linkedin.com/in/kanno-beck";
const EMAIL = "drkannobeck@gmail.com";
const RESUME = "/resume.pdf";

/** Paint-brush glyph for the "Open to Work" status (currentColor so it themes). */
const BrushIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4.58333 1.875C4.19656 1.875 3.82563 2.02865 3.55214 2.30214C3.27865 2.57563 3.125 2.94656 3.125 3.33333V5.83333C3.125 6.63833 3.77833 7.29167 4.58333 7.29167H12.9167C13.3034 7.29167 13.6744 7.13802 13.9479 6.86453C14.2214 6.59104 14.375 6.22011 14.375 5.83333V5.20833H14.5833C14.9858 5.20833 15.2625 5.28333 15.4192 5.38583C15.5358 5.4625 15.625 5.57333 15.625 5.83333V7.5C15.625 8.075 15.1583 8.54167 14.5833 8.54167H8.75C8.36323 8.54167 7.99229 8.69531 7.7188 8.9688C7.44531 9.24229 7.29167 9.61323 7.29167 10V16.6667C7.29167 17.4717 7.945 18.125 8.75 18.125H9.58333C9.74909 18.125 9.90806 18.0592 10.0253 17.9419C10.1425 17.8247 10.2083 17.6658 10.2083 17.5C10.2083 17.3342 10.1425 17.1753 10.0253 17.0581C9.90806 16.9408 9.74909 16.875 9.58333 16.875H8.75C8.69475 16.875 8.64176 16.8531 8.60269 16.814C8.56362 16.7749 8.54167 16.7219 8.54167 16.6667V10C8.54167 9.94475 8.56362 9.89176 8.60269 9.85269C8.64176 9.81362 8.69475 9.79167 8.75 9.79167H14.5833C15.1911 9.79167 15.774 9.55022 16.2038 9.12045C16.6336 8.69068 16.875 8.10779 16.875 7.5V5.83333C16.875 5.17333 16.5917 4.65833 16.1042 4.34C15.6575 4.04833 15.1008 3.95833 14.5833 3.95833H14.375V3.33333C14.375 2.94656 14.2214 2.57563 13.9479 2.30214C13.6744 2.02865 13.3034 1.875 12.9167 1.875H4.58333Z"
      fill="currentColor"
    />
  </svg>
);

/** Document glyph for the resume button. */
const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M6.25 1.875H8.10667C9.0175 1.875 9.9775 2.2025 10.8792 2.6975C11.7875 3.19583 12.6783 3.8875 13.4608 4.67083C14.2433 5.45417 14.9333 6.3425 15.4308 7.2475C15.9233 8.145 16.25 9.09833 16.25 10V15.625C16.25 16.288 15.9866 16.9239 15.5178 17.3928C15.0489 17.8616 14.413 18.125 13.75 18.125H6.25C5.58696 18.125 4.95107 17.8616 4.48223 17.3928C4.01339 16.9239 3.75 16.288 3.75 15.625V4.375C3.75 3.71196 4.01339 3.07607 4.48223 2.60723C4.95107 2.13839 5.58696 1.875 6.25 1.875ZM12.5767 5.55417C11.9796 4.95226 11.3139 4.42252 10.5933 3.97583C10.6144 4.10583 10.625 4.23889 10.625 4.375V6.25C10.625 6.58152 10.7567 6.89946 10.9911 7.13388C11.2255 7.3683 11.5435 7.5 11.875 7.5H13.75C13.8867 7.5 14.0203 7.51056 14.1508 7.53167C13.7051 6.81334 13.1768 6.14965 12.5767 5.55417Z"
      fill="currentColor"
    />
  </svg>
);

export function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const input = document.createElement("textarea");
      input.value = EMAIL;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="about" id="about-me" aria-labelledby="about-title">
      <h2 className="about__title" id="about-title">
        About Me
      </h2>

      <div className="about__grid">
        <div className="about__head">
          <h3 className="about__role">Lead Product Designer</h3>
          <span className="about__status">
            <BrushIcon />
            Open to Work
          </span>
        </div>

        <div className="about__portrait">
          <DitheredImage
            src="/media/portrait.png"
            alt="Portrait of Beck Kanno"
            rest={{ cell: 7, levels: 3 }}
            hover={{ cell: 2, levels: 8 }}
          />
        </div>

        <div className="about__content">
          <p className="about__copy">
            I design complex digital products across{" "}
            <strong>fintech, AI, and operational software</strong>, turning
            dense workflows and business rules into clear, scalable experiences.
          </p>
          <p className="about__copy">
            Currently, I&rsquo;m a Lead Product Designer at Breeze, working
            across trade, finance, compliance, and enterprise workflows &mdash;
            from early product thinking through interaction design, systems, and
            build-ready interfaces.
          </p>
          <p className="about__copy">
            Over the past 6+ years, I&rsquo;ve worked across product design,
            UI/UX, and frontend development, which means I tend to think beyond
            individual screens and closer to how the whole product actually
            works.
          </p>
          <p className="about__copy">
            I enjoy working across{" "}
            <strong>
              Product Strategy, UX Architecture, Interaction Design, Design
              Systems, and Prototyping
            </strong>{" "}
            &mdash; shaping how products work, simplifying complex workflows, and
            collaborating closely with engineers to bring them to life.
          </p>
          <p className="about__copy">
            Outside work, I&rsquo;m usually reading or thinking about technology,
            physics, comics, geopolitics, and futurism.
          </p>
          <p className="about__copy">
            Find me on{" "}
            <a className="about__link" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>{" "}
            or{" "}
            <a
              className="about__link"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            , or reach me by{" "}
            <button
              type="button"
              className="about__link about__email-link"
              onClick={handleCopyEmail}
              aria-label={copied ? "Email address copied" : "Copy email address"}
              aria-describedby="about-email-tooltip"
            >
              email
              <span
                id="about-email-tooltip"
                className="social-links__tooltip"
                role="tooltip"
              >
                {copied ? "Copied!" : "Copy Email"}
              </span>
            </button>
            .
          </p>

          <a
            className="about__resume"
            href={RESUME}
            target="_blank"
            rel="noreferrer"
          >
            <FileIcon />
            View My Resume
          </a>
        </div>
      </div>
    </section>
  );
}
