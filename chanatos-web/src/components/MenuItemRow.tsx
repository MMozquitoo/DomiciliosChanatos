"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cartStore";
import { formatCOP } from "@/lib/money";
import AddToCartModal from "@/components/AddToCartModal";

const LONG_PRESS_MS = 280;

type Props = {
  item: MenuItem;
};

export default function MenuItemRow({ item }: Props) {
  const addLine = useCart((s) => s.addLine);
  const dec = useCart((s) => s.dec);
  const items = useCart((s) => s.items);

  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canAdd =
    item.available &&
    (item.price != null || (item.basePrice != null && item.basePrice > 0));

  const qtyInCart = items
    .filter((l) => l.productId === item.id)
    .reduce((a, l) => a + l.qty, 0);

  const lineToDec = items.find((l) => l.productId === item.id);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const fn = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handlePointerDown = useCallback(() => {
    if (!isDesktop && item.description) {
      clearLongPress();
      longPressTimer.current = setTimeout(() => {
        longPressTimer.current = null;
        setShowDescription(true);
      }, LONG_PRESS_MS);
    }
  }, [isDesktop, item.description, clearLongPress]);

  const handlePointerUp = useCallback(() => clearLongPress(), [clearLongPress]);
  const handlePointerLeave = useCallback(() => clearLongPress(), [clearLongPress]);

  function handleAddDirect() {
    if (!canAdd) return;
    addLine(item.id);
  }

  function handleDec() {
    if (lineToDec) dec(lineToDec.lineId);
  }

  function handleAddFromModal(
    modifiers: import("@/lib/cartStore").CartLineModifiers | undefined,
  ) {
    addLine(item.id, modifiers);
    setShowOptionsModal(false);
  }

  const openOptionsOnDesktop = isDesktop && canAdd;
  const hasDescription = Boolean(item.description);

  useEffect(() => {
    if (!showDescription) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDescription(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showDescription]);

  return (
    <>
      <div
        className={`flex items-stretch gap-3 border-b border-ui-border py-3 last:border-b-0 lg:flex-row lg:rounded-xl lg:border lg:border-ui-border lg:bg-white lg:p-4 lg:shadow-sm ${openOptionsOnDesktop ? "lg:cursor-pointer" : ""}`}
        onClick={
          openOptionsOnDesktop
            ? (e) => {
                const target = e.target as HTMLElement;
                if (!target.closest("button")) setShowOptionsModal(true);
              }
            : undefined
        }
        role={openOptionsOnDesktop ? "button" : undefined}
        tabIndex={openOptionsOnDesktop ? 0 : undefined}
        onKeyDown={
          openOptionsOnDesktop
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowOptionsModal(true);
                }
              }
            : undefined
        }
        aria-label={
          openOptionsOnDesktop
            ? `${item.name}. Click para opciones de personalización.`
            : undefined
        }
      >
        <div
          className="min-w-0 flex-1"
          onPointerDown={!isDesktop && hasDescription ? handlePointerDown : undefined}
          onPointerUp={!isDesktop && hasDescription ? handlePointerUp : undefined}
          onPointerLeave={!isDesktop && hasDescription ? handlePointerLeave : undefined}
          onPointerCancel={!isDesktop && hasDescription ? handlePointerLeave : undefined}
        >
          <div className="font-semibold text-ui-main">{item.name}</div>
          {item.description ? (
            <>
              {/* Mobile: hint para mantener presionado; Desktop: descripción visible */}
              <div className="mt-0.5 lg:hidden">
                <span className="text-[13px] text-ui-muted">
                  Mantén presionado para ver más detalle
                </span>
              </div>
              <p className="mt-1 hidden text-[13px] leading-snug text-ui-muted lg:block">
                {item.description}
              </p>
            </>
          ) : null}
          <div className="mt-1.5 font-semibold text-ui-main">
            {item.price != null
              ? formatCOP(item.price)
              : item.basePrice != null && item.basePrice > 0
                ? formatCOP(item.basePrice)
                : "Precio por confirmar"}
          </div>
        </div>
        <div
          className="relative flex shrink-0 items-center gap-2 lg:flex-col lg:items-end"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`h-[72px] w-[72px] shrink-0 rounded-lg bg-ui-border md:h-[80px] md:w-[80px] lg:h-32 lg:w-32 lg:rounded-xl ${!isDesktop && hasDescription ? "cursor-pointer touch-manipulation" : ""}`}
            role={!isDesktop && hasDescription ? "button" : undefined}
            tabIndex={!isDesktop && hasDescription ? 0 : undefined}
            onClick={
              !isDesktop && hasDescription
                ? () => setShowDescription(true)
                : undefined
            }
            onKeyDown={
              !isDesktop && hasDescription
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setShowDescription(true);
                    }
                  }
                : undefined
            }
            aria-label={
              !isDesktop && hasDescription
                ? `Ver descripción de ${item.name}`
                : undefined
            }
            aria-hidden={isDesktop || !hasDescription}
          />
          {/* Mobile: solo botón "Agregar" que abre el menú de adicionales */}
          <div className="lg:hidden">
            <button
              type="button"
              className={
                canAdd
                  ? "btn-transition rounded-lg border border-ui-primary bg-ui-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 active:scale-95"
                  : "cursor-not-allowed rounded-lg border border-ui-border bg-white px-4 py-2 text-sm font-medium text-ui-muted"
              }
              onClick={() => canAdd && setShowOptionsModal(true)}
              disabled={!canAdd}
              aria-label={canAdd ? `Agregar ${item.name}. Abre opciones.` : "No disponible"}
            >
              {canAdd ? "Agregar" : "No disponible"}
            </button>
          </div>
          {/* Desktop: contador y botones + / − con fondo */}
          <div className="hidden items-center gap-1 rounded-full bg-white/95 px-1.5 py-1 shadow-md ring-1 ring-black/10 lg:flex lg:absolute lg:bottom-0 lg:right-0">
            {qtyInCart >= 1 && (
              <>
                <button
                  type="button"
                  className="btn-transition flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ui-border bg-white text-ui-main hover:bg-ui-border active:scale-95"
                  onClick={handleDec}
                  aria-label={`Quitar una unidad de ${item.name}`}
                >
                  −
                </button>
                <span
                  className="min-w-[1.5rem] text-center text-sm font-semibold text-ui-main"
                  aria-label={`Cantidad: ${qtyInCart}`}
                >
                  {qtyInCart}
                </span>
              </>
            )}
            <button
              type="button"
              className={
                canAdd
                  ? "btn-transition flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ui-primary bg-ui-primary text-lg font-medium leading-none text-white hover:opacity-90 active:scale-95"
                  : "flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-ui-border bg-white text-ui-muted"
              }
              onClick={handleAddDirect}
              disabled={!canAdd}
              aria-label={canAdd ? `Agregar ${item.name}` : "No disponible"}
            >
              {canAdd ? "+" : "—"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal descripción (solo móvil, al mantener presionado) */}
      {showDescription && item.description && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[1000] bg-black/50"
            aria-label="Cerrar descripción"
            onClick={() => setShowDescription(false)}
          />
          <div
            className="fixed left-1/2 top-1/2 z-[1001] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-ui-border bg-white shadow-lg animate-[fadeIn_0.2s_ease-out]"
            role="dialog"
            aria-labelledby="item-desc-title"
            aria-describedby="item-desc-text"
          >
            <div className="h-32 bg-ui-border md:h-48" aria-hidden />
            <div className="p-4">
              <h3 id="item-desc-title" className="font-semibold text-ui-main">
                {item.name}
              </h3>
              <p id="item-desc-text" className="mt-2 text-sm text-ui-muted">
                {item.description}
              </p>
              <button
                type="button"
                className="btn-transition mt-4 w-full rounded-lg border border-ui-border py-2 text-sm font-medium text-ui-main hover:bg-ui-border"
                onClick={() => setShowDescription(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}

      {showOptionsModal && (
        <AddToCartModal
          item={item}
          onAdd={handleAddFromModal}
          onClose={() => setShowOptionsModal(false)}
        />
      )}
    </>
  );
}
