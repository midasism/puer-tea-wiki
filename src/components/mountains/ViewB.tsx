"use client";

import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import {
  TYPE_CONFIG, REGION_CONFIG, ALT_MIN, ALT_MAX,
  type MountainVizData, type FlavorType, type RegionId,
} from "@/data/mountains-config";

const VB_W = 1040;
const VB_H = 460;
const PAD = { l: 62, r: 36, t: 48, b: 90 };
const IW = VB_W - PAD.l - PAD.r;
const IH = VB_H - PAD.t - PAD.b;
const BASE_Y = VB_H - PAD.b;

const ALT_TICKS = [800, 1000, 1400, 1800, 2200, 2600];

function altToY(alt: number): number {
  return PAD.t + (1 - (alt - ALT_MIN) / (ALT_MAX - ALT_MIN)) * IH;
}

interface Peak { m: MountainVizData; px: number; py: number; }

function buildPeaks(mountains: MountainVizData[]): Peak[] {
  const sorted = [...mountains].sort((a, b) => a.altitude - b.altitude);
  return sorted.map((m, i) => ({
    m,
    px: PAD.l + (i + 0.5) * (IW / sorted.length),
    py: altToY(m.altitude),
  }));
}

function buildSilhouettePath(peaks: Peak[]): string {
  if (peaks.length === 0) return "";
  let d = `M ${PAD.l} ${BASE_Y}`;
  peaks.forEach((p, i) => {
    if (i === 0) { d += ` L ${p.px} ${p.py}`; }
    else {
      const prev = peaks[i - 1];
      const mx = (prev.px + p.px) / 2;
      d += ` C ${mx} ${prev.py}, ${mx} ${p.py}, ${p.px} ${p.py}`;
    }
  });
  return d + ` L ${VB_W - PAD.r} ${BASE_Y} Z`;
}

function buildRidgePath(peaks: Peak[]): string {
  if (peaks.length === 0) return "";
  let d = `M ${PAD.l} ${BASE_Y}`;
  peaks.forEach((p, i) => {
    if (i === 0) { d += ` L ${p.px} ${p.py}`; }
    else {
      const prev = peaks[i - 1];
      const mx = (prev.px + p.px) / 2;
      d += ` C ${mx} ${prev.py}, ${mx} ${p.py}, ${p.px} ${p.py}`;
    }
  });
  return d + ` L ${VB_W - PAD.r} ${BASE_Y}`;
}

interface ViewBProps {
  mountains: MountainVizData[];
  filters: Set<FlavorType>;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  isDark: boolean;
}

