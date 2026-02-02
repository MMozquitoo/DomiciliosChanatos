import type { CartLine } from "./cartStore";
import type { MenuItem } from "@/data/menu";

export { formatCOP } from "./money";

const COMBO_ADDON = 4000;
/** Hamburguesas: papas addon $4.000. Otros platos: $5.000 (igual que standalone Papas en menú). */
const ADD_PAPAS_HAMBURGER = 4000;
const ADD_PAPAS_OTHER = 5000;
const ADDITION_PER_ITEM = 1000;

/**
 * Base price: product.price or product.basePrice.
 * Combo: +comboAddon (4000) only if product.comboEligible.
 * addPapas: +4000 en hamburguesas, +5000 en otros platos.
 * drinkId: +price of the selected drink product.
 * additions: +1000 per string.
 */
export function calcLineTotal(
  line: CartLine,
  menuById: Record<string, MenuItem>,
): number {
  const product = menuById[line.productId];
  if (!product) return 0;

  const base = product.price ?? product.basePrice ?? 0;

  let extra = 0;
  const mod = line.modifiers;

  if (mod?.combo && product.comboEligible) {
    extra += product.comboAddon ?? COMBO_ADDON;
  }
  if (mod?.addPapas) {
    extra +=
      product.category === "Hamburguesas"
        ? ADD_PAPAS_HAMBURGER
        : ADD_PAPAS_OTHER;
  }
  if (mod?.drinkId) {
    const drink = menuById[mod.drinkId];
    if (drink) extra += drink.price ?? drink.basePrice ?? 0;
  }
  if (mod?.additions?.length) {
    extra += mod.additions.length * ADDITION_PER_ITEM;
  }

  return (base + extra) * line.qty;
}

export function calcCartTotal(
  lines: CartLine[],
  menuById: Record<string, MenuItem>,
): number {
  return lines.reduce((sum, line) => sum + calcLineTotal(line, menuById), 0);
}

/** Labels for cart line modifiers (Combo, Papas, Bebida: X, Adiciones: ...). */
export function getLineModifierLabels(
  line: CartLine,
  menuById: Record<string, MenuItem>,
): string[] {
  const mod = line.modifiers;
  if (!mod) return [];
  const product = menuById[line.productId];
  const labels: string[] = [];
  if (mod.combo) labels.push("Combo");
  if (mod.addPapas) {
    labels.push(
      product?.category === "Hamburguesas" ? "Papas extra grande" : "Papas",
    );
  }
  if (mod.drinkId) {
    const drink = menuById[mod.drinkId];
    labels.push(`Bebida: ${drink?.name ?? mod.drinkId}`);
  }
  if (mod.additions?.length)
    labels.push(`Adiciones: ${mod.additions.join(", ")}`);
  return labels;
}
