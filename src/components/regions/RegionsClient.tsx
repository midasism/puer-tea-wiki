"use client";

import { useState } from "react";
import { YunnanMap } from "./YunnanMap";
import { RegionDetail, type Region } from "./RegionDetail";

interface RegionsClientProps {
  regions: Region[];
}

export function RegionsClient({ regions }: RegionsClientProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  const selectedRegion = selectedRegionId
    ? regions.find((r) => r.id === selectedRegionId) ?? null
    : null;

  const handleBackToOverview = () => setSelectedRegionId(null);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,1fr] lg:gap-10 xl:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
      <div className="order-2 lg:order-1">
        <YunnanMap
          selectedRegionId={selectedRegionId}
          onSelectRegion={(id) => setSelectedRegionId(id)}
        />
      </div>
      <div className="order-1 lg:order-2">
        <RegionDetail
          region={selectedRegion}
          allRegions={regions}
          onBackToOverview={handleBackToOverview}
        />
      </div>
    </div>
  );
}
