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
        body: ["Roboto", "sans-serif"], // General body text
        heading: ["TAN Harmoni", "serif"], // For h1, h2
        subheading: ["Forum", "serif"], // For h3, h4
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
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      spacing: {
        '122': '0.6rem', // 18px (Tailwind uses rem by default, 1rem = 16px)
      },
    },
  },
  plugins: [],
} satisfies Config;
