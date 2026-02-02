"use client";

import { useState } from "react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cartStore";
import { formatCOP } from "@/lib/money";
import AddToCartModal from "@/components/AddToCartModal";

type Props = {
  item: MenuItem;
};

export default function MenuItemRow({ item }: Props) {
  const addLine = useCart((s) => s.addLine);
  const [showModal, setShowModal] = useState(false);

  const canAdd =
    item.available &&
    (item.price != null || (item.basePrice != null && item.basePrice > 0));

  function handleAdd(
    modifiers: import("@/lib/cartStore").CartLineModifiers | undefined,
  ) {
    addLine(item.id, modifiers);
    setShowModal(false);
  }

  return (
    <>
      <div className="flex items-stretch gap-3 border-b border-ui-border py-3 last:border-b-0">
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-ui-main">{item.name}</div>
          {item.description ? (
            <div className="mt-0.5 line-clamp-2 text-[13px] text-ui-muted">
              {item.description}
            </div>
          ) : null}
          <div className="mt-1.5 font-semibold text-ui-main">
            {item.price != null
              ? formatCOP(item.price)
              : item.basePrice != null && item.basePrice > 0
              ? formatCOP(item.basePrice)
              : "Precio por confirmar"}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div
            className="h-[72px] w-[72px] shrink-0 rounded-lg bg-ui-border md:h-[80px] md:w-[80px]"
            aria-hidden
          />
          <button
            type="button"
            className={
              canAdd
                ? "btn-transition shrink-0 rounded-lg border border-ui-primary bg-ui-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90 active:scale-95"
                : "flex shrink-0 items-center justify-center rounded-lg border border-ui-border bg-white px-3 py-2 text-xs font-medium text-ui-muted cursor-not-allowed"
            }
            onClick={() => canAdd && setShowModal(true)}
            disabled={!canAdd}
            aria-label={canAdd ? `Agregar ${item.name}` : "No disponible"}
          >
            {canAdd ? "Agregar" : "No disponible"}
          </button>
        </div>
      </div>

      {showModal && (
        <AddToCartModal
          item={item}
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
