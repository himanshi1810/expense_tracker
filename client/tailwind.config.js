module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        black: '#0b0d10',
        grey: {
          '100': '#8d8d8d',
        },
        white: '#fdfdfd',
        primary: '#5c85e7',
      },
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
    },
  },
  plugins: [],
};
