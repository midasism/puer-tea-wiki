"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
  onBackToOverview: () => void;
}

const overviewVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function RegionDetail({
  region,
  allRegions,
  onBackToOverview,
}: RegionDetailProps) {
  return (
    <div className="rounded-xl border border-paper-dark bg-paper/50 p-6 dark:border-paper-dark dark:bg-paper-dark/30 md:p-8">
      <AnimatePresence mode="wait">
        {region ? (
          <motion.div
            key={region.id}
            variants={overviewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-medium text-ink dark:text-foreground md:text-3xl">
                {region.name}
              </h2>
              <button
                type="button"
                onClick={onBackToOverview}
                className="flex items-center gap-1.5 font-sans text-sm text-ink-muted transition-colors hover:text-ink dark:hover:text-foreground"
                aria-label="返回总览"
              >
                <ArrowLeft className="h-4 w-4" />
                返回总览
              </button>
            </div>

            <p className="font-sans text-ink-light dark:text-ink-light leading-relaxed">
              {region.description}
            </p>

            {(region.altitude || region.climate || region.area) && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {region.altitude && (
                  <div className="rounded-lg bg-paper-dark/50 p-3 dark:bg-paper-dark/50">
                    <div className="font-sans text-xs text-ink-muted">海拔</div>
                    <div className="font-sans font-medium text-ink dark:text-foreground">
                      {region.altitude}
                    </div>
                  </div>
                )}
                {region.climate && (
                  <div className="rounded-lg bg-paper-dark/50 p-3 dark:bg-paper-dark/50">
                    <div className="font-sans text-xs text-ink-muted">气候</div>
                    <div className="font-sans font-medium text-ink dark:text-foreground">
                      {region.climate}
                    </div>
                  </div>
                )}
                {region.area && (
                  <div className="rounded-lg bg-paper-dark/50 p-3 dark:bg-paper-dark/50">
                    <div className="font-sans text-xs text-ink-muted">面积</div>
                    <div className="font-sans font-medium text-ink dark:text-foreground">
                      {region.area}
                    </div>
                  </div>
                )}
              </div>
            )}

            {region.features && region.features.length > 0 && (
              <div>
                <h3 className="mb-2 font-serif text-lg font-medium text-ink dark:text-foreground">
                  特点
                </h3>
                <ul className="space-y-1 font-sans text-ink-light dark:text-ink-light">
                  {region.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tea-green dark:bg-amber" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {region.subRegions && region.subRegions.length > 0 && (
              <div>
                <h3 className="mb-2 font-serif text-lg font-medium text-ink dark:text-foreground">
                  子区域
                </h3>
                <div className="space-y-3">
                  {region.subRegions.map((sr) => (
                    <div
                      key={sr.id}
                      className="rounded-lg border border-paper-dark p-3 dark:border-paper-dark"
                    >
                      <div className="font-sans font-medium text-ink dark:text-foreground">
                        {sr.name}
                      </div>
                      <p className="mt-1 font-sans text-sm text-ink-muted">
                        {sr.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {region.famousMountains && region.famousMountains.length > 0 && (
              <div>
                <h3 className="mb-2 font-serif text-lg font-medium text-ink dark:text-foreground">
                  代表山头
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.famousMountains.map((mountainId) => (
                    <Link
                      key={mountainId}
                      href={`/mountains/${mountainId}`}
                      className="rounded-md bg-tea-green/10 px-3 py-1.5 font-sans text-sm text-tea-green transition-colors hover:bg-tea-green/20 dark:bg-amber/20 dark:text-amber-light dark:hover:bg-amber/30"
                    >
                      {MOUNTAIN_NAMES[mountainId] ?? mountainId}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="overview"
            variants={overviewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-2xl font-medium text-ink dark:text-foreground md:text-3xl">
              四大产区总览
            </h2>
            <p className="font-sans text-ink-light dark:text-ink-light leading-relaxed">
              云南普洱茶主要分布在西双版纳、临沧、普洱（思茅）和保山四大产区。点击地图上的标记点查看各产区详情。
            </p>
            <div className="space-y-4">
              {allRegions.map((r) => (
                <div
                  key={r.id}
                  className="rounded-lg border border-paper-dark p-4 dark:border-paper-dark"
                >
                  <div className="font-serif text-lg font-medium text-ink dark:text-foreground">
                    {r.name}
                  </div>
                  <p className="mt-1 font-sans text-sm text-ink-muted line-clamp-2">
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
