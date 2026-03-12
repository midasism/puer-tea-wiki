"use client";

import { Star } from "lucide-react";
import { RadarChart5 } from "./RadarChart5";
import {
  TYPE_CONFIG, REGION_CONFIG, FLAVOR_LABELS,
  type MountainVizData,
} from "@/data/mountains-config";

interface DetailPanelProps {
  mountain: MountainVizData | null;
  isDark: boolean;
}

export function DetailPanel({ mountain, isDark }: DetailPanelProps) {
  if (!mountain) {
    return (
      <div
        className="flex items-center justify-center rounded-sm py-16 transition-colors duration-300"
        style={{
          border: `1px dashed ${isDark ? "rgba(201,160,82,0.12)" : "rgba(107,66,38,0.15)"}`,
          background: isDark ? "rgba(10,16,8,0.4)" : "rgba(250,245,236,0.6)",
        }}
      >
        <span className="text-[0.85rem] tracking-wider" style={{ color: isDark ? "rgba(201,160,82,0.3)" : "#8a7060", fontFamily: "var(--font-serif, serif)" }}>
          点击山头查看详情
        </span>
      </div>
    );
  }

  const cfg = TYPE_CONFIG[mountain.type];
  const regionCfg = REGION_CONFIG[mountain.region];

  const panelBg = isDark ? "rgba(10,16,8,0.95)" : "#ffffff";
  const panelBorder = isDark ? `${cfg.color}2a` : `${cfg.color}44`;
  const panelShadow = isDark ? `0 8px 48px rgba(0,0,0,0.6), 0 0 36px ${cfg.glow}` : "0 4px 24px rgba(0,0,0,0.08)";
  const nameColor = isDark ? "#f4ead8" : "#1c1510";
  const metaLabelColor = isDark ? "rgba(201,160,82,0.45)" : "#8a7060";
  const metaValueColor = isDark ? "rgba(244,234,216,0.85)" : "#4a3828";
  const descColor = isDark ? "rgba(244,234,216,0.55)" : "#4a3828";
  const tagBg = isDark ? `${cfg.color}1a` : `${cfg.color}14`;
  const tagBorder = isDark ? `${cfg.color}44` : `${cfg.color}55`;
  const barTrack = isDark ? "rgba(201,160,82,0.08)" : "rgba(107,66,38,0.1)";
  const barLabelColor = isDark ? "rgba(244,234,216,0.5)" : "#8a7060";
  const flavorHeaderColor = isDark ? "rgba(201,160,82,0.4)" : "#8a7060";

  return (
    <div
      key={mountain.id}
      className="overflow-hidden rounded-sm transition-colors duration-300"
      style={{
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        boxShadow: panelShadow,
        animation: "fadeIn 0.3s both",
      }}
    >
      {/* Color bar top */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}4d)` }} />

      <div className="p-5">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[1.5rem]" style={{ fontFamily: "var(--font-brush, serif)", color: nameColor }}>
            {mountain.name}
          </span>
          <span className="rounded-sm px-2 py-0.5 text-[0.65rem] tracking-[0.15em] md:text-[0.72rem]" style={{ border: `1px solid ${cfg.color}44`, color: cfg.color }}>
            {mountain.type}
          </span>
        </div>

        {/* Region + meta row */}
        <div className="mb-4 flex flex-wrap gap-4">
          {regionCfg && (
            <div>
              <div className="mb-0.5 text-[0.58rem] uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: metaLabelColor, fontFamily: "var(--font-mono, monospace)" }}>产区</div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: regionCfg.color }} />
                <span className="text-[0.85rem]" style={{ color: metaValueColor }}>{regionCfg.name}</span>
              </div>
            </div>
          )}
          <div>
            <div className="mb-0.5 text-[0.58rem] uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: metaLabelColor, fontFamily: "var(--font-mono, monospace)" }}>子产区</div>
            <div className="text-[0.85rem]" style={{ color: metaValueColor }}>{mountain.sub}</div>
          </div>
          <div>
            <div className="mb-0.5 text-[0.58rem] uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: metaLabelColor, fontFamily: "var(--font-mono, monospace)" }}>海拔</div>
            <div className="text-[0.85rem]" style={{ color: metaValueColor, fontFamily: "var(--font-mono, monospace)" }}>{mountain.altitude} m</div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4" fill={i <= mountain.rating ? cfg.color : "none"} stroke={cfg.color} strokeWidth={1.5} style={{ opacity: i <= mountain.rating ? 1 : 0.25 }} />
          ))}
        </div>

        {/* Radar chart centered */}
        <div className="mb-4 flex justify-center">
          <RadarChart5 flavor={mountain.flavor} type={mountain.type} size={140} isDark={isDark} />
        </div>

        {/* Flavor bars */}
        <div className="mb-4">
          <div className="mb-2 text-[0.58rem] uppercase tracking-[0.18em] md:text-[0.66rem]" style={{ color: flavorHeaderColor, fontFamily: "var(--font-mono, monospace)" }}>
            FLAVOR PROFILE
          </div>
          <div className="flex flex-col gap-2.5">
            {FLAVOR_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="w-5 text-[0.75rem]" style={{ color: barLabelColor }}>{label}</span>
                <div className="h-[4px] flex-1 overflow-hidden rounded-full" style={{ background: barTrack }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${mountain.flavor[i]}%`,
                      background: `linear-gradient(90deg, ${cfg.color}88, ${cfg.color})`,
                      animation: "barGrow 0.7s cubic-bezier(0.4,0,0.2,1) both",
                    }}
                  />
                </div>
                <span className="w-7 text-right text-[0.65rem] md:text-[0.72rem]" style={{ color: cfg.color, fontFamily: "var(--font-mono, monospace)" }}>
                  {mountain.flavor[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="mb-3 text-[0.82rem] leading-[1.8]" style={{ color: descColor }}>
          {mountain.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {mountain.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm px-2.5 py-0.5 text-[0.72rem]"
              style={{ background: tagBg, color: cfg.color, border: `1px solid ${tagBorder}` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
