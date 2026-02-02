"use client";

import { MENU } from "@/data/menu";

function categoryToId(cat: string): string {
  return cat
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "y")
    .replace(/ñ/g, "n");
}

export default function CategoryTabs() {
  const categories = Array.from(new Set(MENU.map((i) => i.category)));

  function handleClick(cat: string) {
    const id = categoryToId(cat);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="sticky top-14 z-30 border-b border-ui-border bg-white">
      <div className="flex gap-1 overflow-x-auto px-1 py-3 scrollbar-hide md:gap-2 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="btn-transition shrink-0 rounded-lg border border-ui-border bg-white px-4 py-2 text-sm font-medium text-ui-main hover:bg-ui-border active:scale-[0.98] md:px-5"
            onClick={() => handleClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
