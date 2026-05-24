"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  currentInternalPathKey,
  internalNavigationStackKey,
  previousInternalPathKey,
} from "@/components/layout/NavigationHistoryTracker";
import backMobileIcon from "@/images/icons/back-mobile.svg";
import closeIcon from "@/images/icons/close.svg";
import leftIcon from "@/images/icons/left.svg";
import rightIcon from "@/images/icons/right.svg";
import claudeAnalytics from "@/images/ledger/claude.png";
import ledgerOverview from "@/images/ledger/ledger-overview.png";
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
  | "governance"
  | "interventions"
  | "ongoing"
  | "reflection";

type CaseSection = {
  id: SectionId;
  label: string;
};

type ScreenshotProps = {
  alt: string;
  caption: string;
  galleryIndex?: number;
  image: StaticImageData;
  onOpen?: (index: number) => void;
  priority?: boolean;
  className?: string;
};

type GalleryImage = {
  alt: string;
  caption: string;
  image: StaticImageData;
};

type UpcomingArtifactProps = {
  title: string;
  why: string;
  proves: string;
  expected: string;
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
  { id: "governance", label: "Governance / Trust" },
  { id: "interventions", label: "Intervention Paths" },
  { id: "ongoing", label: "Ongoing" },
  { id: "reflection", label: "Reflection / Next" },
];

const metadata = [
  { label: "Role", value: ["Product Designer", "Frontend"] },
  { label: "Timeline", value: ["2026", "Ongoing"] },
  { label: "Team", value: ["Independent prototype"] },
  { label: "Skills", value: ["Product Design", "UX Architecture", "TypeScript"] },
];

const stakeholders = [
  "Product teams tracking AI-assisted work",
  "Engineering leads monitoring cost, retries, and provider behavior",
  "Founders and operators comparing usage across projects",
  "Future AI operations stakeholders responsible for governance paths",
];

const timelineEvents = [
  {
    label: "Request",
    detail: "A bounded unit of AI-assisted work starts in a provider, IDE, browser tool, API, or agent.",
  },
  {
    label: "Retry",
    detail: "The same intent is attempted again after a weak output, failed generation, or unresolved path.",
  },
  {
    label: "Model Switch",
    detail: "The work moves between models or providers as the user searches for a better result.",
  },
  {
    label: "Signal",
    detail: "Cost, latency, stale sync, or repeated attempts make the session operationally important.",
  },
  {
    label: "Resolution",
    detail: "Provider, project, status, cost, output, and timing resolve into one session record.",
  },
];

const objectModel = [
  "Providers",
  "Sessions",
  "Projects",
  "Signals",
  "Governance",
  "Interventions",
];

const sessionStatuses = [
  "Success",
  "Retry Heavy",
  "Expensive",
  "Optimized",
  "Failed",
  "Stalled",
  "Unclassified",
];

const signalExamples = [
  "Retry-heavy sessions",
  "Failed generations",
  "Model switching",
  "Cost accumulation",
  "Missing data",
  "Stale sync",
];

const galleryImages: GalleryImage[] = [
  {
    alt: "Ledger overview screen showing AI usage across providers and projects, total cost, sessions, outputs, provider spend, and quick summary signals.",
    caption:
      "The overview connects usage, provider spend, sessions, outputs, and summary signals before deeper inspection.",
    image: ledgerOverview,
  },
  {
    alt: "Claude analytics screen showing activity metrics and active user charts.",
    caption:
      "Claude exposes product usage inside its own provider boundary.",
    image: claudeAnalytics,
  },
  {
    alt: "OpenAI usage screen showing spend, tokens, requests, users, and capability charts.",
    caption:
      "OpenAI exposes spend, tokens, requests, and health inside its own provider boundary.",
    image: openAiUsage,
  },
  {
    alt: "Ledger provider detail screen showing OpenAI connection overview, sync health, usage snapshot, model breakdown, and recent provider events.",
    caption: "Provider health is treated as infrastructure, not settings.",
    image: providerDetail,
  },
  {
    alt: "Ledger session operations table showing sessions, provider and model, project, cost, outputs, retries, status, and time.",
    caption:
      "Sessions group provider, model, project, cost, retry, status, and time into one observable unit.",
    image: sessionOperations,
  },
];

