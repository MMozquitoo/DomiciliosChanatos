"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MENU } from "@/data/menu";
import { useCart } from "@/lib/cartStore";
import {
  formatCOP,
  calcLineTotal,
  calcCartTotal,
  getLineModifierLabels,
} from "@/lib/pricing";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const items = useCart((s) => s.items);
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);

  const menuById = useMemo(
    () => Object.fromEntries(MENU.map((i) => [i.id, i])),
    [],
  );
  const total = calcCartTotal(items, menuById);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[1000] bg-black/50"
        aria-label="Cerrar carrito"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-[1001] flex h-full w-full max-w-md flex-col border-l border-ui-border bg-white shadow-xl"
        role="dialog"
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-ui-border p-4">
          <h2 className="text-lg font-semibold text-ui-main">Tu pedido</h2>
          <button
            type="button"
            className="btn-transition flex h-10 w-10 items-center justify-center rounded-full border border-ui-border text-ui-main hover:bg-ui-border"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-ui-muted">Tu carrito está vacío</p>
              <p className="mt-1 text-xs text-ui-muted">Agrega algo del menú</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => {
                const m = menuById[it.productId];
                const name = m?.name ?? it.productId;
                const lineTotal = calcLineTotal(it, menuById);
                const modifierLabels = getLineModifierLabels(it, menuById);
                return (
                  <li
                    key={it.lineId}
                    className="flex items-center justify-between gap-3 border-b border-ui-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-ui-main">
                        {name}
                      </div>
                      {modifierLabels.length > 0 && (
                        <div className="mt-0.5 space-y-0.5 text-xs text-ui-muted">
                          {modifierLabels.map((label) => (
                            <div key={label}>{label}</div>
                          ))}
                        </div>
                      )}
                      <div className="mt-0.5 text-sm text-ui-muted">
                        {formatCOP(lineTotal)}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        className="btn-transition flex h-9 w-9 items-center justify-center rounded border border-ui-border text-ui-main hover:bg-ui-border active:scale-95"
                        onClick={() => dec(it.lineId)}
                        aria-label="Menos"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium text-ui-main">
                        {it.qty}
                      </span>
                      <button
                        type="button"
                        className="btn-transition flex h-9 w-9 items-center justify-center rounded border border-ui-border text-ui-main hover:bg-ui-border active:scale-95"
                        onClick={() => inc(it.lineId)}
                        aria-label="Más"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="btn-transition ml-1 text-xs text-ui-muted underline hover:text-ui-main"
                        onClick={() => remove(it.lineId)}
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ui-border p-4">
            <div className="mb-4 flex items-center justify-between font-semibold text-ui-main">
              <span>Total</span>
              <span>{formatCOP(total)}</span>
            </div>
            <Link
              className="btn-transition block w-full rounded-lg bg-ui-primary py-3 text-center font-medium text-white hover:opacity-90 active:scale-[0.99]"
              href="/checkout"
              onClick={onClose}
            >
              Ir a checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
