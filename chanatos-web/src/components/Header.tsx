"use client";

import Image from "next/image";
import { useCart } from "@/lib/cartStore";

type Props = {
  onOpenCart: () => void;
};

export default function Header({ onOpenCart }: Props) {
  const items = useCart((s) => s.items);
  const count = items.reduce((acc, it) => acc + it.qty, 0);

  return (
    <header className="shrink-0 border-b border-ui-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div>
          <h1 className="text-2xl font-bold text-ui-main md:text-3xl">
            Chanatos Burger
          </h1>
          <p className="mt-1 text-sm text-ui-muted">
            Organiza tu pedido y envíalo por WhatsApp
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenCart}
          className="btn-transition relative hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ui-border bg-white hover:bg-ui-border lg:flex"
          aria-label={count > 0 ? `Carrito con ${count} producto(s)` : "Abrir carrito"}
        >
          <Image
            src="/carrocompras.png"
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ui-primary px-1 text-xs font-semibold text-white">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
