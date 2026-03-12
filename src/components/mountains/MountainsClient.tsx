"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { MountainCard } from "./MountainCard";
import type { Mountain } from "@/lib/mountains";
import { useTheme } from "@/components/layout/ThemeProvider";

const REGIONS = [
  { id: "", name: "全部" },
  { id: "xishuangbanna", name: "西双版纳" },
  { id: "lincang", name: "临沧" },
  { id: "puer", name: "普洱" },
  { id: "baoshan", name: "保山" },
];

const FLAVOR_TYPES = [
  { id: "", name: "全部" },
  { id: "霸气型", name: "霸气型" },
  { id: "柔和型", name: "柔和型" },
  { id: "甜韵型", name: "甜韵型" },
  { id: "花香型", name: "花香型" },
  { id: "均衡型", name: "均衡型" },
];

interface MountainsClientProps {
  mountains: Mountain[];
}

export function MountainsClient({ mountains }: MountainsClientProps) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [flavorFilter, setFlavorFilter] = useState("");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const filteredMountains = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mountains.filter((m) => {
      const regionMatch = !regionFilter || m.region === regionFilter;
      const flavorMatch = !flavorFilter || m.flavorType === flavorFilter;
      const searchMatch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.brief.toLowerCase().includes(q) ||
        m.subRegion.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.villages.some((v) => v.toLowerCase().includes(q));
      return regionMatch && flavorMatch && searchMatch;
    });
  }, [mountains, search, regionFilter, flavorFilter]);

  const filterBg = isDark ? "rgba(28,21,16,0.5)" : "rgba(255,255,255,0.7)";
  const filterBorder = isDark ? "rgba(201,160,82,0.10)" : "rgba(107,66,38,0.1)";
  const labelColor = isDark ? "rgba(201,160,82,0.60)" : "rgba(107,66,38,0.5)";
  const inactiveBtnBorder = isDark ? "rgba(201,160,82,0.15)" : "rgba(107,66,38,0.12)";
  const inactiveBtnText = isDark ? "rgba(244,234,216,0.50)" : "#8a7060";
  const inactiveBtnHoverBorder = isDark ? "rgba(201,160,82,0.30)" : "rgba(107,66,38,0.25)";
  const inactiveBtnHoverText = isDark ? "rgba(244,234,216,0.80)" : "#4a3828";
  const countColor = isDark ? "rgba(201,160,82,0.50)" : "rgba(107,66,38,0.4)";
  const inputBg = isDark ? "rgba(28,20,12,0.96)" : "#ffffff";
  const inputBorder = isDark ? "rgba(201,160,82,0.20)" : "rgba(201,160,82,0.20)";
  const inputColor = isDark ? "#f4ead8" : "#1c1510";

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="mx-auto max-w-[600px]">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c9a052]"
            strokeWidth={1.5}
            aria-hidden
          />
          <input
            type="search"
            placeholder="搜索山头，如：冰岛、老班章、蜜香…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-sm py-3 pl-12 pr-4 text-[0.88rem] focus:outline-none focus:ring-2 focus:ring-[#c9a052]/15"
            style={{ fontFamily: "var(--font-serif), serif", background: inputBg, border: `1px solid ${inputBorder}`, color: inputColor }}
            aria-label="搜索山头"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-sm p-5 transition-colors duration-300" style={{ background: filterBg, border: `1px solid ${filterBorder}` }}>
        <div>
          <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]" style={{ color: labelColor }}>产区</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.id || "all-region"}
                type="button"
                onClick={() => setRegionFilter(r.id)}
                className={`rounded-sm px-4 py-2 text-[0.78rem] transition-all ${
                  regionFilter === r.id
                    ? "bg-[#c9a052] text-white"
                    : ""
                }`}
                style={regionFilter === r.id ? undefined : {
                  border: `1px solid ${inactiveBtnBorder}`,
                  color: inactiveBtnText,
                }}
                onMouseEnter={(e) => { if (regionFilter !== r.id) { e.currentTarget.style.borderColor = inactiveBtnHoverBorder; e.currentTarget.style.color = inactiveBtnHoverText; } }}
                onMouseLeave={(e) => { if (regionFilter !== r.id) { e.currentTarget.style.borderColor = inactiveBtnBorder; e.currentTarget.style.color = inactiveBtnText; } }}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]" style={{ color: labelColor }}>风味类型</p>
          <div className="flex flex-wrap gap-2">
            {FLAVOR_TYPES.map((f) => (
              <button
                key={f.id || "all-flavor"}
                type="button"
                onClick={() => setFlavorFilter(f.id)}
                className={`rounded-sm px-4 py-2 text-[0.78rem] transition-all ${
                  flavorFilter === f.id
                    ? "bg-[#c9a052] text-white"
                    : ""
                }`}
                style={flavorFilter === f.id ? undefined : {
                  border: `1px solid ${inactiveBtnBorder}`,
                  color: inactiveBtnText,
                }}
                onMouseEnter={(e) => { if (flavorFilter !== f.id) { e.currentTarget.style.borderColor = inactiveBtnHoverBorder; e.currentTarget.style.color = inactiveBtnHoverText; } }}
                onMouseLeave={(e) => { if (flavorFilter !== f.id) { e.currentTarget.style.borderColor = inactiveBtnBorder; e.currentTarget.style.color = inactiveBtnText; } }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-right text-[0.68rem]" style={{ color: countColor }}>
          {filteredMountains.length} 座山头
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${regionFilter}|${flavorFilter}|${search}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredMountains.map((mountain, i) => (
            <motion.div
              key={mountain.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
            >
              <MountainCard mountain={mountain} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredMountains.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[0.88rem]" style={{ fontFamily: "var(--font-serif), serif", color: isDark ? "rgba(244,234,216,0.38)" : "#8a7060" }}>
            未找到匹配的山头，试试其他搜索词或筛选条件。
          </p>
        </div>
      )}
    </div>
  );
}
