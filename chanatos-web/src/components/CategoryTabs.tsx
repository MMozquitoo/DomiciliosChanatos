"use client";

import { useRef, useState, useEffect } from "react";
import { categoryToId, orderedCategories } from "@/lib/categories";

export default function CategoryTabs() {
  const categories = orderedCategories();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
    );
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [categories.length]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  function handleClick(cat: string) {
    const id = categoryToId(cat);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="sticky top-24 z-[998] border-b border-ui-border bg-white">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="btn-transition hidden shrink-0 rounded-lg border border-ui-border bg-white p-2 text-ui-text hover:bg-ui-border disabled:opacity-40 disabled:pointer-events-none lg:flex"
          aria-label="Desplazar categorías a la izquierda"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto px-1 py-3 scrollbar-hide md:gap-2 md:px-0"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="btn-transition shrink-0 rounded-lg border border-ui-border bg-white px-4 py-2 text-sm font-medium text-ui-text hover:bg-ui-border active:scale-[0.98] md:px-5"
              onClick={() => handleClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="btn-transition hidden shrink-0 rounded-lg border border-ui-border bg-white p-2 text-ui-text hover:bg-ui-border disabled:opacity-40 disabled:pointer-events-none lg:flex"
          aria-label="Desplazar categorías a la derecha"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
