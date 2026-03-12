"use client";

import { useMemo } from "react";
import {
  TYPE_CONFIG, ALT_MIN, ALT_MAX,
  type MountainVizData, type FlavorType,
} from "@/data/mountains-config";

const VB_W = 960;
const VB_H = 620;
const PAD = { l: 68, r: 44, t: 52, b: 72 };
const IW = VB_W - PAD.l - PAD.r;
const IH = VB_H - PAD.t - PAD.b;

const ALT_TICKS = [800, 1200, 1600, 2000, 2400];
const GRID_LINES = [0.25, 0.5, 0.75];

function xNorm(flavor: number[]): number {
  return (flavor[1] - flavor[0] + 100) / 200;
}
function yNorm(altitude: number): number {
  return 1 - (altitude - ALT_MIN) / (ALT_MAX - ALT_MIN);
}

interface NodePos {
  id: string;
  name: string;
  type: FlavorType;
  cx: number;
  cy: number;
  r: number;
  altitude: number;
  rating: number;
  flavor: number[];
  labelDx: number;
  labelDy: number;
  labelAnchor: "start" | "middle" | "end";
}

function resolveOverlaps(raw: Omit<NodePos, "labelDx" | "labelDy" | "labelAnchor">[]): NodePos[] {
  const nodes: NodePos[] = raw.map((n) => ({ ...n, labelDx: 0, labelDy: n.r + 16, labelAnchor: "middle" }));
  const MIN_DIST = 28;
  for (let iter = 0; iter < 8; iter++) {
    let moved = false;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.cx - a.cx;
        const dy = b.cy - a.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minD = a.r + b.r + MIN_DIST;
        if (dist < minD && dist > 0) {
          const push = (minD - dist) / 2;
          const nx = dx / dist, ny = dy / dist;
          a.cx -= nx * push;
          a.cy -= ny * push;
          b.cx += nx * push;
          b.cy += ny * push;
          a.cx = Math.max(PAD.l + a.r, Math.min(VB_W - PAD.r - a.r, a.cx));
          a.cy = Math.max(PAD.t + a.r, Math.min(VB_H - PAD.b - a.r, a.cy));
          b.cx = Math.max(PAD.l + b.r, Math.min(VB_W - PAD.r - b.r, b.cx));
          b.cy = Math.max(PAD.t + b.r, Math.min(VB_H - PAD.b - b.r, b.cy));
          moved = true;
        }
      }
    }
    if (!moved) break;
  }

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const labelX = a.cx + a.labelDx;
    const labelY = a.cy + a.labelDy;
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const b = nodes[j];
      const bLabelX = b.cx + b.labelDx;
      const bLabelY = b.cy + b.labelDy;
      if (Math.abs(labelX - bLabelX) < 50 && Math.abs(labelY - bLabelY) < 16) {
        if (a.cx < b.cx) {
          a.labelDx = -(a.r + 6);
          a.labelDy = 4;
          a.labelAnchor = "end";
        } else {
          a.labelDx = a.r + 6;
          a.labelDy = 4;
          a.labelAnchor = "start";
        }
        break;
      }
    }
  }
  return nodes;
}

interface ViewAProps {
  mountains: MountainVizData[];
  filters: Set<FlavorType>;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  onFilterToggle: (type: FlavorType) => void;
  isDark: boolean;
}

