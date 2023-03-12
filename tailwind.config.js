/** @type {import('tailwindcss').Config} */
const theme_1ton = require("./themes/theme.1ton.js");
const theme_sprout = require("./themes/theme.sprout.js");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: (
    process.env.NEXT_PUBLIC_THEME === "1ton" ? (
      theme_1ton.safelist
    ) : (
      process.env.NEXT_PUBLIC_THEME === "sprout" ? (
        theme_sprout.safelist
      ) : {}
    )
  ),
  theme: (
    process.env.NEXT_PUBLIC_THEME === "1ton" ? (
      theme_1ton.theme
    ) : (
      process.env.NEXT_PUBLIC_THEME === "sprout" ? (
        theme_sprout.theme
      ) : {}
    )
  ),
  plugins: [],
}
