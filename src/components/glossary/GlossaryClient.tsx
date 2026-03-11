"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { GlossaryItem, GlossaryCategory } from "@/types/glossary";
import { CATEGORY_LABELS } from "@/types/glossary";
import { GlossaryCard } from "./GlossaryCard";

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

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
          strokeWidth={1.5}
          aria-hidden
        />
        <input
          type="search"
          placeholder="搜索名词或简介..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-ink-muted/20 bg-paper py-3 pl-12 pr-4 font-sans text-ink placeholder:text-ink-muted focus:border-tea-green focus:outline-none focus:ring-2 focus:ring-tea-green/20 dark:bg-paper-dark dark:text-foreground dark:placeholder:text-ink-muted"
          aria-label="搜索名词"
        />
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto scrollbar-hide">
        <nav
          className="relative flex min-w-max gap-1 pb-1"
          role="tablist"
          aria-label="分类筛选"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={category === opt.value}
              onClick={() => setCategory(opt.value)}
              className={`relative block px-4 py-2 font-sans text-sm transition-colors ${
                category === opt.value
                  ? "text-tea-green dark:text-tea-green-light"
                  : "text-ink-muted hover:text-ink dark:hover:text-ink-light"
              }`}
            >
              {opt.label}
              {category === opt.value && (
                <motion.div
                  layoutId="glossary-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-tea-green dark:bg-tea-green-light"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <GlossaryCard
            key={item.id}
            item={item}
            glossaryMap={Object.fromEntries(glossary.map((g) => [g.id, g]))}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="py-12 text-center font-sans text-ink-muted">
          未找到匹配的名词，试试其他搜索词或分类。
        </p>
      )}
    </div>
  );
}
