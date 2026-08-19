"use client";

import { useState } from "react";
import { MENU } from "@/data/menu";
import { useCart } from "@/lib/cartStore";
import { formatCOP } from "@/lib/money";
import AddToCartModal from "@/components/AddToCartModal";

const TOP_IDS = [
  "hamburguesa-chanata",
  "papa-loka",
  "hamburguesa-doble-carne",
  "sandwich-pollo",
];

export default function ProductosTop() {
  const addLine = useCart((s) => s.addLine);
  const items = TOP_IDS.map((id) => MENU.find((i) => i.id === id)).filter(
    (i): i is (typeof MENU)[number] => i != null,
  );
  const [openId, setOpenId] = useState<string | null>(null);
  const openItem = items.find((i) => i.id === openId);

  return (
    <>
      <section
        className="mb-6 border-b border-ui-border pb-6"
        aria-labelledby="productos-top-title"
      >
        <h2
          id="productos-top-title"
          className="mb-4 text-lg font-semibold text-ui-text"
        >
          Productos top
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {items.map((item) => {
            const canAdd =
              item.available &&
              (item.price != null ||
                (item.basePrice != null && item.basePrice > 0));
            const price =
              item.price ??
              (item.basePrice != null && item.basePrice > 0
                ? item.basePrice
                : null);
            return (
              <div
                key={item.id}
                className="flex w-[180px] shrink-0 flex-col rounded-xl border border-ui-border bg-white p-4 shadow-sm"
              >
                <div className="min-h-[80px] rounded-lg bg-ui-border" aria-hidden />
                <div className="mt-3 font-semibold text-ui-text">
                  {item.name}
                </div>
                <div className="mt-1 text-sm text-ui-muted">
                  {price != null ? formatCOP(price) : "Precio por confirmar"}
                </div>
                <button
                  type="button"
                  className="btn-transition mt-3 flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full bg-ui-primary text-lg font-medium text-gray-900 hover:opacity-90 active:scale-95 disabled:opacity-50"
                  onClick={() => canAdd && setOpenId(item.id)}
                  disabled={!canAdd}
                  aria-label={canAdd ? `Agregar ${item.name}` : "No disponible"}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {openItem && (
        <AddToCartModal
          item={openItem}
          onAdd={(modifiers) => {
            addLine(openItem.id, modifiers);
            setOpenId(null);
          }}
          onClose={() => setOpenId(null)}
        />
      )}
    </>
  );
}
