"use client";

import Image from "next/image";
import { useCart } from "@/lib/cartStore";

type Props = {
  onOpenCart: () => void;
  open: boolean;
};

export default function Header({ onOpenCart, open }: Props) {
  const items = useCart((s) => s.items);
  const count = items.reduce((acc, it) => acc + it.qty, 0);

  return (
    <header className="shrink-0 border-b border-ui-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6 lg:max-w-7xl">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="sr-only">Chanatos Burger</h1>
          <Image
            src="/logo-chanatos.png"
            alt="Chanatos"
            width={1542}
            height={570}
            priority
            className="h-auto w-[92px] shrink-0 md:w-[104px]"
          />
          <span
            className={`inline-flex shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              open
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {open ? "Abierto" : "Cerrado"}
          </span>
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
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ui-primary px-1 text-xs font-semibold text-gray-900">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
