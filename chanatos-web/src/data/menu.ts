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
  /** Ruta de la imagen del producto en /public */
  image?: string;
  /** Variantes de sabor (ej. Hit): cada una con su propia imagen. `image` de arriba se usa como default antes de elegir. */
  flavors?: { id: string; name: string; image: string }[];
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
    image: "/products/hamburguesas/hamburguesa-clasica.jpg",
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
    image: "/products/hamburguesas/hamburguesa-chanata.jpg",
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
    image: "/products/hamburguesas/hamburguesa-doble-carne.jpg",
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
    image: "/products/perros-calientes/perro-clasico.jpg",
  },
  {
    id: "perro-especial",
    name: "Perro Especial",
    description:
      "Salchicha americana, pollo desmechado, queso, papa ripio, pan artesanal y salsas de la casa.",
    category: "Perros calientes",
    available: true,
    price: 11000,
    image: "/products/perros-calientes/perro-especial.jpg",
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
    image: "/products/filetes/filete-pollo.jpg",
  },
  {
    id: "filete-cerdo",
    name: "Filete de Cerdo",
    description:
      "Filete de cerdo marinado a la plancha, acompañado de una porción de papas.",
    category: "Filetes",
    available: true,
    price: 16000,
    image: "/products/filetes/filete-cerdo.jpg",
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
    image: "/products/papas-salchipapas/papas-sencilla.jpg",
  },
  {
    id: "salchipapa-sencilla",
    name: "Salchipapa Sencilla",
    description:
      "Papas fritas doradas con salchicha americana premium y mezcla de salsas.",
    category: "Papas & Salchipapas",
    available: true,
    price: 7000,
    image: "/products/papas-salchipapas/salchipapa-sencilla.jpg",
  },
  {
    id: "papa-loka",
    name: "Papa LoKa",
    description:
      "Papas fritas cargadas con costilla ahumada, pollo desmechado, queso fundido, papa ripio y mezcla de salsas especiales de la casa.",
    category: "Papas & Salchipapas",
    available: true,
    price: 20000,
    image: "/products/papas-salchipapas/papa-loka.jpg",
  },
  // Sándwiches
  {
    id: "sandwich-pollo",
    name: "Sandwich de Pollo",
    description: "Pan, pollo, lechuga y tomate con salsas de la casa.",
    category: "Sándwiches",
    available: true,
    price: 11000,
    image: "/products/sandwiches/sandwich-pollo.jpg",
  },
  // Bebidas - Gaseosas personales (250 ml)
  {
    id: "pepsi-personal",
    name: "Pepsi Personal",
    description: "Gaseosa Pepsi en botella de vidrio de 250 ml.",
    category: "Bebidas",
    available: true,
    price: 2000,
    image: "/products/bebidas/pepsi-personal.jpg",
  },
  {
    id: "postobon-uva-personal",
    name: "Postobón Uva Personal",
    description: "Gaseosa Postobón sabor uva en botella de vidrio de 250 ml.",
    category: "Bebidas",
    available: true,
    price: 2000,
    image: "/products/bebidas/postobon-uva-personal.jpg",
  },
  {
    id: "postobon-naranja-personal",
    name: "Postobón Naranja Personal",
    description:
      "Gaseosa Postobón sabor naranja en botella de vidrio de 250 ml.",
    category: "Bebidas",
    available: true,
    price: 2000,
    image: "/products/bebidas/postobon-naranja-personal.jpg",
  },
  {
    id: "colombiana-personal",
    name: "Colombiana Personal",
    description: "Gaseosa Colombiana en botella de vidrio de 250 ml.",
    category: "Bebidas",
    available: true,
    price: 2000,
    image: "/products/bebidas/colombiana-personal.jpg",
  },
  {
    id: "cuatro-toronja-personal",
    name: "Cuatro Toronja Personal",
    description: "Gaseosa Cuatro sabor toronja en botella personal.",
    category: "Bebidas",
    available: true,
    price: 2000,
    image: "/products/bebidas/cuatro-toronja-personal.jpg",
  },
  {
    id: "coca-cola-personal",
    name: "Coca-Cola Personal",
    description: "Gaseosa Coca-Cola sabor original en botella de 500 ml.",
    category: "Bebidas",
    available: true,
    price: 5000,
    image: "/products/bebidas/coca-cola-personal.jpg",
  },
  // Bebidas - Formato familiar
  {
    id: "postobon-manzana",
    name: "Postobón Manzana",
    description: "Gaseosa Postobón sabor manzana en botella familiar.",
    category: "Bebidas",
    available: true,
    price: 6000,
    image: "/products/bebidas/postobon-manzana.jpg",
  },
  {
    id: "pepsi-familiar",
    name: "Pepsi Familiar",
    description: "Gaseosa Pepsi en botella familiar.",
    category: "Bebidas",
    available: true,
    price: 6000,
    image: "/products/bebidas/pepsi-familiar.jpg",
  },
  {
    id: "colombiana-familiar",
    name: "Colombiana Familiar",
    description: "Gaseosa Colombiana en botella familiar.",
    category: "Bebidas",
    available: true,
    price: 6000,
    image: "/products/bebidas/colombiana-familiar.jpg",
  },
  {
    id: "postobon-naranja-familiar",
    name: "Postobón Naranja 1.25L",
    description: "Gaseosa Postobón sabor naranja en botella de 1.25 L.",
    category: "Bebidas",
    available: true,
    price: 6000,
    image: "/products/bebidas/postobon-naranja-familiar.jpg",
  },
  {
    id: "cuatro-toronja",
    name: "Cuatro Toronja",
    description: "Gaseosa Cuatro sabor toronja en botella familiar.",
    category: "Bebidas",
    available: true,
    price: 6000,
    image: "/products/bebidas/cuatro-toronja.jpg",
  },
  {
    id: "hit",
    name: "Hit",
    description: "Refresco de fruta Hit en botella de 500 ml. Elige tu sabor.",
    category: "Bebidas",
    available: true,
    price: 4000,
    image: "/products/bebidas/hit-mora.jpg",
    flavors: [
      { id: "mora", name: "Mora", image: "/products/bebidas/hit-mora.jpg" },
      { id: "mango", name: "Mango", image: "/products/bebidas/hit-mango.jpg" },
      {
        id: "naranja-pina",
        name: "Naranja-Piña",
        image: "/products/bebidas/hit-naranja-pina.jpg",
      },
      {
        id: "frutas-tropicales",
        name: "Frutas Tropicales",
        image: "/products/bebidas/hit-frutas-tropicales.jpg",
      },
      { id: "lulo", name: "Lulo", image: "/products/bebidas/hit-lulo.jpg" },
    ],
  },
  {
    id: "mr-tea",
    name: "Mr Tea Limón",
    description: "Bebida fría a base de té sabor limón en botella familiar.",
    category: "Bebidas",
    available: true,
    price: 4000,
    image: "/products/bebidas/mr-tea.jpg",
  },
  {
    id: "agua-mia",
    name: "Agua Mía 600ml",
    description: "Agua potable tratada en presentación de 600 ml.",
    category: "Bebidas",
    available: true,
    price: 3000,
    image: "/products/bebidas/agua-mia.jpg",
  },
  // Bebidas - Cervezas
  {
    id: "cerveza-andina",
    name: "Cerveza Andina",
    description: "Cerveza tipo lager, ligera y refrescante.",
    category: "Bebidas",
    available: true,
    price: 5000,
    image: "/products/bebidas/cerveza-andina.jpg",
  },
  {
    id: "cerveza-poker",
    name: "Cerveza Poker",
    description: "Lager suave de sabor tradicional.",
    category: "Bebidas",
    available: true,
    price: 5000,
    image: "/products/bebidas/cerveza-poker.jpg",
  },
  {
    id: "cerveza-heineken",
    name: "Cerveza Heineken",
    description: "Cerveza lager de carácter más marcado.",
    category: "Bebidas",
    available: true,
    price: 5000,
    image: "/products/bebidas/cerveza-heineken.jpg",
  },
  {
    id: "cerveza-corona",
    name: "Cerveza Corona",
    description: "Lager premium de cuerpo suave.",
    category: "Bebidas",
    available: true,
    price: 6000,
    image: "/products/bebidas/cerveza-corona.jpg",
  },
  // Bebidas - Jugos naturales y otros
  {
    id: "jugos-agua",
    name: "Jugos Naturales en Agua",
    description: "Jugos preparados con fruta fresca y agua.",
    category: "Bebidas",
    available: true,
    price: 5000,
    image: "/products/bebidas/jugos-agua.jpg",
  },
  {
    id: "jugos-leche",
    name: "Jugos Naturales en leche",
    description: "Jugos cremosos elaborados con fruta natural y leche.",
    category: "Bebidas",
    available: true,
    price: 8000,
    image: "/products/bebidas/jugos-leche.jpg",
  },
  {
    id: "michelada",
    name: "Michelada",
    description: "Cerveza servida con limón, sal y un toque refrescante.",
    category: "Bebidas",
    available: true,
    price: 8000,
    image: "/products/bebidas/michelada.jpg",
  },
  {
    id: "limonada-natural",
    name: "Limonada Natural",
    description: "Limonada casera elaborada con limón fresco.",
    category: "Bebidas",
    available: true,
    price: 8000,
    image: "/products/bebidas/limonada-natural.jpg",
  },
];

export const BEBIDAS = MENU.filter(
  (i) => i.category === "Bebidas" && i.available,
);
