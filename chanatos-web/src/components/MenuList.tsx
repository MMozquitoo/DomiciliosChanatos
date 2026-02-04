"use client";

import { MENU } from "@/data/menu";
import MenuItemRow from "@/components/MenuItemRow";

function categoryToId(cat: string): string {
  return cat
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "y")
    .replace(/ñ/g, "n");
}

const REGANADOS = "Regañados";

function orderedCategories(): string[] {
  const all = Array.from(new Set(MENU.map((i) => i.category)));
  const reg = all.filter((c) => c === REGANADOS);
  const rest = all.filter((c) => c !== REGANADOS);
  return [...rest, ...reg];
}

export default function MenuList() {
  const categories = orderedCategories();

  return (
    <div className="pb-[calc(7rem+env(safe-area-inset-bottom,0px))] lg:pb-8">
      {categories.map((cat) => (
        <section
          key={cat}
          id={categoryToId(cat)}
          className="scroll-mt-24 border-b border-ui-border pt-4 first:pt-2"
        >
          <h2 className="mb-3 text-base font-semibold text-ui-main">{cat}</h2>
          <ul className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {MENU.filter((i) => i.category === cat).map((item) => (
              <li key={item.id} className="list-none">
                <MenuItemRow item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
