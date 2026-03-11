"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MountainCard } from "./MountainCard";
import type { Mountain } from "@/lib/mountains";

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
  const [regionFilter, setRegionFilter] = useState("");
  const [flavorFilter, setFlavorFilter] = useState("");

  const filteredMountains = useMemo(() => {
    return mountains.filter((m) => {
      const regionMatch = !regionFilter || m.region === regionFilter;
      const flavorMatch = !flavorFilter || m.flavorType === flavorFilter;
      return regionMatch && flavorMatch;
    });
  }, [mountains, regionFilter, flavorFilter]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <div>
          <p className="mb-2 font-sans text-sm font-medium text-ink-muted">产区</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.id || "all-region"}
                type="button"
                onClick={() => setRegionFilter(r.id)}
                className={`rounded-lg px-4 py-2 font-sans text-sm transition-colors ${
                  regionFilter === r.id
                    ? "bg-tea-green text-white dark:bg-tea-green"
                    : "bg-paper-dark text-ink dark:bg-paper-dark dark:text-foreground"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-sans text-sm font-medium text-ink-muted">风味类型</p>
          <div className="flex flex-wrap gap-2">
            {FLAVOR_TYPES.map((f) => (
              <button
                key={f.id || "all-flavor"}
                type="button"
                onClick={() => setFlavorFilter(f.id)}
                className={`rounded-lg px-4 py-2 font-sans text-sm transition-colors ${
                  flavorFilter === f.id
                    ? "bg-tea-green text-white dark:bg-tea-green"
                    : "bg-paper-dark text-ink dark:bg-paper-dark dark:text-foreground"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredMountains.map((mountain) => (
            <motion.div
              key={mountain.id}
              layout
              layoutId={mountain.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <MountainCard mountain={mountain} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
