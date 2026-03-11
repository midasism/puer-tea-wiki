"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Thermometer, Maximize2, ChevronRight } from "lucide-react";
import { MOUNTAIN_NAMES } from "@/data/mountain-names";

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

const REGION_COLOR_MAP: Record<string, string> = {
  xishuangbanna: "bg-tea-green/10 text-tea-green border-tea-green/20 dark:bg-tea-green/20 dark:text-tea-green-light dark:border-tea-green/30",
  lincang: "bg-amber/10 text-amber border-amber/20 dark:bg-amber/20 dark:text-amber-light dark:border-amber/30",
  puer: "bg-cinnabar/10 text-cinnabar border-cinnabar/20 dark:bg-cinnabar/20 dark:text-cinnabar-light dark:border-cinnabar/30",
  baoshan: "bg-indigo/10 text-indigo border-indigo/20 dark:bg-indigo/20 dark:text-indigo-light dark:border-indigo/30",
};

const REGION_DOT_MAP: Record<string, string> = {
  xishuangbanna: "bg-tea-green dark:bg-tea-green-light",
  lincang: "bg-amber dark:bg-amber-light",
  puer: "bg-cinnabar dark:bg-cinnabar-light",
  baoshan: "bg-indigo dark:bg-indigo-light",
};

const transition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

export function RegionDetail({
  region,
  allRegions,
  onSelectRegion,
  onBackToOverview,
}: RegionDetailProps) {
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
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${REGION_COLOR_MAP[region.id] ?? ""}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${REGION_DOT_MAP[region.id] ?? "bg-ink-muted"}`} />
                  茶区
                </div>
                <h2 className="font-serif text-2xl font-medium text-ink dark:text-foreground md:text-3xl">
                  {region.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onBackToOverview}
                className="mt-1 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs text-ink-muted transition-colors hover:bg-paper-dark/60 hover:text-ink dark:hover:bg-paper-dark/60 dark:hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                总览
              </button>
            </div>

            {/* Description */}
            <p className="font-sans text-sm leading-relaxed text-ink-light dark:text-ink-light">
              {region.description}
            </p>

            {/* Info grid */}
            {(region.altitude || region.climate || region.area) && (
              <div className="grid gap-3 sm:grid-cols-3">
                {region.altitude && (
                  <div className="flex items-start gap-3 rounded-xl bg-paper-dark/40 p-3.5 dark:bg-paper-dark/40">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted/60" />
                    <div>
                      <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-ink-muted/60">
                        海拔
                      </div>
                      <div className="mt-0.5 font-sans text-sm font-medium text-ink dark:text-foreground">
                        {region.altitude}
                      </div>
                    </div>
                  </div>
                )}
                {region.climate && (
                  <div className="flex items-start gap-3 rounded-xl bg-paper-dark/40 p-3.5 dark:bg-paper-dark/40">
                    <Thermometer className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted/60" />
                    <div>
                      <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-ink-muted/60">
                        气候
                      </div>
                      <div className="mt-0.5 font-sans text-sm text-ink dark:text-foreground line-clamp-2">
                        {region.climate}
                      </div>
                    </div>
                  </div>
                )}
                {region.area && (
                  <div className="flex items-start gap-3 rounded-xl bg-paper-dark/40 p-3.5 dark:bg-paper-dark/40">
                    <Maximize2 className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted/60" />
                    <div>
                      <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-ink-muted/60">
                        面积
                      </div>
                      <div className="mt-0.5 font-sans text-sm font-medium text-ink dark:text-foreground">
                        {region.area}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features */}
            {region.features && region.features.length > 0 && (
              <div>
                <h3 className="mb-3 font-serif text-base font-medium text-ink dark:text-foreground">
                  产区特点
                </h3>
                <div className="space-y-2">
                  {region.features.map((f, i) => (
                    <div key={i} className="flex gap-3 font-sans text-sm text-ink-light dark:text-ink-light">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${REGION_DOT_MAP[region.id] ?? "bg-ink-muted"}`} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-regions */}
            {region.subRegions && region.subRegions.length > 0 && (
              <div>
                <h3 className="mb-3 font-serif text-base font-medium text-ink dark:text-foreground">
                  子区域
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {region.subRegions.map((sr) => (
                    <div
                      key={sr.id}
                      className="rounded-xl border border-ink-muted/8 bg-paper/60 p-3.5 dark:border-ink-muted/12 dark:bg-paper-dark/40"
                    >
                      <div className="font-sans text-sm font-medium text-ink dark:text-foreground">
                        {sr.name}
                      </div>
                      <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted line-clamp-2">
                        {sr.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Famous mountains */}
            {region.famousMountains && region.famousMountains.length > 0 && (
              <div>
                <h3 className="mb-3 font-serif text-base font-medium text-ink dark:text-foreground">
                  代表山头
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.famousMountains.map((mountainId) => (
                    <Link
                      key={mountainId}
                      href={`/mountains/${mountainId}`}
                      className={`group inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 font-sans text-sm transition-all hover:shadow-sm ${REGION_COLOR_MAP[region.id] ?? "bg-paper-dark text-ink border-ink-muted/15"}`}
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
          /* Overview */
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="space-y-5"
          >
            <div>
              <h2 className="font-serif text-2xl font-medium text-ink dark:text-foreground md:text-3xl">
                四大产区总览
              </h2>
              <p className="mt-2 font-sans text-sm text-ink-muted">
                云南普洱茶主要分布在四大产区，各具风土特色。点击地图或下方卡片查看详情。
              </p>
            </div>
            <div className="space-y-3">
              {allRegions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectRegion(r.id)}
                  className="group flex w-full items-start gap-4 rounded-xl border border-ink-muted/8 bg-paper/60 p-4 text-left transition-all hover:border-ink-muted/15 hover:bg-paper hover:shadow-sm dark:border-ink-muted/12 dark:bg-paper-dark/40 dark:hover:bg-paper-dark/60"
                >
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${REGION_DOT_MAP[r.id] ?? "bg-ink-muted"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-medium text-ink dark:text-foreground">
                        {r.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-ink-muted/40 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-muted" />
                    </div>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted line-clamp-2">
                      {r.description}
                    </p>
                    {r.famousMountains.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.famousMountains.slice(0, 4).map((mId) => (
                          <span
                            key={mId}
                            className="rounded-md bg-paper-dark/60 px-2 py-0.5 font-sans text-[10px] text-ink-muted dark:bg-paper-dark/80"
                          >
                            {MOUNTAIN_NAMES[mId] ?? mId}
                          </span>
                        ))}
                        {r.famousMountains.length > 4 && (
                          <span className="rounded-md bg-paper-dark/60 px-2 py-0.5 font-sans text-[10px] text-ink-muted dark:bg-paper-dark/80">
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
