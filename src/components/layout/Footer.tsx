import Link from "next/link";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/history", label: "历史" },
  { href: "/glossary", label: "名词" },
  { href: "/regions", label: "产区" },
  { href: "/mountains", label: "山头" },
];

export default function Footer() {
  return (
    <footer className="bg-tea-green-dark text-paper-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-semibold text-paper">
              普洱茶志
            </h3>
            <p className="max-w-sm text-sm text-paper-dark/90">
              云南普洱茶科普百科，探寻普洱茶的渊源、工艺与品鉴之道。
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-paper-dark/70">
              导航
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper-dark/90 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-tea-green/30 pt-6 text-xs text-paper-dark/60">
          数据仅供参考，不作为商业或专业决策依据。
        </p>
        <p className="mt-2 text-xs text-paper-dark/50">
          © {new Date().getFullYear()} 普洱茶志 · 云南普洱茶科普百科
        </p>
      </div>
    </footer>
  );
}
