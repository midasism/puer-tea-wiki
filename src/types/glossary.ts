export type GlossaryCategory =
  | "basics"
  | "tree"
  | "craft"
  | "tasting"
  | "form"
  | "aging";

export interface GlossaryItem {
  id: string;
  term: string;
  category: GlossaryCategory;
  brief: string;
  detail: string;
  related: string[];
}

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  basics: "基础概念",
  tree: "茶树类型",
  craft: "工艺术语",
  tasting: "品饮术语",
  form: "形态分类",
  aging: "年份概念",
};

export const CATEGORY_BADGE_COLORS: Record<GlossaryCategory, string> = {
  basics: "tea-green",
  tree: "amber",
  craft: "cinnabar",
  tasting: "tea-green-light",
  form: "amber-light",
  aging: "ink-muted",
};
