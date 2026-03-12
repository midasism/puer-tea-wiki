"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import type { ViewType } from "@/data/mountains-config";

const MOUNTAIN_LAYERS = [
  { fill: "#0c1a0c", depth: 0.05, d: "M0,200 Q80,160 160,175 Q280,195 400,150 Q520,105 640,130 Q760,155 880,110 Q1000,65 1120,95 Q1240,125 1360,80 L1440,60 L1440,200Z" },
  { fill: "#142214", depth: 0.09, d: "M0,200 Q100,140 200,160 Q340,185 480,125 Q600,80 720,105 Q840,130 960,85 Q1100,40 1240,70 Q1360,100 1440,55 L1440,200Z" },
  { fill: "#1a2e1a", depth: 0.13, d: "M0,200 Q120,155 240,170 Q380,190 520,140 Q640,100 760,120 Q880,140 1000,95 Q1140,50 1280,80 Q1400,110 1440,75 L1440,200Z" },
  { fill: "#243523", depth: 0.18, d: "M0,200 Q140,170 280,180 Q420,195 560,155 Q680,120 800,140 Q920,160 1040,115 Q1180,70 1320,100 Q1440,130 1440,95 L1440,200Z" },
];

const VIEW_TEXT: Record<ViewType, { eyebrow: string; title: string; highlight: string }> = {
  A: { eyebrow: "MOUNTAIN FLAVOR ATLAS", title: "山头", highlight: "星云" },
  B: { eyebrow: "MOUNTAIN ALTITUDE PROFILE", title: "百", highlight: "山剖面" },
};

interface MountainsHeroProps {
  view: ViewType;
}

export function MountainsHero({ view }: MountainsHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const text = VIEW_TEXT[view];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
      rafRef.current = 0;
    });
  }, []);

  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`,
      size: 1 + Math.random() * 1.5,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }))
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ minHeight: "70vh", background: "linear-gradient(180deg, #0c1408 0%, #0d0f08 60%, #0e1808 100%)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: "#f4ead8",
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
              willChange: "opacity, transform",
            }}
          />
        ))}
      </div>

      {/* Mountain layers with parallax */}
      <div className="pointer-events-none absolute inset-0">
        {MOUNTAIN_LAYERS.map((layer, i) => {
          const dx = (mousePos.x - 0.5) * layer.depth * 60;
          const dy = (mousePos.y - 0.5) * layer.depth * 30;
          return (
            <svg
              key={i}
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
              style={{
                height: `${30 + i * 8}%`,
                transform: `translateX(${dx}px) translateY(${dy}px)`,
                transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <path d={layer.d} fill={layer.fill} />
            </svg>
          );
        })}
      </div>

      {/* Mist layers */}
      <div
        className="fog-drift pointer-events-none absolute"
        style={{
          bottom: "15%", left: "5%", width: "40%", height: "110px",
          background: "radial-gradient(ellipse, rgba(235,228,210,0.06), transparent 70%)",
          filter: "blur(18px)", borderRadius: "50%",
          animationDuration: "18s",
        }}
      />
      <div
        className="fog-drift pointer-events-none absolute"
        style={{
          bottom: "25%", right: "10%", width: "35%", height: "90px",
          background: "radial-gradient(ellipse, rgba(235,228,210,0.04), transparent 70%)",
          filter: "blur(28px)", borderRadius: "50%",
          animationDuration: "26s", animationDelay: "5s",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 25% 50%, rgba(44,74,34,.35), transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 85% 20%, rgba(201,160,82,.05), transparent 60%)" }} />

      {/* Content */}
      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div
          key={`eyebrow-${view}`}
          className="mb-5 flex items-center gap-3 text-[0.67rem] tracking-[0.42em] uppercase"
          style={{ color: "#c9a052", animation: "fadeUp 0.5s ease-out both" }}
        >
          <span className="h-px w-8 bg-[#c9a052]/40" />
          {text.eyebrow}
          <span className="h-px w-8 bg-[#c9a052]/40" />
        </div>
        <h1
          key={`title-${view}`}
          style={{
            fontFamily: "var(--font-brush), serif",
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            color: "#f4ead8",
            letterSpacing: "0.09em",
            lineHeight: 1.2,
            animation: "fadeUp 0.5s ease-out 0.1s both",
          }}
        >
          {text.title}<span style={{ color: "#e8c97a" }}>{text.highlight}</span>
        </h1>
        <p
          className="mt-4 text-[0.86rem] font-light tracking-wider"
          style={{ color: "rgba(244,234,216,0.4)", letterSpacing: "0.1em", animation: "fadeUp 0.5s ease-out 0.2s both" }}
        >
          每座山头都有独特的风味密码
        </p>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          style={{ animation: "fadeUp 0.5s ease-out 0.4s both" }}
        >
          <span className="text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "rgba(201,160,82,0.3)", fontFamily: "var(--font-mono, monospace)" }}>
            SCROLL TO EXPLORE
          </span>
          <div className="h-6 w-px" style={{ background: "linear-gradient(to bottom, rgba(201,160,82,0.3), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
