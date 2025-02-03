/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        principal: "#d1d5ed",
        secondary: "#213c81",
        third: "#f0f0f0",
        buttons: "#7d8ac4",
        "buttons-secondary": "#d1d5ed",
      },
      colors: {
        principal: "#5e5e5e",

        secondary: "#213c81",
      },
    },
  },
  plugins: [],
});
