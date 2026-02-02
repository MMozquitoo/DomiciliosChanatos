# Especificación UI — Chanatos Burger

Documento de referencia para la interfaz. No cambiar lógica de carrito ni WhatsApp, no inventar menú/features, no cambiar rutas.

---

## Paleta

| Uso                      | Valor                        |
| ------------------------ | ---------------------------- |
| Fondo                    | `#FFFFFF`                    |
| Texto principal          | `#111827`                    |
| Texto secundario (muted) | `#6B7280`                    |
| Borde / separador        | `#E5E7EB`                    |
| Superficie (cards)       | `#FFFFFF`                    |
| Botón principal          | `#111827` (texto blanco)     |
| Botón WhatsApp           | `#22C55E` (solo en checkout) |

---

## Tipografía

- **Familia:** Inter o system-ui (sin serif).
- **Tamaños:**
  - Título: 24–32px
  - Categorías: 14–16px
  - Item title: 16px
  - Descripción: 13–14px (gris)

---

## Layout

- **Contenedor:** `max-w-6xl mx-auto`
- **Móvil:** padding 16px
- **Desktop:** padding 24–32px
- **Desktop:** `grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6`

---

## Componentes

1. **Header** — sticky

   - "Chanatos Burger"
   - Subtexto: "Pedido por WhatsApp"

2. **CategoryTabs** — sticky (debajo del header)

   - "Hamburguesas / Acompañamientos / Bebidas"

3. **MenuItemRow**

   - Nombre
   - Descripción (máx. 2 líneas)
   - Precio
   - Foto a la derecha (cuadro 72–88px)
   - Botón "+" pequeño

4. **CartBottomBar** (móvil)

   - Solo si hay carrito
   - "2 prod" + "$148"
   - Botón "Ver pedido"

5. **CartSidebar** (desktop)

   - Sticky a la derecha
   - Items
   - Stepper +/- por item
   - Total
   - Botón "Ir a checkout"

6. **Checkout** — responsive (misma paleta y tipografía)

---

## Reglas

- No cambiar lógica de carrito ni WhatsApp (solo UI/estructura).
- No inventar productos/categorías/precios: usar `src/data/menu.ts` tal cual.
- No agregar features nuevas (reservas, login, maps, pagos, etc.).
- No cambiar rutas: solo `/` (home) y `/checkout`.
- No usar paleta distinta: solo la definida arriba.
- Cada fase debe dejar el proyecto compilando (`npm run dev` sin errores).
