import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLineModifiers = {
  combo?: boolean;
  addPapas?: boolean;
  drinkId?: string | null;
  additions?: string[];
  flavorId?: string;
};

export type CartLine = {
  lineId: string;
  productId: string;
  qty: number;
  modifiers?: CartLineModifiers;
};

function generateLineId(): string {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Clave estable para comparar modifiers: mismo producto + mismos modifiers = misma línea. */
function modifiersKey(modifiers?: CartLineModifiers): string {
  if (!modifiers) return "";
  return JSON.stringify({
    combo: modifiers.combo ?? false,
    addPapas: modifiers.addPapas ?? false,
    drinkId: modifiers.drinkId ?? null,
    additions: [...(modifiers.additions ?? [])].sort(),
    flavorId: modifiers.flavorId ?? null,
  });
}

type CartState = {
  items: CartLine[];
  addLine: (
    productId: string,
    modifiers?: CartLineModifiers,
    qty?: number,
  ) => void;
  inc: (lineId: string) => void;
  dec: (lineId: string) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  updateModifiers: (lineId: string, nextModifiers: CartLineModifiers) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addLine: (productId, modifiers, qty = 1) =>
        set((state) => {
          // Misma personalización del mismo producto -> suma a esa línea en
          // vez de crear una nueva (si no, el carrito se llena de líneas
          // repetidas al darle varias veces a "+").
          const key = modifiersKey(modifiers);
          const existing = state.items.find(
            (i) => i.productId === productId && modifiersKey(i.modifiers) === key,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.lineId === existing.lineId ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                lineId: generateLineId(),
                productId,
                qty,
                modifiers,
              },
            ],
          };
        }),

      inc: (lineId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.lineId === lineId ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),

      dec: (lineId) =>
        set((state) => {
          const found = state.items.find((i) => i.lineId === lineId);
          if (!found) return state;
          const nextQty = found.qty - 1;
          if (nextQty <= 0) {
            return { items: state.items.filter((i) => i.lineId !== lineId) };
          }
          return {
            items: state.items.map((i) =>
              i.lineId === lineId ? { ...i, qty: nextQty } : i,
            ),
          };
        }),

      remove: (lineId) =>
        set((state) => ({
          items: state.items.filter((i) => i.lineId !== lineId),
        })),

      clear: () => set({ items: [] }),

      updateModifiers: (lineId, nextModifiers) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.lineId === lineId ? { ...i, modifiers: nextModifiers } : i,
          ),
        })),
    }),
    { name: "chanatos_cart_v3" },
  ),
);
