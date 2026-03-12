"use client";

import { TYPE_CONFIG, type FlavorType, type ViewType } from "@/data/mountains-config";

interface SwitcherProps {
  view: ViewType;
  onViewChange: (v: ViewType) => void;
  filters: Set<FlavorType>;
  onFilterToggle: (type: FlavorType) => void;
  count: number;
  isDark: boolean;
}

const FLAVOR_TYPES: FlavorType[] = ["霸气型", "甜韵型", "柔和型", "花香型", "均衡型"];

export function Switcher({ view, onViewChange, filters, onFilterToggle, count, isDark }: SwitcherProps) {
  const bg = isDark ? "rgba(14,10,6,0.94)" : "rgba(250,245,236,0.98)";
  const border = isDark ? "rgba(201,160,82,0.1)" : "rgba(107,66,38,0.12)";
  const tabBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(107,66,38,0.04)";
  const tabBorder = isDark ? "rgba(201,160,82,0.15)" : "rgba(107,66,38,0.15)";
  const tabActiveBg = isDark ? "rgba(201,160,82,0.12)" : "rgba(107,66,38,0.09)";
  const tabActiveText = isDark ? "#e8c97a" : "#6b4226";
  const tabInactiveText = isDark ? "rgba(244,234,216,0.4)" : "#8a7060";
  const countColor = isDark ? "rgba(201,160,82,0.4)" : "#8a7060";
  const dividerColor = isDark ? "rgba(201,160,82,0.15)" : "rgba(107,66,38,0.18)";
  const hintColor = isDark ? "rgba(201,160,82,0.28)" : "#8a7060";

  return (
    <div
      className="sticky z-[80] flex flex-wrap items-center gap-4 px-4 py-3 backdrop-blur-[16px] transition-colors duration-300 md:px-6"
      style={{ top: 64, background: bg, borderBottom: `1px solid ${border}` }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-4">
        {/* View tabs */}
        <div className="flex overflow-hidden rounded-[3px]" style={{ background: tabBg, border: `1px solid ${tabBorder}` }}>
          <button
            type="button"
            onClick={() => onViewChange("A")}
            className="flex items-center gap-2 px-5 py-2.5 transition-colors"
            style={{
              background: view === "A" ? tabActiveBg : "transparent",
              borderRight: `1px solid ${tabBorder}`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="4" cy="4" r="3" fill="#e05a3a" opacity=".8" />
              <circle cx="10" cy="5" r="2.2" fill={isDark ? "#e8c97a" : "#c9a052"} opacity=".8" />
              <circle cx="5" cy="10" r="1.8" fill="#7ab8e8" opacity=".8" />
              <circle cx="11" cy="10" r="2.5" fill="#c47ae8" opacity=".8" />
            </svg>
            <span
              className="text-[0.72rem] tracking-[0.1em] md:text-[0.78rem]"
              style={{ fontFamily: "var(--font-mono, monospace)", color: view === "A" ? tabActiveText : tabInactiveText }}
            >
              风味星云
            </span>
          </button>
          <button
            type="button"
            onClick={() => onViewChange("B")}
            className="flex items-center gap-2 px-5 py-2.5 transition-colors"
            style={{ background: view === "B" ? tabActiveBg : "transparent" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M0,12 C2,8 4,10 6,6 C8,2 10,5 14,4" stroke="#7ae898" strokeWidth="1.5" fill="none" />
              <path d="M0,14 C2,8 4,10 6,6 C8,2 10,5 14,4 L14,14 Z" fill="rgba(45,74,45,.6)" />
            </svg>
            <span
              className="text-[0.72rem] tracking-[0.1em] md:text-[0.78rem]"
              style={{ fontFamily: "var(--font-mono, monospace)", color: view === "B" ? tabActiveText : tabInactiveText }}
            >
              山峦剖面
            </span>
          </button>
        </div>

        <span className="text-[0.66rem] tracking-[0.15em] md:text-[0.72rem]" style={{ fontFamily: "var(--font-mono, monospace)", color: countColor }}>
          {count} 座山头
        </span>

        <div className="hidden h-5 w-px sm:block" style={{ background: dividerColor }} />

        <div className="flex items-center gap-2.5">
          {FLAVOR_TYPES.map((type) => {
            const cfg = TYPE_CONFIG[type];
            const active = filters.has(type);
            const dotColor = !isDark && type === "甜韵型" ? "#c9a052" : cfg.color;
            return (
              <button
                key={type}
                type="button"
                title={type}
                aria-label={`筛选${type}`}
                onClick={() => onFilterToggle(type)}
                className="rounded-full transition-all"
                style={{
                  width: active ? 11 : 9,
                  height: active ? 11 : 9,
                  background: dotColor,
                  boxShadow: active ? `0 0 8px ${cfg.glow}` : "none",
                  opacity: filters.size > 0 && !active ? 0.3 : 1,
                }}
              />
            );
          })}
          <span className="hidden text-[0.62rem] sm:inline md:text-[0.7rem]" style={{ fontFamily: "var(--font-mono, monospace)", color: hintColor }}>
            筛选风味
          </span>
        </div>
      </div>
    </div>
  );
}
