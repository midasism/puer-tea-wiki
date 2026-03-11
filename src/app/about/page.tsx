import Link from "next/link";

export const metadata = {
  title: "关于 | 普洱茶志",
  description: "关于普洱茶志项目的介绍、数据来源与免责声明。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <h1 className="font-serif text-4xl font-medium text-ink dark:text-foreground md:text-5xl">
          关于普洱茶志
        </h1>

        <div className="mt-10 space-y-8 font-sans text-ink-light dark:text-ink-light">
          <section>
            <h2 className="font-serif text-xl font-medium text-ink dark:text-foreground">
              项目介绍
            </h2>
            <p className="mt-3 leading-relaxed">
              普洱茶志是一个专注于云南普洱茶的科普百科网站。我们致力于系统梳理普洱茶的历史渊源、制作工艺、产区山头、品鉴知识及专业名词释义，帮助茶友和爱好者全面了解普洱茶的深厚文化。
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-ink dark:text-foreground">
              数据来源
            </h2>
            <p className="mt-3 leading-relaxed">
              本网站的山头信息、历史事件、名词解释等内容整理自公开的普洱茶文献、地方志、茶学著作及行业资料。数据仅供参考学习，不构成专业品鉴或商业建议。
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-ink dark:text-foreground">
              免责声明
            </h2>
            <p className="mt-3 leading-relaxed">
              本站内容仅供茶文化学习与交流使用。普洱茶市场行情、价格区间等信息可能随时变化，请以实际情况为准。品鉴感受因人而异，本网站不对任何基于本站内容做出的购茶或收藏决策负责。
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center font-sans text-sm text-tea-green transition-colors hover:text-tea-green-dark dark:text-tea-green-light dark:hover:text-tea-green"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
