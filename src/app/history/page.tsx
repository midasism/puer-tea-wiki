import historyData from "@/data/history.json";
import { HistoryClient } from "@/components/history/HistoryClient";
import { HistoryLayout } from "@/components/history/HistoryLayout";

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
    <HistoryLayout>
      <HistoryClient events={events} />
    </HistoryLayout>
  );
}
