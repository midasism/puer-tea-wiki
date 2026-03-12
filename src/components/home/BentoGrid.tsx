"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

const markers = [
  {
    id: "history",
    label: "01 · HISTORY",
    title: "历史长河",
    icon: "卷",
    desc: "从东汉到当代，1700 年的茶叶史诗。茶马古道上的商贾足迹，与时光一同沉淀。",
    href: "/history",
    x: 22,
    y: 52,
    pulseDelay: 0,
  },
  {
    id: "glossary",
    label: "02 · GLOSSARY",
    title: "名词百科",
    icon: "字",
    desc: "生茶熟茶？回甘喉韵？拨开术语的雾，一看便懂普洱茶的品鉴语言。",
    href: "/glossary",
    x: 42,
    y: 32,
    pulseDelay: 0.7,
    popupBelow: true,
  },
  {
    id: "regions",
    label: "03 · REGIONS",
    title: "产区地图",
    icon: "图",
    desc: "四大产区，百座茶山的风土密码。版纳、临沧、普洱、保山，各有其味。",
    href: "/regions",
    x: 63,
    y: 48,
    pulseDelay: 1.4,
  },
  {
    id: "mountains",
    label: "04 · MOUNTAINS",
    title: "山头图鉴",
    icon: "峰",
    desc: "老班章到冰岛，每座山头都有独特的风味基因。苦底、甜韵还是蜜香？",
    href: "/mountains",
    x: 82,
    y: 36,
    pulseDelay: 2.1,
    popupLeft: true,
  },
];

function TerrainSVG() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1100 550"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="terrainGlow" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="rgba(60,95,55,0.55)" />
          <stop offset="100%" stopColor="rgba(20,18,12,0)" />
        </radialGradient>
        <filter id="blur3">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="1100" height="550" fill="url(#terrainGlow)" />
      <path
        d="M0,550 Q120,400 200,420 Q320,445 400,380 Q480,320 580,355 Q660,385 740,330 Q830,270 920,310 Q1000,345 1100,290 L1100,550 Z"
        fill="rgba(45,75,40,0.5)"
      />
      <path
        d="M0,550 Q150,450 280,465 Q400,478 500,430 Q600,385 700,405 Q800,425 900,390 Q1000,358 1100,380 L1100,550 Z"
        fill="rgba(35,58,32,0.6)"
      />
      <path d="M50,480 Q200,440 350,455 Q500,470 650,430 Q800,395 950,415 Q1050,428 1100,410" fill="none" stroke="rgba(201,160,82,0.2)" strokeWidth="1.5" />
      <path d="M0,460 Q180,422 320,438 Q480,455 630,415 Q780,380 940,398 Q1040,410 1100,392" fill="none" stroke="rgba(201,160,82,0.13)" strokeWidth="1" />
      <path d="M0,510 Q150,490 300,498 Q480,508 640,478 Q800,450 960,465 Q1040,472 1100,455" fill="none" stroke="rgba(201,160,82,0.13)" strokeWidth="1" />
      <path d="M80,430 Q230,398 380,412 Q540,428 680,390 Q820,355 980,372 Q1060,382 1100,366" fill="none" stroke="rgba(201,160,82,0.2)" strokeWidth="1.5" />
      <path d="M100,408 Q260,374 420,390 Q560,404 720,362 Q860,328 1020,344 Q1080,352 1100,340" fill="none" stroke="rgba(201,160,82,0.13)" strokeWidth="1" />
      <g fill="rgba(201,160,82,0.3)">
        <circle cx="340" cy="180" r="3.5" />
        <circle cx="620" cy="140" r="4" />
        <circle cx="860" cy="170" r="3" />
        <circle cx="180" cy="240" r="2.5" />
        <circle cx="960" cy="130" r="3.5" />
      </g>
      <g stroke="rgba(201,160,82,0.18)" strokeWidth="0.8" fill="none">
        <path d="M310,200 L340,180 L370,200" />
        <path d="M590,158 L620,140 L650,158" />
        <path d="M835,188 L860,170 L885,188" />
      </g>
      <path
        d="M0,350 Q100,330 180,345 Q260,360 340,320 Q420,280 500,295 Q580,310 660,275 Q740,242 840,258 Q920,270 1000,245 Q1060,234 1100,240"
        fill="none" stroke="rgba(130,180,200,0.18)" strokeWidth="2" filter="url(#blur3)"
      />
      <rect x="12" y="12" width="1076" height="526" rx="2" fill="none" stroke="rgba(201,160,82,0.18)" strokeWidth="1" strokeDasharray="6 4" />
    </svg>
  );
}

