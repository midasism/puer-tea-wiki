"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FlavorRadar } from "./FlavorRadar";
import { MountainCard } from "./MountainCard";
import type { Mountain } from "@/lib/mountains";

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

interface MountainDetailClientProps {
  mountain: Mountain;
  similarMountains: Mountain[];
}

function InfoItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg bg-paper-dark/50 p-3 dark:bg-paper-dark/50 ${className}`}
    >
      <div className="font-sans text-xs text-ink-muted">{label}</div>
      <div className="font-sans font-medium text-ink dark:text-foreground">{value}</div>
    </div>
  );
}

export function MountainDetailClient({
  mountain,
  similarMountains,
}: MountainDetailClientProps) {
  const regionName = REGION_NAMES[mountain.region] ?? mountain.region;
  const flavorClass = FLAVOR_TYPE_COLORS[mountain.flavorType] ?? "bg-ink-muted/15 text-ink-muted";
  const descriptionParagraphs = mountain.description.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/mountains"
            className="inline-flex items-center gap-2 font-sans text-sm text-ink-muted transition-colors hover:text-ink dark:hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            山头图鉴
          </Link>
          <span className="mx-2 font-sans text-ink-muted">/</span>
          <span className="font-sans text-sm font-medium text-ink dark:text-foreground">
            {mountain.name}
          </span>
        </motion.nav>

        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-12"
          >
            <div className="flex justify-center lg:justify-start">
              <FlavorRadar flavor={mountain.flavor} size={280} />
            </div>

            <div className="space-y-6">
              <h1 className="font-serif text-3xl font-medium text-ink dark:text-foreground md:text-4xl">
                {mountain.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-md px-3 py-1 font-sans text-sm ${flavorClass}`}
                >
                  {mountain.flavorType}
                </span>
                <div className="flex items-center gap-0.5" aria-label={`知名度 ${mountain.fame} 星`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`text-amber ${
                        i <= mountain.fame ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="产区" value={regionName} />
                <InfoItem label="子区域" value={mountain.subRegion} />
                <InfoItem label="海拔" value={mountain.altitude} />
                <InfoItem label="茶树类型" value={mountain.treeType} />
                <InfoItem label="价格区间" value={mountain.priceRange} className="sm:col-span-2" />
              </div>

              {mountain.villages.length > 0 && (
                <div>
                  <h3 className="mb-2 font-serif text-lg font-medium text-ink dark:text-foreground">
                    代表村寨
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mountain.villages.map((v) => (
                      <span
                        key={v}
                        className="rounded-md bg-paper-dark px-3 py-1.5 font-sans text-sm text-ink dark:bg-paper-dark/80 dark:text-foreground"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-2 font-serif text-lg font-medium text-ink dark:text-foreground">
                  口感描述
                </h3>
                <div className="space-y-4">
                  {descriptionParagraphs.map((p, i) => (
                    <p
                      key={i}
                      className="font-sans leading-relaxed text-ink-light dark:text-ink-light"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {mountain.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {mountain.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-ink-muted/30 px-2 py-1 font-sans text-xs text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {similarMountains.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="mb-6 font-serif text-2xl font-medium text-ink dark:text-foreground">
                相似山头
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {similarMountains.map((m) => (
                  <MountainCard key={m.id} mountain={m} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}
