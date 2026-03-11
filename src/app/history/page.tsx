import historyData from "@/data/history.json";
import { HistoryClient } from "@/components/history/HistoryClient";

export const metadata = {
  title: "历史长河 | 普洱茶志",
  description: "一片叶子的千年旅程。从武侯遗种到当代复兴，追溯普洱茶的历史脉络。",
};

interface HistoryEvent {
  id: string;
  era: string;
  year: string;
  title: string;
  summary: string;
  detail: string;
  highlights: string[];
}

export default function HistoryPage() {
  const events = historyData as HistoryEvent[];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-background px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl font-medium text-ink dark:text-foreground md:text-5xl lg:text-6xl">
            历史长河
          </h1>
          <p className="mt-3 font-sans text-lg text-ink-muted md:text-xl">
            一片叶子的千年旅程
          </p>
          <HistoryClient events={events} />
        </div>
      </section>
    </div>
  );
}
