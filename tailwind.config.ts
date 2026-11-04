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
          50: "#FCFAF7",
          100: "#F8F3ED", // Warm ivory background
          200: "#F2EBE1",
          300: "#E8DCCB", // Soft beige image border
          400: "#DECDB6",
        },
        navy: {
          800: "#211714", // Deep espresso
          900: "#1A1210",
          950: "#150E0C", // Deep rich espresso for footer
        },
        espresso: {
          800: "#2E221E",
          900: "#211714", // Deep espresso
          950: "#150E0C",
        },
        gold: {
          400: "#E5BE72",
          500: "#D4A34A", // Warm champagne gold
          600: "#C7943B",
          700: "#B9853D", // Muted antique gold (eyebrows & labels)
        },
        charcoal: {
          700: "#554942",
          800: "#403630", // Soft dark brown body text
          900: "#211714",
        },
        brown: {
          700: "#554942",
          800: "#403630",
          900: "#211714",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Montserrat'", "-apple-system", "sans-serif"],
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

