"use client";

import { type ReactNode } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { PageHero } from "@/components/shared/PageHero";

export function HistoryLayout({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const sideDecoColor = isDark
    ? "rgba(201,160,82,0.03)"
    : "rgba(201,160,82,0.02)";

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ background: isDark ? "#1c1510" : "#f5efe3" }}
    >
      <PageHero
        number="01"
        label="HISTORY"
        title="历史长河"
        subtitle="一片叶子的千年旅程"
        decoText="茶馬古道"
        decoVertical
      />

      <section className="relative overflow-x-hidden px-6 pb-32 transition-colors duration-500">
        <div
          className="pointer-events-none absolute left-[3%] top-[10%] hidden select-none lg:block"
          style={{
            fontFamily: "var(--font-brush), serif",
            fontSize: "clamp(3rem,5vw,5rem)",
            color: sideDecoColor,
            writingMode: "vertical-rl",
            letterSpacing: "0.2em",
            lineHeight: 1.6,
          }}
        >
          千年史詩
        </div>
        <div className="mx-auto max-w-4xl">{children}</div>
      </section>
    </div>
  );
}
