import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ui: {
          bg: "#FFFFFF",
          main: "#8A6D23",
          muted: "#6B7280",
          border: "#E5E7EB",
          primary: "#E3A73D",
          "primary-dark": "#8A6D23",
          "primary-light": "#FFF8E7",
          text: "#111827",
          whatsapp: "#22C55E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
