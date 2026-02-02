export type MenuCategory =
  | "Hamburguesas"
  | "Perros calientes"
  | "Regañados"
  | "Sándwiches"
  | "Tacos"
  | "Tostones"
  | "Papas & Salchipapas"
  | "Filetes"
  | "Bebidas";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  category: MenuCategory;
  available: boolean;
  /** Precio para ítems simples */
  price?: number;
  /** Hamburguesas: precio base del producto */
  basePrice?: number;
  /** Hamburguesas: sumar por combo (papas/bebida) */
  comboAddon?: number;
  /** Si aplica addon de combo */
  comboEligible?: boolean;
  /** Ej: "Thu-Sat" para Hervido */
  availableDays?: string;
};

export const MENU: MenuItem[] = [
  // Hamburguesas (basePrice + comboAddon 4000)
  {
    id: "la-chanata",
    name: "La Chanata",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "baconera",
    name: "Baconera",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "doble-carne",
    name: "Doble carne",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "consentida",
    name: "Consentida",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "tradicional",
    name: "Tradicional",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  // Perros calientes
  {
    id: "perro-chanato",
    name: 'Perro "El Chanato"',
    category: "Perros calientes",
    available: true,
    price: 11000,
  },
  {
    id: "perro-tradicional",
    name: 'Perro "El Tradicional"',
    category: "Perros calientes",
    available: true,
    price: 9000,
  },
  // Regañados (bebidas con alcohol)
  {
    id: "hervido",
    name: "Hervido (Jueves a sábado)",
    description:
      "Hervido caliente con fruta fresca, jugo natural y Aguardiente Nariño. Levanta el ánimo y el cuerpo.",
    category: "Regañados",
    available: true,
    price: 7000,
    availableDays: "Thu-Sat",
  },
  {
    id: "michelada-casa",
    name: "Michelada de la casa",
    category: "Regañados",
    available: true,
    price: 8000,
  },
  // Sándwiches (El Chanatún y El Pollo Clásico aquí)
  {
    id: "sandwich-chanatun",
    name: '"El Chanatún"',
    description: "Incluye papas",
    category: "Sándwiches",
    available: true,
    price: 11000,
  },
  {
    id: "sandwich-pollo-clasico",
    name: '"El Pollo Clásico"',
    description: "Incluye papas",
    category: "Sándwiches",
    available: true,
    price: 11000,
  },
  // Tacos (carne y pollo 11000)
  {
    id: "tacos-carne",
    name: "Tacos de carne",
    description: "Cada orden x3",
    category: "Tacos",
    available: true,
    price: 11000,
  },
  {
    id: "tacos-pollo",
    name: "Tacos de pollo",
    description: "Cada orden x3",
    category: "Tacos",
    available: true,
    price: 11000,
  },
  // Tostones (carne y pollo 18000)
  {
    id: "tostones-carne",
    name: "Tostones de carne",
    category: "Tostones",
    available: true,
    price: 18000,
  },
  {
    id: "tostones-pollo",
    name: "Tostones de pollo",
    category: "Tostones",
    available: true,
    price: 18000,
  },
  // Papas & Salchipapas
  {
    id: "papas-casa",
    name: "Papas de la casa",
    category: "Papas & Salchipapas",
    available: true,
    price: 5000,
  },
  {
    id: "salchipapa-clasica",
    name: "Salchipapa clásica",
    category: "Papas & Salchipapas",
    available: true,
    price: 7000,
  },
  {
    id: "papa-loka",
    name: "Papa Loka",
    category: "Papas & Salchipapas",
    available: true,
    price: 20000,
  },
  // Filetes
  {
    id: "filete-cerdo",
    name: "Filete cerdo marinado",
    description: "Incluye papas",
    category: "Filetes",
    available: true,
    price: 16000,
  },
  {
    id: "filete-pollo",
    name: "Filete pollo de la casa",
    description: "Incluye papas",
    category: "Filetes",
    available: true,
    price: 16000,
  },
  // Bebidas - Refrescos
  {
    id: "coca-2l",
    name: "Coca-Cola 2L",
    category: "Bebidas",
    available: true,
    price: 9000,
  },
  {
    id: "coca-1.5l",
    name: "Coca-Cola 1.5L",
    category: "Bebidas",
    available: true,
    price: 7000,
  },
  {
    id: "gaseosa-1.5l",
    name: "Gaseosa 1.5L",
    category: "Bebidas",
    available: true,
    price: 7000,
  },
  {
    id: "gaseosa-litro",
    name: "Gaseosa litro",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  {
    id: "coca-personal",
    name: "Coca-Cola personal",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "gaseosa-personal",
    name: "Gaseosa personal",
    category: "Bebidas",
    available: true,
    price: 2000,
  },
  // Bebidas - Cervezas
  {
    id: "cerveza-corona",
    name: "Cerveza Corona",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  {
    id: "cerveza-club-colombia",
    name: "Cerveza Club Colombia",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  {
    id: "cerveza-poker",
    name: "Cerveza Poker",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
  {
    id: "cerveza-andina",
    name: "Cerveza Andina",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  // Bebidas - Casa
  {
    id: "mr-tea",
    name: "Mr Tea",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "jugo-hit-500",
    name: "Jugo Hit 500ml",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "limonada-natural",
    name: "Limonada natural",
    category: "Bebidas",
    available: true,
    price: 8000,
  },
  // Bebidas - Jugos
  {
    id: "jugos-leche",
    name: "Jugos naturales en leche",
    category: "Bebidas",
    available: true,
    price: 8000,
  },
  {
    id: "jugos-agua",
    name: "Jugos naturales en agua",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
];

export const BEBIDAS = MENU.filter(
  (i) => i.category === "Bebidas" && i.available,
);
