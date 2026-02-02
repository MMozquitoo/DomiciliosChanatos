export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ui-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <h1 className="text-2xl font-bold text-ui-main md:text-3xl">
          Chanatos Burger
        </h1>
        <p className="mt-1 text-ui-muted">Pedido por WhatsApp</p>
      </div>
    </header>
  );
}
