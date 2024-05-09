import type { Config } from "tailwindcss";
import { COLORS } from "@/root/constants/colors";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/root/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "25px",
      },
      colors: COLORS,
      borderRadius: {
        right: "10px 10px 0 10px",
        left: "10px 10px 10px 0",
        top: "0 10px 10px 10px",
      },
      keyframes: {
        shake: {
          "0%,100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%": {
            transform: "translateX(-10px)",
          },
          "20%, 40%, 60%": {
            transform: "translateX(10px)",
          },

          "80%": {
            transform: "translateX(8px)",
          },

          "90%": {
            transform: "translateX(-8px)",
          },
        },
      },
      animation: {
        shake: "shake 0.6s linear",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".wrapper": {
          "padding-top": "20px",
          "padding-bottom": "20px",
          display: "flex",
          "flex-direction": "column",
          "min-height": "100dvh",
        },
        ".title": {
          "font-size": "24px",
          "font-weight": "700",
          "text-align": "center",
        },
        ".buttons": {
          display: "flex",
          "flex-direction": "column",
          gap: "8px",
          position: "sticky",
          bottom: "20px",
          "backdrop-filter": "blur(8px)",
        },
      });
    }),
  ],
};
export default config;
