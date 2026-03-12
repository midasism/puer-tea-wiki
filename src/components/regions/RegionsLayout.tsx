"use client";

import { type ReactNode } from "react";
import { PageLayout } from "@/components/shared/PageLayout";

export function RegionsLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout
      number="03"
      label="REGIONS"
      title="产区地图"
      subtitle="四大产区，百座茶山的风土密码"
      decoText="域"
      contentClassName="relative px-4 pb-24 transition-colors duration-500 md:px-6"
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </PageLayout>
  );
}
