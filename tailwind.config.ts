import type { Config } from "tailwindcss";

// RULE: Do not write arbitrary hex values (e.g. [#00153d]) in components. Always use tokens (navy-*, gold, ink-*, sale).
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
          950: "#00153d", // Nền chính
          900: "#051e48", // Nền thẻ, surface
          800: "#073372", // Nền thứ cấp, border phụ
          700: "#0c4494", // Hover state
          600: "#164082", // Border chính
        },
        gold: {
          DEFAULT: "#F2A900",
          hover: "#d99700",
        },
        ink: {
          light: "#E8EEF9", // Text sáng trên nền tối
          white: "#FFFFFF",
        },
        sale: {
          DEFAULT: "#D9480F",
          hover: "#bf3e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-be-vietnam-pro)", "'Be Vietnam Pro'", "sans-serif"],
      },
      boxShadow: {
        "gold-subtle": "0 4px 20px -2px rgba(242, 169, 0, 0.25)",
        "gold-glow": "0 0 35px rgba(242, 169, 0, 0.35)",
        "card-navy": "0 10px 30px -5px rgba(0, 10, 30, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
