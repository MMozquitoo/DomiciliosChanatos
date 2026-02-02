import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import MenuList from "@/components/MenuList";
import CartSidebar from "@/components/CartSidebar";
import CartBottomBar from "@/components/CartBottomBar";

export default function MenuPage() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <main className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <CategoryTabs />
            <MenuList />
          </div>
          <CartSidebar />
        </main>
      </div>
      <CartBottomBar />
    </>
  );
}
