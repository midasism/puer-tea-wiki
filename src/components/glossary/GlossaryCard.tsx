"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { GlossaryItem, GlossaryCategory } from "@/types/glossary";
import { CATEGORY_LABELS } from "@/types/glossary";
import { useTheme } from "@/components/layout/ThemeProvider";

const CATEGORY_TOP_COLORS: Record<GlossaryCategory, string> = {
  basics: "linear-gradient(90deg, #c9a052, #e8c97a)",
  tree: "linear-gradient(90deg, #2d4a2d, #4A7A2E)",
  craft: "linear-gradient(90deg, #6b4226, #3a2618)",
  tasting: "linear-gradient(90deg, #c9a052, #e8c97a)",
  form: "linear-gradient(90deg, #8a7060, #6b4226)",
  aging: "linear-gradient(90deg, #3a2618, #6b4226)",
};

const TAG_LIGHT: Record<GlossaryCategory, { bg: string; color: string }> = {
  basics: { bg: "rgba(201,160,82,0.10)", color: "#c9a052" },
  tree: { bg: "rgba(45,74,45,0.10)", color: "#2d4a2d" },
  craft: { bg: "rgba(107,66,38,0.10)", color: "#6b4226" },
  tasting: { bg: "rgba(201,160,82,0.10)", color: "#c9a052" },
  form: { bg: "rgba(138,112,96,0.10)", color: "#8a7060" },
  aging: { bg: "rgba(58,38,24,0.10)", color: "#3a2618" },
};

const TAG_DARK: Record<GlossaryCategory, { bg: string; color: string }> = {
  basics: { bg: "rgba(201,160,82,0.15)", color: "#e8c97a" },
  tree: { bg: "rgba(45,74,45,0.25)", color: "#6aad5a" },
  craft: { bg: "rgba(107,66,38,0.20)", color: "#c9a052" },
  tasting: { bg: "rgba(201,160,82,0.15)", color: "#e8c97a" },
  form: { bg: "rgba(138,112,96,0.18)", color: "#c9a88a" },
  aging: { bg: "rgba(107,66,38,0.18)", color: "#c9a052" },
};

interface GlossaryCardProps {
  item: GlossaryItem;
  glossaryMap: Record<string, GlossaryItem>;
}

export function GlossaryCard({ item, glossaryMap }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === `#glossary-${item.id}`) {
        setExpanded(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [item.id]);

  const relatedItems = item.related
    .map((id) => glossaryMap[id])
    .filter(Boolean);

  const handleRelatedClick = (relatedId: string) => {
    const el = document.getElementById(`glossary-${relatedId}`);
    window.history.pushState(null, "", `#glossary-${relatedId}`);
    el?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const topColor = CATEGORY_TOP_COLORS[item.category];
  const tagStyle = isDark ? TAG_DARK[item.category] : TAG_LIGHT[item.category];

  const cardBg = isDark ? "rgba(28,20,12,0.96)" : "#ffffff";
  const cardBorder = isDark ? "rgba(201,160,82,0.18)" : "rgba(201,160,82,0.15)";
  const cardShadow = isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)";
  const metaColor = isDark ? "rgba(244,234,216,0.38)" : "#8a7060";
  const titleColor = isDark ? "#f4ead8" : "#1c1510";
  const briefColor = isDark ? "rgba(244,234,216,0.65)" : "#4a3828";
  const chevronColor = isDark ? "rgba(244,234,216,0.38)" : "#8a7060";
  const expandBorder = isDark ? "rgba(201,160,82,0.12)" : "rgba(201,160,82,0.12)";
  const relatedLabelColor = isDark ? "rgba(244,234,216,0.38)" : "#8a7060";
  const relatedBtnBorder = isDark ? "rgba(201,160,82,0.25)" : "rgba(201,160,82,0.25)";
  const relatedBtnBg = isDark ? "rgba(201,160,82,0.08)" : "rgba(201,160,82,0.05)";
  const relatedBtnColor = isDark ? "#c9a052" : "#6b4226";

  return (
    <article
      id={`glossary-${item.id}`}
      className="group relative overflow-hidden rounded-sm transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}
    >
      <div className="h-[3px]" style={{ background: topColor }} />

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full cursor-pointer text-left"
        aria-expanded={expanded}
      >
        <div className="p-5">
          <div className="mb-2 text-[0.6rem] uppercase tracking-[0.15em]" style={{ color: metaColor }}>
            TERM / {CATEGORY_LABELS[item.category]}
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-[1.3rem]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.04em", color: titleColor }}>
                {item.term}
              </h3>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-serif), serif", color: briefColor }}>
                {item.brief}
              </p>
              <span className="mt-3 inline-block rounded-sm px-2 py-0.5 text-[0.62rem]" style={{ background: tagStyle.bg, color: tagStyle.color }}>
                {CATEGORY_LABELS[item.category]}
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
              style={{ color: chevronColor }}
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4" style={{ borderTop: `1px solid ${expandBorder}` }}>
              <p className="text-[0.82rem] leading-relaxed" style={{ fontFamily: "var(--font-serif), serif", lineHeight: 1.7, color: briefColor }}>
                {item.detail}
              </p>
              {relatedItems.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: relatedLabelColor }}>
                    关联名词
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedItems.map((related) => (
                      <button
                        key={related.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRelatedClick(related.id);
                        }}
                        className="rounded-sm px-2.5 py-1 text-[0.72rem] transition-colors"
                        style={{ border: `1px solid ${relatedBtnBorder}`, background: relatedBtnBg, color: relatedBtnColor }}
                      >
                        {related.term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
