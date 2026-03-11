"use client";

import { Leaf, Menu, X, Sun, Moon } from "lucide-react";
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

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-300 md:px-6 lg:px-8 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm dark:bg-background/90"
            : "bg-background/80 backdrop-blur-sm dark:bg-background/70"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground"
        >
          <Leaf className="h-6 w-6 text-tea-green" strokeWidth={1.5} />
          普洱茶志
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-tea-green dark:text-tea-green-light"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-tea-green dark:bg-tea-green-light" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground"
            aria-label={resolvedTheme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2 text-foreground md:hidden"
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
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-foreground"
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
                        className={`block font-serif text-2xl font-medium ${
                          isActive
                            ? "text-tea-green dark:text-tea-green-light"
                            : "text-foreground"
                        }`}
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
