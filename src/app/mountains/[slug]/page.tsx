import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMountainBySlug, getAllMountains, type Mountain } from "@/lib/mountains";
import { MountainDetailClient } from "@/components/mountains/MountainDetailClient";

const REGION_NAMES: Record<string, string> = {
  xishuangbanna: "西双版纳",
  lincang: "临沧",
  puer: "普洱",
  baoshan: "保山",
};

function getSimilarMountains(
  mountain: Mountain,
  allMountains: Mountain[],
  limit: number = 4
): Mountain[] {
  const others = allMountains.filter((m) => m.id !== mountain.id);
  const scored = others.map((m) => {
    let score = 0;
    if (m.region === mountain.region) score += 2;
    if (m.flavorType === mountain.flavorType) score += 1;
    return { mountain: m, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.mountain);
}

export async function generateStaticParams() {
  const mountains = getAllMountains();
  return mountains.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mountain = getMountainBySlug(slug);
  if (!mountain) return { title: "未找到 | 普洱茶志" };
  return {
    title: `${mountain.name} | ${REGION_NAMES[mountain.region] ?? mountain.region} · 普洱茶志`,
    description: mountain.brief,
  };
}

export default async function MountainDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mountain = getMountainBySlug(slug);

  if (!mountain) notFound();

  const allMountains = getAllMountains();
  const similarMountains = getSimilarMountains(mountain, allMountains);

  return <MountainDetailClient mountain={mountain} similarMountains={similarMountains} />;
}
