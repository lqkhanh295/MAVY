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
          900: "#041c48", // Deep Ocean Nền thẻ, surface
          800: "#073372", // Deep Ocean Nền thứ cấp, border phụ
          700: "#0c4494", // Hover state
          600: "#164082", // Border chính
        },
        teal: {
          DEFAULT: "#0FA3B1", // Vibrant Teal chính (CTA, accents, prices, badges)
          hover: "#0c8894",
          soft: "#8ED9D1",    // Soft Teal (ingredient tags, glow, particles, gradients)
          light: "#B8EBE5",
        },
        coral: {
          DEFAULT: "#0FA3B1",
          hover: "#0c8894",
          soft: "#8ED9D1",
        },
        gold: {
          DEFAULT: "#0FA3B1", // Mapped to Teal for seamless backward compatibility
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
          DEFAULT: "#0FA3B1",
          hover: "#0c8894",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-be-vietnam-pro)", "'Be Vietnam Pro'", "sans-serif"],
      },
      boxShadow: {
        "teal-subtle": "0 4px 20px -2px rgba(15, 163, 177, 0.25)",
        "teal-glow": "0 0 35px rgba(15, 163, 177, 0.35)",
        "coral-subtle": "0 4px 20px -2px rgba(15, 163, 177, 0.25)",
        "coral-glow": "0 0 35px rgba(15, 163, 177, 0.35)",
        "gold-subtle": "0 4px 20px -2px rgba(15, 163, 177, 0.25)",
        "gold-glow": "0 0 35px rgba(15, 163, 177, 0.35)",
        "card-navy": "0 10px 30px -5px rgba(0, 10, 30, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
