import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { RecentProjects } from "@/components/work/RecentProjects";
import { publicProjects } from "@/data/projects";

const featuredProjects = publicProjects.filter((project) => project.featured);

export default function HomePage() {
  return (
    <>
      <section className="bg-surface">
        <Container className="pb-0 pt-5 md:pt-[22px]">
          <div className="max-w-[1010px]">
            <h1 className="text-[24px] font-semibold leading-normal tracking-normal text-[#242424] dark:text-foreground">
              Product Designer
            </h1>
            <div className="mt-[25px] max-w-[1080px] space-y-4 text-[18px] font-normal leading-normal tracking-normal text-muted md:space-y-[18px]">
              <p>
                <span className="font-medium text-foreground">
                  I design websites, apps, and product experiences for teams
                  building complex software.
                </span>{" "}
                I work with teams to turn rough ideas, messy workflows, and
                early product concepts into clear interfaces, prototypes, and
                product systems. Most of my work sits across fintech, AI tools,
                compliance, dashboards, and workflow-heavy products.
              </p>
              <p>
                I&apos;m currently designing and building{" "}
                <Link
                  href="https://ledger.drkannobeck.workers.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-[4px] px-1 font-semibold text-foreground transition duration-150 ease-out hover:-translate-y-px hover:bg-[#d1e2bf] hover:text-[#0a130c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:translate-y-0"
                >
                  Ledger
                </Link>
                ,
                an AI observability dashboard for teams to understand how AI is
                being used across their products, workflows, and people.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="pb-[110px] pt-[80px] md:pb-[123px] md:pt-[124px]">
          <RecentProjects projects={featuredProjects} />
        </Container>
      </section>
    </>
  );
}
