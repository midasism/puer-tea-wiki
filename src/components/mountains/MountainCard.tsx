"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlavorRadarMini } from "./FlavorRadar";
import type { Mountain } from "@/lib/mountains";
import { Star } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

const REGION_NAMES: Record<string, string> = {
  xishuangbanna: "西双版纳",
  lincang: "临沧",
  puer: "普洱",
  baoshan: "保山",
};

interface MountainCardProps {
  mountain: Mountain;
}

export function MountainCard({ mountain }: MountainCardProps) {
  const regionName = REGION_NAMES[mountain.region] ?? mountain.region;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cardBg = isDark
    ? "linear-gradient(145deg, rgba(28,21,16,0.96) 0%, rgba(22,16,8,0.98) 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #faf5ec 100%)";
  const cardShadow = isDark
    ? "0 4px 24px rgba(0,0,0,0.3)"
    : "0 4px 24px rgba(0,0,0,0.08)";
  const borderColor = isDark ? "rgba(201,160,82,0.12)" : "rgba(107,66,38,0.1)";
  const borderHover = isDark ? "rgba(201,160,82,0.35)" : "rgba(107,66,38,0.25)";
  const regionDotColor = isDark ? "#c9a052" : "#c9a052";
  const regionTextColor = isDark ? "rgba(201,160,82,0.70)" : "rgba(107,66,38,0.6)";
  const nameColor = isDark ? "#f4ead8" : "#1c1510";
  const briefColor = isDark ? "rgba(244,234,216,0.40)" : "#8a7060";
  const tagBg = isDark ? "rgba(201,160,82,0.08)" : "rgba(201,160,82,0.08)";
  const tagBorder = isDark ? "rgba(201,160,82,0.15)" : "rgba(107,66,38,0.1)";
  const tagColor = isDark ? "rgba(232,201,122,0.70)" : "#6b4226";
  const accentLine = isDark ? "#c9a052" : "#c9a052";

  return (
    <Link href={`/mountains/${mountain.id}`}>
      <motion.article
        layout
        layoutId={mountain.id}
        className="group relative flex h-full flex-col overflow-hidden rounded-sm transition-all"
        style={{
          background: cardBg,
          boxShadow: cardShadow,
          border: `1px solid ${borderColor}`,
        }}
        whileHover={{ y: -4, boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,160,82,0.2)" : "0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(107,66,38,0.15)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = borderHover; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = borderColor; }}
      >
        <div className="h-[2px] w-full transition-all" style={{ background: "transparent" }}>
          <div className="h-full w-full opacity-0 transition-opacity group-hover:opacity-100" style={{ background: accentLine }} />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: regionDotColor }} />
                <span className="text-[0.6rem] tracking-wider" style={{ color: regionTextColor }}>{regionName}</span>
              </div>
              <h3 className="text-[1.2rem]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.04em", color: nameColor }}>
                {mountain.name}
              </h3>
            </div>
            <FlavorRadarMini flavor={mountain.flavor} />
          </div>

          <p className="mt-3 line-clamp-2 text-[0.76rem] leading-relaxed" style={{ color: briefColor }}>
            {mountain.brief}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-sm px-2 py-0.5 text-[0.62rem]" style={{ background: tagBg, border: `1px solid ${tagBorder}`, color: tagColor }}>
              {mountain.flavorType}
            </span>
            <div className="flex items-center gap-0.5" aria-label={`知名度 ${mountain.fame} 星`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i <= mountain.fame
                      ? "fill-[#c9a052] text-[#c9a052]"
                      : "fill-none text-[#c9a052]/20"
                  }`}
                  strokeWidth={1.5}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