export function ViewA({ mountains, filters, selected, hovered, onSelect, onHover, onFilterToggle, isDark }: ViewAProps) {
  const positions = useMemo(() => {
    const raw = mountains.map((m) => ({
      id: m.id,
      name: m.name,
      type: m.type,
      cx: PAD.l + xNorm(m.flavor) * IW,
      cy: PAD.t + yNorm(m.altitude) * IH,
      r: 8 + m.rating * 3,
      altitude: m.altitude,
      rating: m.rating,
      flavor: [...m.flavor],
    }));
    return resolveOverlaps(raw);
  }, [mountains]);

  const isVisible = (id: string) => {
    const m = mountains.find((x) => x.id === id);
    return m ? filters.size === 0 || filters.has(m.type) : false;
  };

  const bgDark = "url(#starmap-bg-dark)";
  const bgLight = "url(#starmap-bg-light)";
  const gridStroke = isDark ? "rgba(201,160,82,0.05)" : "rgba(107,66,38,0.06)";
  const axisStroke = isDark ? "rgba(201,160,82,0.12)" : "rgba(107,66,38,0.12)";
  const tickStroke = isDark ? "rgba(201,160,82,0.25)" : "rgba(107,66,38,0.2)";
  const tickText = isDark ? "rgba(201,160,82,0.5)" : "#6b4226";
  const defaultLabelColor = isDark ? "rgba(244,234,216,0.8)" : "#4a3828";

  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-2">
        <span className="text-[0.78rem] tracking-[0.1em]" style={{ color: isDark ? "rgba(201,160,82,0.55)" : "#8a7060", fontFamily: "var(--font-mono, monospace)" }}>
          ← 苦韵偏重
        </span>
        <span className="text-[0.92rem] tracking-[0.08em]" style={{ color: isDark ? "rgba(244,234,216,0.7)" : "#4a3828", fontFamily: "var(--font-brush, serif)" }}>
          风味星云图
        </span>
        <span className="text-[0.78rem] tracking-[0.1em]" style={{ color: isDark ? "rgba(201,160,82,0.55)" : "#8a7060", fontFamily: "var(--font-mono, monospace)" }}>
          甜韵偏重 →
        </span>
      </div>

      <svg
        width="100%"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="overflow-visible"
        style={{ borderRadius: 6 }}
        onClick={(e) => {
          if ((e.target as SVGElement).tagName === "svg" || (e.target as SVGElement).tagName === "rect") onSelect(null);
        }}
      >
        <defs>
          <radialGradient id="starmap-bg-dark" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#122010" />
            <stop offset="100%" stopColor="#050705" />
          </radialGradient>
          <radialGradient id="starmap-bg-light" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#f5f0e4" />
            <stop offset="100%" stopColor="#ebe4d4" />
          </radialGradient>
          {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
            <filter key={type} id={`glow-${cfg.color.replace("#", "")}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
        </defs>

        <rect width={VB_W} height={VB_H} fill={isDark ? bgDark : bgLight} rx="6" />
        {!isDark && <rect width={VB_W} height={VB_H} fill="none" rx="6" stroke="rgba(107,66,38,0.1)" strokeWidth="1" />}

        {GRID_LINES.map((pct) => (
          <g key={pct}>
            <line x1={PAD.l + pct * IW} y1={PAD.t} x2={PAD.l + pct * IW} y2={VB_H - PAD.b} stroke={gridStroke} strokeDasharray="4,10" />
            <line x1={PAD.l} y1={PAD.t + pct * IH} x2={VB_W - PAD.r} y2={PAD.t + pct * IH} stroke={gridStroke} strokeDasharray="4,10" />
          </g>
        ))}

        <line x1={PAD.l + IW / 2} y1={PAD.t} x2={PAD.l + IW / 2} y2={VB_H - PAD.b} stroke={axisStroke} />
        <line x1={PAD.l} y1={PAD.t + IH / 2} x2={VB_W - PAD.r} y2={PAD.t + IH / 2} stroke={axisStroke} />

        {ALT_TICKS.map((alt) => {
          const y = PAD.t + (1 - (alt - ALT_MIN) / (ALT_MAX - ALT_MIN)) * IH;
          return (
            <g key={alt}>
              <line x1={PAD.l - 6} y1={y} x2={PAD.l} y2={y} stroke={tickStroke} />
              <text x={PAD.l - 10} y={y + 4} textAnchor="end" fill={tickText} fontSize="11.5" fontFamily="var(--font-mono, 'JetBrains Mono', monospace)">
                {alt}m
              </text>
            </g>
          );
        })}

        {positions.map((p) => {
          const cfg = TYPE_CONFIG[p.type];
          const vis = isVisible(p.id);
          const isSel = selected === p.id;
          const isHov = hovered === p.id;

          const nodeOpacity = vis ? (isSel ? 1 : isHov ? 0.9 : isDark ? 0.75 : 0.85) : 0.15;
          const glowOpacity = vis ? (isSel ? 0.16 : isHov ? 0.12 : isDark ? 0.06 : 0.1) : 0.02;
          const textOpacity = vis ? (isSel ? 1 : isHov ? 0.95 : 0.85) : 0.2;
          const textColor = isSel || isHov ? cfg.color : defaultLabelColor;
          const fontSize = isSel ? 16 : 14.5;
          const fontWeight = isSel ? "bold" : "normal";
          const filterAttr = isSel ? `url(#glow-${cfg.color.replace("#", "")})` : undefined;

          return (
            <g
              key={p.id}
              style={{ cursor: "pointer", transition: "opacity 0.25s ease" }}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              onClick={(e) => { e.stopPropagation(); onSelect(isSel ? null : p.id); }}
            >
              {isSel && <circle cx={p.cx} cy={p.cy} r={p.r + 22} fill={cfg.color} opacity={0.07} />}
              <circle cx={p.cx} cy={p.cy} r={p.r + (isSel ? 12 : isHov ? 8 : 4)} fill={cfg.color} opacity={glowOpacity} />
              <circle
                cx={p.cx} cy={p.cy} r={p.r}
                fill={cfg.color} opacity={nodeOpacity}
                filter={filterAttr}
                style={{ transition: "opacity 0.25s ease, filter 0.25s ease" }}
              />
              <circle cx={p.cx - p.r * 0.25} cy={p.cy - p.r * 0.25} r={p.r * 0.4} fill="white" opacity={vis ? (isDark ? 0.15 : 0.25) : 0.05} />
              <text
                x={p.cx + p.labelDx} y={p.cy + p.labelDy}
                textAnchor={p.labelAnchor} fill={textColor}
                fontSize={fontSize} fontWeight={fontWeight}
                fontFamily="var(--font-brush, 'Ma Shan Zheng', serif)"
                opacity={textOpacity}
                style={{ transition: "all 0.25s ease" }}
              >
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {(Object.entries(TYPE_CONFIG) as [FlavorType, typeof TYPE_CONFIG[FlavorType]][]).map(([type, cfg]) => {
          const count = mountains.filter((m) => m.type === type).length;
          const active = filters.has(type);
          const dimmed = filters.size > 0 && !active;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onFilterToggle(type)}
              className="flex items-center gap-2 rounded-sm px-3 py-1.5 transition-all"
              style={{
                background: active
                  ? (isDark ? `${cfg.color}20` : `${cfg.color}18`)
                  : (isDark ? cfg.bg : `${cfg.color}0a`),
                border: `1px solid ${active ? `${cfg.color}55` : `${cfg.color}22`}`,
                opacity: dimmed ? 0.45 : 1,
                cursor: "pointer",
                boxShadow: active ? `0 0 8px ${cfg.glow}` : "none",
              }}
            >
              <span className="h-2.5 w-2.5 rounded-full transition-transform" style={{ background: cfg.color, transform: active ? "scale(1.25)" : "scale(1)" }} />
              <span className="text-[0.82rem]" style={{ color: cfg.color, fontWeight: active ? 600 : 400 }}>{type}</span>
              <span className="text-[0.7rem]" style={{ color: isDark ? "rgba(244,234,216,0.4)" : "#8a7060", fontFamily: "var(--font-mono, monospace)" }}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
