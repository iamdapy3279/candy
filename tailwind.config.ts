import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfcfa",
          100: "#fbf9f8",
          200: "#f6f3f2",
          300: "#f0eded",
          400: "#eae8e7",
        },
        navy: {
          800: "#293170",
          900: "#111a5a",
          950: "#0b1038",
        },
        gold: {
          400: "#ffdf9a",
          500: "#fcc215",
          600: "#f7be0c",
          700: "#6d5200",
        },
        charcoal: {
          800: "#333333",
          900: "#1b1c1c",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        pill: "1rem",
        arch: "16rem 16rem 1rem 1rem",
      },
      boxShadow: {
        subtle: "0 10px 30px -10px rgba(41, 49, 112, 0.08)",
        elevated: "0 20px 40px -15px rgba(41, 49, 112, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

