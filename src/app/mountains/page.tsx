import { MountainsClient } from "@/components/mountains/MountainsClient";
import { getAllMountains } from "@/lib/mountains";

export const metadata = {
  title: "山头图鉴 | 普洱茶志",
  description:
    "每座山头都有独特的风味密码。探索云南普洱茶各大名山的风土、口感与特色。",
};

export default function MountainsPage() {
  const mountains = getAllMountains();

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-background px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl font-medium text-ink dark:text-foreground md:text-5xl lg:text-6xl">
            山头图鉴
          </h1>
          <p className="mt-3 font-sans text-lg text-ink-muted md:text-xl">
            每座山头都有独特的风味密码
          </p>
          <MountainsClient mountains={mountains} />
        </div>
      </section>
    </div>
  );
}
