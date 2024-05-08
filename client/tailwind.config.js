/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
        "blue": {
          100: "#A6BBF2",
          200: "#8BA5F7",
          300: "#708FFB",
          400: "#5C85E7",
          500: "#3B63FF",
          600: "#325BCF",
          700: "#2B50B3",
          800: "#234598",
          900: "#1C3A7D",
        },
        "gray": {
          100: "#BEBEBE",
          200: "#A4A4A4",
          300: "#8A8A8A",
          400: "#8D8D8D",
          500: "#565656",
          600: "#3C3C3C",
          700: "#222222",
          800: "#080808",
          900: "#000000",
        },
        "black": {
          100: "#242830",
          200: "#1E2234",
          300: "#171A28",
          400: "#0B0D10",
          500: "#0A0C10",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        "white": {
          DEFAULT: "#FFFFFF",
          100: "#F2F2F2",
          200: "#E5E5E5",
          300: "#D9D9D9",
          400: "#CCCCCC",
          500: "#BFBFBF",
          600: "#B2B2B2",
          700: "#A6A6A6",
          800: "#999999",
          900: "#8C8C8C",
        },
        "pink": {
          5: "#FFF1F1",
          25: "#FBC7D1",
          50: "#F79CB0",
          100: "#F37290",
          200: "#EF476F",
          300: "#D43D63",
          400: "#BA3356",
          500: "#9F294A",
          600: "#841E3E",
          700: "#691432",
          800: "#4F0A25",
          900: "#340019",
        },
      },
      borderWidth: {
        default: '1px',
        '0': '0',
        '2': '2px',
        'hairline': '0.02px', // Define a custom width named 'hairline'
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "edu-sa": ["Edu SA Beginner", "cursive"],
        mono: ["Roboto Mono", "monospace"],
        poppins: ["Poppins", "sans-serif"],

      },
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),
  ],
};
