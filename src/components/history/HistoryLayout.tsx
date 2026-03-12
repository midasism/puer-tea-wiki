"use client";

import { type ReactNode } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

export function HistoryLayout({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const pageBg = isDark
    ? "linear-gradient(180deg, #0e1a0e 0%, #1c1510 20%, #1c1510 100%)"
    : "linear-gradient(180deg, #0e1a0e 0%, #1c1510 10%, #f0e8d5 30%, #faf5ec 50%)";

  const heroBg = isDark
    ? "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(44,72,34,.35) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 80% 20%, rgba(201,160,82,.06) 0%, transparent 60%)"
    : "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(44,72,34,.35) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 80% 20%, rgba(201,160,82,.06) 0%, transparent 60%)";

  const decoColor = isDark ? "rgba(201,160,82,0.04)" : "rgba(201,160,82,0.04)";
  const sideDecoColor = isDark ? "rgba(201,160,82,0.03)" : "rgba(201,160,82,0.02)";

  const headingColor = isDark ? "#f4ead8" : "#f4ead8";
  const subColor = isDark ? "rgba(244,234,216,0.45)" : "rgba(244,234,216,0.45)";

  const timelineSectionBg = isDark ? "transparent" : "#faf5ec";

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ background: pageBg }}>
      {/* Hero - always dark */}
      <section className="relative overflow-hidden" style={{ minHeight: "36vh", display: "flex", alignItems: "flex-end", paddingBottom: "48px" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: heroBg }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "200px" }} />

        <div
          className="pointer-events-none absolute right-[5%] top-[15%] select-none"
          style={{ fontFamily: "var(--font-brush), serif", fontSize: "clamp(4rem,8vw,7rem)", color: decoColor, writingMode: "vertical-rl", letterSpacing: "0.15em", lineHeight: 1.4 }}
        >
          茶馬古道
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="mb-3 flex items-center gap-2.5 text-[0.68rem] tracking-[0.2em] text-[#c9a052]" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
            <span className="h-px w-8 bg-[#c9a052]/40" />
            01 · HISTORY
          </div>
          <h1
            className="text-[clamp(2.2rem,5vw,3.5rem)]"
            style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.08em", lineHeight: 1.2, color: headingColor }}
          >
            历史长河
          </h1>
          <p className="mt-3 text-[0.88rem] font-light tracking-wider" style={{ fontFamily: "var(--font-serif), serif", letterSpacing: "0.1em", color: subColor }}>
            一片叶子的千年旅程
          </p>
          <div className="mt-6 h-px w-20" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
        </div>
      </section>

      {/* Timeline content */}
      <section className="relative px-6 pb-32 transition-colors duration-500" style={{ background: timelineSectionBg }}>
        <div
          className="pointer-events-none absolute left-[3%] top-[10%] hidden select-none lg:block"
          style={{ fontFamily: "var(--font-brush), serif", fontSize: "clamp(3rem,5vw,5rem)", color: sideDecoColor, writingMode: "vertical-rl", letterSpacing: "0.2em", lineHeight: 1.6 }}
        >
          千年史詩
        </div>
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </section>
    </div>
  );
}
