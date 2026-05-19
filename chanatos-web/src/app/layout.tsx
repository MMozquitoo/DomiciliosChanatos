import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chanatos Burger | Pide a domicilio",
  description:
    "Pide tus hamburguesas y platos favoritos de Chanatos Burger. Menu digital con envio por WhatsApp. Domicilios y para recoger.",
  keywords: ["chanatos", "burger", "hamburguesas", "domicilios", "menu digital"],
  openGraph: {
    title: "Chanatos Burger | Pide a domicilio",
    description:
      "Pide tus hamburguesas y platos favoritos de Chanatos Burger.",
    type: "website",
    locale: "es_CO",
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
