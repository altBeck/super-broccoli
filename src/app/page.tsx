import { CuttingMatNav } from "@/components/home/CuttingMatNav";
import { HeroLabel } from "@/components/home/HeroLabel";
import { Intro } from "@/components/home/Intro";
import { SmoothScroll } from "@/components/home/SmoothScroll";
import { SurfaceTexture } from "@/components/home/SurfaceTexture";
import { SelectedWork } from "@/components/work/SelectedWork";
import { About } from "@/components/about/About";
import { SiteFooter } from "@/components/footer/SiteFooter";

export default function HomePage() {
  return (
    <SurfaceTexture className="page-shell" tone="page">
      <SmoothScroll />
      <div id="top" />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <CuttingMatNav />
      <main id="main-content">
        <HeroLabel />
        <div className="content-shell">
          <Intro />
          <SelectedWork />
          <About />
        </div>
      </main>
      <SiteFooter />
    </SurfaceTexture>
  );
}
