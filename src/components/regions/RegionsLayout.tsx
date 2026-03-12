"use client";

import { type ReactNode } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

export function RegionsLayout({ children }: { children: ReactNode }) {
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
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(44,72,34,.35) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute right-[6%] top-[18%] select-none" style={{ fontFamily: "var(--font-brush), serif", fontSize: "clamp(5rem,9vw,8rem)", color: "rgba(201,160,82,0.04)" }}>
          域
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="mb-3 flex items-center gap-2.5 text-[0.68rem] tracking-[0.2em] text-[#c9a052]">
            <span className="h-px w-8 bg-[#c9a052]/40" />
            03 · REGIONS
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] text-[#f4ead8]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.08em" }}>
            产区地图
          </h1>
          <p className="mt-3 max-w-xl text-[0.88rem] font-light tracking-wider text-[#f4ead8]/45">
            四大产区，百座茶山的风土密码
          </p>
          <div className="mt-6 h-px w-20" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
        </div>
      </section>

      {/* Map content */}
      <section className="relative px-4 pb-24 transition-colors duration-500 md:px-6" style={{ background: contentBg }}>
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </section>
    </div>
  );
}