const navMorphTransition = {
  type: "spring",
  stiffness: 520,
  damping: 42,
  mass: 0.72,
} as const;

const galleryMorphTransition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.95,
} as const;

const lightboxImageVariants = {
  enter: (direction: number) => ({
    filter: direction === 0 ? "blur(0px)" : "blur(4px)",
    opacity: direction === 0 ? 1 : 0,
    x: direction === 0 ? 0 : direction > 0 ? 96 : -96,
  }),
  center: {
    filter: "blur(0px)",
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    filter: direction === 0 ? "blur(0px)" : "blur(4px)",
    opacity: direction === 0 ? 1 : 0,
    x: direction === 0 ? 0 : direction > 0 ? -96 : 96,
  }),
} as const;

export function LedgerCaseStudy() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [galleryDirection, setGalleryDirection] = useState(0);
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

  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const updateImageIndex = (direction: 1 | -1) => {
      setGalleryDirection(direction);
      setActiveImageIndex((currentIndex) => {
        if (currentIndex === null) {
          return currentIndex;
        }

        return (
          (currentIndex + direction + galleryImages.length) %
          galleryImages.length
        );
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
      }

      if (event.key === "ArrowLeft") {
        updateImageIndex(-1);
      }

      if (event.key === "ArrowRight") {
        updateImageIndex(1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex]);

  const openGalleryImage = (index: number) => {
    setGalleryDirection(0);
    setActiveImageIndex(index);
  };

  const showNextGalleryImage = () => {
    setGalleryDirection(1);
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % galleryImages.length;
    });
  };

  const showPreviousGalleryImage = () => {
    setGalleryDirection(-1);
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (
        (currentIndex - 1 + galleryImages.length) % galleryImages.length
      );
    });
  };

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
      <div className="mx-auto grid w-full max-w-[1032px] grid-cols-1 gap-12 px-5 pb-28 pt-5 sm:px-8 sm:pt-10 lg:grid-cols-[260px_minmax(0,708px)] lg:gap-16 lg:pb-36 lg:pt-16">
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
            className="scroll-mt-32 pt-4 lg:pt-0"
          >
            <p className="font-mono text-[15px] uppercase leading-none tracking-[0.12em] text-[#727272] dark:text-[#a4a4a0]">
              Ledger &bull; Active prototype &bull; Ongoing 2026
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-x-7 gap-y-8 border-y-[1.56px] border-dashed border-[#cecece] py-6 text-[15px] dark:border-[#333633] sm:grid-cols-4">
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
              Ledger is not just an AI dashboard. It is an operational
              intelligence layer for AI-native work.
            </h1>

            <p className="mt-7 max-w-[708px] text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              AI work now moves through providers, IDEs, browser tools, APIs,
              agents, and product surfaces. Ledger explores how teams make that
              activity observable without pretending the prototype is a finished
              governance product.
            </p>

            <StakeholderBlock />

            <Screenshot
              alt="Ledger overview screen showing AI usage across providers and projects, total cost, sessions, outputs, provider spend, and quick summary signals."
              caption="The overview connects usage, provider spend, sessions, outputs, and summary signals before deeper inspection."
              className="mt-12"
              galleryIndex={0}
              image={ledgerOverview}
              onOpen={openGalleryImage}
              priority
            />

            <KeyLine>
              The shift is from prompt analytics to workflow intelligence.
            </KeyLine>
          </MotionSection>

          <MotionSection id="observation" className="scroll-mt-32 pt-28">
            <PhaseLabel>Observation</PhaseLabel>
            <SectionTitle>What AI Usage Looks Like Today</SectionTitle>
            <SectionIntro>
              Provider consoles expose useful slices of activity. They rarely
              connect the behavior around the work.
            </SectionIntro>

            <figure className="mt-12">
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageFrame>
                  <GalleryImageButton
                    galleryIndex={1}
                    onOpen={openGalleryImage}
                  >
                    <Image
                      src={claudeAnalytics}
                      alt="Claude analytics screen showing activity metrics and active user charts."
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 346px, (min-width: 640px) 50vw, 100vw"
                    />
                  </GalleryImageButton>
                </ImageFrame>
                <ImageFrame>
                  <GalleryImageButton
                    galleryIndex={2}
                    onOpen={openGalleryImage}
                  >
                    <Image
                      src={openAiUsage}
                      alt="OpenAI usage screen showing spend, tokens, requests, users, and capability charts."
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 346px, (min-width: 640px) 50vw, 100vw"
                    />
                  </GalleryImageButton>
                </ImageFrame>
              </div>
              <Caption>
                Provider consoles expose slices of usage, but not cross-tool
                workflow behavior.
              </Caption>
            </figure>

            <p className="mt-10 max-w-[708px] text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              The missing questions are operational: which sessions became
              retry-heavy, where model switching happened, which projects
              accumulated cost, and where provider data became stale.
            </p>
          </MotionSection>

          <MotionSection
            id="workflow-intelligence"
            className="scroll-mt-32 border-t-[0.8px] border-[#dededb] pt-28 dark:border-[#2b2f2b]"
          >
            <PhaseLabel>Workflow Intelligence</PhaseLabel>
            <SectionTitle>The System Ledger Had to Define</SectionTitle>
            <SectionIntro>
              The product problem was object definition: what should hold the
              behavior, which states matter, and what a stakeholder can do next.
            </SectionIntro>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {objectModel.map((item) => (
                <ObjectPill key={item}>{item}</ObjectPill>
              ))}
            </div>

            <WorkflowTimeline />

            <UpcomingArtifact
              className="mt-10"
              title="Product model diagram"
              why="The system model needs one artifact that explains Ledger as more than a set of pages."
              proves="Providers feed sessions, sessions attach to projects, and signals create governance or intervention paths."
              expected="Providers -> Sessions -> Projects -> Signals -> Governance / Interventions."
            />
          </MotionSection>

          <MotionSection id="providers" className="scroll-mt-32 pt-28">
            <PhaseLabel>Providers</PhaseLabel>
            <SectionTitle>Providers as Health Surfaces</SectionTitle>
            <SectionIntro>
              A provider is treated as infrastructure: connection status,
              permissions, sync coverage, ingestion state, and recent events.
            </SectionIntro>

            <Screenshot
              alt="Ledger provider detail screen showing OpenAI connection overview, sync health, usage snapshot, model breakdown, and recent provider events."
              caption="Provider health is treated as infrastructure, not settings."
              className="mt-12"
              galleryIndex={3}
              image={providerDetail}
              onOpen={openGalleryImage}
            />

            <p className="mt-10 max-w-[708px] text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              OpenAI is connected in the active prototype. Other providers are
              in-progress integrations, so the case study keeps coverage honest.
            </p>
          </MotionSection>

          <MotionSection id="sessions" className="scroll-mt-32 pt-28">
            <PhaseLabel>Core Product Decision</PhaseLabel>
            <SectionTitle>Sessions as the Atomic Unit</SectionTitle>

            <DecisionBlock />

            <Screenshot
              alt="Ledger session operations table showing sessions, provider and model, project, cost, outputs, retries, status, and time."
              caption="Sessions group provider, model, project, cost, retry, status, and time into one observable unit."
              className="mt-12"
              galleryIndex={4}
              image={sessionOperations}
              onOpen={openGalleryImage}
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {sessionStatuses.map((status) => (
                <span
                  key={status}
                  className="rounded-[3px] bg-[#e9e9e6] px-3 py-2 text-[13px] font-bold leading-none text-[#1f1f1f] dark:bg-[#202420] dark:text-[#deded8]"
                >
                  {status}
                </span>
              ))}
            </div>

            <UpcomingArtifact
              className="mt-10"
              title="Session detail screen"
              why="The table proves the object exists. A detail screen will show how one unit of AI-assisted work unfolds."
              proves="Retries, model switching, cost accumulation, output status, project context, and signal tags belong to one session."
              expected="One session timeline with provider/model, retry events, cost changes, status, linked project, and resolution state."
            />
          </MotionSection>

          <MotionSection
            id="projects"
            className="scroll-mt-32 border-t-[0.8px] border-[#dededb] pt-28 dark:border-[#2b2f2b]"
          >
            <PhaseLabel>Projects</PhaseLabel>
            <SectionTitle>Projects as Context</SectionTitle>
            <SectionIntro>
              Project context turns activity into work. A cost spike means
              something different in auth, onboarding, pricing, research, or
              support.
            </SectionIntro>

            <UpcomingArtifact
              className="mt-12"
              title="Projects screen"
              why="Project context is visible in the session table, but it needs a dedicated artifact."
              proves="AI usage can be grouped by product, feature, team effort, or workstream."
              expected="Project rows with sessions, provider mix, spend, retry-heavy sessions, failed sessions, recent activity, and active signals."
            />
          </MotionSection>

          <MotionSection id="signals" className="scroll-mt-32 pt-28">
            <PhaseLabel>Signals</PhaseLabel>
            <SectionTitle>Signals as Operational Decisions</SectionTitle>
            <SectionIntro>
              Signals are interpreted patterns. They exist to point a person
              toward inspection, comparison, reconnection, or review.
            </SectionIntro>

            <div className="mt-8 flex flex-wrap gap-2">
              {signalExamples.map((signal) => (
                <span
                  key={signal}
                  className="rounded-[3px] border-[0.8px] border-[#d9d9d3] px-3 py-2 text-[13px] font-medium leading-none text-[#555651] dark:border-[#2f352f] dark:text-[#c7cbc3]"
                >
                  {signal}
                </span>
              ))}
            </div>

            <UpcomingArtifact
              className="mt-10"
              title="Signals screen"
              why="The case study needs evidence for how Ledger turns session data into operational attention."
              proves="Signals are not raw metrics; they are decision prompts tied to sessions, projects, and providers."
              expected="Retry Heavy, Expensive, Failed, Optimized, Missing Data, and Stale Sync groups with linked objects and suggested next actions."
            />
          </MotionSection>

          <MotionSection
            id="governance"
            className="scroll-mt-32 border-t-[0.8px] border-[#dededb] pt-28 dark:border-[#2b2f2b]"
          >
            <PhaseLabel>Governance / Trust</PhaseLabel>
            <SectionTitle>Governance Starts With Coverage</SectionTitle>
            <SectionIntro>
              The trust model is intentionally narrow: read-only permissions,
              API key state, provider health, data coverage, expired
              credentials, and missing data.
            </SectionIntro>

            <p className="mt-8 max-w-[708px] text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              Team visibility is product direction, not a claim of enterprise
              compliance automation. The current story is about making
              governance gaps visible before teams act on the data.
            </p>

            <UpcomingArtifact
              className="mt-10"
              title="Governance/trust screen"
              why="Governance needs to stay grounded in concrete trust states."
              proves="Teams can see whether the operational picture is complete enough to trust."
              expected="Provider permissions, read-only access, API key state, coverage, expired credentials, disconnected providers, and team visibility boundaries."
            />
          </MotionSection>

          <MotionSection id="interventions" className="scroll-mt-32 pt-28">
            <PhaseLabel>Intervention Paths</PhaseLabel>
            <SectionTitle>From Signal to Next Action</SectionTitle>
            <SectionIntro>
              The product direction is not just surfacing anomalies. It is
              helping a responsible person decide what to inspect, reconnect,
              compare, investigate, or resolve.
            </SectionIntro>

            <UpcomingArtifact
              className="mt-12"
              title="Intervention path screen"
              why="A signal should not be a dead end."
              proves="Operational signals can lead to clear next actions without claiming completed automation."
              expected="Inspect session, reconnect provider, compare models, investigate failed generation, review cost spike, assign owner, and resolve."
            />
          </MotionSection>

          <MotionSection
            id="ongoing"
            className="scroll-mt-32 border-t-[0.8px] border-[#dededb] pt-28 dark:border-[#2b2f2b]"
          >
            <PhaseLabel>Prototype Honesty</PhaseLabel>
            <SectionTitle>What Is Still Ongoing</SectionTitle>
            <div className="mt-8 grid gap-4">
              <StatusBlock
                label="Implemented prototype behavior"
                text="Active React, Next.js, Tailwind CSS, and TypeScript prototype. OpenAI can be connected and read in the testing environment."
              />
              <StatusBlock
                label="Designed product model"
                text="Providers, sessions, projects, signals, governance, and intervention paths define the information architecture."
              />
              <StatusBlock
                label="In-progress provider work"
                text="Additional providers are planned or being built. The case study does not claim complete coverage."
              />
              <StatusBlock
                label="Future product direction"
                text="Deeper signal logic, team visibility, governance views, intervention workflows, and beta testing remain active work."
              />
            </div>
          </MotionSection>

          <MotionSection id="reflection" className="scroll-mt-32 pt-28">
            <PhaseLabel>Reflection / Next</PhaseLabel>
            <SectionTitle>The Interface Around the AI Tool</SectionTitle>
            <div className="mt-6 space-y-6 text-[20px] leading-[1.45] text-[#727272] dark:text-[#a7aaa5]">
              <p>
                Ledger clarified that the interface around AI work matters as
                much as the AI tool itself.
              </p>
              <p>
                Provider health, session behavior, cost accumulation, project
                context, governance gaps, and intervention paths are the layer
                where teams understand AI-assisted work.
              </p>
              <p className="font-medium text-[#242424] dark:text-[#f3f3ef]">
                Next, the product needs stronger screen evidence for session
                detail, project context, signal triage, governance states, and
                intervention workflows.
              </p>
            </div>
          </MotionSection>
        </div>
      </div>

      <AnimatePresence>
        {activeImageIndex !== null ? (
          <ImageLightbox
            activeIndex={activeImageIndex}
            direction={galleryDirection}
            images={galleryImages}
            onClose={() => setActiveImageIndex(null)}
            onNext={showNextGalleryImage}
            onPrevious={showPreviousGalleryImage}
          />
        ) : null}
      </AnimatePresence>
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

function PhaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#7d7d78] dark:text-[#999c97]">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 text-[30px] font-bold leading-none text-[#242424] dark:text-[#f3f3ef]">
      {children}
    </h2>
  );
}

