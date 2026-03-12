"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

const stats = [
  { value: 6, label: "大茶山", suffix: "" },
  { value: 4, label: "大产区", suffix: "" },
  { value: 1700, label: "年历史", suffix: "" },
  { value: 200, label: "知名山头", suffix: "+" },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const dur = value > 100 ? 1800 : 1000;
    const start = performance.now();
    let raf: number;

    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {isInView && count >= value ? suffix : ""}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const sectionBg = isDark
    ? "linear-gradient(180deg, #130f0a 0%, #1a1208 40%, #0e160e 100%)"
    : "linear-gradient(180deg, #f0e8d5 0%, #faf5ec 50%, #f0e8d5 100%)";
  const numberColor = isDark ? "#e8c97a" : "#c9a052";
  const labelColor = isDark ? "rgba(244,234,216,0.38)" : "#8a7060";
  const borderColor = isDark ? "rgba(201,160,82,0.12)" : "rgba(107,66,38,0.12)";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 transition-colors duration-500"
      style={{ background: sectionBg }}
    >
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-wrap justify-center px-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-1 flex-col items-center py-7 text-center"
            style={{
              borderLeft: i === 0 ? "none" : `1px solid ${borderColor}`,
              minWidth: 140,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
          >
            <span className="text-5xl leading-none md:text-6xl" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "-0.01em", color: numberColor }}>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="mt-2 text-[0.73rem] font-light tracking-[0.18em]" style={{ color: labelColor }}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
