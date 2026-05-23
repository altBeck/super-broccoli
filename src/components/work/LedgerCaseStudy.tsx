"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  currentInternalPathKey,
  internalNavigationStackKey,
  previousInternalPathKey,
} from "@/components/layout/NavigationHistoryTracker";
import backMobileIcon from "@/images/icons/back-mobile.svg";
import claudeAnalytics from "@/images/ledger/claude.png";
import openAiUsage from "@/images/ledger/open-ai.png";
import providerDetail from "@/images/ledger/ledger-provider-detail.png";
import sessionOperations from "@/images/ledger/ledger-session-ops.png";

type SectionId =
  | "overview"
  | "observation"
  | "workflow-intelligence"
  | "providers"
  | "sessions"
  | "projects"
  | "signals"
  | "trust-governance"
  | "intervention-systems"
  | "future-directions"
  | "reflection";

type CaseSection = {
  id: SectionId;
  label: string;
};

type ScreenshotProps = {
  alt: string;
  caption: string;
  image: StaticImageData;
  priority?: boolean;
  className?: string;
};

const sections: CaseSection[] = [
  { id: "overview", label: "Overview" },
  { id: "observation", label: "Observation" },
  { id: "workflow-intelligence", label: "Workflow Intelligence" },
  { id: "providers", label: "Providers" },
  { id: "sessions", label: "Sessions" },
  { id: "projects", label: "Projects" },
  { id: "signals", label: "Signals" },
  { id: "trust-governance", label: "Trust & Governance" },
  { id: "intervention-systems", label: "Intervention Systems" },
  { id: "future-directions", label: "Future Directions" },
  { id: "reflection", label: "Reflection" },
];

const metadata = [
  { label: "Role", value: ["Product Designer"] },
  { label: "Timeline", value: ["April 2026"] },
  { label: "Team", value: ["None"] },
  { label: "Skills", value: ["Product Design", "UX Architecture", "Frontend"] },
];

const timelineEvents = [
  {
    label: "Request",
    detail: "A workflow starts inside a provider, IDE, browser, or agent.",
  },
  {
    label: "Retry",
    detail: "The same intent is attempted again after a failed or weak response.",
  },
  {
    label: "Model Switch",
    detail: "The session moves from one model or provider to another.",
  },
  {
    label: "Anomaly",
    detail: "Latency, cost, failure, or context behavior breaks the expected path.",
  },
  {
    label: "Resolution",
    detail: "Outputs, spend, and operational state resolve into a session record.",
  },
];

const placeholderSections = sections.slice(3);
const navMorphTransition = {
  type: "spring",
  stiffness: 520,
  damping: 42,
  mass: 0.72,
} as const;

