"use client";

import { type ReactNode } from "react";
import { PageLayout } from "@/components/shared/PageLayout";

const MountainSvg = (
  <svg
    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%] w-full opacity-[0.08]"
    viewBox="0 0 1440 200"
    preserveAspectRatio="none"
  >
    <path
      d="M0,200 L0,140 Q120,80 240,110 Q360,140 480,85 Q600,30 720,65 Q840,100 960,55 Q1080,10 1200,45 Q1320,80 1440,40 L1440,200 Z"
      fill="#2d4a2d"
    />
  </svg>
);

export function MountainsLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout
      number="04"
      label="MOUNTAINS"
      title="山头图鉴"
      subtitle="每座山头都有独特的风味密码"
      decoText="百座茶山"
      decoVertical
      heroExtra={MountainSvg}
    >
      {children}
    </PageLayout>
  );
}