function SectionIntro({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-[708px] text-[20px] font-medium leading-[1.45] text-[#242424] dark:text-[#f3f3ef]">
      {children}
    </p>
  );
}

function KeyLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-12 border-l-[3px] border-[#1f1f1f] pl-5 text-[22px] font-bold leading-[1.25] text-[#242424] dark:border-[#f3f3ef] dark:text-[#f3f3ef]">
      {children}
    </p>
  );
}

function Screenshot({
  alt,
  caption,
  className = "",
  galleryIndex,
  image,
  onOpen,
  priority = false,
}: ScreenshotProps) {
  const imageFrame = (
    <ImageFrame>
      <Image
        src={image}
        alt={alt}
        priority={priority}
        className="h-full w-full object-cover"
        sizes="(min-width: 1024px) 708px, 100vw"
      />
    </ImageFrame>
  );

  return (
    <figure className={className}>
      {typeof galleryIndex === "number" && onOpen ? (
        <GalleryImageButton galleryIndex={galleryIndex} onOpen={onOpen}>
          {imageFrame}
        </GalleryImageButton>
      ) : (
        imageFrame
      )}
      <Caption>{caption}</Caption>
    </figure>
  );
}

function GalleryImageButton({
  children,
  galleryIndex,
  onOpen,
}: {
  children: React.ReactNode;
  galleryIndex: number;
  onOpen: (index: number) => void;
}) {
  return (
    <motion.button
      type="button"
      layoutId={`ledger-gallery-image-${galleryIndex}`}
      onClick={() => onOpen(galleryIndex)}
      className="block h-full w-full cursor-zoom-in rounded-[4px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242424] dark:focus-visible:outline-[#f3f3ef]"
      transition={galleryMorphTransition}
      whileTap={{ scale: 0.992 }}
    >
      {children}
    </motion.button>
  );
}

function ImageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[4px] border border-[#e1e4dd] bg-[#f8f8f6] shadow-[0_8px_22px_rgba(17,24,20,0.025)] dark:border-[#2b302b] dark:bg-[#101310] dark:shadow-none">
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-4 flex justify-center">
      <span className="rounded-[3px] bg-[#e9e9e6] px-4 py-2 text-center text-[13px] leading-5 text-[#1f1f1f] dark:bg-[#202420] dark:text-[#deded8]">
        {children}
      </span>
    </figcaption>
  );
}

function ImageLightbox({
  activeIndex,
  direction,
  images,
  onClose,
  onNext,
  onPrevious,
}: {
  activeIndex: number;
  direction: number;
  images: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const activeImage = images[activeIndex];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Ledger image viewer"
      className="fixed inset-0 z-[80] bg-[#151515]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClose}
    >
      <div className="absolute left-6 top-6 flex h-9 min-w-16 items-center justify-center rounded-[40px] bg-[#262626] px-4 text-[14px] font-bold leading-5 text-[#dfdfdf] sm:left-8 sm:top-8">
        {activeIndex + 1} / {images.length}
      </div>

      <LightboxButton
        ariaLabel="Close image viewer"
        className="right-6 top-6 sm:right-8 sm:top-8"
        icon={closeIcon}
        onClick={onClose}
      />

      {images.length > 1 ? (
        <>
          <LightboxButton
            ariaLabel="Previous image"
            className="left-4 top-1/2 -translate-y-1/2 sm:left-8"
            icon={leftIcon}
            onClick={onPrevious}
          />
          <LightboxButton
            ariaLabel="Next image"
            className="right-4 top-1/2 -translate-y-1/2 sm:right-8"
            icon={rightIcon}
            onClick={onNext}
          />
        </>
      ) : null}

      <div className="flex min-h-screen items-center justify-center px-6 py-20">
        <div
          className="relative z-10 w-[calc(100vw-48px)] max-w-[1000px]"
          onClick={(event) => event.stopPropagation()}
        >
          <AnimatePresence
            custom={direction}
            initial={direction !== 0}
            mode="popLayout"
          >
            <motion.div
              key={activeIndex}
              layoutId={
                direction === 0
                  ? `ledger-gallery-image-${activeIndex}`
                  : undefined
              }
              custom={direction}
              variants={lightboxImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="overflow-hidden rounded-[4px]"
              transition={
                direction === 0
                  ? galleryMorphTransition
                  : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Image
                src={activeImage.image}
                alt={activeImage.alt}
                priority
                className="h-auto max-h-[calc(100vh-180px)] w-full rounded-[4px] object-contain"
                sizes="(min-width: 1440px) 1000px, calc(100vw - 48px)"
              />
            </motion.div>
          </AnimatePresence>
          <figcaption className="mt-10 flex justify-center">
            <span className="rounded-[2px] bg-[#eaeaea] px-3 py-1.5 text-center text-[13px] leading-[18px] text-black">
              {activeImage.caption}
            </span>
          </figcaption>
        </div>
      </div>
    </motion.div>
  );
}

function LightboxButton({
  ariaLabel,
  className,
  icon,
  onClick,
}: {
  ariaLabel: string;
  className: string;
  icon: StaticImageData;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute z-20 flex h-10 w-10 items-center justify-center rounded-full text-[#9f9f9f] transition hover:bg-white/5 ${className}`}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <Image src={icon} alt="" className="h-[18px] w-[18px] invert opacity-60" />
    </motion.button>
  );
}

function StakeholderBlock() {
  return (
    <div className="mt-10 rounded-[8px] border-[0.8px] border-[#deded9] bg-[#f8f8f6] p-5 dark:border-[#2b302b] dark:bg-[#101310]">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#727272] dark:text-[#a4a4a0]">
        Built for
      </p>
      <ul className="mt-4 grid gap-3 text-[15px] leading-6 text-[#555651] sm:grid-cols-2 dark:text-[#c7cbc3]">
        {stakeholders.map((item) => (
          <li key={item} className="border-t-[0.8px] border-[#e1e1dc] pt-3 dark:border-[#252a25]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ObjectPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border-[0.8px] border-[#deded9] bg-[#f8f8f6] p-4 text-[15px] font-bold text-[#242424] dark:border-[#2b302b] dark:bg-[#101310] dark:text-[#f3f3ef]">
      {children}
    </div>
  );
}

function UpcomingArtifact({
  className = "",
  expected,
  proves,
  title,
  why,
}: UpcomingArtifactProps) {
  return (
    <figure className={className}>
      <div className="rounded-[8px] border-[0.8px] border-[#d9d9d3] bg-[#f0f0ec] p-5 dark:border-[#2b302b] dark:bg-[#111411]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#7d7d78] dark:text-[#999c97]">
            Upcoming artifact
          </p>
          <span className="rounded-full bg-[#e4e4de] px-3 py-1 text-xs font-medium text-[#656660] dark:bg-[#1c211c] dark:text-[#b7bbb3]">
            Design pending
          </span>
        </div>
        <h3 className="mt-4 text-[22px] font-bold leading-tight text-[#242424] dark:text-[#f3f3ef]">
          {title}
        </h3>
        <dl className="mt-5 grid gap-4 text-[15px] leading-6 text-[#666762] dark:text-[#b8bcb4]">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[#242424] dark:text-[#f3f3ef]">
              Why it matters
            </dt>
            <dd className="mt-1">{why}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[#242424] dark:text-[#f3f3ef]">
              What it should prove
            </dt>
            <dd className="mt-1">{proves}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[#242424] dark:text-[#f3f3ef]">
              Expected content
            </dt>
            <dd className="mt-1">{expected}</dd>
          </div>
        </dl>
      </div>
      <Caption>{title}</Caption>
    </figure>
  );
}

function DecisionBlock() {
  return (
    <div className="mt-8 rounded-[8px] border-[0.8px] border-[#cfcfca] bg-[#f8f8f6] p-5 sm:p-7 dark:border-[#2b302b] dark:bg-[#101310]">
      <p className="text-[24px] font-bold leading-[1.18] text-[#242424] dark:text-[#f3f3ef]">
        Sessions became the atomic unit of the system.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <ComparisonItem
          label="Prompt"
          text="Too narrow to explain retries, switching, and cost accumulation."
        />
        <ComparisonItem
          label="Project"
          text="Too broad to show one bounded unit of AI-assisted work."
        />
        <ComparisonItem
          label="Session"
          text="The observable unit where provider, model, project, cost, retry, status, and time meet."
          strong
        />
      </div>
    </div>
  );
}

function ComparisonItem({
  label,
  strong = false,
  text,
}: {
  label: string;
  strong?: boolean;
  text: string;
}) {
  return (
    <div
      className={`rounded-md p-4 ${
        strong
          ? "bg-[#e7e7e2] text-[#242424] dark:bg-[#1d211e] dark:text-[#f3f3ef]"
          : "bg-[#eeeeea] text-[#666762] dark:bg-[#171b17] dark:text-[#b8bcb4]"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em]">{label}</p>
      <p className="mt-3 text-[15px] leading-6">{text}</p>
    </div>
  );
}

function StatusBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[8px] border-[0.8px] border-[#deded9] bg-[#f8f8f6] p-5 dark:border-[#2b302b] dark:bg-[#101310]">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#727272] dark:text-[#a4a4a0]">
        {label}
      </p>
      <p className="mt-3 text-[18px] leading-7 text-[#242424] dark:text-[#f3f3ef]">
        {text}
      </p>
    </div>
  );
}

function WorkflowTimeline() {
  return (
    <figure className="mt-12 rounded-[8px] border-[0.8px] border-[#deded9] bg-[#f8f8f6] p-5 shadow-[0_18px_55px_rgba(17,24,20,0.04)] sm:p-8 dark:border-[#2b302b] dark:bg-[#101310] dark:shadow-none">
      <div className="mb-8 flex items-center justify-between gap-4 border-b-[0.8px] border-dashed border-[#d2d2cc] pb-5 dark:border-[#30352f]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#727272] dark:text-[#a4a4a0]">
            Workflow model
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight text-[#242424] dark:text-[#f3f3ef]">
            From prompt event to operational record
          </h3>
        </div>
        <span className="hidden rounded-full bg-[#ecece8] px-3 py-1 text-sm font-medium text-[#575753] sm:block dark:bg-[#1d211e] dark:text-[#c2c6bf]">
          Model
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
      <Caption>
        Workflow behavior becomes readable when it resolves into a session
        record.
      </Caption>
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
