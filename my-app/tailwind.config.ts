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
        body: ["Roboto", "sans-serif"],
        heading: ["TAN Harmoni", "serif"],
        subheading: ["Forum", "serif"],
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
        '122': '0.6rem',
      },
      backdropBlur: {
        'xs': '2px',
        'ultra-light': '4px',
        'light': '8px',
        'medium': '12px',
        'heavy': '16px',
      },
      backdropOpacity: {
        '0': '0',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
      }
    },
  },
  plugins: [
    // Add a plugin to force backdrop-filter support
    function({ addBase, theme }) {
      addBase({
        '.backdrop-blur-heavy': {
          '-webkit-backdrop-filter': `blur(${theme('backdropBlur.heavy')})`,
          'backdrop-filter': `blur(${theme('backdropBlur.heavy')})`,
        },
        // Add fallback for browsers with limited support
        '.backdrop-blur-fallback': {
          background: 'rgba(255, 255, 255, 0.7)',
          '-webkit-backdrop-filter': 'blur(8px)',
          'backdrop-filter': 'blur(8px)',
        }
      });
    }
  ],
  // Ensure variants are correctly extended
  variants: {
    extend: {
      backdropFilter: ['responsive', 'hover', 'focus'],
      backdropBlur: ['responsive', 'hover', 'focus'],
      backdropOpacity: ['responsive', 'hover', 'focus']
    }
  },
} satisfies Config;