import glossaryData from "@/data/glossary.json";
import type { GlossaryItem } from "@/types/glossary";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";

const glossary = glossaryData as GlossaryItem[];

export const metadata = {
  title: "名词百科 | 普洱茶志",
  description:
    "从生茶到老茶，普洱茶的每一个术语都有故事。生茶熟茶、回甘喉韵、古树台地——一看就懂。",
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen">
      {/* Dark Hero (always dark for immersive entry) */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0e1a0e 0%, #1c1510 60%, #3a2618 100%)", minHeight: "36vh", display: "flex", alignItems: "flex-end", paddingBottom: "48px" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(44,72,34,.3) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute right-[8%] top-[20%] select-none" style={{ fontFamily: "var(--font-brush), serif", fontSize: "clamp(5rem,10vw,9rem)", color: "rgba(201,160,82,0.04)" }}>
          辞
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="mb-3 flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a052]">
            <span className="h-px w-8 bg-[#c9a052]/40" />
            02 · GLOSSARY
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] text-[#f4ead8]" style={{ fontFamily: "var(--font-brush), serif", letterSpacing: "0.08em" }}>
            名词百科
          </h1>
          <p className="mt-3 text-[0.88rem] font-light tracking-wider text-[#f4ead8]/45">
            从生茶到老茶，普洱茶的每一个术语都有故事
          </p>
          <div className="mt-6 h-px w-20" style={{ background: "linear-gradient(90deg, #c9a052, transparent)" }} />
        </div>
      </section>

      {/* Content area - follows theme */}
      <section className="relative bg-cream px-6 pb-24 pt-10 transition-colors duration-500 dark:bg-[#1c1510]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")" }} />
        <div className="relative z-10 mx-auto max-w-6xl">
          <GlossaryClient glossary={glossary} />
        </div>
      </section>
    </div>
  );
}
