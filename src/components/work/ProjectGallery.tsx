"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type TouchEvent,
} from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import lightboxArrow from "@/images/left-switch.svg";
import {
  DEFAULT_PROJECT_VIEW,
  getProjectView,
  subscribeProjectView,
} from "./project-view-store";

const lightboxBlurLayers: Array<{ blur: number; mask: string }> = [
  {
    blur: 3,
    mask: "linear-gradient(to bottom, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 0%) 18%, rgb(0 0 0 / 100%) 58%, rgb(0 0 0 / 0%) 76%)",
  },
  {
    blur: 7,
    mask: "linear-gradient(to bottom, rgb(0 0 0 / 0%) 45%, rgb(0 0 0 / 0%) 62%, rgb(0 0 0 / 100%) 90%, rgb(0 0 0 / 100%) 100%)",
  },
];

type GalleryDirection = -1 | 1;

const lightboxSlideVariants = {
  enter: (direction: GalleryDirection) => ({
    x: direction > 0 ? "14%" : "-14%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: GalleryDirection) => ({
    x: direction > 0 ? "-14%" : "14%",
    opacity: 0,
  }),
};

export function ProjectGallery({ project }: { project: Project }) {
  const view = useSyncExternalStore(
    (listener) => subscribeProjectView(project.slug, listener),
    () => getProjectView(project.slug),
    () => DEFAULT_PROJECT_VIEW,
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [navigationDirection, setNavigationDirection] =
    useState<GalleryDirection>(1);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressCloseRef = useRef(false);
  const galleryLength = project.gallery.length;

  const navigateGallery = useCallback(
    (direction: GalleryDirection) => {
      if (galleryLength < 2) return;

      setNavigationDirection(direction);
      setSelectedIndex((currentIndex) => {
        if (currentIndex === null || (direction === -1 && currentIndex === 0)) {
          return currentIndex;
        }

        return (currentIndex + direction + galleryLength) % galleryLength;
      });
    },
    [galleryLength],
  );

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        return;
      }

      if (
        event.key === "ArrowLeft" &&
        galleryLength > 1 &&
        selectedIndex !== 0
      ) {
        event.preventDefault();
        navigateGallery(-1);
        return;
      }

      if (event.key === "ArrowRight" && galleryLength > 1) {
        event.preventDefault();
        navigateGallery(1);
        return;
      }

      if (event.key === "Tab") {
        const focusTargets = [
          dialogRef.current,
          previousButtonRef.current,
          nextButtonRef.current,
        ].filter(
          (element): element is HTMLDivElement | HTMLButtonElement =>
            element !== null && element.getClientRects().length > 0,
        );
        const currentTargetIndex = focusTargets.indexOf(
          document.activeElement as HTMLDivElement | HTMLButtonElement,
        );
        const nextTargetIndex = event.shiftKey
          ? currentTargetIndex <= 0
            ? focusTargets.length - 1
            : currentTargetIndex - 1
          : currentTargetIndex >= focusTargets.length - 1
            ? 0
            : currentTargetIndex + 1;

        event.preventDefault();
        focusTargets[nextTargetIndex]?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus();
    };
  }, [galleryLength, navigateGallery, selectedIndex]);

  const selectedImage =
    selectedIndex === null ? null : project.gallery[selectedIndex];

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;

    const touch = event.touches.item(0);
    if (!touch) return;

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start || galleryLength < 2) return;

    const touch = event.changedTouches.item(0);
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= 48 && Math.abs(deltaX) > Math.abs(deltaY);

    if (!isHorizontalSwipe) return;

    event.preventDefault();
    suppressCloseRef.current = true;
    window.setTimeout(() => {
      suppressCloseRef.current = false;
    }, 500);

    if (deltaX > 0) {
      navigateGallery(-1);
      return;
    }

    if (deltaX < 0) {
      navigateGallery(1);
    }
  };

  return (
    <>
      <div
        className={cn("project-gallery", `project-gallery--${view.layout}`)}
        data-mobile={view.mobileView}
      >
        {project.gallery.map((image, index) => {
          const animated = typeof image === "string";
          return (
            <button
              type="button"
              className="project-card"
              key={`${project.slug}-${index}`}
              aria-label={`Open ${project.title} preview ${index + 1}`}
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
            >
              <Image
                src={image}
                alt={`${project.title} preview ${index + 1}`}
                fill
                sizes="(max-width: 820px) 100vw, 40vw"
                unoptimized={animated}
                className="project-card__image"
              />
            </button>
          );
        })}
      </div>

      {selectedImage ? (
        <div
          ref={dialogRef}
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} expanded preview — tap anywhere to close`}
          tabIndex={-1}
          onClick={() => {
            if (suppressCloseRef.current) {
              suppressCloseRef.current = false;
              return;
            }

            setSelectedIndex(null);
          }}
        >
          <div className="project-lightbox__blur" aria-hidden="true">
            {lightboxBlurLayers.map((layer) => (
              <div
                key={layer.blur}
                className="project-lightbox__blur-layer"
                style={{
                  backdropFilter: `blur(${layer.blur}px)`,
                  WebkitBackdropFilter: `blur(${layer.blur}px)`,
                  maskImage: layer.mask,
                  WebkitMaskImage: layer.mask,
                }}
              />
            ))}
          </div>

          <span
            className="project-lightbox__tag project-lightbox__tag--index"
            aria-hidden="true"
          >
            {String((selectedIndex ?? 0) + 1).padStart(2, "0")} /{" "}
            {String(galleryLength).padStart(2, "0")}
          </span>
          <span
            className="project-lightbox__tag project-lightbox__tag--title"
            aria-hidden="true"
          >
            {project.title}
          </span>

          {galleryLength > 1 ? (
            <>
              {selectedIndex !== 0 ? (
                <button
                  ref={previousButtonRef}
                  type="button"
                  className="project-lightbox__arrow project-lightbox__arrow--previous"
                  aria-label={`Open previous ${project.title} preview`}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigateGallery(-1);
                  }}
                >
                  <Image src={lightboxArrow} alt="" width={48} height={48} />
                </button>
              ) : null}
              <button
                ref={nextButtonRef}
                type="button"
                className="project-lightbox__arrow project-lightbox__arrow--next"
                aria-label={`Open next ${project.title} preview`}
                onClick={(event) => {
                  event.stopPropagation();
                  navigateGallery(1);
                }}
              >
                <Image src={lightboxArrow} alt="" width={48} height={48} />
              </button>
            </>
          ) : null}

          <div
            className="project-lightbox__media"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence
              initial={false}
              custom={navigationDirection}
              mode="wait"
            >
              <motion.div
                key={`${project.slug}-${selectedIndex}`}
                className="project-lightbox__slide"
                custom={navigationDirection}
                variants={lightboxSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={selectedImage}
                  alt={`${project.title} preview ${(selectedIndex ?? 0) + 1}`}
                  fill
                  sizes="(max-width: 820px) 94vw, 90vw"
                  unoptimized={typeof selectedImage === "string"}
                  className="project-lightbox__image"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : null}
    </>
  );
}
