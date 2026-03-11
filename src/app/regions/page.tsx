import regionsData from "@/data/regions.json";
import { RegionsClient } from "@/components/regions/RegionsClient";

export const metadata = {
  title: "产区地图 | 普洱茶志",
  description:
    "四大产区，百座茶山的风土密码。探索云南普洱茶的西双版纳、临沧、普洱、保山四大产区。",
};

export default function RegionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-2">
            <h1 className="font-serif text-4xl font-medium text-ink dark:text-foreground md:text-5xl lg:text-6xl">
              产区地图
            </h1>
            <p className="mt-3 max-w-xl font-sans text-lg text-ink-muted md:text-xl">
              四大产区，百座茶山的风土密码
            </p>
          </header>
          <RegionsClient regions={regionsData} />
        </div>
      </section>
    </div>
  );
}
