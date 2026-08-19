"use client";

import { useMemo, useState } from "react";
import { MENU } from "@/data/menu";
import { useCart } from "@/lib/cartStore";
import {
  formatCOP,
  calcLineTotal,
  calcCartTotal,
  getLineModifierLabels,
} from "@/lib/pricing";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp";
import { useCanOrder } from "@/lib/useCanOrder";
import Link from "next/link";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const menuById = useMemo(
    () => Object.fromEntries(MENU.map((i) => [i.id, i])),
    [],
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [error, setError] = useState("");

  const PAYMENT_OPTIONS = ["Efectivo", "Transferencia", "Nequi", "Daviplata"];

  const total = calcCartTotal(items, menuById);

  const openNow = useCanOrder();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  function onSend() {
    setError("");
    if (!whatsappNumber) {
      setError("Falta configurar NEXT_PUBLIC_WHATSAPP_NUMBER");
      return;
    }
    if (!name.trim()) {
      setError("Escribe tu nombre");
      return;
    }
    if (service === "delivery" && !address.trim()) {
      setError("La dirección es obligatoria para domicilios");
      return;
    }
    if (phone && phone.replace(/\D/g, "").length < 7) {
      setError("El número de teléfono no es válido");
      return;
    }
    if (items.length === 0) {
      setError("Tu carrito está vacío");
      return;
    }
    if (!paymentMethod.trim()) {
      setError("Selecciona forma de pago");
      return;
    }

    const message = buildWhatsAppMessage({
      customer: { name: name.trim(), phone: phone.trim() || undefined },
      fulfillment:
        service === "delivery"
          ? { type: "delivery", address: address.trim() || undefined }
          : { type: "pickup" },
      notes,
      paymentMethod: paymentMethod.trim(),
      items,
      menuById,
    });

    const link = buildWhatsAppLink(whatsappNumber, message);
    window.open(link, "_blank", "noopener,noreferrer");

    // Best-effort: si esto falla, el pedido igual se mandó por WhatsApp arriba.
    // No bloquea ni muestra error al cliente — solo alimenta la cola que el
    // POS del restaurante consulta para no tener que re-teclear el pedido.
    sendToWebOrdersQueue({
      customer: { name: name.trim(), phone: phone.trim() || undefined },
      fulfillment:
        service === "delivery"
          ? { type: "delivery", address: address.trim() }
          : { type: "pickup" },
      paymentMethod: paymentMethod.trim(),
      notes,
      items: items.map((it) => {
        const product = menuById[it.productId];
        const modifierLabels = getLineModifierLabels(it, menuById);
        return {
          webId: it.productId,
          name: product?.name ?? it.productId,
          qty: it.qty,
          unitPrice: calcLineTotal(it, menuById) / it.qty,
          modifiersLabel: modifierLabels.join(", "),
        };
      }),
      total,
    }).catch(() => {
      // silencioso a propósito
    });

    clear();
  }

  function sendToWebOrdersQueue(payload: unknown) {
    return fetch("/api/web-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-4 md:p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-ui-border pb-4">
        <h1 className="text-2xl font-bold text-ui-main md:text-3xl">
          Tu pedido
        </h1>
        <Link
          className="btn-transition font-medium text-ui-main underline hover:text-ui-muted active:opacity-70"
          href="/menu"
        >
          Volver al menú
        </Link>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Panel Resumen */}
        <section className="rounded-lg border border-ui-border bg-white p-4 md:p-5">
          <h2 className="border-b border-ui-border pb-3 text-lg font-semibold text-ui-main">
            Resumen
          </h2>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-ui-muted">Tu carrito está vacío</p>
              <Link
                href="/menu"
                className="btn-transition mt-3 text-sm font-medium text-ui-main underline hover:text-ui-muted active:opacity-70"
              >
                Volver al menú
              </Link>
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
                      className="flex items-center justify-between gap-3 border-b border-ui-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-ui-main">{name}</div>
                        {modifierLabels.length > 0 && (
                          <div className="mt-0.5 space-y-0.5 text-sm text-ui-muted">
                            {modifierLabels.map((label) => (
                              <div key={label}>{label}</div>
                            ))}
                          </div>
                        )}
                        <div className="mt-0.5 text-sm text-ui-muted">
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
                        <span className="w-7 text-center text-sm font-medium">
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
              <button
                type="button"
                className="btn-transition mt-3 text-sm font-medium text-ui-muted underline hover:text-ui-main active:opacity-70"
                onClick={() => clear()}
              >
                Vaciar carrito
              </button>
            </>
          )}
        </section>

        {/* Panel Datos */}
        <section className="rounded-lg border border-ui-border bg-white p-4 md:p-5">
          <h2 className="border-b border-ui-border pb-3 text-lg font-semibold text-ui-main">
            Datos
          </h2>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-ui-muted">
                Nombre
              </span>
              <input
                className="w-full rounded-lg border border-ui-border bg-white px-3 py-2.5 text-ui-main focus:border-ui-main focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-ui-muted">
                Teléfono (opcional)
              </span>
              <input
                className="w-full rounded-lg border border-ui-border bg-white px-3 py-2.5 text-ui-main focus:border-ui-main focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej. 521234567890"
              />
            </label>

            <div className="block">
              <span className="mb-1 block text-sm font-medium text-ui-muted">
                Servicio
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`btn-transition rounded-lg border px-4 py-2.5 text-sm font-medium ${
                    service === "pickup"
                      ? "border-ui-primary bg-ui-primary text-white active:scale-[0.98]"
                      : "border-ui-border bg-white text-ui-main hover:border-ui-main active:scale-[0.98]"
                  }`}
                  onClick={() => setService("pickup")}
                >
                  Para recoger
                </button>
                <button
                  type="button"
                  className={`btn-transition rounded-lg border px-4 py-2.5 text-sm font-medium ${
                    service === "delivery"
                      ? "border-ui-primary bg-ui-primary text-white active:scale-[0.98]"
                      : "border-ui-border bg-white text-ui-main hover:border-ui-main active:scale-[0.98]"
                  }`}
                  onClick={() => setService("delivery")}
                >
                  A domicilio
                </button>
              </div>
            </div>

            {service === "delivery" && (
              <>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-ui-muted">
                    Dirección
                  </span>
                  <input
                    className="w-full rounded-lg border border-ui-border bg-white px-3 py-2.5 text-ui-main focus:border-ui-main focus:outline-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle, número, colonia..."
                  />
                </label>
                <p className="text-xs text-ui-muted">
                  Costo de domicilio: se confirma por WhatsApp
                </p>
              </>
            )}

            <div className="block">
              <span className="mb-2 block text-sm font-medium text-ui-muted">
                Forma de pago
              </span>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_OPTIONS.map((opt) => {
                  const isSelected = paymentMethod === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`btn-transition rounded-lg border px-3 py-2 text-sm font-medium ${
                        isSelected
                          ? "border-ui-primary bg-ui-primary text-white active:scale-[0.98]"
                          : "border-ui-border bg-white text-ui-main hover:border-ui-main active:scale-[0.98]"
                      }`}
                      onClick={() => setPaymentMethod(opt)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-ui-muted">
                Notas (opcional)
              </span>
              <textarea
                className="w-full rounded-lg border border-ui-border bg-white px-3 py-2.5 text-ui-main focus:border-ui-main focus:outline-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Sin cebolla, extra salsa..."
                rows={2}
              />
            </label>

            <p className="mt-2 text-sm font-medium text-ui-main">
              {openNow ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-800">
                  Abierto ahora
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-ui-border px-2.5 py-0.5 text-ui-muted">
                  Cerrado
                </span>
              )}
            </p>

            <button
              type="button"
              className="btn-transition mt-2 w-full rounded-lg bg-ui-whatsapp py-3 font-semibold text-white hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:active:scale-100"
              onClick={onSend}
              disabled={
                items.length === 0 ||
                total === 0 ||
                !paymentMethod.trim() ||
                !openNow
              }
            >
              Enviar por WhatsApp
            </button>

            {!openNow && (
              <p className="mt-1 text-xs text-ui-muted">
                Estamos cerrados. Vuelve en horario de atención.
              </p>
            )}

            {openNow && !paymentMethod.trim() && (
              <p className="mt-1 text-xs text-ui-muted">
                Selecciona forma de pago
              </p>
            )}

            <p className="text-xs text-ui-muted">
              Se abrirá WhatsApp con el mensaje prellenado.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
