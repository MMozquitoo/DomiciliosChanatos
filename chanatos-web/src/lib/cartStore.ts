import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLineModifiers = {
  combo?: boolean;
  addPapas?: boolean;
  drinkId?: string | null;
  additions?: string[];
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

type CartState = {
  items: CartLine[];
  addLine: (productId: string, modifiers?: CartLineModifiers) => void;
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
      addLine: (productId, modifiers) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              lineId: generateLineId(),
              productId,
              qty: 1,
              modifiers,
            },
          ],
        })),

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
