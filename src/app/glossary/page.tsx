import glossaryData from "@/data/glossary.json";
import type { GlossaryItem } from "@/types/glossary";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";
import { GlossaryLayout } from "@/components/glossary/GlossaryLayout";

const glossary = glossaryData as GlossaryItem[];

export const metadata = {
  title: "名词百科 | 普洱茶志",
  description:
    "从生茶到老茶，普洱茶的每一个术语都有故事。生茶熟茶、回甘喉韵、古树台地——一看就懂。",
};

export default function GlossaryPage() {
  return (
    <GlossaryLayout>
      <GlossaryClient glossary={glossary} />
    </GlossaryLayout>
  );
}
