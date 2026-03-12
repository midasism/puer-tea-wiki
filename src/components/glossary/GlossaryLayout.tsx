"use client";

import { type ReactNode } from "react";
import { PageLayout } from "@/components/shared/PageLayout";

export function GlossaryLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout
      number="02"
      label="GLOSSARY"
      title="名词百科"
      subtitle="从生茶到老茶，普洱茶的每一个术语都有故事"
      decoText="辞"
      contentClassName="relative px-6 pb-24 pt-10 transition-colors duration-500"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </PageLayout>
  );
}
