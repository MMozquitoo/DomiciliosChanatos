export type MenuCategory =
  | "Hamburguesas"
  | "Perros calientes"
  | "Filetes"
  | "Papas & Salchipapas"
  | "Sándwiches"
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
  // Hamburguesas
  {
    id: "hamburguesa-clasica",
    name: "Hamburguesa Clásica",
    description:
      "160 g de carne de res, tocino, pan brioche, lechuga, tomate, queso, cebolla y salsas de la casa.",
    category: "Hamburguesas",
    available: true,
    basePrice: 13000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "hamburguesa-chanata",
    name: "Hamburguesa Chanata",
    description:
      "160 g de carne de res, filete de pollo, tocino, pan brioche, lechuga, tomate, queso, cebolla y salsas de la casa.",
    category: "Hamburguesas",
    available: true,
    basePrice: 17000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "hamburguesa-doble-carne",
    name: "Hamburguesa Doble Carne",
    description:
      "360 g de carne de res, tocino, pan brioche, lechuga, tomate, queso, cebolla y salsas de la casa.",
    category: "Hamburguesas",
    available: true,
    basePrice: 20000,
    comboAddon: 4000,
    comboEligible: true,
  },
  // Perros calientes
  {
    id: "perro-clasico",
    name: "Perro Clásico",
    description:
      "Salchicha americana, queso, papa ripio, pan artesanal y salsas de la casa.",
    category: "Perros calientes",
    available: true,
    price: 9000,
  },
  {
    id: "perro-especial",
    name: "Perro Especial",
    description:
      "Salchicha americana, pollo desmechado, queso, papa ripio, pan artesanal y salsas de la casa.",
    category: "Perros calientes",
    available: true,
    price: 11000,
  },
  // Filetes
  {
    id: "filete-pollo",
    name: "Filete de Pollo",
    description:
      "200 g de filete de pollo a la plancha, acompañado de una porción de papas.",
    category: "Filetes",
    available: true,
    price: 16000,
  },
  {
    id: "filete-cerdo",
    name: "Filete de Cerdo",
    description:
      "Filete de cerdo marinado a la plancha, acompañado de una porción de papas.",
    category: "Filetes",
    available: true,
    price: 16000,
  },
  // Papas & Salchipapas
  {
    id: "papas-sencilla",
    name: "Porción de Papas Sencilla",
    description:
      "Papas fritas frescas, crujientes por fuera y suaves por dentro, acompañadas con salsas de la casa.",
    category: "Papas & Salchipapas",
    available: true,
    price: 5000,
  },
  {
    id: "salchipapa-sencilla",
    name: "Salchipapa Sencilla",
    description:
      "Papas fritas doradas con salchicha americana premium y mezcla de salsas.",
    category: "Papas & Salchipapas",
    available: true,
    price: 7000,
  },
  {
    id: "papa-loka",
    name: "Papa LoKa",
    description:
      "Papas fritas cargadas con costilla ahumada, pollo desmechado, queso fundido, papa ripio y mezcla de salsas especiales de la casa.",
    category: "Papas & Salchipapas",
    available: true,
    price: 20000,
  },
  // Sándwiches
  {
    id: "sandwich-pollo",
    name: "Sandwich de Pollo",
    description: "Pan, pollo, lechuga y tomate con salsas de la casa.",
    category: "Sándwiches",
    available: true,
    price: 11000,
  },
  // Bebidas - Refrescos
  {
    id: "gaseosa-personal",
    name: "Gaseosa personal",
    description:
      "Gaseosa refrescante de sabor suave en presentación de 250 ml.",
    category: "Bebidas",
    available: true,
    price: 2000,
  },
  {
    id: "jugo-hit",
    name: "Jugo Hit 500ml",
    description:
      "Jugo frutal sin gas en presentación de 500 ml, disponible en varios sabores.",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "mr-tea",
    name: "Mr Tea 500ml",
    description: "Bebida fría a base de té en presentación de 500 ml.",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "coca-personal",
    name: "Coca-Cola personal",
    description: "Gaseosa clásica en presentación de 500 ml.",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
  {
    id: "gaseosa-litro",
    name: "Gaseosa Litro",
    description: "Gaseosa refrescante de sabor suave en presentación de 1 L.",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  // Bebidas - Cervezas
  {
    id: "cerveza-andina",
    name: "Cerveza Andina",
    description: "Cerveza tipo lager, ligera y refrescante.",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
  {
    id: "cerveza-poker",
    name: "Cerveza Poker",
    description: "Lager suave de sabor tradicional.",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
  {
    id: "cerveza-heineken",
    name: "Cerveza Heineken",
    description: "Cerveza lager de carácter más marcado.",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
  {
    id: "cerveza-corona",
    name: "Cerveza Corona",
    description: "Lager premium de cuerpo suave.",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  // Bebidas - Jugos naturales y otros
  {
    id: "jugos-agua",
    name: "Jugos Naturales en Agua",
    description: "Jugos preparados con fruta fresca y agua.",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
  {
    id: "jugos-leche",
    name: "Jugos Naturales en leche",
    description: "Jugos cremosos elaborados con fruta natural y leche.",
    category: "Bebidas",
    available: true,
    price: 8000,
  },
  {
    id: "michelada",
    name: "Michelada",
    description: "Cerveza servida con limón, sal y un toque refrescante.",
    category: "Bebidas",
    available: true,
    price: 8000,
  },
  {
    id: "limonada-natural",
    name: "Limonada Natural",
    description: "Limonada casera elaborada con limón fresco.",
    category: "Bebidas",
    available: true,
    price: 8000,
  },
];

export const BEBIDAS = MENU.filter(
  (i) => i.category === "Bebidas" && i.available,
);
