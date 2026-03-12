"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { BentoGrid } from "@/components/home/BentoGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const sectionBg = isDark
    ? "linear-gradient(180deg, #1a1510 0%, #22180f 30%, #1a2418 60%, #162216 100%)"
    : "linear-gradient(180deg, #f0e8d5 0%, #faf5ec 30%, #f4f0e4 60%, #f0e8d5 100%)";
  const glowBg = isDark
    ? "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(44,72,34,0.35) 0%, transparent 70%)"
    : "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,160,82,0.06) 0%, transparent 70%)";
  const leafOpacity = isDark ? "opacity-[0.08]" : "opacity-[0.04]";
  const leafOpacitySm = isDark ? "opacity-[0.06]" : "opacity-[0.03]";
  const grainOpacity = isDark ? "opacity-[0.025]" : "opacity-[0.015]";

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section
        id="explore-section"
        className="relative overflow-hidden px-6 py-24 transition-colors duration-500 md:py-32"
        style={{ background: sectionBg }}
      >
        <div
          className={`pointer-events-none absolute inset-0 z-[1] ${grainOpacity}`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: glowBg }}
        />

        <div className={`pointer-events-none absolute left-[6%] top-[12%] text-2xl ${leafOpacity}`} style={{ animation: "floatLeaf 24s ease-in-out infinite", ["--lr" as string]: "-15deg" } as React.CSSProperties}>🍃</div>
        <div className={`pointer-events-none absolute right-[5%] top-[60%] text-2xl ${leafOpacity}`} style={{ animation: "floatLeaf 18s ease-in-out infinite 3s", ["--lr" as string]: "20deg" } as React.CSSProperties}>🍃</div>
        <div className={`pointer-events-none absolute right-[12%] top-[30%] text-xl ${leafOpacitySm}`} style={{ animation: "floatLeaf 22s ease-in-out infinite 6s", ["--lr" as string]: "-30deg" } as React.CSSProperties}>🍃</div>

        <div className="relative z-[2] mx-auto max-w-[1200px]">
          <BentoGrid />
        </div>
      </section>

      <StatsSection />
    </div>
  );
}
