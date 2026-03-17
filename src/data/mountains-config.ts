import type { Mountain } from "@/lib/mountains";

export type FlavorType = "霸气型" | "甜韵型" | "柔和型" | "花香型" | "均衡型";
export type ViewType = "A" | "B" | "Tree";
export type RegionId = "xishuangbanna" | "lincang" | "puer" | "baoshan";

export interface TypeConfig {
  color: string;
  glow: string;
  bg: string;
  label: string;
}

export interface RegionConfig {
  name: string;
  color: string;
}

export const TYPE_CONFIG: Record<FlavorType, TypeConfig> = {
  霸气型: { color: "#e05a3a", glow: "rgba(224,90,58,.45)", bg: "rgba(224,90,58,.08)", label: "BOLD" },
  甜韵型: { color: "#e8c97a", glow: "rgba(232,201,122,.45)", bg: "rgba(232,201,122,.08)", label: "SWEET" },
  柔和型: { color: "#7ab8e8", glow: "rgba(122,184,232,.45)", bg: "rgba(122,184,232,.08)", label: "SOFT" },
  花香型: { color: "#c47ae8", glow: "rgba(196,122,232,.45)", bg: "rgba(196,122,232,.08)", label: "FLORAL" },
  均衡型: { color: "#7ae898", glow: "rgba(122,232,152,.45)", bg: "rgba(122,232,152,.08)", label: "BALANCED" },
};

export const REGION_CONFIG: Record<RegionId, RegionConfig> = {
  xishuangbanna: { name: "西双版纳", color: "#c9a052" },
  lincang: { name: "临沧", color: "#7ab8e8" },
  puer: { name: "普洱", color: "#7ae898" },
  baoshan: { name: "保山", color: "#e8a07a" },
};

export interface MountainVizData {
  id: string;
  name: string;
  region: RegionId;
  sub: string;
  altitude: number;
  type: FlavorType;
  flavor: [number, number, number, number, number]; // [苦, 甜, 香, 厚, 陈] 0–100
  rating: number;
  desc: string;
  tags: string[];
  brief: string;
}

function parseAltitude(alt: string): number {
  const match = alt.match(/(\d+)/);
  if (!match) return 1500;
  const nums = alt.match(/\d+/g)?.map(Number) ?? [1500];
  return nums.length >= 2 ? Math.round((nums[0] + nums[1]) / 2) : nums[0];
}

function convertFlavor(m: Mountain): [number, number, number, number, number] {
  const f = m.flavor;
  const bitter = Math.round(f.bitter * 10);
  const sweet = Math.round(f.sweet * 10);
  const aroma = Math.round(f.aroma * 10);
  const thick = Math.round(((f.chaqi + f.astringent) / 2) * 10);
  const aged = Math.round(f.huigan * 10);
  return [bitter, sweet, aroma, thick, aged];
}

export function toVizData(m: Mountain): MountainVizData {
  return {
    id: m.id,
    name: m.name,
    region: m.region as RegionId,
    sub: m.subRegion,
    altitude: parseAltitude(m.altitude),
    type: (m.flavorType || "均衡型") as FlavorType,
    flavor: convertFlavor(m),
    rating: m.fame,
    desc: m.brief,
    tags: m.tags,
    brief: m.brief,
  };
}

export const FLAVOR_LABELS = ["苦", "甜", "香", "厚", "陈"] as const;

export const ALT_MIN = 600;
export const ALT_MAX = 2800;
