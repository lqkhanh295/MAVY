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
        brand: {
          primary: "#00153d",
          secondary: "#073372",
          surface: "#051e48",
          card: "#0b2656",
          cardHover: "#0e316e",
          border: "#164082",
          accent: "#F2A900",
          accentHover: "#d99700",
          accentOrange: "#D9480F",
          accentOrangeHover: "#bf3e0b",
          lightBg: "#FAFAFA",
          textLight: "#FFFFFF",
          textMuted: "#E8EEF9",
          textDim: "#9db3d4",
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
