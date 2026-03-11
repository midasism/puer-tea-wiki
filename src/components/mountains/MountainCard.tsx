"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlavorRadarMini } from "./FlavorRadar";
import type { Mountain } from "@/lib/mountains";
import { Star } from "lucide-react";

const REGION_NAMES: Record<string, string> = {
  xishuangbanna: "西双版纳",
  lincang: "临沧",
  puer: "普洱",
  baoshan: "保山",
};

const FLAVOR_TYPE_COLORS: Record<string, string> = {
  霸气型: "bg-cinnabar/15 text-cinnabar dark:bg-cinnabar/25 dark:text-cinnabar-light",
  柔和型: "bg-tea-green/15 text-tea-green dark:bg-tea-green/25 dark:text-tea-green-light",
  甜韵型: "bg-amber/15 text-amber dark:bg-amber/25 dark:text-amber-light",
  花香型: "bg-tea-green-light/15 text-tea-green-light dark:bg-tea-green-light/25",
  均衡型: "bg-ink-muted/15 text-ink-muted dark:bg-ink-muted/25",
};

interface MountainCardProps {
  mountain: Mountain;
}

export function MountainCard({ mountain }: MountainCardProps) {
  const regionName = REGION_NAMES[mountain.region] ?? mountain.region;
  const flavorClass =
    FLAVOR_TYPE_COLORS[mountain.flavorType] ?? "bg-ink-muted/15 text-ink-muted";

  return (
    <Link href={`/mountains/${mountain.id}`}>
      <motion.article
        layout
        layoutId={mountain.id}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-muted/15 bg-paper shadow-sm transition-shadow hover:-translate-y-1 hover:shadow-lg dark:border-ink-muted/20 dark:bg-paper-dark dark:hover:shadow-lg"
        whileHover={{ y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)" }}
      >
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-xl font-medium text-ink dark:text-foreground">
                {mountain.name}
              </h3>
              <span className="mt-1 inline-block rounded-md bg-tea-green/10 px-2 py-0.5 font-sans text-xs text-tea-green dark:bg-tea-green/20 dark:text-tea-green-light">
                {regionName}
              </span>
            </div>
            <FlavorRadarMini flavor={mountain.flavor} />
          </div>

          <p className="mt-3 line-clamp-2 font-sans text-sm text-ink-muted">
            {mountain.brief}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 font-sans text-xs ${flavorClass}`}
            >
              {mountain.flavorType}
            </span>
            <div className="flex items-center gap-0.5" aria-label={`知名度 ${mountain.fame} 星`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i <= mountain.fame
                      ? "fill-amber text-amber dark:fill-amber-light dark:text-amber-light"
                      : "fill-none text-ink-muted/40 dark:text-ink-muted/30"
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