export function ViewB({ mountains, filters, selected, hovered, onSelect, onHover, isDark }: ViewBProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [regionFilter, setRegionFilter] = useState<RegionId | "">("");

  const peaks = useMemo(() => buildPeaks(mountains), [mountains]);
  const silPath = useMemo(() => buildSilhouettePath(peaks), [peaks]);
  const ridgePath = useMemo(() => buildRidgePath(peaks), [peaks]);

  const isVisible = useCallback((m: MountainVizData) => {
    const flavorOk = filters.size === 0 || filters.has(m.type);
    const regionOk = !regionFilter || m.region === regionFilter;
    return flavorOk && regionOk;
  }, [filters, regionFilter]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          peaks.forEach((p, i) => setTimeout(() => setVisible((s) => new Set([...s, p.m.id])), i * 55));
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [peaks]);

  const regions = Object.entries(REGION_CONFIG) as [RegionId, typeof REGION_CONFIG[RegionId]][];
  const filterBtnStyle = (active: boolean, color?: string) => ({
    background: active ? (color ? `${color}18` : isDark ? "rgba(201,160,82,0.12)" : "rgba(107,66,38,0.09)") : "transparent",
    border: `1px solid ${active ? (color ? `${color}44` : isDark ? "rgba(201,160,82,0.3)" : "rgba(107,66,38,0.2)") : isDark ? "rgba(201,160,82,0.1)" : "rgba(107,66,38,0.1)"}`,
    color: active ? (color || (isDark ? "#e8c97a" : "#6b4226")) : isDark ? "rgba(244,234,216,0.45)" : "#8a7060",
  });

  const cardBg = isDark ? "rgba(28,20,12,0.96)" : "#ffffff";
  const cardBorder = isDark ? "rgba(201,160,82,0.15)" : "rgba(107,66,38,0.12)";
  const cardShadow = isDark ? "none" : "0 2px 10px rgba(0,0,0,0.06)";
  const cardNameColor = isDark ? "rgba(244,234,216,0.75)" : "#1c1510";
  const cardMetaColor = isDark ? "rgba(201,160,82,0.45)" : "#8a7060";
  const cardSubColor = isDark ? "rgba(244,234,216,0.35)" : "#8a7060";

  const gridStroke = isDark ? "rgba(201,160,82,0.06)" : "rgba(107,66,38,0.08)";
  const tickColor = isDark ? "rgba(201,160,82,0.45)" : "#6b4226";
  const defaultLabelColor = isDark ? "rgba(244,234,216,0.65)" : "#4a3828";
  const ridgeStroke = isDark ? "rgba(100,140,90,0.3)" : "rgba(80,120,70,0.4)";

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-2">
        <span className="text-[0.92rem] tracking-[0.08em]" style={{ color: isDark ? "rgba(244,234,216,0.7)" : "#4a3828", fontFamily: "var(--font-brush, serif)" }}>
          山峦剖面图
        </span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setRegionFilter("")} className="rounded-sm px-3 py-1 text-[0.72rem] tracking-[0.08em] transition-all" style={filterBtnStyle(!regionFilter)}>
            全部
          </button>
          {regions.map(([id, cfg]) => (
            <button key={id} type="button" onClick={() => setRegionFilter(regionFilter === id ? "" : id)} className="flex items-center gap-1.5 rounded-sm px-3 py-1 text-[0.72rem] tracking-[0.06em] transition-all" style={filterBtnStyle(regionFilter === id, cfg.color)}>
              <span className="h-2 w-2 rounded-full" style={{ background: cfg.color }} />
              {cfg.name}
            </button>
          ))}
        </div>
      </div>

      <svg
        ref={svgRef} width="100%" viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="overflow-visible" style={{ borderRadius: 6 }}
        onClick={(e) => { if ((e.target as SVGElement).tagName === "svg" || (e.target as SVGElement).tagName === "rect") onSelect(null); }}
      >
        <defs>
          <linearGradient id="mountain-fill-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d4a2d" /><stop offset="50%" stopColor="#1e3520" /><stop offset="100%" stopColor="#0c1a0c" />
          </linearGradient>
          <linearGradient id="mountain-fill-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8ab87a" /><stop offset="50%" stopColor="#a5c898" /><stop offset="100%" stopColor="#d4dfc8" />
          </linearGradient>
          <linearGradient id="sky-bg-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1208" /><stop offset="100%" stopColor="#0e1808" />
          </linearGradient>
          <linearGradient id="sky-bg-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8e0d0" /><stop offset="40%" stopColor="#f0ead8" /><stop offset="100%" stopColor="#f5f0e4" />
          </linearGradient>
          <clipPath id="mountainClip"><path d={silPath} /></clipPath>
          {Object.entries(TYPE_CONFIG).map(([, cfg]) => (
            <filter key={cfg.color} id={`peakGlow-${cfg.color.replace("#", "")}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
        </defs>

        <rect width={VB_W} height={VB_H} fill={isDark ? "url(#sky-bg-dark)" : "url(#sky-bg-light)"} rx="6" />
        {!isDark && <rect width={VB_W} height={VB_H} fill="none" rx="6" stroke="rgba(107,66,38,0.1)" strokeWidth="1" />}

        {ALT_TICKS.map((alt) => {
          const y = altToY(alt);
          return (
            <g key={alt}>
              <line x1={PAD.l} y1={y} x2={VB_W - PAD.r} y2={y} stroke={gridStroke} strokeDasharray="3,14" />
              <text x={PAD.l - 10} y={y + 4} textAnchor="end" fill={tickColor} fontSize="11" fontFamily="var(--font-mono, 'JetBrains Mono', monospace)">{alt}m</text>
            </g>
          );
        })}

        <path d={silPath} fill={isDark ? "url(#mountain-fill-dark)" : "url(#mountain-fill-light)"} />
        <path d={ridgePath} fill="none" stroke={ridgeStroke} strokeWidth="1.5" />

        {isDark && (
          <g clipPath="url(#mountainClip)">
            <ellipse cx={VB_W * 0.3} cy={BASE_Y - 40} rx={160} ry={30} fill="rgba(235,228,210,0.04)" style={{ animation: "mistDrift 20s ease-in-out infinite alternate" }} />
            <ellipse cx={VB_W * 0.7} cy={BASE_Y - 60} rx={140} ry={25} fill="rgba(235,228,210,0.03)" style={{ animation: "mistDrift 26s ease-in-out 5s infinite alternate" }} />
          </g>
        )}

        {peaks.map((p, i) => {
          const cfg = TYPE_CONFIG[p.m.type];
          const vis = isVisible(p.m);
          const isSel = selected === p.m.id;
          const isHov = hovered === p.m.id;
          const appeared = visible.has(p.m.id);
          const nodeR = vis ? (isSel ? 8 : isHov ? 6.5 : 6) : 3.5;
          const labelY = BASE_Y + (i % 2 === 0 ? 18 : 34);
          const showLabel = vis && (isSel || isHov || !regionFilter || filters.size === 0);

          return (
            <g key={p.m.id} style={{ cursor: "pointer", opacity: appeared ? 1 : 0, transition: "opacity 0.4s ease" }}
              onMouseEnter={() => onHover(p.m.id)} onMouseLeave={() => onHover(null)}
              onClick={(e) => { e.stopPropagation(); onSelect(isSel ? null : p.m.id); }}
            >
              {vis && <circle cx={p.px} cy={p.py} r={isSel ? 12 : 9} fill="none" stroke={cfg.color} strokeOpacity={isSel ? 0.6 : isHov ? 0.5 : 0.35} style={{ transition: "all 0.25s ease" }} />}
              {isSel && <circle cx={p.px} cy={p.py} r={18} fill={cfg.color} opacity={isDark ? 0.12 : 0.15} />}
              <circle cx={p.px} cy={p.py} r={nodeR} fill={vis ? cfg.color : (isDark ? "rgba(201,160,82,0.2)" : "rgba(107,66,38,0.2)")} filter={isSel ? `url(#peakGlow-${cfg.color.replace("#", "")})` : undefined} style={{ transition: "all 0.25s ease" }} />
              {showLabel && (
                <text x={p.px} y={labelY} textAnchor="middle" fill={isSel || isHov ? cfg.color : defaultLabelColor} fontSize={isSel ? 15.5 : 14} fontWeight={isSel ? "bold" : "normal"} fontFamily="var(--font-brush, 'Ma Shan Zheng', serif)" style={{ transition: "all 0.25s ease" }}>
                  {p.m.name}
                </text>
              )}
              {isSel && (
                <g>
                  <rect x={p.px - 26} y={p.py - 26} width={52} height={18} rx={3} fill={isDark ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.85)"} stroke={isDark ? "none" : "rgba(107,66,38,0.15)"} strokeWidth="0.5" />
                  <text x={p.px} y={p.py - 13.5} textAnchor="middle" fill={cfg.color} fontSize="10.5" fontFamily="var(--font-mono, 'JetBrains Mono', monospace)">{p.m.altitude}m</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Mountain cards grid */}
      <div className="mt-8">
        <div className="mb-4 h-px w-full" style={{ background: isDark ? "linear-gradient(90deg, transparent, rgba(201,160,82,0.15), transparent)" : "linear-gradient(90deg, transparent, rgba(107,66,38,0.12), transparent)" }} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...mountains].sort((a, b) => b.altitude - a.altitude).filter((m) => isVisible(m)).map((m) => {
            const cfg = TYPE_CONFIG[m.type];
            const isSel = selected === m.id;
            return (
              <button
                key={m.id} type="button"
                onClick={() => { onSelect(isSel ? null : m.id); svgRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="rounded-sm p-3.5 text-left transition-all"
                style={{
                  background: isSel ? `${cfg.color}0c` : cardBg,
                  border: `1px solid ${isSel ? `${cfg.color}44` : cardBorder}`,
                  boxShadow: isSel ? "none" : cardShadow,
                  transform: isSel ? "translateY(-2px)" : "none",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: cfg.color }} />
                  <span className="text-[1rem]" style={{ fontFamily: "var(--font-brush, serif)", color: isSel ? cfg.color : cardNameColor }}>{m.name}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <span className="text-[0.82rem]" style={{ fontFamily: "var(--font-mono, monospace)", color: cardMetaColor }}>{m.altitude}m</span>
                  <span className="text-[0.78rem]" style={{ color: cardSubColor }}>{REGION_CONFIG[m.region]?.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
