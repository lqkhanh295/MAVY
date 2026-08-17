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
        navy: {
          950: "#00153d", // Deep Ocean Nền chính
          900: "#031a44", // Nền thẻ sâu
          850: "#05255c", // Surface hover
          800: "#073372", // Atmospheric deep navy
          700: "#0c4494", // Highlight border
          600: "#164082", // Hairline border
        },
        coral: {
          DEFAULT: "#FF8A5B", // Warm Coral (Appetite CTA, badges)
          hover: "#e8794c",
          soft: "#FFAA85",
        },
        gold: {
          DEFAULT: "#F4B860", // Champagne Gold (Culinary luxury, crab roe)
          hover: "#e0a248",
          soft: "#FBE0B5",
        },
        teal: {
          DEFAULT: "#0FA3B1", // Ocean marine accent
          hover: "#0c8894",
          soft: "#8ED9D1",
        },
        cream: {
          DEFAULT: "#FFF7E8", // Warm Cream typography (food / editorial feel)
          soft: "#FFFBF2",
          dark: "#F4E8D0",
        },
        ink: {
          light: "#FFF7E8", // Warm cream text
          white: "#FFFFFF",
          warm: "#FFF7E8",
        },
        warm: {
          white: "#FFF7E8",
          cream: "#FFF7E8",
        },
        sale: {
          DEFAULT: "#FF8A5B",
          hover: "#e8794c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-be-vietnam-pro)", "'Be Vietnam Pro'", "sans-serif"],
      },
      boxShadow: {
        "dark-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "card-navy": "0 10px 30px -5px rgba(0, 10, 30, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
