import Image from "next/image";
import Link from "next/link";

const LANDING_YELLOW = "#E3A73D";

export default function HomePage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-[22px] py-12 md:px-6 md:py-16"
      style={{ backgroundColor: LANDING_YELLOW }}
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <Image
          src="/logo-chanatos.png"
          alt="Chanatos"
          width={1542}
          height={570}
          priority
          className="h-auto w-[260px] md:w-[320px]"
        />
        <h1 className="sr-only">Chanatos</h1>

        <p className="mt-4 text-[15px] leading-snug text-gray-900/90 md:text-base md:leading-normal">
          Bienvenido. Aquí armas tu pedido a tu gusto y lo envías por WhatsApp
          en un toque.
        </p>

        <Link
          href="/menu"
          className="btn-transition mt-10 inline-block rounded-xl bg-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:opacity-95 active:scale-[0.98]"
        >
          Realizar tu pedido
        </Link>
      </div>
    </div>
  );
}
