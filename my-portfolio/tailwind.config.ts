// tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class", // Enable dark mode via .dark class
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "custom-dark": "#0c0c0d", // Your custom dark color
      },
      boxShadow:{
                'glow': '0 0 15px rgba(255, 255, 255, 0.1)',

      }
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