function MapMarker({
  marker,
  hovered,
  onHover,
  onLeave,
}: {
  marker: (typeof markers)[0];
  hovered: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const dimmed = hovered !== null && hovered !== marker.id;
  const isActive = hovered === marker.id;
  const popupBelow = marker.popupBelow;
  const popupLeft = marker.popupLeft;
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    onHover(marker.id);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      onLeave();
      leaveTimer.current = null;
    }, 500);
  };

  return (
    <div
      className="absolute z-10 transition-opacity duration-300"
      style={{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
        opacity: dimmed ? 0.45 : 1,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={marker.href}
        className="group relative block h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.18]"
      >
        <div
          className="absolute inset-0 rounded-full border-[1.5px] border-[#f5e4a8]/60"
          style={{ animation: `pulseRing 3s ease-out infinite`, animationDelay: `${marker.pulseDelay}s` }}
        />
        <div
          className="absolute -inset-2 rounded-full border-[1.5px] border-[#f5e4a8]/40"
          style={{ animation: `pulseRing 3s ease-out infinite`, animationDelay: `${marker.pulseDelay + 0.6}s` }}
        />
        <div
          className="absolute inset-1.5 flex items-center justify-center rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_42px_rgba(245,228,168,0.9),0_3px_20px_rgba(0,0,0,0.4)]"
          style={{
            background: "radial-gradient(circle, #fffef8 0%, #fff6d5 35%, #f5e4a8 65%, #dbb760 100%)",
            boxShadow: "0 0 32px rgba(245,228,168,0.75), 0 0 12px rgba(245,228,168,0.4), 0 3px 14px rgba(0,0,0,0.35)",
          }}
        >
          <span
            className="text-[1.3rem] font-black leading-none"
            style={{
              fontFamily: "var(--font-brush), serif",
              color: "#3a1c08",
              textShadow: "0 0 6px rgba(255,250,220,0.6), 0 1px 0 rgba(255,255,255,0.35)",
              WebkitTextStroke: "0.3px rgba(60,30,10,0.15)",
            }}
          >
            {marker.icon}
          </span>
        </div>
      </Link>

      {/* Popup card — positioned relative to the outer wrapper, rendered outside the Link so the gap bridge works */}
      <div
        className={`absolute w-[230px] rounded-md border border-[#c9a052]/25 p-5 backdrop-blur-md transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isActive
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        } ${
          popupBelow
            ? "left-1/2 origin-top -translate-x-1/2"
            : "origin-bottom"
        } ${popupLeft ? "left-auto right-[30px]" : popupBelow ? "" : "left-1/2 -translate-x-1/2"}`}
        style={{
          ...(popupBelow
            ? { top: "calc(100% - 30px + 18px)" }
            : { bottom: "calc(100% - 30px + 18px)" }),
          background: "linear-gradient(145deg, rgba(52,42,28,0.92) 0%, rgba(40,32,20,0.95) 100%)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(201,160,82,0.12), inset 0 1px 0 rgba(244,234,216,0.06)",
        }}
      >
        {/* Invisible bridge to connect marker circle and popup */}
        <div
          className="absolute left-0 right-0"
          style={popupBelow ? { top: "-24px", height: "28px" } : { bottom: "-24px", height: "28px" }}
        />
        <Link href={marker.href} className="block">
          <div className="text-[0.62rem] uppercase tracking-[0.3em] text-[#dbb760] md:text-[0.7rem]">
            {marker.label}
          </div>
          <div className="mt-2 text-[1.25rem] tracking-wider text-[#f8f0dc]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.08em", lineHeight: 1.3 }}>
            {marker.title}
          </div>
          <p className="mt-1.5 text-[0.78rem] font-light leading-relaxed text-[#e0d4bc]/65">
            {marker.desc}
          </p>
          <span className="mt-3.5 inline-flex items-center gap-1.5 text-[0.72rem] font-medium tracking-wider text-[#dbb760] md:text-[0.78rem]">
            进入探索 <span className="text-[0.65rem] md:text-[0.72rem]">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export function BentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const eyebrowColor = isDark ? "#c9a052" : "#6b4226";
  const headingColor = isDark ? "#f4ead8" : "#1c1510";
  const dividerBg = isDark
    ? "linear-gradient(90deg, transparent, #c9a052, transparent)"
    : "linear-gradient(90deg, transparent, rgba(107,66,38,0.3), transparent)";
  const vignetteColor = isDark
    ? "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(20,16,10,0.3) 100%)"
    : "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(240,232,213,0.4) 100%)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      {/* Section header */}
      <div className="mb-16 text-center">
        <motion.div
          className="mb-3 text-[0.7rem] uppercase tracking-[0.4em] md:text-[0.78rem]"
          style={{ color: eyebrowColor }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          踏入茶山
        </motion.div>
        <motion.h2
          className="text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-wider"
          style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.1em", color: headingColor }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          开始探索
        </motion.h2>
        <motion.div
          className="mx-auto mt-4 h-px w-16"
          style={{ background: dividerBg }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </div>

      {/* Map area */}
      <div className="relative mx-auto aspect-[16/8] w-full max-w-[1100px]">
        <TerrainSVG />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: vignetteColor }}
        />
        {markers.map((m) => (
          <MapMarker
            key={m.id}
            marker={m}
            hovered={hovered}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </motion.div>
  );
}
