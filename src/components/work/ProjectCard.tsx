"use client";

import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { AnimatedProjectMedia, Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  galleryIndex?: number;
};

type GridColumns = 2 | 3 | 4;
type MobileGridColumns = 1 | 2;

type ProjectPalette = {
  background: string;
  foreground: string;
  dither: string;
};

const projectPalettes = [
  { background: "#102f28", foreground: "#fff7c9", dither: "#fff7c9" },
  { background: "#e5d9f2", foreground: "#2d1f3d", dither: "#6d5484" },
  { background: "#d7e6bf", foreground: "#1d3118", dither: "#00443d" },
  { background: "#f0d7bd", foreground: "#3d291d", dither: "#875a3c" },
  { background: "#c9dceb", foreground: "#183044", dither: "#315c76" },
] as const satisfies readonly ProjectPalette[];

type DitherPoint = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
};

function gridHash(column: number, row: number, salt = 0) {
  let value =
    Math.imul(column + salt * 37, 374_761_393) +
    Math.imul(row + salt * 101, 668_265_263);
  value = (value ^ (value >>> 13)) >>> 0;
  value = Math.imul(value, 1_274_126_177) >>> 0;
  return ((value ^ (value >>> 16)) >>> 0) / 4_294_967_295;
}

const ditherPoints: DitherPoint[] = (() => {
  const points: DitherPoint[] = [];

  for (let row = 0; row < 34; row += 1) {
    for (let column = 0; column < 32; column += 1) {
      const baseX = 230 + column * 8;
      const baseY = 6 + row * 9;
      const rightEdge = Math.max(0, Math.min(1, (baseX - 230) / 250));
      const upperCluster = Math.max(
        0,
        1 - Math.hypot((baseX - 448) / 230, (baseY - 68) / 168),
      );
      const lowerCluster = Math.max(
        0,
        1 - Math.hypot((baseX - 426) / 190, (baseY - 262) / 130),
      );
      const density = Math.min(
        1,
        rightEdge * 0.52 + upperCluster * 0.5 + lowerCluster * 0.2,
      );

      if (gridHash(column, row) > density * 0.72) continue;

      const jitterX = (gridHash(column, row, 1) - 0.5) * 1.4;
      const jitterY = (gridHash(column, row, 2) - 0.5) * 1.4;
      const radiusVariation = (gridHash(column, row, 3) - 0.5) * 0.34;

      points.push({
        x: baseX + jitterX,
        y: baseY + jitterY,
        radius: Math.max(0.45, 0.5 + density * 1.35 + radiusVariation),
        opacity: 0.24 + density * 0.42,
      });
    }
  }

  return points;
})();

type DitherStoryCardProps = {
  palette: ProjectPalette;
  project: Project;
  reducedMotion: boolean;
};

function DitherStoryCard({
  palette,
  project,
  reducedMotion,
}: DitherStoryCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, {
    stiffness: 145,
    damping: 25,
    mass: 0.72,
  });
  const springY = useSpring(pointerY, {
    stiffness: 145,
    damping: 25,
    mass: 0.72,
  });
  const farX = useTransform(springX, (value) => value * 0.45);
  const farY = useTransform(springY, (value) => value * 0.45);

  const resetDither = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const moveDither = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX =
      ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1;
    const normalizedY =
      ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1;

    pointerX.set(normalizedX * 10);
    pointerY.set(normalizedY * 7);
  };

  return (
    <div
      data-dither-card
      onPointerMove={moveDither}
      onPointerLeave={resetDither}
      onPointerCancel={resetDither}
      onMouseLeave={resetDither}
      className="relative flex aspect-[16/10] min-h-0 flex-col overflow-hidden rounded-[6px] p-5 md:p-6"
      style={{
        backgroundColor: palette.background,
        color: palette.foreground,
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 480 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-[3%] h-[106%] w-[106%] select-none"
        style={{ color: palette.dither }}
      >
        <motion.g
          fill="currentColor"
          style={reducedMotion ? undefined : { x: farX, y: farY }}
        >
          {ditherPoints.map((point, index) =>
            index % 3 === 0 ? null : (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={point.radius}
                opacity={point.opacity}
              />
            ),
          )}
        </motion.g>
        <motion.g
          fill="currentColor"
          style={reducedMotion ? undefined : { x: springX, y: springY }}
        >
          {ditherPoints.map((point, index) =>
            index % 3 === 0 ? (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={point.radius * 1.08}
                opacity={Math.min(0.72, point.opacity + 0.04)}
              />
            ) : null,
          )}
        </motion.g>
      </svg>
      <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.14em] opacity-70">
        {project.status} · {project.year}
      </span>
      <p className="relative z-10 mt-auto max-w-[24ch] text-[clamp(18px,1.7vw,26px)] font-[630] leading-[1.05] tracking-[-0.02em]">
        {project.domain.slice(0, 3).join(" · ")}
      </p>
    </div>
  );
}

