import { HeroSection } from "@/components/home/HeroSection";
import { BentoGrid } from "@/components/home/BentoGrid";
import { StatsSection } from "@/components/home/StatsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section
        id="explore-section"
        className="bg-background px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 font-serif text-2xl font-medium text-ink dark:text-foreground md:text-3xl">
            开始探索
          </h2>
          <BentoGrid />
        </div>
      </section>

      <StatsSection />
    </div>
  );
}
