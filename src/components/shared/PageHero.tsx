"use client";

import { type ReactNode } from "react";

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

const HERO_BG =
  "linear-gradient(180deg, #0e1a0e 0%, #162516 30%, #1c1510 100%)";

const HERO_RADIAL =
  "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(44,72,34,.35) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 80% 20%, rgba(201,160,82,.06) 0%, transparent 60%)";

interface PageHeroProps {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  decoText: string;
  decoVertical?: boolean;
  extraDecoration?: ReactNode;
}

export function PageHero({
  number,
  label,
  title,
  subtitle,
  decoText,
  decoVertical = false,
  extraDecoration,
}: PageHeroProps) {
  const decoStyle: React.CSSProperties = {
    fontFamily: "var(--font-brush), serif",
    fontSize: decoVertical
      ? "clamp(4rem,8vw,7rem)"
      : "clamp(5rem,9vw,8rem)",
    color: "rgba(201,160,82,0.04)",
    ...(decoVertical && {
      writingMode: "vertical-rl",
      letterSpacing: "0.15em",
      lineHeight: 1.4,
    }),
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "36vh",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "48px",
        background: HERO_BG,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: HERO_RADIAL }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: NOISE_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {extraDecoration}

      <div
        className="pointer-events-none absolute right-[5%] top-[15%] select-none"
        style={decoStyle}
      >
        {decoText}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div
          className="mb-3 flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a052] md:text-[0.75rem]"
          style={{ fontFamily: "var(--font-sans), sans-serif" }}
        >
          <span className="h-px w-8 bg-[#c9a052]/40" />
          {number} · {label}
        </div>
        <h1
          className="text-[clamp(2.2rem,5vw,3.5rem)] text-[#f4ead8]"
          style={{
            fontFamily: "var(--font-brush), serif",
            letterSpacing: "0.08em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          className="mt-3 max-w-xl text-[0.88rem] font-light tracking-wider text-[#f4ead8]/45"
          style={{
            fontFamily: "var(--font-serif), serif",
            letterSpacing: "0.1em",
          }}
        >
          {subtitle}
        </p>
        <div
          className="mt-6 h-px w-20"
          style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }}
        />
      </div>
    </section>
  );
}