function AnimatedProjectFrame({
  media,
  reducedMotion,
}: {
  media: AnimatedProjectMedia;
  reducedMotion: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const poster =
    typeof media.poster === "string" ? media.poster : media.poster.src;

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame || reducedMotion) return;

    if (typeof IntersectionObserver === "undefined") {
      const animationFrame = window.requestAnimationFrame(() => {
        setIsNearViewport(true);
      });
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.1 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || reducedMotion || !isNearViewport) {
      video?.pause();
      return;
    }

    const play = () => {
      void video.play().catch(() => undefined);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play();
      return;
    }

    video.addEventListener("canplay", play, { once: true });
    return () => video.removeEventListener("canplay", play);
  }, [isNearViewport, reducedMotion]);

  return (
    <div ref={frameRef} className="absolute inset-0">
      {reducedMotion ? (
        <Image
          src={media.poster}
          alt={media.label}
          fill
          quality={95}
          sizes="(min-width: 1280px) 50vw, (min-width: 760px) 50vw, (min-width: 640px) calc(100vw - 40px), calc(100vw - 36px)"
          className="object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          aria-label={media.label}
          muted
          loop
          playsInline
          poster={poster}
          preload={isNearViewport ? "metadata" : "none"}
          className="h-full w-full object-cover"
        >
          <source src={media.webm} type="video/webm" />
          <source src={media.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

const layoutTransition = {
  type: "spring" as const,
  stiffness: 210,
  damping: 28,
  mass: 0.85,
};

const revealItemVariants = {
  hidden: { opacity: 0, transform: "translate3d(0, 10px, 0)" },
  visible: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: {
      duration: 0.28,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  },
};

function GridModeIcon({ columns }: { columns: GridColumns }) {
  const paths: Record<GridColumns, string> = {
    2: "M 0.609 0.579 L 7.809 0.579 L 7.809 16.579 L 0.609 16.579 Z M 9.109 0.579 L 16.309 0.579 L 16.309 16.579 L 9.109 16.579 Z",
    3: "M 0.609 0.579 L 8 0.579 L 8 7.97 L 0.609 7.97 Z M 9.465 0.579 L 16.856 0.579 L 16.856 7.97 L 9.465 7.97 Z M 9.465 9.141 L 16.856 9.141 L 16.856 16.532 L 9.465 16.532 Z M 0.609 9.141 L 8 9.141 L 8 16.532 L 0.609 16.532 Z",
    4: "M 0.498 0.579 L 5.308 0.579 L 5.308 5.388 L 0.498 5.388 Z M 6.261 0.579 L 11.071 0.579 L 11.071 5.388 L 6.261 5.388 Z M 6.261 6.151 L 11.071 6.151 L 11.071 10.961 L 6.261 10.961 Z M 0.498 6.151 L 5.308 6.151 L 5.308 10.961 L 0.498 10.961 Z M 6.261 11.722 L 11.071 11.722 L 11.071 16.531 L 6.261 16.531 Z M 12.023 0.579 L 16.832 0.579 L 16.832 5.388 L 12.023 5.388 Z M 12.023 6.151 L 16.832 6.151 L 16.832 10.961 L 12.023 10.961 Z M 12.023 11.722 L 16.832 11.722 L 16.832 16.531 L 12.023 16.531 Z M 0.498 11.722 L 5.308 11.722 L 5.308 16.531 L 0.498 16.531 Z",
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 17 17"
      className="h-[17px] w-[17px] shrink-0 [image-rendering:pixelated]"
    >
      <path d={paths[columns]} fill="currentColor" />
    </svg>
  );
}

function MobileGridModeIcon({ columns }: { columns: MobileGridColumns }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 17 17"
      className="h-[17px] w-[17px] shrink-0 [image-rendering:pixelated]"
    >
      <path
        d={
          columns === 1
            ? "M 0.609 0.579 L 16.309 0.579 L 16.309 16.579 L 0.609 16.579 Z"
            : "M 0.609 0.579 L 8 0.579 L 8 7.97 L 0.609 7.97 Z M 9.465 0.579 L 16.856 0.579 L 16.856 7.97 L 9.465 7.97 Z M 9.465 9.141 L 16.856 9.141 L 16.856 16.532 L 9.465 16.532 Z M 0.609 9.141 L 8 9.141 L 8 16.532 L 0.609 16.532 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

function ProjectNoteIcon({ expanded }: { expanded: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-[18px] w-[18px]">
      <span className="absolute left-1/2 top-1/2 h-px w-[16px] -translate-x-1/2 -translate-y-1/2 bg-current" />
      <span
        className={`absolute left-1/2 top-1/2 h-[16px] w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
          expanded ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

export function ProjectCard({
  project,
  priority = false,
  galleryIndex = 0,
}: ProjectCardProps) {
  const [showDescription, setShowDescription] = useState(galleryIndex === 0);
  const [columns, setColumns] = useState<GridColumns>(2);
  const [mobileColumns, setMobileColumns] = useState<MobileGridColumns>(1);
  const shouldReduceMotion = useReducedMotion();
  const palette = projectPalettes[galleryIndex % projectPalettes.length];
  const projectCode = project.slug.replaceAll("-", "_").toUpperCase();
  const gridTransition = shouldReduceMotion ? { duration: 0 } : layoutTransition;
  const descriptionTransition = shouldReduceMotion
    ? { duration: 0.15, ease: "linear" as const }
    : { duration: 0.24, ease: [0.23, 1, 0.32, 1] as const };
  const galleryStyle = {
    "--portfolio-mobile-columns": mobileColumns,
    "--portfolio-columns": columns,
  } as CSSProperties;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -6% 0px" }}
      variants={{
        visible: {
          transition: { staggerChildren: shouldReduceMotion ? 0 : 0.045 },
        },
      }}
      className="portfolio-project py-5 md:py-6"
    >
      <LayoutGroup id={`${project.slug}-gallery`}>
        <motion.div
          variants={revealItemVariants}
          className="paper-surface sticky top-16 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-0 sm:gap-4 md:top-[60px]"
        >
          <div className="contents sm:block sm:min-w-0">
            <div className="col-start-1 row-start-1 flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1 text-[15px] leading-tight md:text-[16px]">
              <h3 className="font-[730] text-[#1e1e1e]">
                {project.title}
              </h3>
              <span className="text-[#aaa9a4]">,</span>
              <span className="min-w-0 text-[#8b8a86]">
                {project.label}
              </span>
              <span className="text-[#aaa9a4]">,</span>
              <span className="shrink-0 text-[#8b8a86]">
                {project.year}
              </span>
              <button
                type="button"
                aria-expanded={showDescription}
                aria-controls={`${project.slug}-description`}
                aria-label={`${showDescription ? "Hide" : "Show"} ${project.title} project note`}
                onClick={() => setShowDescription((visible) => !visible)}
                className="ml-1 hidden h-11 w-11 shrink-0 touch-manipulation place-items-center rounded-full text-[#8b8a86] transition-[color,transform] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:text-[#063b2f] focus-visible:outline-[#063b2f] active:scale-[0.96] sm:inline-grid md:h-10 md:w-10"
              >
                <ProjectNoteIcon expanded={showDescription} />
              </button>
            </div>

            <AnimatePresence initial={false} mode="popLayout">
              {showDescription ? (
                <motion.div
                  id={`${project.slug}-description`}
                  className="col-span-2 col-start-1 row-start-2 hidden w-full sm:block"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, transform: "translate3d(0, -4px, 0)" }
                  }
                  animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "translate3d(0, -4px, 0)" }
                  }
                  transition={descriptionTransition}
                >
                  <p className="w-full pb-1 pt-1 text-[15px] leading-[1.45] text-[#555551] md:max-w-2xl md:text-[16px]">
                    {project.summary}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <p className="col-span-2 col-start-1 row-start-2 w-full pb-1 pt-2 text-[15px] leading-[1.45] text-[#555551] sm:hidden">
              {project.summary}
            </p>
          </div>

          <div
            className="col-start-2 row-start-1 flex items-center gap-0 sm:hidden"
            role="group"
            aria-label={`${project.title} gallery layout`}
          >
            {([1, 2] as const).map((columnCount) => {
              const selected = mobileColumns === columnCount;
              return (
                <button
                  key={columnCount}
                  type="button"
                  aria-label={`Show ${project.title} in ${columnCount} ${columnCount === 1 ? "column" : "columns"}`}
                  aria-pressed={selected}
                  title={`${columnCount}-column layout`}
                  onClick={() => setMobileColumns(columnCount)}
                  className={`inline-grid h-11 w-11 touch-manipulation place-items-center rounded-[5px] transition-[color,transform] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-[#063b2f] active:scale-[0.96] ${
                    selected
                      ? "text-[#00443D]"
                      : "text-[#c4c4c4] hover:text-[#063b2f]"
                  }`}
                >
                  <MobileGridModeIcon columns={columnCount} />
                </button>
              );
            })}
          </div>

          <div
            className="hidden items-center gap-0 sm:flex"
            role="group"
            aria-label={`${project.title} gallery layout`}
          >
            {([2, 3, 4] as const).map((columnCount) => {
              const selected = columns === columnCount;
              return (
                <button
                  key={columnCount}
                  type="button"
                  aria-label={`Show ${project.title} in ${columnCount} columns`}
                  aria-pressed={selected}
                  title={`${columnCount}-column layout`}
                  onClick={() => setColumns(columnCount)}
                  className={`inline-grid h-10 w-10 touch-manipulation place-items-center rounded-[5px] transition-[color,transform] duration-150 ease-out focus-visible:outline-[#063b2f] active:scale-[0.96] ${
                    selected
                      ? "text-[#00443D]"
                      : "text-[#c4c4c4] hover:text-[#063b2f]"
                  }`}
                >
                  <GridModeIcon columns={columnCount} />
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          layout="position"
          data-columns={columns}
          data-mobile-columns={mobileColumns}
          style={galleryStyle}
          variants={revealItemVariants}
          transition={gridTransition}
          className="portfolio-grid mt-4 grid gap-x-2.5 gap-y-6 md:mt-5"
        >
          {["cover", "detail-left", "detail-right", "story"].map(
            (tile, index) => (
              <motion.div
                layout
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { ...layoutTransition, delay: index * 0.025 }
                }
                key={`${project.slug}-${tile}`}
                className="min-w-0"
              >
                {tile === "story" && !project.galleryVideos?.[index] ? (
                  <DitherStoryCard
                    palette={palette}
                    project={project}
                    reducedMotion={Boolean(shouldReduceMotion)}
                  />
                ) : (
                  <div className="relative block aspect-[16/10] overflow-hidden rounded-[6px] bg-[#ecebe5]">
                    {project.galleryVideos?.[index] ? (
                      <AnimatedProjectFrame
                        media={project.galleryVideos[index]}
                        reducedMotion={Boolean(shouldReduceMotion)}
                      />
                    ) : (
                      <Image
                        src={
                          project.galleryImages?.[index] ??
                          (index === 0 && project.heroImage
                            ? project.heroImage
                            : project.coverImage)
                        }
                        alt={
                          index === 0
                            ? `${project.title} project cover for ${project.label}`
                            : ""
                        }
                        fill
                        priority={priority && index === 0}
                        unoptimized={
                          typeof project.galleryImages?.[index] === "string" &&
                          project.galleryImages[index].toLowerCase().endsWith(".gif")
                        }
                        quality={95}
                        sizes="(min-width: 1280px) 50vw, (min-width: 760px) 50vw, (min-width: 640px) calc(100vw - 40px), calc(100vw - 36px)"
                        className={`object-cover ${
                          project.galleryImages?.[index]
                            ? ""
                            : tile === "detail-left"
                            ? "origin-left scale-[1.14]"
                            : tile === "detail-right"
                              ? "origin-right scale-[1.18]"
                              : ""
                        }`}
                      />
                    )}
                  </div>
                )}
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.04em] text-[#575753]">
                  {projectCode}_{String(index + 1).padStart(2, "0")}
                </p>
              </motion.div>
            ),
          )}
        </motion.div>
      </LayoutGroup>
    </motion.article>
  );
}
