"use client";

import { FLAVOR_LABELS, TYPE_CONFIG, type FlavorType } from "@/data/mountains-config";

interface RadarChart5Props {
  flavor: [number, number, number, number, number];
  type: FlavorType;
  size?: number;
  isDark?: boolean;
}

export function RadarChart5({ flavor, type, size = 110, isDark = true }: RadarChart5Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 18;
  const cfg = TYPE_CONFIG[type];

  const gridColor = isDark ? "rgba(201,160,82,0.1)" : "rgba(107,66,38,0.12)";
  const axisColor = isDark ? "rgba(201,160,82,0.08)" : "rgba(107,66,38,0.08)";
  const labelColor = isDark ? "rgba(244,234,216,0.5)" : "#8a7060";

  const angle = (i: number) => (i * 2 * Math.PI) / 5 - Math.PI / 2;
  const pt = (v: number, i: number): [number, number] => [
    cx + r * (v / 100) * Math.cos(angle(i)),
    cy + r * (v / 100) * Math.sin(angle(i)),
  ];
  const lp = (i: number): [number, number] => [
    cx + (r + 13) * Math.cos(angle(i)),
    cy + (r + 13) * Math.sin(angle(i)),
  ];

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = flavor.map((v, i) => pt(v, i));
  const dataPath = dataPoints.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ") + " Z";
  const filterId = `radar-glow-${cfg.color.replace("#", "")}-${size}`;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="overflow-visible">
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {gridLevels.map((level) => {
        const pts = Array.from({ length: 5 }, (_, i) => `${cx + r * level * Math.cos(angle(i))},${cy + r * level * Math.sin(angle(i))}`).join(" ");
        return <polygon key={level} points={pts} fill="none" stroke={gridColor} strokeWidth="0.5" />;
      })}

      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle(i))} y2={cy + r * Math.sin(angle(i))} stroke={axisColor} strokeWidth="0.5" />
      ))}

      <path d={dataPath} fill={`${cfg.color}22`} stroke={cfg.color} strokeWidth="1.5" filter={`url(#${filterId})`} />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={2.5} fill={cfg.color} />
      ))}

      {FLAVOR_LABELS.map((label, i) => {
        const [x, y] = lp(i);
        return (
          <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={labelColor} fontSize="9.5" fontFamily="var(--font-serif, 'Noto Serif SC', serif)">
            {label}
          </text>
        );
      })}
    </svg>
  );
}
