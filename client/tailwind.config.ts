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
        primary: "#18181B",
        secondary: "#8B8B8D",
        background: "#FAF9F6"
      },
      boxShadow: {
        custom_first: 'rgba(149, 157, 165, 0.4) 0px 8px 24px',
        custom_second: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        custom_third: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }
    },
  },
  plugins: [],
};
export default config;
