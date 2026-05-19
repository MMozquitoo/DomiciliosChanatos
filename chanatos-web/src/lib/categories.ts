import { MENU } from "@/data/menu";

export function categoryToId(cat: string): string {
  return cat
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "y")
    .replace(/ñ/g, "n");
}

export function orderedCategories(): string[] {
  const tail = "Regañados";
  const all = Array.from(new Set(MENU.map((i) => i.category)));
  return [
    ...all.filter((c) => c !== tail),
    ...all.filter((c) => c === tail),
  ];
}
