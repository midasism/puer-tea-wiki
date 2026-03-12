"use client";

import { type ReactNode } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { PageHero } from "./PageHero";

interface PageLayoutProps {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  decoText: string;
  decoVertical?: boolean;
  heroExtra?: ReactNode;
  contentClassName?: string;
  children: ReactNode;
}

export function PageLayout({
  number,
  label,
  title,
  subtitle,
  decoText,
  decoVertical,
  heroExtra,
  contentClassName = "relative px-4 pb-24 transition-colors duration-500 md:px-6",
  children,
}: PageLayoutProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ background: isDark ? "#1c1510" : "#f5efe3" }}
    >
      <PageHero
        number={number}
        label={label}
        title={title}
        subtitle={subtitle}
        decoText={decoText}
        decoVertical={decoVertical}
        extraDecoration={heroExtra}
      />

      <section className={contentClassName}>
        {children}
      </section>
    </div>
  );
}
