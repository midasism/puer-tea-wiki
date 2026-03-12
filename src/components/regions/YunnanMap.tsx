"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";

const GEO_URL = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/yunnan-geo.json`;

const TEA_REGION_COLORS: Record<string, { fill: string; hover: string; stroke: string }> = {
  xishuangbanna: {
    fill: "rgba(22, 101, 52, 0.50)",
    hover: "rgba(22, 101, 52, 0.70)",
    stroke: "#15803d",
  },
  lincang: {
    fill: "rgba(196, 140, 20, 0.60)",
    hover: "rgba(210, 155, 25, 0.78)",
    stroke: "#b8860b",
  },
  puer: {
    fill: "rgba(200, 60, 35, 0.55)",
    hover: "rgba(215, 75, 40, 0.72)",
    stroke: "#c0392b",
  },
  baoshan: {
    fill: "rgba(50, 115, 190, 0.55)",
    hover: "rgba(60, 130, 210, 0.72)",
    stroke: "#2563eb",
  },
};

interface RegionViewport {
  name: string;
  coordinates: [number, number];
  zoom: number;
}

const DEFAULT_CENTER: [number, number] = [100.5, 24.2];
const DEFAULT_ZOOM = 1;

const TEA_REGION_VIEWPORTS: Record<string, RegionViewport> = {
  xishuangbanna: { name: "西双版纳", coordinates: [100.8, 21.75], zoom: 1.15 },
  lincang: { name: "临沧", coordinates: [99.9, 23.88], zoom: 1.15 },
  puer: { name: "普洱", coordinates: [100.95, 23.05], zoom: 1.1 },
  baoshan: { name: "保山", coordinates: [99.15, 25.1], zoom: 1.15 },
};

const TRANSLATE_EXTENT: [[number, number], [number, number]] = [
  [-60, -60],
  [560, 540],
];

const NON_TEA_FILL = "rgba(200, 195, 185, 0.15)";
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

  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  const prevSelectedRef = useRef<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animatingTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (selectedRegionId === prevSelectedRef.current) return;
    prevSelectedRef.current = selectedRegionId;

    setIsAnimating(true);
    clearTimeout(animatingTimerRef.current);
    animatingTimerRef.current = setTimeout(() => setIsAnimating(false), 1400);

    if (selectedRegionId && TEA_REGION_VIEWPORTS[selectedRegionId]) {
      const vp = TEA_REGION_VIEWPORTS[selectedRegionId];
      setMapCenter(vp.coordinates);
      setMapZoom(vp.zoom);
    } else if (!selectedRegionId) {
      setMapCenter(DEFAULT_CENTER);
      setMapZoom(DEFAULT_ZOOM);
    }

    return () => clearTimeout(animatingTimerRef.current);
  }, [selectedRegionId]);

  const handleMoveEnd = useCallback(
    (position: { coordinates: [number, number]; zoom: number }) => {
      setMapCenter(position.coordinates);
      setMapZoom(position.zoom);
    },
    []
  );

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

  const handleResetView = useCallback(() => {
    setMapCenter(DEFAULT_CENTER);
    setMapZoom(DEFAULT_ZOOM);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-ink-muted/10 bg-gradient-to-br from-paper via-paper to-paper-dark/50 shadow-sm dark:border-ink-muted/15 dark:from-paper-dark dark:via-paper-dark dark:to-ink/20">
      {/* Map title overlay */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-3 select-none">
        <div className="font-serif text-xs tracking-widest text-ink-muted/60 dark:text-ink-muted/50">
          YUNNAN · 云南
        </div>
        {mapZoom > 1.2 && (
          <button
            type="button"
            onClick={handleResetView}
            className="rounded-md bg-paper/80 px-2 py-0.5 font-sans text-[10px] text-ink-muted shadow-sm transition-colors hover:bg-paper hover:text-ink dark:bg-paper-dark/80 dark:hover:bg-paper-dark"
          >
            复位
          </button>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
        {Object.entries(TEA_REGION_VIEWPORTS).map(([id, { name }]) => {
          const colors = TEA_REGION_COLORS[id];
          const isActive = selectedRegionId === id;
          const isHover = hoveredRegion === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectRegion(id)}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-all duration-200 ${
                isActive
                  ? "bg-paper/95 shadow-md ring-1 dark:bg-paper-dark/95"
                  : isHover
                    ? "bg-paper/80 shadow-sm dark:bg-paper-dark/80"
                    : "bg-paper/40 hover:bg-paper/70 dark:bg-paper-dark/40 dark:hover:bg-paper-dark/70"
              }`}
              style={{
                boxShadow: isActive
                  ? `0 0 0 1px ${colors.stroke}30, 0 1px 3px rgba(0,0,0,0.08)`
                  : undefined,
              }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-transform duration-200"
                style={{
                  backgroundColor: colors.stroke,
                  transform: isActive ? "scale(1.3)" : "scale(1)",
                  boxShadow: isActive ? `0 0 6px ${colors.stroke}60` : "none",
                }}
              />
              <span
                className={`font-sans text-xs transition-colors ${
                  isActive
                    ? "font-semibold text-ink dark:text-foreground"
                    : "text-ink-muted dark:text-ink-muted"
                }`}
              >
                {name}
              </span>
              {isActive && (
                <span
                  className="ml-auto h-1 w-1 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.stroke }}
                />
              )}
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
        projectionConfig={{
          rotate: [-100.5, 0, 0] as [number, number, number],
          center: [0, 24.2] as [number, number],
          scale: 3800,
        }}
        width={500}
        height={480}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          center={mapCenter}
          zoom={mapZoom}
          minZoom={0.9}
          maxZoom={4}
          translateExtent={TRANSLATE_EXTENT}
          onMoveEnd={handleMoveEnd}
          onMoveStart={() => setIsAnimating(false)}
          className={isAnimating ? "map-smooth-transition" : ""}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => {
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
                })}

                {/* Animated highlight border for selected region */}
                {selectedRegionId &&
                  geographies
                    .filter((geo) => geo.properties.teaRegion === selectedRegionId)
                    .map((geo) => {
                      const colors = TEA_REGION_COLORS[selectedRegionId];
                      return (
                        <Geography
                          key={`highlight-${geo.rsmKey}`}
                          geography={geo}
                          fill="none"
                          stroke={colors.stroke}
                          strokeWidth={2.5}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          style={{
                            default: {
                              outline: "none",
                              strokeDasharray: "12 6",
                              animation: "dash-flow 4s linear infinite",
                              filter: `drop-shadow(0 0 4px ${colors.stroke}60)`,
                              pointerEvents: "none" as const,
                            },
                            hover: { outline: "none", pointerEvents: "none" as const },
                            pressed: { outline: "none", pointerEvents: "none" as const },
                          }}
                        />
                      );
                    })}
              </>
            )}
          </Geographies>

          {/* Region name labels */}
          {Object.entries(TEA_REGION_VIEWPORTS).map(([id, { name, coordinates }]) => {
            const isActive = selectedRegionId === id || hoveredRegion === id;
            return (
              <Marker key={id} coordinates={coordinates}>
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily: "var(--font-noto-serif-sc), serif",
                    fontSize: isActive ? 14 : 12,
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
          {Object.entries(TEA_REGION_VIEWPORTS).map(([id, { coordinates }]) => {
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
