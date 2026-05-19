import type { MenuItem } from "@/data/menu";
import type { CartLine } from "@/lib/cartStore";
import { calcLineTotal, calcCartTotal, getLineModifierLabels } from "./pricing";
import { formatCOP } from "./money";

/** Número fijo para WhatsApp (fallback o .env). */
export const WHATSAPP_NUMBER = "573162440710";

type Fulfillment = {
  type: "pickup" | "delivery";
  address?: string;
};

type Customer = {
  name: string;
  phone?: string;
};

export function buildWhatsAppMessage(args: {
  customer: Customer;
  fulfillment: Fulfillment;
  notes?: string;
  paymentMethod?: string;
  items: CartLine[];
  menuById: Record<string, MenuItem>;
}) {
  const {
    customer,
    fulfillment,
    notes,
    paymentMethod,
    items,
    menuById,
  } = args;

  const lines: string[] = [];
  const orderId = `CH-${Date.now().toString().slice(-6)}`;

  lines.push("🍔 Pedido Chanatos");
  lines.push(`ID: ${orderId}`);
  lines.push("");

  lines.push(`Cliente: ${customer.name}`);
  if (customer.phone) lines.push(`Teléfono: ${customer.phone}`);

  lines.push(
    `Servicio: ${
      fulfillment.type === "delivery" ? "A domicilio" : "Para recoger"
    }`,
  );
  if (fulfillment.type === "delivery" && fulfillment.address) {
    lines.push(`Dirección: ${fulfillment.address}`);
  }
  if (fulfillment.type === "delivery") {
    lines.push("Domicilio: Se confirma por WhatsApp");
  }

  if (paymentMethod?.trim()) lines.push(`Pago: ${paymentMethod.trim()}`);

  if (notes?.trim()) lines.push(`Notas: ${notes.trim()}`);

  lines.push("");
  lines.push("Items:");

  for (const it of items) {
    const menuItem = menuById[it.productId];
    const name = menuItem?.name ?? it.productId;
    const lineTotal = calcLineTotal(it, menuById);
    lines.push(`- ${it.qty}x ${name} (${formatCOP(lineTotal)})`);
    const modifierLabels = getLineModifierLabels(it, menuById);
    for (const label of modifierLabels) {
      lines.push(`  + ${label}`);
    }
  }

  const total = calcCartTotal(items, menuById);
  lines.push("");
  lines.push(`Total: ${formatCOP(total)}`);

  return lines.join("\n");
}

export function buildWhatsAppLink(rawPhoneNumber: string, message: string) {
  const phone = (rawPhoneNumber || WHATSAPP_NUMBER).replace(/[^\d]/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}
