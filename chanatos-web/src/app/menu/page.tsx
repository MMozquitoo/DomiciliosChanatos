"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import ProductosTop from "@/components/ProductosTop";
import MenuList from "@/components/MenuList";
import CartBottomBar from "@/components/CartBottomBar";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import { useCart } from "@/lib/cartStore";
import { useCanOrder } from "@/lib/useCanOrder";

export default function MenuPage() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const itemCount = useCart((s) => s.items.length);
  const prevCount = useRef(itemCount);
  const open = useCanOrder();

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setToast("Agregado al carrito");
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[999] flex flex-col bg-white">
        <Header onOpenCart={() => setCartDrawerOpen(true)} open={open} />
        <div className="lg:hidden">
          <CategoryTabs />
        </div>
      </div>
      <div className="min-h-screen bg-white md:bg-transparent">
        <div className="mx-auto max-w-6xl pt-[6rem] md:p-6 md:pt-20 lg:max-w-7xl lg:pt-20">
          <main className="flex flex-col gap-6">
            <div className="min-w-0">
              <div className="hidden lg:block">
                <CategoryTabs />
              </div>
              <div className="p-4 md:p-0">
                <div className="hidden lg:block">
                  <ProductosTop />
                </div>
                <MenuList />
              </div>
            </div>
          </main>
        </div>
      </div>
      <CartBottomBar />
      <div className="hidden lg:block">
        <CartDrawer
          isOpen={cartDrawerOpen}
          onClose={() => setCartDrawerOpen(false)}
        />
      </div>
      <Toast message={toast} show={!!toast} onClose={() => setToast("")} />
    </>
  );
}
