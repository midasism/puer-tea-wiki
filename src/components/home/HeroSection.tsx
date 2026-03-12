"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 0.8,
        top: Math.random() * 65,
        left: Math.random() * 100,
        dur: 2 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-[#f4ead8]/60"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animation: `twinkle ${s.dur}s ease-in-out infinite alternate`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function MountainLayers() {
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const depths = [0.025, 0.055, 0.09, 0.13];
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      layersRef.current.forEach((el, i) => {
        if (!el) return;
        const d = depths[i];
        el.style.transform = `translate(${dx * d * 30}px, ${dy * d * 20}px)`;
      });
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  const layers = [
    { gradient: ["#0c1a0c", "#0a1208"], path: "M0,420 L0,320 Q80,270 160,300 Q220,320 280,260 Q340,200 420,240 Q480,270 540,210 Q600,150 680,180 Q740,200 800,155 Q870,110 960,145 Q1030,170 1100,130 Q1170,90 1260,120 Q1340,145 1440,100 L1440,420 Z", viewBox: "0 0 1440 420" },
    { gradient: ["#111e11", "#0d170d"], path: "M0,380 L0,310 Q60,280 120,295 Q200,315 260,270 Q320,225 400,255 Q450,275 520,235 Q590,195 650,215 Q720,240 800,205 Q870,175 940,200 Q1010,225 1080,195 Q1160,160 1240,185 Q1340,215 1440,180 L1440,380 Z", viewBox: "0 0 1440 380", opacity: 0.9 },
    { gradient: ["#182a18", "#131f12"], path: "M0,340 L0,290 Q70,265 140,278 Q200,288 260,255 Q330,218 400,240 Q460,258 530,228 Q600,198 670,215 Q740,232 820,208 Q900,183 980,200 Q1060,217 1140,195 Q1220,170 1320,192 Q1380,205 1440,185 L1440,340 Z", viewBox: "0 0 1440 340" },
    { gradient: ["#1e3520", "#182b1a"], path: "M0,300 L0,255 Q80,238 160,248 Q230,257 300,232 Q370,207 450,225 Q510,238 580,216 Q650,193 720,208 Q800,226 880,208 Q950,192 1020,205 Q1100,220 1180,200 Q1270,177 1360,195 Q1400,204 1440,190 L1440,300 Z", viewBox: "0 0 1440 300" },
  ];

  return (
    <>
      {layers.map((l, i) => (
        <div
          key={i}
          ref={(el) => { layersRef.current[i] = el; }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 will-change-transform"
        >
          <svg viewBox={l.viewBox} preserveAspectRatio="none" className="block w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`mtn-g${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={l.gradient[0]} />
                <stop offset="100%" stopColor={l.gradient[1]} />
              </linearGradient>
            </defs>
            <path d={l.path} fill={`url(#mtn-g${i})`} opacity={l.opacity ?? 1} />
          </svg>
        </div>
      ))}
    </>
  );
}

function FogLayers() {
  const fogs = [
    { bottom: "24vh", dur: 22, delay: 0, height: 180 },
    { bottom: "19vh", dur: 28, delay: 4, height: 120 },
    { bottom: "15vh", dur: 19, delay: 10, height: 90 },
  ];
  return (
    <>
      {fogs.map((f, i) => (
        <div
          key={i}
          className="fog-drift pointer-events-none absolute"
          style={{
            bottom: f.bottom,
            left: "-20%",
            width: "140%",
            height: f.height,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(220,215,200,0.5) 15%, rgba(210,205,190,0.65) 50%, rgba(220,215,200,0.5) 85%, transparent 100%)",
            borderRadius: "50%",
            filter: "blur(25px)",
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </>
  );
}

export function HeroSection() {
  const scrollToExplore = () => {
    const section = document.getElementById("explore-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0e1a0e 0%, #162516 18%, #1f3520 38%, #2a4028 58%, #1e2e1a 78%, #130f0a 100%)",
      }}
    >
      <Stars />
      <MountainLayers />
      <FogLayers />

      <div className="pointer-events-none relative z-20 flex flex-col items-center pb-[18vh] text-center">
        <motion.div
          className="mb-5 border border-[#c9a052]/30 px-5 py-1.5 text-[0.7rem] uppercase tracking-[0.35em] text-[#c9a052]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          云南普洱茶科普百科
        </motion.div>

        <motion.h1
          className="text-[clamp(2.8rem,6.5vw,5.2rem)] leading-[1.15] tracking-wider text-[#f4ead8]"
          style={{ fontFamily: "var(--font-brush), serif", textShadow: "0 2px 40px rgba(0,0,0,0.6)", letterSpacing: "0.06em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          一片叶子的<span className="text-[#e8c97a]">千年旅程</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-[0.92rem] font-light tracking-wider text-[#f4ead8]/55"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          探索云南普洱茶的历史、产区与风味
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={scrollToExplore}
        className="pointer-events-auto absolute bottom-[calc(20vh+20px)] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        aria-label="向下滚动"
      >
        <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#c9a052]/50">
          探索
        </span>
        <div
          className="h-10 w-px"
          style={{
            background: "linear-gradient(to bottom, rgba(201,160,82,0.5), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </motion.button>
    </section>
  );
}
