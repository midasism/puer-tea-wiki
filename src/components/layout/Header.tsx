"use client";

import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/history", label: "历史" },
  { href: "/glossary", label: "名词" },
  { href: "/regions", label: "产区" },
  { href: "/mountains", label: "山头" },
  { href: "/about", label: "关于" },
];

const darkPages = new Set(["/", "/mountains"]);

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme, mounted } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/";
  const heroMode = isHomePage && !scrolled;
  const isDark = resolvedTheme === "dark";
  const isOnDarkPage = darkPages.has(pathname);
  const usesDarkNav = isDark || isOnDarkPage || heroMode;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const navBg = (() => {
    if (heroMode) return "linear-gradient(to bottom, rgba(18,12,8,0.9) 0%, transparent 100%)";
    if (usesDarkNav) return scrolled ? "rgba(18,12,8,0.92)" : "rgba(18,12,8,0.85)";
    return scrolled ? "rgba(250,245,236,0.95)" : "rgba(250,245,236,0.88)";
  })();

  const borderColor = (() => {
    if (!scrolled || heroMode) return "1px solid transparent";
    return usesDarkNav ? "1px solid rgba(201,160,82,0.1)" : "1px solid rgba(107,66,38,0.1)";
  })();

  const logoColor = usesDarkNav ? "#e8c97a" : "#6b4226";
  const linkColor = (isActive: boolean) => {
    if (isActive) return usesDarkNav ? "#e8c97a" : "#1c1510";
    return usesDarkNav ? "rgba(244,234,216,0.6)" : "#8a7060";
  };
  const linkHoverColor = usesDarkNav ? "#e8c97a" : "#1c1510";
  const activeBarColor = usesDarkNav ? "#c9a052" : "#6b4226";
  const iconColor = usesDarkNav ? "text-[#f4ead8]/50 hover:text-[#e8c97a]" : "text-[#8a7060] hover:text-[#1c1510]";
  const menuIconColor = usesDarkNav ? "text-[#f4ead8]/80" : "text-[#4a3828]";

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          height: 64,
          padding: "0 48px",
          background: navBg,
          backdropFilter: heroMode ? undefined : "blur(16px)",
          borderBottom: borderColor,
        }}
      >
        <Link
          href="/"
          className="transition-colors duration-300"
          style={{ fontFamily: "var(--font-brush), serif", fontSize: "1.35rem", letterSpacing: "0.12em", color: logoColor }}
        >
          普洱茶志
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: linkColor(isActive),
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = linkHoverColor; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = linkColor(false); }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2" style={{ background: activeBarColor }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-full p-2 transition-colors duration-300 ${iconColor} ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
            aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`rounded-full p-2 ${menuIconColor} md:hidden`}
            aria-label="打开菜单"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] backdrop-blur-lg md:hidden"
            style={{ background: isDark ? "rgba(14,11,8,0.95)" : "rgba(250,245,236,0.96)" }}
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className={`absolute right-4 top-4 rounded-full p-2 ${isDark ? "text-[#f4ead8]" : "text-[#1c1510]"}`}
                aria-label="关闭菜单"
              >
                <X className="h-6 w-6" />
              </button>

              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-2xl"
                        style={{
                          fontFamily: "var(--font-brush), serif",
                          letterSpacing: "0.1em",
                          color: isDark
                            ? (isActive ? "#e8c97a" : "#f4ead8")
                            : (isActive ? "#6b4226" : "#4a3828"),
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
