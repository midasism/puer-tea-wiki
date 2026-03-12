"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RegionDetail, type Region } from "./RegionDetail";
import { useTheme } from "@/components/layout/ThemeProvider";

const YunnanMap = dynamic(
  () => import("./YunnanMap").then((mod) => ({ default: mod.YunnanMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-ink-muted/10 bg-paper-dark/30">
        <div className="font-sans text-sm text-ink-muted">地图加载中...</div>
      </div>
    ),
  }
);

interface RegionsClientProps {
  regions: Region[];
}

export function RegionsClient({ regions }: RegionsClientProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const hintColor = isDark ? "rgba(244,234,216,0.3)" : "#8a7060";

  const selectedRegion = selectedRegionId
    ? regions.find((r) => r.id === selectedRegionId) ?? null
    : null;

  return (
    <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="w-full lg:sticky lg:top-20 lg:w-[55%] lg:shrink-0">
        <YunnanMap
          selectedRegionId={selectedRegionId}
          onSelectRegion={(id) => setSelectedRegionId(id)}
        />
        <p className="mt-3 text-center text-[0.72rem] md:text-[0.78rem]" style={{ color: hintColor }}>
          支持缩放和拖拽 · 点击彩色区域查看产区详情
        </p>
      </div>
      <div className="w-full lg:w-[45%]">
        <RegionDetail
          region={selectedRegion}
          allRegions={regions}
          onSelectRegion={(id) => setSelectedRegionId(id)}
          onBackToOverview={() => setSelectedRegionId(null)}
        />
      </div>
    </div>
  );
}
