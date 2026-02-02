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

export default function CartSidebar() {
  const items = useCart((s) => s.items);
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);

  const menuById = useMemo(
    () => Object.fromEntries(MENU.map((i) => [i.id, i])),
    [],
  );
  const total = calcCartTotal(items, menuById);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-lg border border-ui-border bg-white p-4">
        <h2 className="border-b border-ui-border pb-2 text-base font-semibold text-ui-main">
          Tu pedido
        </h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-ui-muted">Tu carrito está vacío</p>
            <p className="mt-1 text-xs text-ui-muted">Agrega algo del menú</p>
          </div>
        ) : (
          <>
            <ul className="mt-3 space-y-3">
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
                      <div className="truncate text-sm font-medium text-ui-main">
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
                        className="btn-transition flex h-8 w-8 items-center justify-center rounded border border-ui-border text-ui-main hover:bg-ui-border active:scale-95"
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
                        className="btn-transition flex h-8 w-8 items-center justify-center rounded border border-ui-border text-ui-main hover:bg-ui-border active:scale-95"
                        onClick={() => inc(it.lineId)}
                        aria-label="Más"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="btn-transition ml-1 text-xs text-ui-muted underline hover:text-ui-main active:opacity-70"
                        onClick={() => remove(it.lineId)}
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-ui-border pt-3 font-semibold text-ui-main">
              <span>Total</span>
              <span>{formatCOP(total)}</span>
            </div>
            <Link
              className="btn-transition mt-4 block w-full rounded-lg bg-ui-primary py-2 text-center font-medium text-white hover:opacity-90 active:scale-[0.99]"
              href="/checkout"
            >
              Ir a checkout
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
