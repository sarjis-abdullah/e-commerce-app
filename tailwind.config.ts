import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        lbounce: "lbounce 1s infinite",
        rbounce: "rbounce 1s infinite",
      },
      keyframes: {
        lbounce: {
          "0%, 100%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        rbounce: {
          "0%, 100%": {
            transform: "translateX(25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/aspect-ratio"),
    function ({ addVariant, e }: any) {
      addVariant("group-hover", ({ modifySelectors, separator }: any) => {
        modifySelectors(({ className }: any) => {
          return `.group:hover .${e(`group-hover${separator}${className}`)}`;
        });
      });
    },
  ],
};
export default config;
