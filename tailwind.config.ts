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
        primary: {
          blue: "#131167",
          orange: "#D38122",
          grey: "#666666",
          red: "#DC2626",
          black: "#4C4C4C",
        },
        secondary: {
          blue: "#20184E",
          grey: "#F2F2F2",
        },
        soft: {
          blue: "#E5E7FD",
          orange: "rgba(211, 119, 34, 0.22)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
