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
        coral: {
          DEFAULT: "#FF6B5A", // Coral chính (CTA, accents, prices, badges)
          hover: "#e55746",
          soft: "#FFB4A8",    // Soft Coral (subtle badges, highlights, gradients)
          light: "#FFD2CA",
        },
        gold: {
          DEFAULT: "#FF6B5A", // Mapped to Coral for seamless compatibility
          hover: "#e55746",
          soft: "#FFB4A8",
        },
        ink: {
          light: "#FFF5EF", // Warm white text
          white: "#FFFFFF",
          warm: "#FFF5EF",
        },
        warm: {
          white: "#FFF5EF",
          cream: "#FDEFE7",
        },
        sale: {
          DEFAULT: "#FF6B5A",
          hover: "#e55746",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-be-vietnam-pro)", "'Be Vietnam Pro'", "sans-serif"],
      },
      boxShadow: {
        "coral-subtle": "0 4px 20px -2px rgba(255, 107, 90, 0.25)",
        "coral-glow": "0 0 35px rgba(255, 107, 90, 0.35)",
        "gold-subtle": "0 4px 20px -2px rgba(255, 107, 90, 0.25)",
        "gold-glow": "0 0 35px rgba(255, 107, 90, 0.35)",
        "card-navy": "0 10px 30px -5px rgba(0, 10, 30, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
