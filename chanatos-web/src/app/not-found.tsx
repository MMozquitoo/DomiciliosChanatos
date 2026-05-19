import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-ui-primary mb-4">404</h1>
      <p className="text-lg text-ui-muted mb-6">Esta página no existe</p>
      <Link
        href="/menu"
        className="bg-ui-primary text-gray-900 font-semibold px-6 py-3 rounded-xl"
      >
        Ir al menú
      </Link>
    </div>
  );
}
