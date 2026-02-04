# Copilot instructions — Chanatos Burger (chanatos-web)

This short guide gives actionable, repo-specific context for code suggestions and edits.

- **Big picture**: This is a small Next.js 15 App Router site (TypeScript + Tailwind) that renders a menu and builds WhatsApp order links. Main data flows:
  - Menu is data-driven in `src/data/menu.ts` (single source of truth).
  - Cart state lives in a persisted Zustand store `src/lib/cartStore.ts` (persist key: `chanatos_cart_v3`).
  - Pricing rules and labels live in `src/lib/pricing.ts` and currency formatting in `src/lib/money.ts`.
  - WhatsApp message and link builders are in `src/lib/whatsapp.ts` (uses env `NEXT_PUBLIC_WHATSAPP_NUMBER`, fallback in file).

- **How to run / common commands** (from `package.json`):
  - Install: `npm install`
  - Dev: `npm run dev` (opens on http://localhost:3000)
  - Build: `npm run build` and `npm run start`
  - Lint: `npm run lint`

- **Important patterns & conventions**
  - Interactive components use the App Router "client component" pattern: they include `"use client"` at top (see `src/components/MenuItemRow.tsx`). Keep server-only code out of these files.
  - Prices are integers in COP (no decimals). Use `formatCOP` from `src/lib/money.ts` for display.
  - Pricing logic uses `price` vs `basePrice` + modifiers (combo, addPapas, drinkId, additions). If you change pricing, update `src/lib/pricing.ts` and verify `src/lib/whatsapp.ts` output.
  - Cart persistence: avoid renaming or removing persisted fields unless you handle migrations for `chanatos_cart_v3` (users' localStorage depends on it).
  - Menu shape: `MenuItem` fields (`id`, `name`, `category`, `price`, `basePrice`, `comboAddon`, `comboEligible`, `availableDays`) are referenced throughout — keep names stable when modifying.

- **Integration points to watch**
  - WhatsApp: `buildWhatsAppMessage()` and `buildWhatsAppLink()` in `src/lib/whatsapp.ts`. The link uses `NEXT_PUBLIC_WHATSAPP_NUMBER` when provided.
  - Fonts and global CSS are set in `src/app/layout.tsx` and `src/app/globals.css` — changes here affect the whole app.

- **Quick debugging tips**
  - Hydration errors often mean a server component imported client-only hooks (e.g., Zustand) — move `"use client"` to the top of the component and avoid server imports there.
  - To inspect current cart content, check browser `localStorage` key `chanatos_cart_v3`.
  - To preview menu edits, edit `src/data/menu.ts` and refresh; no backend required.

- **Files to inspect first for most tasks**
  - `package.json` (scripts & deps)
  - `src/data/menu.ts` (menu source)
  - `src/lib/cartStore.ts` (cart API + persist)
  - `src/lib/pricing.ts`, `src/lib/money.ts` (pricing & display)
  - `src/lib/whatsapp.ts` (message/link builder)
  - `src/components/MenuItemRow.tsx`, `src/components/MenuList.tsx` (interactive patterns)

If anything above is unclear or you need examples (small PRs, modifying pricing, or changing menu structure), ask and I will expand with concrete change snippets and tests.
