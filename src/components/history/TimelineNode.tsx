"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
      {/* Left half - content for even index (desktop) */}
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

      {/* Center - dot (connects to vertical line) */}
      <div className="absolute left-4 top-1/2 flex w-8 -translate-y-1/2 justify-center md:left-1/2 md:-translate-x-1/2 md:translate-y-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative z-10 h-4 w-4 rounded-full border-2 border-tea-green bg-paper dark:border-tea-green-light dark:bg-paper-dark"
        />
      </div>

      {/* Right half - content for odd index (desktop), or all content (mobile) */}
      <div className="ml-12 min-w-0 flex-1 md:ml-0 md:w-1/2 md:pl-8">
        {/* Mobile: always show card on right of line */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden"
        >
          <Card event={event} expanded={expanded} setExpanded={setExpanded} />
        </motion.div>
        {/* Desktop odd (right): card on right */}
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
  return (
    <div className="rounded-xl border border-ink-muted/15 bg-paper p-5 dark:border-ink-muted/20 dark:bg-paper-dark">
      <span className="inline-block rounded-full bg-tea-green px-3 py-1 font-sans text-xs text-white dark:bg-tea-green-light">
        {event.era} · {event.year}
      </span>
      <h3 className="mt-2 font-serif text-lg font-medium text-ink dark:text-foreground">
        {event.title}
      </h3>
      <p className="mt-2 font-sans text-sm text-ink-muted">{event.summary}</p>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-1.5 font-sans text-sm text-tea-green transition-colors hover:text-tea-green-dark dark:text-tea-green-light dark:hover:text-tea-green"
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
            <div className="mt-4 space-y-4 border-t border-ink-muted/15 pt-4 dark:border-ink-muted/20">
              <p className="font-sans text-sm leading-relaxed text-ink-light dark:text-ink-light">
                {event.detail}
              </p>
              {event.highlights.length > 0 && (
                <ul className="space-y-2">
                  {event.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-2 font-sans text-sm text-ink-light dark:text-ink-light"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tea-green dark:bg-amber" />
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
