# Chanatos Burger — Menú digital

Sitio de menú digital y pedidos por WhatsApp para **Chanatos Burger**, con estética de marca (amarillo #F5BB4C, paleta beige/verde/marrón, tipografía serif + sans) y grid responsive.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** con colores y tipografía de Chanatos
- **Zustand** + persist para el carrito
- Menú en `src/data/menu.ts` (fácil de mover a CMS/DB después)
- Pedido por WhatsApp con mensaje prellenado y "Vengo de: [origen]"

## Cómo correr

```bash
npm install
cp .env.local.example .env.local
# Edita .env.local y pon tu NEXT_PUBLIC_WHATSAPP_NUMBER (código país + dígitos)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Sube el repo a GitHub.
2. Importa el proyecto en Vercel.
3. Añade la variable `NEXT_PUBLIC_WHATSAPP_NUMBER` en Vercel.
4. Cada push a `main` se despliega automáticamente.

## Estructura

```
chanatos-web/
  src/
    app/          → layout, page, checkout
    components/  → MenuList, CartBar
    data/         → menu.ts
    lib/          → cartStore.ts, whatsapp.ts
  .env.local.example
```

## Marca

- **Color principal:** Amarillo #F5BB4C (bordes, CTAs, acentos).
- **Paleta:** Beige #F1E3C6 (fondo), Verde #3F5E4F, Marrón #6E4B2F, Pitch #1A1A1A (texto).
- **Tipografía:** Libre Baskerville (títulos), Source Sans 3 (cuerpo).
