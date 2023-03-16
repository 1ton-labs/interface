/** @type {import('tailwindcss').Config} */
const theme_1ton = require("./themes/theme.1ton.js");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: theme_1ton.safelist,
  theme: theme_1ton.theme,
  plugins: [],
}
