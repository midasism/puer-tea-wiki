"use client";

import { useState, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import type { Mountain } from "@/lib/mountains";
import { toVizData, type FlavorType, type ViewType } from "@/data/mountains-config";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Switcher } from "./Switcher";
import { ViewA } from "./ViewA";
import { ViewB } from "./ViewB";
import { DetailPanel } from "./DetailPanel";
import { OriginTree } from "@/components/OriginTree";

interface MountainsClientProps {
  mountains: Mountain[];
}

export function MountainsClient({ mountains }: MountainsClientProps) {
  const [view, setView] = useState<ViewType>("A");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [filters, setFilters] = useState<Set<FlavorType>>(new Set());
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const vizData = useMemo(() => mountains.map(toVizData), [mountains]);

  const switchView = useCallback((v: ViewType) => {
    setView(v);
    setSelected(null);
    setHovered(null);
  }, []);

  const toggleFilter = useCallback((type: FlavorType) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }, []);

  const activeData = useMemo(() => {
    const id = selected || hovered;
    return id ? vizData.find((m) => m.id === id) ?? null : null;
  }, [vizData, selected, hovered]);

  const contentBg = isDark ? "transparent" : "#faf5ec";

  return (
    <section className="relative transition-colors duration-500" style={{ background: contentBg, minHeight: "100vh" }}>
      {/* Switcher */}
      <Switcher
        view={view}
        onViewChange={switchView}
        filters={filters}
        onFilterToggle={toggleFilter}
        count={vizData.length}
        isDark={isDark}
      />

      {view === "Tree" ? (
        <div style={{ animation: "viewEnter 0.3s ease-out both" }}>
          <OriginTree
            initialDepth={2}
            isDark={isDark}
            onLeafClick={(name) => {
              setView("A");
              setTimeout(() => {
                document.getElementById(`mountain-${name}`)?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        </div>
      ) : (
        <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-6 md:px-6">
          <div className="flex gap-6" style={{ minHeight: 600 }}>
            <div className="min-w-0 flex-1">
              <div key={view} style={{ animation: "viewEnter 0.3s ease-out both" }}>
                {view === "A" ? (
                  <ViewA
                    mountains={vizData}
                    filters={filters}
                    selected={selected}
                    hovered={hovered}
                    onSelect={setSelected}
                    onHover={setHovered}
                    onFilterToggle={toggleFilter}
                    isDark={isDark}
                  />
                ) : (
                  <ViewB
                    mountains={vizData}
                    filters={filters}
                    selected={selected}
                    hovered={hovered}
                    onSelect={setSelected}
                    onHover={setHovered}
                    isDark={isDark}
                  />
                )}
              </div>
            </div>

            <div className="hidden w-[340px] shrink-0 lg:block">
              <div className="sticky" style={{ top: 128 }}>
                {activeData && (
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="mb-2 flex items-center gap-1 rounded-sm px-2 py-1 text-[0.7rem] transition-colors md:text-[0.78rem]"
                    style={{
                      color: isDark ? "rgba(201,160,82,0.5)" : "#8a7060",
                      background: isDark ? "rgba(201,160,82,0.06)" : "rgba(107,66,38,0.06)",
                    }}
                  >
                    <X className="h-3 w-3" />
                    关闭详情
                  </button>
                )}
                <DetailPanel key={selected} mountain={activeData} isDark={isDark} />
              </div>
            </div>
          </div>

          {activeData && (
            <div className="mt-6 lg:hidden">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.72rem]" style={{ color: isDark ? "rgba(201,160,82,0.5)" : "#8a7060" }}>山头详情</span>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1 rounded-sm px-2 py-1 text-[0.68rem]"
                  style={{ color: isDark ? "rgba(201,160,82,0.5)" : "#8a7060" }}
                >
                  <X className="h-3 w-3" /> 关闭
                </button>
              </div>
              <DetailPanel key={`mobile-${selected}`} mountain={activeData} isDark={isDark} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
