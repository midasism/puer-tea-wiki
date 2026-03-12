"use client";

import { type ReactNode } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

export function MountainsLayout({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const pageBg = isDark
    ? "linear-gradient(180deg, #0e1a0e 0%, #1c1510 20%, #1c1510 100%)"
    : "linear-gradient(180deg, #0e1a0e 0%, #1c1510 10%, #f0e8d5 28%, #faf5ec 45%)";

  const contentBg = isDark ? "transparent" : "#faf5ec";

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ background: pageBg }}>
      {/* Hero - always dark */}
      <section className="relative overflow-hidden" style={{ minHeight: "36vh", display: "flex", alignItems: "flex-end", paddingBottom: "48px" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(44,72,34,.3) 0%, transparent 70%)" }} />
        <svg className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%] w-full opacity-[0.08]" viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 L0,140 Q120,80 240,110 Q360,140 480,85 Q600,30 720,65 Q840,100 960,55 Q1080,10 1200,45 Q1320,80 1440,40 L1440,200 Z" fill="#2d4a2d" />
        </svg>
        <div className="pointer-events-none absolute left-[4%] top-[15%] select-none" style={{ fontFamily: "var(--font-brush), serif", fontSize: "clamp(4rem,8vw,7rem)", color: "rgba(201,160,82,0.04)", writingMode: "vertical-rl", letterSpacing: "0.15em" }}>
          百座茶山
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="mb-3 flex items-center gap-2.5 text-[0.68rem] tracking-[0.2em] text-[#c9a052]">
            <span className="h-px w-8 bg-[#c9a052]/40" />
            04 · MOUNTAINS
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] text-[#f4ead8]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.08em" }}>
            山头图鉴
          </h1>
          <p className="mt-3 text-[0.88rem] font-light tracking-wider text-[#f4ead8]/45">
            每座山头都有独特的风味密码
          </p>
          <div className="mt-6 h-px w-20" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
        </div>
      </section>

      {/* Content */}
      <section className="relative px-6 pb-24 transition-colors duration-500" style={{ background: contentBg }}>
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </section>
    </div>
  );
}
