"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RegionDetail, type Region } from "./RegionDetail";

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

  const selectedRegion = selectedRegionId
    ? regions.find((r) => r.id === selectedRegionId) ?? null
    : null;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr,1fr] lg:gap-10">
      <div className="order-1">
        <YunnanMap
          selectedRegionId={selectedRegionId}
          onSelectRegion={(id) => setSelectedRegionId(id)}
        />
        <p className="mt-3 text-center font-sans text-xs text-ink-muted/60 dark:text-ink-muted/50">
          支持缩放和拖拽 · 点击彩色区域查看产区详情
        </p>
      </div>
      <div className="order-2">
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
