"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export interface HistoryEvent {
  id: string;
  era: string;
  year: string;
  title: string;
  summary: string;
  detail: string;
  highlights: string[];
}

interface TimelineNodeProps {
  event: HistoryEvent;
  index: number;
}

export function TimelineNode({ event, index }: TimelineNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-stretch py-8 md:py-10">
      <div className="hidden w-1/2 pr-8 md:block">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex justify-end"
          >
            <Card event={event} expanded={expanded} setExpanded={setExpanded} />
          </motion.div>
        )}
      </div>

      <div className="absolute left-4 top-1/2 flex w-8 -translate-y-1/2 justify-center md:left-1/2 md:-translate-x-1/2 md:translate-y-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative z-10 h-4 w-4 rounded-full border-2 border-[#c9a052]"
          style={{ background: "radial-gradient(circle, #e8c97a 0%, #c9a052 100%)", boxShadow: "0 0 12px rgba(201,160,82,0.4)" }}
        />
      </div>

      <div className="ml-12 min-w-0 flex-1 md:ml-0 md:w-1/2 md:pl-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden"
        >
          <Card event={event} expanded={expanded} setExpanded={setExpanded} />
        </motion.div>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden md:block"
          >
            <Card event={event} expanded={expanded} setExpanded={setExpanded} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Card({
  event,
  expanded,
  setExpanded,
}: {
  event: HistoryEvent;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cardBg = isDark
    ? "linear-gradient(145deg, rgba(42,35,22,0.85) 0%, rgba(32,28,18,0.9) 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #faf5ec 100%)";
  const cardShadow = isDark
    ? "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(244,234,216,0.04)"
    : "0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)";
  const borderColor = isDark ? "rgba(201,160,82,0.15)" : "rgba(107,66,38,0.12)";
  const eraColor = isDark ? "#c9a052" : "#6b4226";
  const titleColor = isDark ? "#f4ead8" : "#1c1510";
  const summaryColor = isDark ? "rgba(224,212,188,0.55)" : "#4a3828";
  const btnColor = isDark ? "#dbb760" : "#6b4226";
  const btnHover = isDark ? "#e8c97a" : "#c9a052";
  const detailColor = isDark ? "rgba(224,212,188,0.65)" : "#4a3828";
  const dotBg = isDark ? "#c9a052" : "#c9a052";

  return (
    <div
      className="rounded-xl p-5 backdrop-blur-sm transition-colors duration-300"
      style={{ background: cardBg, boxShadow: cardShadow, border: `1px solid ${borderColor}` }}
    >
      <span className="inline-block text-[0.62rem] tracking-[0.2em] md:text-[0.7rem]" style={{ color: eraColor }}>
        {event.era} · {event.year}
      </span>
      <h3 className="mt-2 text-[1.1rem]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.08em", color: titleColor }}>
        {event.title}
      </h3>
      <p className="mt-2 font-sans text-sm" style={{ color: summaryColor }}>{event.summary}</p>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-1.5 font-sans text-sm transition-colors"
        style={{ color: btnColor }}
        onMouseEnter={(e) => { e.currentTarget.style.color = btnHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = btnColor; }}
        aria-expanded={expanded}
      >
        {expanded ? "收起" : "了解更多"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
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
            <div className="mt-4 space-y-4 border-t pt-4" style={{ borderColor }}>
              <p className="font-sans text-sm leading-relaxed" style={{ color: detailColor }}>
                {event.detail}
              </p>
              {event.highlights.length > 0 && (
                <ul className="space-y-2">
                  {event.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 font-sans text-sm" style={{ color: detailColor }}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: dotBg }} />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
