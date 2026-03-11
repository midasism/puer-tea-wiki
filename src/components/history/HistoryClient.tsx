"use client";

import { TimelineNode, type HistoryEvent } from "./TimelineNode";

interface HistoryClientProps {
  events: HistoryEvent[];
}

export function HistoryClient({ events }: HistoryClientProps) {
  return (
    <div className="relative mt-8">
      {/* Center line - vertical */}
      <div className="absolute left-4 top-0 bottom-0 w-px border-l border-ink-muted/20 md:left-1/2 md:-translate-x-px" />

      <div className="relative space-y-0">
        {events.map((event, index) => (
          <TimelineNode key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
