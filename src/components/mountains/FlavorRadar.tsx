"use client";

import { motion } from "framer-motion";

export interface MountainFlavor {
  bitter: number;
  astringent: number;
  sweet: number;
  aroma: number;
  huigan: number;
  chaqi: number;
}

const DIMENSIONS = [
  { key: "bitter", label: "苦", max: 10 },
  { key: "astringent", label: "涩", max: 10 },
  { key: "sweet", label: "甜", max: 10 },
  { key: "aroma", label: "香", max: 10 },
  { key: "huigan", label: "回甘", max: 10 },
  { key: "chaqi", label: "茶气", max: 10 },
] as const;

function getHexagonPoints(
  cx: number,
  cy: number,
  r: number,
  values: number[],
  max: number = 10
): string {
  const angleStep = (2 * Math.PI) / 6;
  const points = values.map((v, i) => {
    const ratio = v / max;
    const angle = -Math.PI / 2 + i * angleStep;
    return `${cx + r * ratio * Math.cos(angle)},${cy + r * ratio * Math.sin(angle)}`;
  });
  return points.join(" ");
}

function getLabelPoints(
  cx: number,
  cy: number,
  r: number,
  max: number = 10
): { x: number; y: number; angle: number }[] {
  const angleStep = (2 * Math.PI) / 6;
  return DIMENSIONS.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle: (i * 60 - 90 + 360) % 360,
    };
  });
}

interface FlavorRadarProps {
  flavor: MountainFlavor;
  size?: number;
}

export function FlavorRadar({ flavor, size = 280 }: FlavorRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 40;

  const values = DIMENSIONS.map((d) => flavor[d.key as keyof MountainFlavor] ?? 0);
  const dataPoints = getHexagonPoints(cx, cy, r, values);
  const labelPositions = getLabelPoints(cx, cy, r + 28);

  const gridLevels = [0.3, 0.6, 1];
  const gridPaths = gridLevels.map((level) =>
    getHexagonPoints(cx, cy, r * level, values.map(() => level * 10))
  );

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
      width={size}
      height={size}
    >
      {/* Background grids - 3 concentric hexagons */}
      {gridLevels.map((level, i) => (
        <polygon
          key={i}
          points={getHexagonPoints(cx, cy, r * level, [10, 10, 10, 10, 10, 10])}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      ))}

      {/* Data area - filled with semi-transparent tea-green */}
      <motion.polygon
        points={dataPoints}
        fill="rgba(45, 80, 22, 0.35)"
        stroke="var(--color-tea-green)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        className="dark:[fill:rgba(74,122,46,0.4)] dark:[stroke:var(--color-tea-green-light)]"
      />

      {/* Data points - small circles */}
      {values.map((v, i) => {
        const ratio = v / 10;
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
        const x = cx + r * ratio * Math.cos(angle);
        const y = cy + r * ratio * Math.sin(angle);
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill="var(--color-tea-green)"
            className="dark:fill-tea-green-light"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
          />
        );
      })}

      {/* Labels */}
      {DIMENSIONS.map((d, i) => {
        const pos = labelPositions[i];
        return (
          <text
            key={d.key}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink-muted font-sans text-xs dark:fill-ink-muted"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export function FlavorRadarMini({ flavor }: { flavor: MountainFlavor }) {
  const size = 80;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  const values = DIMENSIONS.map((d) => flavor[d.key as keyof MountainFlavor] ?? 0);
  const dataPoints = getHexagonPoints(cx, cy, r, values);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="shrink-0" width={size} height={size}>
      <polygon
        points={getHexagonPoints(cx, cy, r, [10, 10, 10, 10, 10, 10])}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      <polygon
        points={dataPoints}
        fill="rgba(45, 80, 22, 0.4)"
        stroke="var(--color-tea-green)"
        strokeWidth="1.5"
        className="dark:[fill:rgba(74,122,46,0.5)] dark:[stroke:var(--color-tea-green-light)]"
      />
    </svg>
  );
}
