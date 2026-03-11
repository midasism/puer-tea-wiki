"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { GlossaryItem } from "@/types/glossary";
import { CATEGORY_BADGE_COLORS, CATEGORY_LABELS } from "@/types/glossary";

const BADGE_BG: Record<string, string> = {
  "tea-green": "bg-tea-green/10 text-tea-green dark:bg-tea-green/20",
  amber: "bg-amber/10 text-amber dark:bg-amber/20",
  cinnabar: "bg-cinnabar/10 text-cinnabar dark:bg-cinnabar/20",
  "tea-green-light": "bg-tea-green-light/10 text-tea-green-light dark:bg-tea-green-light/20",
  "amber-light": "bg-amber-light/10 text-amber-light dark:bg-amber-light/20",
  "ink-muted": "bg-ink-muted/10 text-ink-muted dark:bg-ink-muted/20",
};

interface GlossaryCardProps {
  item: GlossaryItem;
  glossaryMap: Record<string, GlossaryItem>;
}

export function GlossaryCard({ item, glossaryMap }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const badgeColor = CATEGORY_BADGE_COLORS[item.category];

  // Expand when navigated to via hash (e.g. from related term click)
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
  const badgeClass = BADGE_BG[badgeColor] ?? BADGE_BG["ink-muted"];

  const relatedItems = item.related
    .map((id) => glossaryMap[id])
    .filter(Boolean);

  const handleRelatedClick = (relatedId: string) => {
    const el = document.getElementById(`glossary-${relatedId}`);
    window.history.pushState(null, "", `#glossary-${relatedId}`);
    el?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <article
      id={`glossary-${item.id}`}
      className="overflow-hidden rounded-xl border border-ink-muted/15 bg-paper shadow-sm transition-shadow hover:shadow-md dark:bg-paper-dark dark:border-ink-muted/20"
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full cursor-pointer text-left"
        aria-expanded={expanded}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-lg font-medium text-ink dark:text-foreground">
                {item.term}
              </h3>
              <p className="mt-1 font-sans text-sm text-ink-muted line-clamp-2">
                {item.brief}
              </p>
              <span
                className={`mt-3 inline-block rounded-md px-2 py-0.5 font-sans text-xs ${badgeClass}`}
              >
                {CATEGORY_LABELS[item.category]}
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-ink-muted transition-transform ${expanded ? "rotate-180" : ""}`}
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
            <div className="border-t border-ink-muted/15 px-5 py-4 dark:border-ink-muted/20">
              <p className="font-sans text-sm leading-relaxed text-ink dark:text-foreground">
                {item.detail}
              </p>
              {relatedItems.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 font-sans text-xs font-medium text-ink-muted">
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
                        className="rounded-md border border-tea-green/30 bg-tea-green/5 px-2 py-1 font-sans text-xs text-tea-green transition-colors hover:bg-tea-green/15 hover:border-tea-green/50 dark:border-tea-green-light/30 dark:bg-tea-green-light/10 dark:text-tea-green-light dark:hover:bg-tea-green-light/20"
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
