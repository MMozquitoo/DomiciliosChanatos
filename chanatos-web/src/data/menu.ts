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
  // Hamburguesas
  {
    id: "la-chanata",
    name: "La Chanata",
    description:
      "Hamburguesa de la casa con carne de res, filete de pollo, queso, lechuga, tomate y salsas de la casa.",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "baconera",
    name: "Baconera",
    description:
      "Hamburguesa de carne de res con tocino crocante, queso, lechuga, tomate y salsas de la casa.",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "doble-carne",
    name: "Doble carne",
    description:
      "Hamburguesa con doble porción de carne de res, queso, lechuga, tomate y salsas de la casa. Contundente y bien puesta.",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "consentida",
    name: "Consentida",
    description:
      "Hamburguesa especial de la casa con carne de res, queso, lechuga, tomate y el toque consentido de la abuela.",
    category: "Hamburguesas",
    available: true,
    basePrice: 12000,
    comboAddon: 4000,
    comboEligible: true,
  },
  {
    id: "tradicional",
    name: "Tradicional",
    description:
      "Hamburguesa clásica de carne de res, queso, lechuga, tomate y salsas de la casa. La de siempre, como debe ser.",
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
    description:
      "Perro caliente con salchicha americana, pollo desmechado, queso, papa ripio y salsas de la casa.",
    category: "Perros calientes",
    available: true,
    price: 11000,
  },
  {
    id: "perro-tradicional",
    name: 'Perro "El Tradicional"',
    description:
      "Perro caliente con salchicha americana, queso, papa ripio y salsas de la casa.",
    category: "Perros calientes",
    available: true,
    price: 9000,
  },
  // Regañados
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
    description:
      "Cerveza servida con limón, sal y un toque refrescante, al estilo de la casa.",
    category: "Regañados",
    available: true,
    price: 8000,
  },
  // Sándwiches
  {
    id: "sandwich-chanatun",
    name: '"El Chanatún"',
    description:
      "Sándwich de atún preparado al estilo de la casa, con lechuga, tomate y salsas de la casa.",
    category: "Sándwiches",
    available: true,
    price: 11000,
  },
  {
    id: "sandwich-pollo-clasico",
    name: '"El Pollo Clásico"',
    description:
      "Sándwich de pollo a la plancha con lechuga, tomate y salsas de la casa.",
    category: "Sándwiches",
    available: true,
    price: 11000,
  },
  // Tacos
  {
    id: "tacos-carne",
    name: "Tacos de carne",
    description:
      "Cada orden incluye 3 tacos rellenos de carne desmechada y acompañamientos de la casa.",
    category: "Tacos",
    available: true,
    price: 11000,
  },
  {
    id: "tacos-pollo",
    name: "Tacos de pollo",
    description:
      "Cada orden incluye 3 tacos rellenos de pollo desmechado y acompañamientos de la casa.",
    category: "Tacos",
    available: true,
    price: 11000,
  },
  // Tostones
  {
    id: "tostones-carne",
    name: "Tostones de carne",
    description:
      "Plátano verde crocante con carne desmechada, queso ahogado y maíz tierno.",
    category: "Tostones",
    available: true,
    price: 18000,
  },
  {
    id: "tostones-pollo",
    name: "Tostones de pollo",
    description:
      "Plátano verde crocante con pollo desmechado, queso ahogado y maíz tierno.",
    category: "Tostones",
    available: true,
    price: 18000,
  },
  // Papas & Salchipapas
  {
    id: "papas-casa",
    name: "Papas de la casa",
    description:
      "Papas fritas doradas, crujientes por fuera y suaves por dentro, acompañadas con salsas de la casa.",
    category: "Papas & Salchipapas",
    available: true,
    price: 5000,
  },
  {
    id: "salchipapa-clasica",
    name: "Salchipapa clásica",
    description:
      "Papas fritas con salchicha americana premium y mezcla de salsas de la casa.",
    category: "Papas & Salchipapas",
    available: true,
    price: 7000,
  },
  {
    id: "papa-loka",
    name: "Papa Loka",
    description:
      "Papas fritas cargadas con costilla ahumada, pollo desmechado, queso fundido, papa ripio y salsas especiales de la casa.",
    category: "Papas & Salchipapas",
    available: true,
    price: 20000,
  },
  // Filetes
  {
    id: "filete-cerdo",
    name: "Filete cerdo marinado",
    description:
      "Filete de cerdo marinado a la plancha, acompañado de una porción de papas.",
    category: "Filetes",
    available: true,
    price: 16000,
  },
  {
    id: "filete-pollo",
    name: "Filete pollo de la casa",
    description:
      "200 g de filete de pollo a la plancha, acompañado de una porción de papas.",
    category: "Filetes",
    available: true,
    price: 16000,
  },
  // Bebidas - Refrescos
  {
    id: "coca-2l",
    name: "Coca-Cola 2L",
    description: "Gaseosa clásica en presentación familiar de 2 litros.",
    category: "Bebidas",
    available: true,
    price: 9000,
  },
  {
    id: "coca-1.5l",
    name: "Coca-Cola 1.5L",
    description: "Gaseosa clásica en presentación de 1.5 litros.",
    category: "Bebidas",
    available: true,
    price: 7000,
  },
  {
    id: "gaseosa-1.5l",
    name: "Gaseosa 1.5L",
    description: "Gaseosa refrescante en presentación de 1.5 litros.",
    category: "Bebidas",
    available: true,
    price: 7000,
  },
  {
    id: "gaseosa-litro",
    name: "Gaseosa litro",
    description: "Gaseosa refrescante en presentación de 1 litro.",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  {
    id: "coca-personal",
    name: "Coca-Cola personal",
    description: "Gaseosa clásica en presentación personal de 250 ml.",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "gaseosa-personal",
    name: "Gaseosa personal",
    description: "Gaseosa refrescante en presentación personal de 250 ml.",
    category: "Bebidas",
    available: true,
    price: 2000,
  },
  // Bebidas - Cervezas
  {
    id: "cerveza-corona",
    name: "Cerveza Corona",
    description: "Cerveza lager ligera, refrescante y fácil de tomar.",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  {
    id: "cerveza-club-colombia",
    name: "Cerveza Club Colombia",
    description: "Cerveza lager premium de cuerpo suave.",
    category: "Bebidas",
    available: true,
    price: 6000,
  },
  {
    id: "cerveza-poker",
    name: "Cerveza Poker",
    description: "Cerveza lager suave de sabor tradicional.",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
  {
    id: "cerveza-andina",
    name: "Cerveza Andina",
    description: "Cerveza tipo lager, ligera y refrescante.",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  // Bebidas - Casa
  {
    id: "mr-tea",
    name: "Mr Tea",
    description: "Bebida fría a base de té en presentación de 500 ml.",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "jugo-hit-500",
    name: "Jugo Hit 500ml",
    description:
      "Jugo frutal sin gas en presentación de 500 ml, disponible en varios sabores.",
    category: "Bebidas",
    available: true,
    price: 4000,
  },
  {
    id: "limonada-natural",
    name: "Limonada natural",
    description: "Limonada casera elaborada con limón fresco, bien fría y refrescante.",
    category: "Bebidas",
    available: true,
    price: 8000,
  },
  // Bebidas - Jugos
  {
    id: "jugos-leche",
    name: "Jugos naturales en leche",
    description: "Jugos cremosos elaborados con fruta natural y leche.",
    category: "Bebidas",
    available: true,
    price: 8000,
  },
  {
    id: "jugos-agua",
    name: "Jugos naturales en agua",
    description: "Jugos preparados con fruta fresca y agua.",
    category: "Bebidas",
    available: true,
    price: 5000,
  },
];

export const BEBIDAS = MENU.filter(
  (i) => i.category === "Bebidas" && i.available,
);
