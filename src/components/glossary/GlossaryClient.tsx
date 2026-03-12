"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { GlossaryItem, GlossaryCategory } from "@/types/glossary";
import { CATEGORY_LABELS } from "@/types/glossary";
import { GlossaryCard } from "./GlossaryCard";
import { useTheme } from "@/components/layout/ThemeProvider";

const CATEGORY_OPTIONS: { value: GlossaryCategory | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "basics", label: CATEGORY_LABELS.basics },
  { value: "tree", label: CATEGORY_LABELS.tree },
  { value: "craft", label: CATEGORY_LABELS.craft },
  { value: "tasting", label: CATEGORY_LABELS.tasting },
  { value: "form", label: CATEGORY_LABELS.form },
  { value: "aging", label: CATEGORY_LABELS.aging },
];

interface GlossaryClientProps {
  glossary: GlossaryItem[];
}

export function GlossaryClient({ glossary }: GlossaryClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "all">("all");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const filteredItems = useMemo(() => {
    return glossary.filter((item) => {
      const matchCategory =
        category === "all" || item.category === category;
      const searchLower = search.trim().toLowerCase();
      const matchSearch =
        !searchLower ||
        item.term.toLowerCase().includes(searchLower) ||
        item.brief.toLowerCase().includes(searchLower);
      return matchCategory && matchSearch;
    });
  }, [glossary, search, category]);

  const inputBg = isDark ? "rgba(28,20,12,0.96)" : "#ffffff";
  const inputBorder = isDark ? "rgba(201,160,82,0.20)" : "rgba(201,160,82,0.20)";
  const inputColor = isDark ? "#f4ead8" : "#1c1510";
  const inputPlaceholder = isDark ? "rgba(244,234,216,0.38)" : "#8a7060";
  const inactiveTabColor = isDark ? "rgba(244,234,216,0.38)" : "#8a7060";
  const inactiveTabHover = isDark ? "rgba(244,234,216,0.65)" : "#1c1510";
  const emptyColor = isDark ? "rgba(244,234,216,0.38)" : "#8a7060";

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-[600px]">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c9a052]"
            strokeWidth={1.5}
            aria-hidden
          />
          <input
            type="search"
            placeholder="搜索名词，如：回甘、仓储、老茶头…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-sm py-3 pl-12 pr-4 text-[0.88rem] focus:outline-none focus:ring-2 focus:ring-[#c9a052]/15"
            style={{ fontFamily: "var(--font-serif), serif", background: inputBg, border: `1px solid ${inputBorder}`, color: inputColor, ["--tw-placeholder-color" as string]: inputPlaceholder } as React.CSSProperties}
            aria-label="搜索名词"
          />
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <nav
          className="relative flex min-w-max justify-center gap-1 pb-1"
          role="tablist"
          aria-label="分类筛选"
        >
          {CATEGORY_OPTIONS.map((opt) => {
            const isActive = category === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(opt.value)}
                className="relative block rounded-sm px-5 py-2 text-[0.82rem] tracking-wider transition-all"
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontWeight: 500,
                  background: isActive ? "#c9a052" : "transparent",
                  color: isActive ? "#ffffff" : inactiveTabColor,
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = inactiveTabHover; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = inactiveTabColor; }}
              >
                {opt.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
          >
            <GlossaryCard
              item={item}
              glossaryMap={Object.fromEntries(glossary.map((g) => [g.id, g]))}
            />
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[0.88rem]" style={{ fontFamily: "var(--font-serif), serif", color: emptyColor }}>
            未找到匹配的名词，试试其他搜索词或分类。
          </p>
        </div>
      )}
    </div>
  );
}
