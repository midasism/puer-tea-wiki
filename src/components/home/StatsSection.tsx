"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 6, label: "大茶山", suffix: "" },
  { value: 4, label: "大产区", suffix: "" },
  { value: 1700, label: "年历史", suffix: "+" },
  { value: 100, label: "知名山头", suffix: "+" },
];

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = Math.max(1200, value * 0.8);
    const steps = Math.min(60, value);
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {count}
      {isInView && count >= value ? suffix : ""}
    </motion.span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      {/* Subtle ink wash background */}
      <div
        className="ink-wash pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <span className="font-serif text-5xl font-medium text-tea-green md:text-7xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-2 font-sans text-sm text-ink-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
