"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MENU } from "@/data/menu";
import { useCart } from "@/lib/cartStore";
import {
  formatCOP,
  calcLineTotal,
  calcCartTotal,
  getLineModifierLabels,
} from "@/lib/pricing";

export default function CartBottomBar() {
  const items = useCart((s) => s.items);
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);

  const [isOpen, setIsOpen] = useState(false);

  const menuById = useMemo(
    () => Object.fromEntries(MENU.map((i) => [i.id, i])),
    [],
  );
  const count = items.reduce((acc, it) => acc + it.qty, 0);
  const total = calcCartTotal(items, menuById);

  if (count === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-ui-border bg-white">
        <div className="safe-area-bottom mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
          <div>
            <div className="text-sm text-ui-muted">{count} prod</div>
            <div className="font-semibold text-ui-text">
              Total: {formatCOP(total)}
            </div>
          </div>
          <button
            type="button"
            className="btn-transition rounded-lg bg-ui-primary px-4 py-2 font-medium text-gray-900 hover:opacity-90 active:scale-[0.98]"
            onClick={() => setIsOpen(true)}
          >
            Ver pedido
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            className="drawer-overlay fixed inset-0 z-50 bg-black/50"
            aria-label="Cerrar"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="drawer-panel fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-auto rounded-t-xl bg-white shadow-lg safe-area-bottom"
            role="dialog"
            aria-label="Tu pedido"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-ui-border bg-white px-4 py-3">
              <h2 className="text-lg font-semibold text-ui-text">Tu pedido</h2>
              <button
                type="button"
                className="btn-transition rounded p-1.5 text-ui-muted hover:bg-ui-border hover:text-ui-text active:opacity-70"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
            <div className="p-4 pb-8">
              <ul className="space-y-3">
                {items.map((it) => {
                  const m = menuById[it.productId];
                  const name = m?.name ?? it.productId;
                  const lineTotal = calcLineTotal(it, menuById);
                  const modifierLabels = getLineModifierLabels(it, menuById);
                  return (
                    <li
                      key={it.lineId}
                      className="flex items-center justify-between gap-2 border-b border-ui-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-ui-text">
                          {name}
                        </div>
                        {modifierLabels.length > 0 && (
                          <div className="mt-0.5 space-y-0.5 text-xs text-ui-muted">
                            {modifierLabels.map((label) => (
                              <div key={label}>{label}</div>
                            ))}
                          </div>
                        )}
                        <div className="mt-0.5 text-xs text-ui-muted">
                          {formatCOP(lineTotal)}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          className="btn-transition flex h-8 w-8 items-center justify-center rounded border border-ui-border text-ui-text hover:bg-ui-border active:scale-95"
                          onClick={() => dec(it.lineId)}
                          aria-label="Menos"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          className="btn-transition flex h-8 w-8 items-center justify-center rounded border border-ui-border text-ui-text hover:bg-ui-border active:scale-95"
                          onClick={() => inc(it.lineId)}
                          aria-label="Más"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="btn-transition ml-1 text-xs text-ui-muted underline hover:text-ui-text active:opacity-70"
                          onClick={() => remove(it.lineId)}
                        >
                          Quitar
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-ui-border pt-3 font-semibold text-ui-text">
                <span>Total</span>
                <span>{formatCOP(total)}</span>
              </div>
              <Link
                className="btn-transition mt-4 block w-full rounded-lg bg-ui-primary py-3 text-center font-medium text-gray-900 hover:opacity-90 active:scale-[0.99]"
                href="/checkout"
                onClick={() => setIsOpen(false)}
              >
                Ir a checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
