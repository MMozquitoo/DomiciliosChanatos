import { MENU } from "@/data/menu";

export function categoryToId(cat: string): string {
  return cat
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "y")
    .replace(/ñ/g, "n");
}

export function orderedCategories(): string[] {
  return Array.from(new Set(MENU.map((i) => i.category)));
}
