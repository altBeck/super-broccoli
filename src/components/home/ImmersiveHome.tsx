"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { CursorTrail } from "@/components/home/CursorTrail";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { portfolioProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import boardImage from "@/images/hero-img/board.jpg";
import emailImage from "@/images/hero-img/email.png";
import folderImage from "@/images/hero-img/folder.png";
import githubImage from "@/images/hero-img/github.png";
import linkedinImage from "@/images/hero-img/linkedin.png";
import monitorImage from "@/images/hero-img/monitor.png";
import smileImage from "@/images/hero-img/smile.png";

type ObjectIconProps = {
  src: StaticImageData;
  className?: string;
  height?: number;
};

const navItems = [
  { label: "Work", href: "#work", section: "work" },
  { label: "About", href: "/about", section: null },
  { label: "Archive", href: "#archive", section: "archive" },
];

function ObjectIcon({ src, className = "", height }: ObjectIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 translate-y-[0.08em] items-center align-baseline ${className}`}
    >
      <Image
        src={src}
        alt=""
        quality={95}
        sizes="96px"
        style={height ? { height, width: "auto" } : undefined}
        className={
          height
            ? "max-w-none object-contain"
            : "h-auto w-full object-contain"
        }
      />
    </span>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[0.9em] w-[0.9em] shrink-0"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

function HeroSocialLinks() {
  const [emailCopied, setEmailCopied] = useState(false);
  const emailResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(
    () => () => {
      if (emailResetTimeoutRef.current) {
        clearTimeout(emailResetTimeoutRef.current);
      }
    },
    [],
  );

  const copyEmail = async () => {
    let copied = false;

    try {
      await navigator.clipboard.writeText(siteConfig.email);
      copied = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = siteConfig.email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand("copy");
      textarea.remove();
    }

    if (!copied) return;

    setEmailCopied(true);
    if (emailResetTimeoutRef.current) {
      clearTimeout(emailResetTimeoutRef.current);
    }
    emailResetTimeoutRef.current = setTimeout(() => setEmailCopied(false), 1800);
  };

  const iconClassName =
    "object-contain transition-[filter,transform] duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-1 group-hover:drop-shadow-[0_7px_5px_rgba(0,0,0,0.35)] group-focus-visible:-translate-y-1 group-focus-visible:drop-shadow-[0_7px_5px_rgba(0,0,0,0.35)] group-active:scale-[0.96] motion-reduce:transition-none";

  return (
    <div
      role="group"
      aria-label="Contact and social links"
      className="absolute bottom-5 right-[max(18px,env(safe-area-inset-right,0px))] flex items-center gap-2 sm:bottom-7 sm:right-[max(32px,env(safe-area-inset-right,0px))] md:bottom-7 min-[1440px]:bottom-5 min-[1440px]:right-5"
    >
      <button
        type="button"
        aria-label={`Copy ${siteConfig.email} to clipboard`}
        aria-describedby="copy-email-tooltip"
        onClick={copyEmail}
        className="hero-social-link group relative inline-grid h-11 w-11 touch-manipulation place-items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd21b]"
      >
        <Image
          src={emailImage}
          alt=""
          quality={95}
          sizes="48px"
          className={`${iconClassName} h-11 w-11`}
        />
        <span
          id="copy-email-tooltip"
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[18px] border border-white/10 bg-[#303030] px-3 py-1.5 text-[13px] font-[500] leading-none tracking-normal text-white opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.24)] transition-[opacity,transform] duration-150 [transition-timing-function:cubic-bezier(0.2,0,0,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          {emailCopied ? "Copied email" : "Copy email"}
        </span>
      </button>
      <a
        href={siteConfig.socials.find((social) => social.label === "GitHub")?.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub profile in a new tab"
        className="hero-social-link group inline-grid h-11 w-[66px] touch-manipulation place-items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd21b]"
      >
        <Image
          src={githubImage}
          alt=""
          quality={95}
          sizes="48px"
          className={`${iconClassName} h-11 w-[66px] group-hover:rotate-[3deg] group-focus-visible:rotate-[3deg]`}
        />
      </a>
      <a
        href={siteConfig.socials.find((social) => social.label === "LinkedIn")?.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open LinkedIn profile in a new tab"
        className="hero-social-link group inline-grid h-11 w-11 touch-manipulation place-items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd21b]"
      >
        <Image
          src={linkedinImage}
          alt=""
          quality={95}
          sizes="48px"
          className={`${iconClassName} h-9 w-9 group-hover:-rotate-[3deg] group-focus-visible:-rotate-[3deg]`}
        />
      </a>
      <span aria-live="polite" className="sr-only">
        {emailCopied ? "Email copied to clipboard." : ""}
      </span>
    </div>
  );
}

function PrimaryNav({
  activeSection,
  isPinned,
}: {
  activeSection: "work" | "archive";
  isPinned: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (mobile = false) =>
    navItems.map((item) => {
      const active = item.section === activeSection;

      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "location" : undefined}
          onClick={() => setIsMenuOpen(false)}
          className={`relative inline-flex min-h-11 touch-manipulation items-center rounded-[5px] py-2 font-[400] leading-[normal] transition-[color,transform] duration-150 ease-out hover:text-[#063b2f] focus-visible:outline-[#063b2f] active:scale-[0.96] ${
            mobile ? "justify-start px-0 text-[18px]" : "justify-center px-2 text-center"
          } ${active ? "text-[#063b2f]" : "text-[#acaeb4]"}`}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <div
      className={`relative mx-auto flex h-16 w-full max-w-[1400px] items-center text-[15px] font-[400] tracking-[-0.15px] text-[#acaeb4] md:h-[60px] ${
        isPinned ? "justify-between" : "justify-end"
      }`}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsMenuOpen(false);
      }}
    >
      {isPinned ? (
        <Link
          href="/"
          className="raveo-display inline-flex min-h-11 touch-manipulation items-center rounded-[5px] text-[18px] font-[500] leading-none tracking-[-0.01em] text-[#063b2f] transition-[opacity,transform] duration-150 ease-out hover:opacity-70 focus-visible:outline-[#063b2f] active:scale-[0.96] md:text-[16px]"
        >
          {siteConfig.owner}
        </Link>
      ) : null}

      <nav
        aria-label="Primary"
        className={`${isPinned ? "hidden md:flex" : "flex"} items-center gap-1`}
      >
        {navLinks()}
      </nav>

      {isPinned ? (
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="pinned-mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-grid h-11 w-11 touch-manipulation place-items-center rounded-[5px] text-[#1e1e1e] transition-[color,transform] duration-150 ease-out hover:text-[#063b2f] focus-visible:outline-[#063b2f] active:scale-[0.96] md:hidden"
        >
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={`absolute left-1/2 top-1/2 h-px w-[22px] bg-current transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
                isMenuOpen
                  ? "-translate-x-1/2 -translate-y-1/2 rotate-45"
                  : "-translate-x-1/2 -translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-px w-[22px] bg-current transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
                isMenuOpen
                  ? "-translate-x-1/2 -translate-y-1/2 -rotate-45"
                  : "-translate-x-1/2 translate-y-[4px] rotate-180"
              }`}
            />
          </span>
        </button>
      ) : null}

      {isPinned ? (
        <div
          id="pinned-mobile-navigation"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`paper-surface absolute inset-x-[-18px] top-full px-[18px] pb-5 pt-2 transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none sm:inset-x-[-32px] sm:px-8 md:hidden ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <nav aria-label="Mobile primary" className="flex flex-col items-stretch">
            {navLinks(true)}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export function ImmersiveHome() {
  const navAnchorRef = useRef<HTMLDivElement>(null);
  const [isNavPinned, setIsNavPinned] = useState(false);
  const [activeSection, setActiveSection] = useState<"work" | "archive">(
    "work",
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;

    const syncScrollMotion = () => {
      lenis?.destroy();
      lenis = null;

      if (reducedMotion.matches) return;

      lenis = new Lenis({
        anchors: { offset: -64 },
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
      });
    };

    syncScrollMotion();
    reducedMotion.addEventListener("change", syncScrollMotion);

    return () => {
      reducedMotion.removeEventListener("change", syncScrollMotion);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    const updateNavState = () => {
      const navTop = navAnchorRef.current
        ? navAnchorRef.current.getBoundingClientRect().top + window.scrollY
        : Number.POSITIVE_INFINITY;
      setIsNavPinned(window.scrollY >= navTop);

      setActiveSection(window.location.hash === "#archive" ? "archive" : "work");
    };

    const rafId = window.requestAnimationFrame(updateNavState);
    const timeoutId = window.setTimeout(updateNavState, 150);

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);
    window.addEventListener("hashchange", updateNavState);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
      window.removeEventListener("hashchange", updateNavState);
    };
  }, []);

  return (
    <div className="immersive-home paper-surface viewport-shell text-[#1e1e1e]">
      <CursorTrail />
      <section
        className="relative isolate h-[380px] overflow-hidden bg-[#063b2f] text-white min-[480px]:h-[420px] md:h-[340px] min-[1440px]:h-[356px]"
      >
        <Image
          src={boardImage}
          alt=""
          fill
          priority
          quality={95}
          sizes="(max-width: 479px) 190vw, (max-width: 767px) 180vw, 100vw"
          className="absolute inset-0 -z-10 object-cover object-top [image-rendering:auto]"
        />
        <div className="immersive-page-gutter relative mx-auto flex h-full max-w-[1440px] flex-col pb-20 pt-7 md:py-7 min-[1440px]:py-0">
          <div className="flex items-start justify-between gap-8">
            <Link
              href="/"
              className="raveo-display touch-manipulation text-[24px] font-[730] leading-none text-white transition-[opacity,transform] duration-150 ease-out hover:opacity-80 active:scale-[0.96] md:text-[20px] min-[1440px]:absolute min-[1440px]:left-5 min-[1440px]:top-[30px] min-[1440px]:text-[20px] min-[1440px]:font-[630]"
            >
              {siteConfig.owner}
            </Link>
            <Image
              src={smileImage}
              alt=""
              priority
              quality={95}
              sizes="88px"
              className="h-14 w-14 rotate-[18deg] object-contain sm:h-16 sm:w-16 min-[1440px]:absolute min-[1440px]:right-5 min-[1440px]:top-[30px] min-[1440px]:h-16 min-[1440px]:w-16 min-[1440px]:rotate-0"
            />
          </div>

          <div className="mt-auto flex min-w-0 w-full max-w-[462px] flex-col gap-1.5 min-[1440px]:absolute min-[1440px]:left-5 min-[1440px]:top-[252px] min-[1440px]:mt-0 min-[1440px]:w-[462px]">
            <h1 className="raveo-display text-[clamp(32px,8.5vw,36px)] font-[500] leading-[normal] tracking-[-0.01em] text-[#ffd21b] min-[1440px]:tracking-[-0.36px]">
              Product Designer.
            </h1>
            <p className="min-w-0 whitespace-normal text-[clamp(17px,4.7vw,20px)] font-[400] leading-[normal] tracking-[-0.02em] text-[#ceccc7] md:w-max md:max-w-none md:whitespace-nowrap">
              Focused on AI tools, operational software, and multi-sided platforms.
            </p>
          </div>

          <HeroSocialLinks />
        </div>
      </section>

      <div className="paper-surface relative">
        <section
          id="work"
          aria-labelledby="work-introduction-title"
          className="paper-surface relative raveo-variable scroll-mt-16 min-[1440px]:h-[271px]"
        >
          <h2 id="work-introduction-title" className="sr-only">
            A collection of interfaces, operational dashboards, and digital
            products.
          </h2>
          <div className="immersive-page-gutter absolute inset-x-0 top-0 z-10 mx-auto h-full max-w-[1440px]">
            <div className="pt-10 min-[1440px]:pt-12">
              <p
                aria-label="Currently working at Breeze"
                className="inline-flex items-center gap-2 text-[18px] font-[500] leading-none tracking-[-0.01em] text-[#1e1e1e]"
              >
                <span aria-hidden="true" className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <span>Currently working at</span>
                <a
                  href="https://breeze.africa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-[600] text-[#063b2f] underline decoration-[1.5px] underline-offset-[3px] transition-[color] duration-150 hover:text-[#0a6250] focus-visible:rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#063b2f]"
                >
                  Breeze
                  <ExternalLinkIcon />
                  <span className="sr-only">opens in a new tab</span>
                </a>
              </p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="immersive-page-gutter relative mx-auto h-full max-w-[1440px]"
          >
            <div className="flex min-h-[370px] items-start pt-[68px] md:min-h-[300px] md:justify-end md:pt-[68px] min-[900px]:min-h-[315px] min-[1024px]:py-12 min-[1440px]:hidden">
              <p className="w-full max-w-full text-[44px] font-[730] leading-[1.08] tracking-[-0.0256em] md:hidden">
                <span className="inline-flex min-w-0 items-baseline gap-0 tracking-[-0.04em]">
                  <span className="whitespace-nowrap text-[#acaeb4]">
                    A collection
                  </span>
                  <ObjectIcon
                    src={folderImage}
                    height={48}
                  />
                  <span className="text-[#acaeb4]">of</span>
                </span>
                <br />
                <span>interfaces,</span>
                <br />
                <span>operational</span>
                <br />
                <span className="inline-flex min-w-0 items-baseline gap-[2px]">
                  <span>dashboards</span>
                  <ObjectIcon
                    src={monitorImage}
                    height={48}
                  />
                </span>
                <br />
                <span className="text-[#acaeb4]">and</span>
                <br />
                <span>digital products.</span>
              </p>

              <p className="hidden max-w-full text-[clamp(40px,5.4vw,58px)] font-[730] leading-[1.08] tracking-[-0.0256em] md:block min-[900px]:text-[clamp(44px,5.2vw,64px)]">
                <span className="inline-flex min-w-0 items-baseline gap-[2px]">
                  <span className="text-[#acaeb4]">A collection</span>
                  <ObjectIcon
                    src={folderImage}
                    className="w-[clamp(50px,6.4vw,78px)]"
                  />
                  <span>
                    <span className="text-[#acaeb4]">of</span> interfaces,
                  </span>
                </span>
                <br />
                <span className="inline-flex min-w-0 items-baseline gap-[2px]">
                  <span>operational dashboards</span>
                  <ObjectIcon
                    src={monitorImage}
                    className="w-[clamp(56px,6.6vw,82px)]"
                  />
                  <span className="text-[#acaeb4]">and</span>
                </span>
                <br />
                <span>digital products.</span>
              </p>
            </div>

            <div className="hidden min-[1440px]:block">
              <p className="absolute left-[674px] top-10 whitespace-nowrap text-[52px] font-[730] leading-[normal] tracking-[-1.3312px] text-[#acaeb4]">
                A collection
              </p>
              <Image
                src={folderImage}
                alt=""
                quality={95}
                sizes="71px"
                className="absolute left-[948px] top-11 h-14 w-[71px] object-contain"
              />
              <p className="absolute left-[1022px] top-10 whitespace-nowrap text-[52px] font-[730] leading-[normal] tracking-[-1.3312px]">
                <span className="text-[#acaeb4]">of</span> interfaces,
              </p>
              <p className="absolute left-[674px] top-[104px] whitespace-nowrap text-[52px] font-[730] leading-[normal] tracking-[-1.3312px]">
                operational dashboards
              </p>
              <Image
                src={monitorImage}
                alt=""
                quality={95}
                sizes="82px"
                className="absolute left-[1226px] top-[111px] h-14 w-[82px] object-contain"
              />
              <p className="absolute left-[1310px] top-[104px] whitespace-nowrap text-[52px] font-[730] leading-[normal] tracking-[-1.3312px] text-[#acaeb4]">
                and
              </p>
              <p className="absolute left-[674px] top-[168px] whitespace-nowrap text-[52px] font-[730] leading-[normal] tracking-[-1.3312px]">
                digital products.
              </p>
            </div>
          </div>
        </section>

        <div ref={navAnchorRef} className="relative z-30 h-16 md:h-[60px]">
          <div
            className={`immersive-nav-shell paper-surface ${
              isNavPinned
                ? "immersive-nav-shell--pinned fixed inset-x-0 top-0 h-16 md:h-[60px]"
                : "relative h-16 md:h-[60px]"
            }`}
          >
            <div className="immersive-page-gutter mx-auto h-full max-w-[1440px]">
              <PrimaryNav
                key={isNavPinned ? "pinned" : "inline"}
                activeSection={activeSection}
                isPinned={isNavPinned}
              />
            </div>
          </div>
        </div>

        <section
          id="archive"
          aria-label="Selected work"
          className="paper-surface immersive-page-gutter immersive-safe-bottom scroll-mt-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <ProjectGrid projects={portfolioProjects} />
          </div>
        </section>
      </div>
    </div>
  );
}
