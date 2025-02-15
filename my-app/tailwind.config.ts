import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // For body text
        heading: ["TAN Harmoni", "serif"], // For h1, h2
        subheading: ["BookMania", "serif"], // For h3, h4
        body: ["Roboto", "sans-serif"], // General body text
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        taupe: "#564539",
        isabelline: "#F8F4EF",
        pineGreen: "#136F63",
        ashGray: "#C8D0C9",
        wisteria: "#A6A4D0",
      },
    },
  },
  plugins: [],
} satisfies Config;
