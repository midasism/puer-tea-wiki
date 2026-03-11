import fs from "fs";
import path from "path";

export interface MountainFlavor {
  bitter: number;
  astringent: number;
  sweet: number;
  aroma: number;
  huigan: number;
  chaqi: number;
}

export interface Mountain {
  id: string;
  name: string;
  region: string;
  subRegion: string;
  altitude: string;
  treeType: string;
  fame: number;
  priceRange: string;
  flavor: MountainFlavor;
  flavorType: string;
  description: string;
  brief: string;
  villages: string[];
  tags: string[];
}

const MOUNTAINS_DIR = path.join(process.cwd(), "src/data/mountains");

export function getAllMountains(): Mountain[] {
  const files = fs.readdirSync(MOUNTAINS_DIR);
  const mountains: Mountain[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const filePath = path.join(MOUNTAINS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    try {
      const data = JSON.parse(content) as Mountain;
      mountains.push(data);
    } catch {
      // Skip invalid JSON
    }
  }

  return mountains;
}

export function getMountainBySlug(slug: string): Mountain | null {
  const filePath = path.join(MOUNTAINS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(content) as Mountain;
  } catch {
    return null;
  }
}
