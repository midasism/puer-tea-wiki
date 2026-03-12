import Link from "next/link";

export const metadata = {
  title: "关于 | 普洱茶志",
  description: "关于普洱茶志项目的介绍、数据来源与免责声明。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Dark Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0e1a0e 0%, #1c1510 60%)", minHeight: "36vh", display: "flex", alignItems: "flex-end", paddingBottom: "48px" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(44,72,34,.2) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute right-[8%] top-[25%] select-none" style={{ fontFamily: "var(--font-brush), serif", fontSize: "clamp(6rem,12vw,10rem)", color: "rgba(201,160,82,0.03)" }}>
          茶
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="mb-3 flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a052] md:text-[0.75rem]">
            <span className="h-px w-8 bg-[#c9a052]/40" />
            ABOUT
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] text-[#f4ead8]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.08em" }}>
            关于普洱茶志
          </h1>
          <p className="mt-3 text-[0.88rem] font-light tracking-wider text-[#f4ead8]/40">
            沉浸式探索云南普洱茶的深厚文化
          </p>
          <div className="mt-6 h-px w-20" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
        </div>
      </section>

      {/* Content area - follows theme */}
      <section className="relative bg-cream px-6 pb-24 pt-16 transition-colors duration-500 dark:bg-[#1c1510]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="space-y-12">
            <section>
              <h2 className="text-[1.4rem] text-ink" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.06em" }}>
                项目介绍
              </h2>
              <div className="mt-2 h-px w-12" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
              <p className="mt-5 text-[0.95rem] leading-[2] text-ink-light" style={{ fontFamily: "var(--font-serif), serif" }}>
                普洱茶志是一个专注于云南普洱茶的科普百科网站。我们致力于系统梳理普洱茶的历史渊源、制作工艺、产区山头、品鉴知识及专业名词释义，帮助茶友和爱好者全面了解普洱茶的深厚文化。
              </p>
            </section>

            <div className="mx-auto h-px w-24" style={{ background: "linear-gradient(90deg, transparent, #c9a052, transparent)", opacity: 0.4 }} />

            <section>
              <h2 className="text-[1.4rem] text-ink" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.06em" }}>
                数据来源
              </h2>
              <div className="mt-2 h-px w-12" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
              <p className="mt-5 text-[0.95rem] leading-[2] text-ink-light" style={{ fontFamily: "var(--font-serif), serif" }}>
                本网站的山头信息、历史事件、名词解释等内容整理自公开的普洱茶文献、地方志、茶学著作及行业资料。数据仅供参考学习，不构成专业品鉴或商业建议。
              </p>
            </section>

            <div className="mx-auto h-px w-24" style={{ background: "linear-gradient(90deg, transparent, #c9a052, transparent)", opacity: 0.4 }} />

            <section>
              <h2 className="text-[1.4rem] text-ink" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.06em" }}>
                免责声明
              </h2>
              <div className="mt-2 h-px w-12" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
              <div className="mt-5 rounded-sm border-l-[3px] border-[#c9a052] bg-[#c9a052]/5 py-4 pl-5 pr-4">
                <p className="text-[0.88rem] italic leading-[1.8] text-ink-light" style={{ fontFamily: "var(--font-serif), serif" }}>
                  本站内容仅供茶文化学习与交流使用。普洱茶市场行情、价格区间等信息可能随时变化，请以实际情况为准。品鉴感受因人而异，本网站不对任何基于本站内容做出的购茶或收藏决策负责。
                </p>
              </div>
            </section>
          </div>

          <div className="mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.82rem] tracking-wider text-gold transition-colors hover:text-bark"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              &larr; 返回首页
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
