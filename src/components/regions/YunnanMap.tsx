"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";

const GEO_URL = "/yunnan-geo.json";

const TEA_REGION_COLORS: Record<string, { fill: string; hover: string; stroke: string }> = {
  xishuangbanna: {
    fill: "rgba(45, 80, 22, 0.45)",
    hover: "rgba(45, 80, 22, 0.65)",
    stroke: "#2D5016",
  },
  lincang: {
    fill: "rgba(139, 105, 20, 0.40)",
    hover: "rgba(139, 105, 20, 0.60)",
    stroke: "#8B6914",
  },
  puer: {
    fill: "rgba(196, 69, 28, 0.35)",
    hover: "rgba(196, 69, 28, 0.55)",
    stroke: "#C4451C",
  },
  baoshan: {
    fill: "rgba(74, 122, 46, 0.35)",
    hover: "rgba(74, 122, 46, 0.55)",
    stroke: "#4A7A2E",
  },
};

const TEA_REGION_LABELS: Record<string, { name: string; coordinates: [number, number] }> = {
  xishuangbanna: { name: "西双版纳", coordinates: [100.8, 21.75] },
  lincang: { name: "临沧", coordinates: [99.9, 23.88] },
  puer: { name: "普洱", coordinates: [100.95, 23.05] },
  baoshan: { name: "保山", coordinates: [99.15, 25.1] },
};

const NON_TEA_FILL = "rgba(200, 195, 185, 0.15)";
const NON_TEA_FILL_DARK = "rgba(80, 75, 65, 0.20)";
const NON_TEA_STROKE = "rgba(160, 155, 145, 0.35)";

interface YunnanMapProps {
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
}

export function YunnanMap({ selectedRegionId, onSelectRegion }: YunnanMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseMove = useCallback(
    (name: string, regionId: string | null) => (evt: React.MouseEvent) => {
      if (regionId) {
        const rect = evt.currentTarget.closest("svg")?.getBoundingClientRect();
        if (rect) {
          setTooltipInfo({
            name,
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top - 12,
          });
        }
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredRegion(null);
    setTooltipInfo(null);
  }, []);

  const projection = useMemo(
    () =>
      ({
        rotate: [-100.5, 0, 0] as [number, number, number],
        center: [0, 24.2] as [number, number],
        scale: 3800,
      }),
    []
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-ink-muted/10 bg-gradient-to-br from-paper via-paper to-paper-dark/50 shadow-sm dark:border-ink-muted/15 dark:from-paper-dark dark:via-paper-dark dark:to-ink/20">
      {/* Map title overlay */}
      <div className="absolute left-4 top-4 z-10 select-none">
        <div className="font-serif text-xs tracking-widest text-ink-muted/60 dark:text-ink-muted/50">
          YUNNAN · 云南
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1.5">
        {Object.entries(TEA_REGION_LABELS).map(([id, { name }]) => {
          const colors = TEA_REGION_COLORS[id];
          const isActive = selectedRegionId === id || hoveredRegion === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectRegion(id)}
              className={`flex items-center gap-2 rounded-md px-2.5 py-1 text-left transition-all duration-200 ${
                isActive
                  ? "bg-paper/90 shadow-sm dark:bg-paper-dark/90"
                  : "bg-transparent hover:bg-paper/60 dark:hover:bg-paper-dark/60"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: colors.stroke,
                  boxShadow: `0 0 0 1px ${colors.stroke}40 inset`,
                }}
              />
              <span
                className={`font-sans text-xs transition-colors ${
                  isActive
                    ? "font-medium text-ink dark:text-foreground"
                    : "text-ink-muted dark:text-ink-muted"
                }`}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltipInfo && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-20 rounded-lg bg-ink/85 px-3 py-1.5 font-sans text-xs font-medium text-paper shadow-lg backdrop-blur-sm dark:bg-paper-dark/90 dark:text-foreground"
            style={{
              left: tooltipInfo.x,
              top: tooltipInfo.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            {tooltipInfo.name}
            <span className="ml-1.5 text-paper/60 dark:text-ink-muted">
              点击查看
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={projection}
        width={500}
        height={480}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[100.5, 24.2]} zoom={1} minZoom={0.8} maxZoom={3}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { teaRegion, isTeaRegion, name } = geo.properties;
                const isSelected = selectedRegionId === teaRegion;
                const isHovered = hoveredRegion === teaRegion;
                const colors = teaRegion ? TEA_REGION_COLORS[teaRegion] : null;

                let fill = NON_TEA_FILL;
                let stroke = NON_TEA_STROKE;
                let strokeWidth = 0.5;

                if (isTeaRegion && colors) {
                  fill = isSelected || isHovered ? colors.hover : colors.fill;
                  stroke = colors.stroke;
                  strokeWidth = isSelected ? 1.8 : isHovered ? 1.2 : 0.8;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    style={{
                      default: { outline: "none", transition: "all 0.25s ease" },
                      hover: {
                        outline: "none",
                        fill: isTeaRegion && colors ? colors.hover : NON_TEA_FILL,
                        cursor: isTeaRegion ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => {
                      if (isTeaRegion) setHoveredRegion(teaRegion);
                    }}
                    onMouseMove={handleMouseMove(name, teaRegion)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      if (isTeaRegion) onSelectRegion(teaRegion);
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Region name labels */}
          {Object.entries(TEA_REGION_LABELS).map(([id, { name, coordinates }]) => {
            const isActive = selectedRegionId === id || hoveredRegion === id;
            return (
              <Marker key={id} coordinates={coordinates}>
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily: "var(--font-noto-serif-sc), serif",
                    fontSize: isActive ? 11 : 9,
                    fontWeight: isActive ? 600 : 500,
                    fill: isActive
                      ? TEA_REGION_COLORS[id].stroke
                      : "rgba(60, 55, 50, 0.7)",
                    transition: "all 0.25s ease",
                    pointerEvents: "none",
                    textShadow: "0 0 4px rgba(245,240,232,0.8)",
                  }}
                >
                  {name}
                </text>
              </Marker>
            );
          })}

          {/* Pulsing dots for tea regions */}
          {Object.entries(TEA_REGION_LABELS).map(([id, { coordinates }]) => {
            const isActive = selectedRegionId === id;
            const colors = TEA_REGION_COLORS[id];
            return (
              <Marker key={`dot-${id}`} coordinates={coordinates}>
                <g transform="translate(0, -14)">
                  {isActive && (
                    <circle
                      r={6}
                      fill="none"
                      stroke={colors.stroke}
                      strokeWidth={1}
                      opacity={0.4}
                    >
                      <animate
                        attributeName="r"
                        from="4"
                        to="10"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <circle
                    r={isActive ? 3.5 : 2.5}
                    fill={colors.stroke}
                    stroke="#fff"
                    strokeWidth={1}
                    style={{ transition: "all 0.25s ease", cursor: "pointer" }}
                    onClick={() => onSelectRegion(id)}
                  />
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