export function LedgerCaseStudy() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const activeLabel = useMemo(
    () => sections.find((section) => section.id === activeSection)?.label ?? "Overview",
    [activeSection],
  );

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));

      const currentSection = sectionElements
        .slice()
        .reverse()
        .find((section) => section.getBoundingClientRect().top <= 180);

      if (currentSection) {
        setActiveSection(currentSection.id as SectionId);
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const handleBack = () => {
    try {
      const pathname = window.location.pathname;
      const storedStack = sessionStorage.getItem(internalNavigationStackKey);
      const parsedStack: unknown = storedStack ? JSON.parse(storedStack) : [];
      const stack = Array.isArray(parsedStack)
        ? parsedStack.filter((path): path is string => typeof path === "string")
        : [];
      const stackWithoutCurrent =
        stack.at(-1) === pathname ? stack.slice(0, -1) : stack;
      const destination = stackWithoutCurrent
        .slice()
        .reverse()
        .find((path) => path !== pathname);

      if (destination) {
        const destinationIndex = stackWithoutCurrent.lastIndexOf(destination);
        const nextStack = stackWithoutCurrent.slice(0, destinationIndex + 1);

        sessionStorage.setItem(
          internalNavigationStackKey,
          JSON.stringify(nextStack),
        );
        sessionStorage.setItem(currentInternalPathKey, destination);

        const previousDestination = nextStack.at(-2);
        if (previousDestination) {
          sessionStorage.setItem(previousInternalPathKey, previousDestination);
        } else {
          sessionStorage.removeItem(previousInternalPathKey);
        }

        router.push(destination);
        return;
      }

      const previousPath = sessionStorage.getItem(previousInternalPathKey);

      if (previousPath && previousPath !== pathname) {
        sessionStorage.setItem(currentInternalPathKey, previousPath);
        router.push(previousPath);
        return;
      }
    } catch {
      // Fall back when session storage is unavailable.
    }

    router.push("/work");
  };

  return (
    <article className="min-h-screen bg-[#f5f5f3] text-[#1f1f1f] dark:bg-[#0b0d0c] dark:text-[#f3f3ef]">
      <div className="mx-auto grid w-full max-w-[1032px] grid-cols-1 gap-12 px-5 pb-28 pt-10 sm:px-8 lg:grid-cols-[260px_minmax(0,708px)] lg:gap-16 lg:pb-36 lg:pt-16">
        <aside className="lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)]">
          <LedgerNav
            activeLabel={activeLabel}
            activeSection={activeSection}
            expanded={expanded}
            progress={progress}
            sections={sections}
            onExpandedChange={setExpanded}
            onBack={handleBack}
          />
        </aside>

        <div className="min-w-0">
          <MotionSection
            id="overview"
            className="scroll-mt-32 pt-8 lg:pt-0"
          >
            <p className="font-mono text-[15px] uppercase leading-none tracking-[0.12em] text-[#727272] dark:text-[#a4a4a0]">
              Ledger &bull; Ongoing 2026
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-x-7 gap-y-8 border-y border-dashed border-[#cecece] py-6 text-[15px] dark:border-[#333633] sm:grid-cols-4">
              {metadata.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono uppercase tracking-[0.08em] text-[#727272] dark:text-[#a4a4a0]">
                    {item.label}
                  </dt>
                  <dd className="mt-3 space-y-1 font-medium leading-tight text-[#242424] dark:text-[#f3f3ef]">
                    {item.value.map((value) => (
                      <span className="block" key={value}>
                        {value}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            <h1 className="mt-16 max-w-[708px] text-[30px] font-bold leading-[0.98] tracking-normal text-[#242424] sm:text-[42px] dark:text-[#f3f3ef]">
              An Ongoing Exploration into Operational Intelligence for
              AI-native workflows.
            </h1>

            <p className="mt-7 max-w-[708px] text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              As AI workflows no longer exist inside a single interface,
              becoming increasingly fragmented across providers and embedded
              into everyday workflows and environments. Despite this shift,
              operational visibility around AI work has remained surprisingly
              shallow. Most tooling focuses on prompts, outputs, or token costs
              in isolation, while workflow behaviour, retries, model switching,
              and session patterns often remain invisible.
            </p>

            <Screenshot
              alt="Ledger session operations table showing providers, projects, costs, outputs, retries, statuses, and time."
              caption="Session Operations View"
              className="mt-10"
              image={sessionOperations}
              priority
            />

            <p className="mt-16 max-w-[708px] text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              Ledger began as an ongoing exploration into what observability for
              AI-native workflows could look like, an operational intelligence
              for AI workflows, centered around sessions, providers, projects,
              and the operational patterns forming between AI systems.
            </p>
          </MotionSection>

          <MotionSection id="observation" className="scroll-mt-32 pt-20">
            <SectionTitle>Observation</SectionTitle>
            <p className="mt-6 max-w-[708px] text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              As AI systems became embedded into everyday workflows (providers,
              browser interfaces, playgrounds, IDEs, agents, etc), operational
              behavior became increasingly difficult to understand. Costs,
              retries, model switching, failed responses, fragmented sessions
              and provider inconsistencies were distributed across multiple
              interfaces with no unified operational layer.
            </p>

            <figure className="mt-12">
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageFrame>
                  <Image
                    src={claudeAnalytics}
                    alt="Dark Claude analytics screen showing usage activity and charts."
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 346px, (min-width: 640px) 50vw, 100vw"
                  />
                </ImageFrame>
                <ImageFrame>
                  <Image
                    src={openAiUsage}
                    alt="Dark OpenAI usage analytics screen showing usage bars and request summaries."
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 346px, (min-width: 640px) 50vw, 100vw"
                  />
                </ImageFrame>
              </div>
              <Caption>No operational layer exists across AI-native workflows.</Caption>
            </figure>

            <Screenshot
              alt="Ledger provider detail screen showing connection overview, sync health, usage snapshot, model breakdown, and provider events."
              caption="Provider Detail Screen"
              className="mt-20"
              image={providerDetail}
            />
          </MotionSection>

          <MotionSection
            id="workflow-intelligence"
            className="scroll-mt-32 pt-24"
          >
            <SectionTitle>Workflow Intelligence</SectionTitle>
            <div className="mt-6 space-y-8 text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              <p>
                Most AI tooling treats interactions as isolated prompts and
                outputs. But operationally, AI-native work behaves more like a
                distributed system, fragmented across sessions, providers,
                retries, context windows, browser interfaces, IDEs and APIs.
              </p>
              <p className="font-medium text-[#242424] dark:text-[#f3f3ef]">
                Ledger explored a different framing: AI workflows as
                operational behavior.
              </p>
              <p>
                Rather than focusing only on prompts or token consumption, the
                system centered around sessions, provider behavior, retries,
                context switching and the patterns emerging between interactions
                over time.
              </p>
              <p className="font-medium text-[#242424] dark:text-[#f3f3ef]">
                Sessions became the atomic unit of the system.
              </p>
              <p>
                A session was not simply a single request-response pair, but a
                behavioral timeline composed of provider usage, retries, model
                switches, failed generations, latency patterns, operational
                anomalies, and cost accumulation over time.
              </p>
              <p>
                This created a more operational understanding of AI workflows,
                revealing patterns that traditional analytics dashboards often
                fail to expose.
              </p>
            </div>

            <WorkflowTimeline />
          </MotionSection>

          <div className="pt-20">
            {placeholderSections.map((section) => (
              <MotionSection
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-t-[0.8px] border-[#dededb] py-14 dark:border-[#2b2f2b]"
              >
                <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#7d7d78] dark:text-[#999c97]">
                      Upcoming section
                    </p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-[#242424] dark:text-[#f3f3ef]">
                      {section.label}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 rounded-sm bg-[#e7e7e2] dark:bg-[#1d211e]" />
                    <div className="h-4 w-full rounded-sm bg-[#e7e7e2] dark:bg-[#1d211e]" />
                    <div className="h-4 w-2/3 rounded-sm bg-[#e7e7e2] dark:bg-[#1d211e]" />
                    <div className="mt-8 aspect-[16/7] rounded-md border-[0.8px] border-dashed border-[#d1d1cc] bg-[#eeeeea] dark:border-[#30352f] dark:bg-[#121512]" />
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function LedgerNav({
  activeLabel,
  activeSection,
  expanded,
  progress,
  sections,
  onExpandedChange,
  onBack,
}: {
  activeLabel: string;
  activeSection: SectionId;
  expanded: boolean;
  progress: number;
  sections: CaseSection[];
  onExpandedChange: (expanded: boolean) => void;
  onBack: () => void;
}) {
  return (
    <div className="fixed bottom-5 left-1/2 z-30 flex w-fit max-w-[calc(100vw-12px)] -translate-x-1/2 items-end gap-3 lg:static lg:block lg:max-w-none lg:translate-x-0">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 hidden items-center gap-2 text-[15px] font-medium leading-none text-[#727272] transition hover:text-[#242424] lg:inline-flex dark:text-[#a4a4a0] dark:hover:text-[#f3f3ef]"
      >
        <BackIcon />
        Back
      </button>

      <motion.button
        type="button"
        onClick={onBack}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-[#dfdfdf] shadow-[0_1px_2px_rgba(15,16,15,0.24),0_1px_2px_rgba(21,80,15,0.04)] transition-colors dark:bg-[#1a1a1a] lg:hidden"
        aria-label="Back"
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        <Image src={backMobileIcon} alt="" className="h-[18px] w-[18px]" />
      </motion.button>

      <motion.nav
        aria-label="Ledger case study"
        className="overflow-hidden border-[0.8px] border-[#1a1a1a] bg-[#1a1a1a] text-[#dfdfdf] shadow-[0_1px_2px_rgba(15,16,15,0.24),0_1px_2px_rgba(21,80,15,0.04)]"
        initial={false}
        animate={{
          borderRadius: expanded ? 16 : 100,
          height: expanded ? 275 : 48,
          width: expanded ? 308 : 224,
        }}
        transition={navMorphTransition}
        style={{
          transformOrigin: "top left",
          willChange: "width, height, border-radius",
        }}
      >
        <motion.button
          type="button"
          className="relative block h-12 w-full text-left"
          onClick={() => onExpandedChange(!expanded)}
          aria-expanded={expanded}
          whileTap={{ scale: 0.992 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <motion.span
            className="absolute top-1/2 size-[18px] -translate-y-1/2"
            animate={{ left: 23 }}
            transition={navMorphTransition}
            style={{ willChange: "left" }}
          >
            <MenuIcon />
          </motion.span>
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 truncate text-[14px] font-medium leading-5 text-[#dfdfdf]"
            animate={{
              left: 49,
              opacity: 1,
              width: expanded ? 150 : 78,
            }}
            transition={navMorphTransition}
            style={{ willChange: "left, width" }}
          >
            {activeLabel}
          </motion.span>
          <motion.span
            className="absolute top-[14px] size-[18px]"
            animate={{ left: expanded ? 207 : 135 }}
            transition={navMorphTransition}
            style={{ willChange: "left" }}
          >
            <SelectorIcon expanded={expanded} />
          </motion.span>
          <motion.span
            className="absolute top-1/2 flex h-6 w-[50px] -translate-y-1/2 items-center justify-center rounded-[30px] bg-[#484848] text-[14px] font-bold leading-5 text-[#dfdfdf]"
            animate={{ left: expanded ? 233 : 161 }}
            transition={navMorphTransition}
            style={{ willChange: "left" }}
          >
            {progress}%
          </motion.span>
        </motion.button>

        <motion.div
          initial={false}
          animate={{
            filter: expanded ? "blur(0px)" : "blur(1.5px)",
            opacity: expanded ? 1 : 0,
            y: expanded ? 0 : -6,
          }}
          transition={{
            filter: { duration: expanded ? 0.18 : 0.1, ease: "easeOut" },
            opacity: { duration: expanded ? 0.18 : 0.1, ease: "easeOut" },
            y: navMorphTransition,
          }}
          className={`h-[227px] overflow-y-auto px-[23px] pt-[3px] [scrollbar-color:#484848_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#484848] [&::-webkit-scrollbar-track]:bg-transparent ${
            expanded ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!expanded}
        >
          <div className="w-[260px]">
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => onExpandedChange(false)}
                className={`flex h-10 items-center truncate text-[14px] font-medium leading-5 transition-colors ${
                  activeSection === section.id
                    ? "text-white"
                    : "text-[#c7c7c7] hover:text-white"
                }`}
                initial={false}
                animate={{
                  opacity: expanded ? 1 : 0,
                  y: expanded ? 0 : -4,
                }}
                transition={{
                  duration: expanded ? 0.18 : 0.08,
                  delay: expanded ? 0.04 + index * 0.012 : 0,
                  ease: "easeOut",
                }}
              >
                {section.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </div>
  );
}

function MotionSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: SectionId;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[30px] font-bold leading-none text-[#242424] dark:text-[#f3f3ef]">
      {children}
    </h2>
  );
}

function Screenshot({
  alt,
  caption,
  className = "",
  image,
  priority = false,
}: ScreenshotProps) {
  return (
    <figure className={className}>
      <ImageFrame>
        <Image
          src={image}
          alt={alt}
          priority={priority}
          className="h-full w-full object-cover"
          sizes="(min-width: 1024px) 708px, 100vw"
        />
      </ImageFrame>
      <Caption>{caption}</Caption>
    </figure>
  );
}

function ImageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[6px] border-[0.8px] border-[#deded9] bg-[#f8f8f6] shadow-[0_18px_55px_rgba(17,24,20,0.05)] dark:border-[#2b302b] dark:bg-[#101310] dark:shadow-none">
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-4 flex justify-center">
      <span className="rounded-[3px] bg-[#e9e9e6] px-4 py-2 text-center text-[13px] leading-none text-[#1f1f1f] dark:bg-[#202420] dark:text-[#deded8]">
        {children}
      </span>
    </figcaption>
  );
}

function WorkflowTimeline() {
  return (
    <figure className="mt-14 rounded-[8px] border-[0.8px] border-[#deded9] bg-[#f8f8f6] p-5 shadow-[0_18px_55px_rgba(17,24,20,0.04)] sm:p-8 dark:border-[#2b302b] dark:bg-[#101310] dark:shadow-none">
      <div className="mb-8 flex items-center justify-between gap-4 border-b-[0.8px] border-dashed border-[#d2d2cc] pb-5 dark:border-[#30352f]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#727272] dark:text-[#a4a4a0]">
            Session timeline
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight text-[#242424] dark:text-[#f3f3ef]">
            AI workflows as operational timelines
          </h3>
        </div>
        <span className="hidden rounded-full bg-[#ecece8] px-3 py-1 text-sm font-medium text-[#575753] sm:block dark:bg-[#1d211e] dark:text-[#c2c6bf]">
          07m 42s
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-[13px] top-4 h-[calc(100%-2rem)] w-px bg-[#d0d0cb] sm:left-0 sm:top-[15px] sm:h-px sm:w-full dark:bg-[#313631]" />
        <ol className="relative grid gap-5 sm:grid-cols-5 sm:gap-4">
          {timelineEvents.map((event, index) => (
            <li key={event.label} className="relative flex gap-4 sm:block">
              <span className="relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[0.8px] border-[#cfcfca] bg-[#f8f8f6] text-xs font-bold text-[#242424] dark:border-[#3a4039] dark:bg-[#101310] dark:text-[#f3f3ef]">
                {index + 1}
              </span>
              <div className="rounded-md bg-[#eeeeea] p-4 sm:mt-5 dark:bg-[#171b17]">
                <h4 className="text-base font-bold leading-tight text-[#242424] dark:text-[#f3f3ef]">
                  {event.label}
                </h4>
                <p className="mt-3 text-[15px] leading-6 text-[#727272] dark:text-[#a7aaa5]">
                  {event.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M11.25 4.5L6.75 9L11.25 13.5M7.5 9H15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M3 5.25H15M3 9H15M3 12.75H15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SelectorIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-[18px] w-[18px] shrink-0 transition-transform ${
        expanded ? "rotate-180" : ""
      }`}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M6 7.25L9 4.25L12 7.25M12 10.75L9 13.75L6 10.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
