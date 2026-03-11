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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <header className="mb-12 text-center md:mb-16">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink dark:text-foreground md:text-5xl lg:text-6xl">
            名词百科
          </h1>
          <p className="mt-4 font-sans text-lg text-ink-muted md:text-xl">
            从生茶到老茶，普洱茶的每一个术语都有故事
          </p>
        </header>

        <GlossaryClient glossary={glossary} />
      </div>
    </div>
  );
}
