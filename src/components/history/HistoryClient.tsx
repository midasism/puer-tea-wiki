"use client";

import { TimelineNode, type HistoryEvent } from "./TimelineNode";
import { useTheme } from "@/components/layout/ThemeProvider";

interface HistoryClientProps {
  events: HistoryEvent[];
}

export function HistoryClient({ events }: HistoryClientProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const lineBg = isDark
    ? "linear-gradient(180deg, rgba(201,160,82,0.3) 0%, rgba(201,160,82,0.08) 100%)"
    : "linear-gradient(180deg, rgba(107,66,38,0.2) 0%, rgba(107,66,38,0.05) 100%)";

  return (
    <div className="relative mt-8">
      <div className="absolute left-4 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-px" style={{ background: lineBg }} />
      <div className="relative space-y-0">
        {events.map((event, index) => (
          <TimelineNode key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
