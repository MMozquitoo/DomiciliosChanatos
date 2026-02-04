"use client";

import { useState } from "react";
import type { MenuItem } from "@/data/menu";
import { BEBIDAS } from "@/data/menu";
import type { CartLineModifiers } from "@/lib/cartStore";
import { formatCOP } from "@/lib/money";

const ADDITIONS_OPTIONS = [
  "Bacon",
  "Queso",
  "Extra carne",
  "Extra pollo",
] as const;

const PAPAS_ADDON_HAMBURGER = 4000;
const PAPAS_ADDON_OTHER = 5000;
const ADDITION_PRICE = 1000;

const isHamburger = (item: MenuItem) => item.category === "Hamburguesas";

type Props = {
  item: MenuItem;
  onAdd: (modifiers?: CartLineModifiers) => void;
  onClose: () => void;
};

export default function AddToCartModal({ item, onAdd, onClose }: Props) {
  const [addPapas, setAddPapas] = useState(() => isHamburger(item));
  const [drinkId, setDrinkId] = useState<string | null>(null);
  const [additions, setAdditions] = useState<string[]>([]);

  function toggleAddition(name: string) {
    setAdditions((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name],
    );
  }

  function handleAdd() {
    // Una sola línea del producto principal con modifiers (nunca agregar línea extra de Papas).
    const modifiers: CartLineModifiers = {
      addPapas: addPapas || undefined,
      drinkId: drinkId ?? undefined,
      additions: additions.length > 0 ? [...additions] : undefined,
    };
    onAdd(modifiers);
    onClose();
  }

  return (
    <>
      <button
        type="button"
        className="drawer-overlay fixed inset-0 z-[1000] bg-black/70 md:bg-black/60"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div
        className="drawer-panel fixed inset-0 z-[1001] flex flex-col overflow-hidden bg-white md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[90vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border md:border-ui-border md:shadow-xl"
        role="dialog"
        aria-labelledby="personaliza-title"
      >
        <div className="relative shrink-0 bg-white px-4 py-3 md:border-b md:border-ui-border md:px-6">
          <h2
            id="personaliza-title"
            className="pr-10 text-lg font-semibold text-ui-main md:pr-0"
          >
            Personaliza tu pedido
          </h2>
          <p className="mt-0.5 text-sm text-ui-muted">{item.name}</p>
          <button
            type="button"
            onClick={onClose}
            className="btn-transition absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-ui-muted hover:bg-ui-border hover:text-ui-main md:right-6 md:top-4"
            aria-label="Cerrar sin añadir"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-4 p-4 md:p-6">
          <label className="flex cursor-pointer items-center justify-between gap-3">
            <span className="text-sm font-medium text-ui-main">
              {isHamburger(item) ? "Papas extra grande" : "Añadir papas"}
            </span>
            <span className="text-sm text-ui-muted">
              {formatCOP(
                isHamburger(item) ? PAPAS_ADDON_HAMBURGER : PAPAS_ADDON_OTHER,
              )}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={addPapas}
              className={`btn-transition relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 transition-colors ${
                addPapas
                  ? "border-ui-primary bg-ui-primary"
                  : "border-ui-border bg-white"
              }`}
              onClick={() => setAddPapas((prev) => !prev)}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  addPapas ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>

          <div>
            <span className="mb-2 block text-sm font-medium text-ui-muted">
              Adiciones ({formatCOP(ADDITION_PRICE)} c/u)
            </span>
            <div className="flex flex-wrap gap-2">
              {ADDITIONS_OPTIONS.map((name) => {
                const checked = additions.includes(name);
                return (
                  <label
                    key={name}
                    className="btn-transition flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors has-[:checked]:border-ui-primary has-[:checked]:bg-ui-primary/10"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddition(name)}
                      className="h-4 w-4 rounded border-ui-border text-ui-primary focus:ring-ui-primary"
                    />
                    {name}
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-ui-muted">
              Bebida (opcional)
            </span>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              <button
                type="button"
                onClick={() => setDrinkId(null)}
                className={`btn-transition flex flex-col items-start rounded-xl border-2 p-3 text-left transition-colors ${
                  drinkId === null
                    ? "border-ui-primary bg-ui-primary/5"
                    : "border-ui-border bg-white hover:border-ui-main/30"
                }`}
              >
                <span className="font-medium text-ui-main">Ninguna</span>
              </button>
              {BEBIDAS.map((b) => {
                const selected = drinkId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setDrinkId(b.id)}
                    className={`btn-transition flex flex-col items-start rounded-xl border-2 p-3 text-left transition-colors ${
                      selected
                        ? "border-ui-primary bg-ui-primary/5"
                        : "border-ui-border bg-white hover:border-ui-main/30"
                    }`}
                  >
                    <span className="font-medium text-ui-main">{b.name}</span>
                    <span className="mt-0.5 text-sm text-ui-muted">
                      {formatCOP(b.price ?? 0)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          </div>
        </div>

        <div className="shrink-0 bg-white px-4 pt-4 pb-6 safe-area-bottom md:border-t md:border-ui-border md:px-6 md:pb-6">
          <button
            type="button"
            className="btn-transition w-full rounded-xl bg-ui-primary px-4 py-3 font-medium text-white hover:opacity-90 active:scale-[0.98]"
            onClick={handleAdd}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </>
  );
}
