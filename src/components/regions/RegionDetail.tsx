"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Thermometer, Maximize2, ChevronRight } from "lucide-react";
import { MOUNTAIN_NAMES } from "@/data/mountain-names";
import { useTheme } from "@/components/layout/ThemeProvider";

export interface SubRegion {
  id: string;
  name: string;
  description: string;
  famousMountains: string[];
}

export interface Region {
  id: string;
  name: string;
  description: string;
  altitude?: string;
  climate?: string;
  area?: string;
  features?: string[];
  famousMountains: string[];
  subRegions?: SubRegion[];
}

interface RegionDetailProps {
  region: Region | null;
  allRegions: Region[];
  onSelectRegion: (id: string) => void;
  onBackToOverview: () => void;
}

const REGION_DOT: Record<string, string> = {
  xishuangbanna: "#2d4a2d",
  lincang: "#c9a052",
  puer: "#C84825",
  baoshan: "#4F8EFF",
};

const transition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

export function RegionDetail({
  region,
  allRegions,
  onSelectRegion,
  onBackToOverview,
}: RegionDetailProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const titleColor = isDark ? "#f4ead8" : "#1c1510";
  const bodyColor = isDark ? "rgba(244,234,216,0.55)" : "#4a3828";
  const mutedColor = isDark ? "rgba(244,234,216,0.40)" : "#8a7060";
  const chipBg = isDark ? "rgba(201,160,82,0.05)" : "rgba(201,160,82,0.06)";
  const chipBorder = isDark ? "rgba(201,160,82,0.15)" : "rgba(107,66,38,0.12)";
  const chipValueColor = isDark ? "rgba(244,234,216,0.80)" : "#4a3828";
  const btnTextColor = isDark ? "rgba(244,234,216,0.50)" : "#8a7060";
  const cardBg = isDark ? "rgba(28,21,16,0.6)" : "rgba(255,255,255,0.8)";
  const cardBorder = isDark ? "rgba(201,160,82,0.10)" : "rgba(107,66,38,0.1)";
  const cardNameColor = isDark ? "#f4ead8" : "#1c1510";
  const cardDescColor = isDark ? "rgba(244,234,216,0.40)" : "#8a7060";
  const overviewBtnBg = isDark ? "rgba(28,21,16,0.5)" : "rgba(255,255,255,0.7)";
  const overviewBtnBorder = isDark ? "rgba(201,160,82,0.10)" : "rgba(107,66,38,0.1)";
  const mountainLinkColor = isDark ? "rgba(232,201,122,0.80)" : "#6b4226";
  const mountainLinkBorder = isDark ? "rgba(201,160,82,0.20)" : "rgba(107,66,38,0.15)";
  const accentColor = isDark ? "#c9a052" : "#6b4226";
  const sectionBorderColor = isDark ? "#c9a052" : "#c9a052";
  const sectionTitleColor = isDark ? "rgba(201,160,82,0.70)" : "rgba(107,66,38,0.6)";

  return (
    <div className="min-h-[400px]">
      <AnimatePresence mode="wait">
        {region ? (
          <motion.div
            key={region.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={transition}
            className="space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] md:text-[0.7rem]" style={{ color: accentColor }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: REGION_DOT[region.id] ?? "#8a7060" }} />
                  茶区
                </div>
                <h2 className="text-[2rem]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.06em", color: titleColor }}>
                  {region.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onBackToOverview}
                className="mt-1 flex shrink-0 items-center gap-1.5 rounded-sm px-3 py-1.5 text-[0.72rem] transition-colors hover:bg-[#c9a052]/8"
                style={{ color: btnTextColor }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                总览
              </button>
            </div>

            <p className="text-[0.92rem] leading-relaxed" style={{ fontFamily: "var(--font-serif), serif", lineHeight: 1.7, color: bodyColor }}>
              {region.description}
            </p>

            {(region.altitude || region.climate || region.area) && (
              <div className="flex flex-wrap gap-2.5">
                {region.altitude && (
                  <div className="inline-flex items-center gap-2 rounded-sm px-3.5 py-2" style={{ border: `1px solid ${chipBorder}`, background: chipBg }}>
                    <MapPin className="h-3.5 w-3.5" style={{ color: accentColor }} />
                    <div>
                      <div className="text-[0.58rem] uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: `${accentColor}99` }}>海拔</div>
                      <div className="text-[0.78rem]" style={{ color: chipValueColor }}>{region.altitude}</div>
                    </div>
                  </div>
                )}
                {region.climate && (
                  <div className="inline-flex items-center gap-2 rounded-sm px-3.5 py-2" style={{ border: `1px solid ${chipBorder}`, background: chipBg }}>
                    <Thermometer className="h-3.5 w-3.5" style={{ color: accentColor }} />
                    <div>
                      <div className="text-[0.58rem] uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: `${accentColor}99` }}>气候</div>
                      <div className="text-[0.78rem] line-clamp-1" style={{ color: chipValueColor }}>{region.climate}</div>
                    </div>
                  </div>
                )}
                {region.area && (
                  <div className="inline-flex items-center gap-2 rounded-sm px-3.5 py-2" style={{ border: `1px solid ${chipBorder}`, background: chipBg }}>
                    <Maximize2 className="h-3.5 w-3.5" style={{ color: accentColor }} />
                    <div>
                      <div className="text-[0.58rem] uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: `${accentColor}99` }}>面积</div>
                      <div className="text-[0.78rem]" style={{ color: chipValueColor }}>{region.area}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {region.features && region.features.length > 0 && (
              <div>
                <h3 className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em]" style={{ borderLeft: `2px solid ${sectionBorderColor}`, paddingLeft: "12px", color: sectionTitleColor }}>
                  产区特点
                </h3>
                <div className="space-y-2">
                  {region.features.map((f, i) => (
                    <div key={i} className="flex gap-3 text-[0.82rem]" style={{ color: bodyColor }}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: REGION_DOT[region.id] ?? "#c9a052" }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {region.subRegions && region.subRegions.length > 0 && (
              <div>
                <h3 className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em]" style={{ borderLeft: `2px solid ${sectionBorderColor}`, paddingLeft: "12px", color: sectionTitleColor }}>
                  子区域
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {region.subRegions.map((sr) => (
                    <div key={sr.id} className="rounded-sm p-3.5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                      <div className="text-[0.82rem] font-medium" style={{ color: cardNameColor }}>{sr.name}</div>
                      <p className="mt-1 text-[0.72rem] leading-relaxed line-clamp-2" style={{ color: cardDescColor }}>{sr.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {region.famousMountains && region.famousMountains.length > 0 && (
              <div>
                <h3 className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em]" style={{ borderLeft: `2px solid ${sectionBorderColor}`, paddingLeft: "12px", color: sectionTitleColor }}>
                  代表山头
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.famousMountains.map((mountainId) => (
                    <Link
                      key={mountainId}
                      href={`/mountains/${mountainId}`}
                      className="group inline-flex items-center gap-1 rounded-sm px-3 py-1.5 text-[0.78rem] transition-all hover:bg-[#c9a052]/8"
                      style={{ border: `1px solid ${mountainLinkBorder}`, color: mountainLinkColor }}
                    >
                      {MOUNTAIN_NAMES[mountainId] ?? mountainId}
                      <ChevronRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="space-y-5"
          >
            <div>
              <h2 className="text-[1.8rem]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.06em", color: titleColor }}>
                四大产区总览
              </h2>
              <p className="mt-2 text-[0.92rem]" style={{ color: mutedColor }}>
                云南普洱茶主要分布在四大产区，各具风土特色。点击地图或下方卡片查看详情。
              </p>
            </div>
            <div className="space-y-3">
              {allRegions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectRegion(r.id)}
                  className="group flex w-full items-start gap-4 rounded-sm p-4 text-left transition-all hover:bg-[#c9a052]/5"
                  style={{ background: overviewBtnBg, border: `1px solid ${overviewBtnBorder}` }}
                >
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: REGION_DOT[r.id] ?? "#8a7060" }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[1.05rem]" style={{ fontFamily: "var(--font-brush), serif", color: titleColor }}>
                        {r.name}
                      </span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" style={{ color: `${accentColor}50` }} />
                    </div>
                    <p className="mt-1 text-[0.82rem] leading-relaxed line-clamp-2" style={{ color: mutedColor }}>
                      {r.description}
                    </p>
                    {r.famousMountains.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.famousMountains.slice(0, 4).map((mId) => (
                          <span key={mId} className="rounded-sm bg-[#c9a052]/8 px-2 py-0.5 text-[0.62rem] text-[#c9a052]/60 md:text-[0.7rem]">
                            {MOUNTAIN_NAMES[mId] ?? mId}
                          </span>
                        ))}
                        {r.famousMountains.length > 4 && (
                          <span className="rounded-sm bg-[#c9a052]/8 px-2 py-0.5 text-[0.62rem] text-[#c9a052]/60 md:text-[0.7rem]">
                            +{r.famousMountains.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
