"use client";

import { motion } from "framer-motion";

export interface RegionMarker {
  id: string;
  name: string;
  x: number;
  y: number;
  color: "tea-green" | "tea-green-light" | "amber" | "cinnabar";
}

const REGION_MARKERS: RegionMarker[] = [
  { id: "xishuangbanna", name: "西双版纳", x: 380, y: 350, color: "tea-green" },
  { id: "lincang", name: "临沧", x: 140, y: 220, color: "amber" },
  { id: "puer", name: "普洱", x: 320, y: 240, color: "cinnabar" },
  { id: "baoshan", name: "保山", x: 100, y: 80, color: "tea-green-light" },
];

const colorMap = {
  "tea-green": {
    base: "bg-tea-green stroke-tea-green",
    hover: "group-hover:bg-tea-green-light group-hover:stroke-tea-green-light",
    selected: "ring-tea-green",
  },
  "tea-green-light": {
    base: "bg-tea-green-light stroke-tea-green-light",
    hover:
      "group-hover:bg-tea-green group-hover:stroke-tea-green",
    selected: "ring-tea-green-light",
  },
  amber: {
    base: "bg-amber stroke-amber",
    hover: "group-hover:bg-amber-light group-hover:stroke-amber-light",
    selected: "ring-amber",
  },
  cinnabar: {
    base: "bg-cinnabar stroke-cinnabar",
    hover: "group-hover:bg-cinnabar-light group-hover:stroke-cinnabar-light",
    selected: "ring-cinnabar",
  },
};

interface YunnanMapProps {
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
}

export function YunnanMap({ selectedRegionId, onSelectRegion }: YunnanMapProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-paper-dark bg-paper/30 dark:border-paper-dark dark:bg-paper-dark/30">
      <svg
        viewBox="0 0 500 450"
        className="h-auto w-full max-h-[400px] md:max-h-[500px]"
        aria-label="云南省普洱茶产区地图"
      >
        {/* Province outline */}
        <path
          d="M 180 30 L 220 20 L 280 25 L 320 15 L 370 30 L 400 60 L 420 50 L 450 70 L 460 110 L 440 140 L 460 170 L 480 200 L 470 240 L 450 260 L 430 300 L 400 330 L 370 350 L 340 380 L 300 400 L 260 420 L 220 430 L 180 420 L 140 400 L 110 370 L 80 340 L 60 300 L 40 260 L 30 220 L 40 180 L 60 140 L 80 110 L 110 80 L 140 50 Z"
          fill="currentColor"
          className="fill-ink/5 stroke-ink/20 dark:fill-ink/10 dark:stroke-ink/30"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Region markers */}
        <g>
          {REGION_MARKERS.map((marker, index) => {
            const colors = colorMap[marker.color];
            const isSelected = selectedRegionId === marker.id;
            return (
              <motion.g
                key={marker.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.2 }}
                style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
                className={`group cursor-pointer transition-colors ${colors.base} ${colors.hover}`}
                onClick={() => onSelectRegion(marker.id)}
                aria-label={`选择${marker.name}产区`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectRegion(marker.id);
                  }
                }}
              >
                {/* Marker circle */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r={isSelected ? 14 : 10}
                  className={`transition-all duration-200 ${
                    isSelected ? colors.selected : `${colors.base} ${colors.hover} stroke-[1.5]`
                  }`}
                  style={{
                    filter: isSelected ? "drop-shadow(0 0 8px rgba(0,0,0,0.2))" : undefined,
                  }}
                />
                {/* Label background for readability */}
                <rect
                  x={marker.x - 28}
                  y={marker.y + 18}
                  width={56}
                  height={20}
                  rx={4}
                  className="fill-background/90 dark:fill-paper-dark/90"
                />
                {/* Label text */}
                <text
                  x={marker.x}
                  y={marker.y + 32}
                  textAnchor="middle"
                  className="fill-ink font-sans text-sm font-medium dark:fill-foreground"
                >
                  {marker.name}
                </text>
                {/* Tooltip on hover - shown via title for accessibility */}
                <title>{marker.name} - 点击查看详情</title>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
