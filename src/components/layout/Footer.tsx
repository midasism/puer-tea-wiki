"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/history", label: "历史" },
  { href: "/glossary", label: "名词" },
  { href: "/regions", label: "产区" },
  { href: "/mountains", label: "山头" },
];

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const bg = isDark ? "#0e0b08" : "#f0e8d5";
  const titleColor = isDark ? "#f4ead8" : "#3a2618";
  const descColor = isDark ? "rgba(244,234,216,0.35)" : "#8a7060";
  const navLabelColor = isDark ? "rgba(201,160,82,0.5)" : "rgba(107,66,38,0.5)";
  const linkColor = isDark ? "rgba(244,234,216,0.35)" : "#8a7060";
  const linkHoverColor = isDark ? "rgba(244,234,216,0.65)" : "#4a3828";
  const dividerBg = isDark
    ? "linear-gradient(90deg, transparent, rgba(201,160,82,0.2), transparent)"
    : "linear-gradient(90deg, transparent, rgba(107,66,38,0.15), transparent)";
  const disclaimerColor = isDark ? "rgba(244,234,216,0.25)" : "#8a7060";
  const copyrightColor = isDark ? "rgba(244,234,216,0.20)" : "rgba(138,112,96,0.6)";

  return (
    <footer style={{ background: bg }} className="transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h3
              className="text-xl"
              style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.12em", color: titleColor }}
            >
              普洱茶志
            </h3>
            <p className="max-w-sm text-[0.78rem] leading-relaxed" style={{ fontFamily: "var(--font-serif), serif", color: descColor }}>
              云南普洱茶科普百科，探寻普洱茶的渊源、工艺与品鉴之道。
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.35em] md:text-[0.68rem]" style={{ color: navLabelColor }}>
              导航
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.78rem] transition-colors"
                    style={{ fontFamily: "var(--font-serif), serif", letterSpacing: "0.1em", color: linkColor }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 h-px" style={{ background: dividerBg }} />

        <div className="mt-6 text-center">
          <p className="text-[0.7rem] tracking-[0.12em] md:text-[0.78rem]" style={{ fontFamily: "var(--font-serif), serif", color: disclaimerColor }}>
            数据仅供参考，不作为商业或专业决策依据。
          </p>
          <p className="mt-2 text-[0.7rem] tracking-[0.12em] md:text-[0.78rem]" style={{ fontFamily: "var(--font-serif), serif", color: copyrightColor }}>
            &copy; {new Date().getFullYear()} 普洱茶志 &middot; 云南普洱茶科普百科
          </p>
        </div>
      </div>
    </footer>
  );
}
