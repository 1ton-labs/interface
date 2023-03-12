module.exports = {
  safelist: [
    "text-active",
    "text-listed",
    "text-not-listed",
    "bg-active",
    "bg-listed",
    "bg-not-listed",
    "bg-gray-500",
  ],
  theme: {
    extend: {
      colors: {
        "accent": "#E3C752", //yellow
        "info-white": "#D7DBD4",
        "primary-light": "#9CFF2E", //green
        "primary-normal": "#7FAF03",
        "primary-dark": "#7FAF03",
        "secondary-light": "#77856F", //green gray
        "secondary-normal": "#232B25",
        "secondary-dark": "#232B25",

        "twitter": "#1d96e8",
        "tiktok": "#FFFFFF",
        "youtube": "#f70000",
        "instagram": "#d02772",
        "listed": "#E3C752",
        "active": "#7FAF03",
        "not-listed": "#77856F"
      }
    },
    boxShadow: {
      "nav-greenShadow": '0px 1px 10px rgba(119, 133, 111, 0.5)',
      "greenShadow": '2px 2px 6px rgba(119, 133, 111, 0.5)',
      "grayShadow": '0 0px 8px 1px rgba(30, 29, 29 ,1)',
    },
    fontFamily: {
      main: ["K2D", "Roboto"],
      inter: ["Inter"],
      sans: ["Noto Sans"],
    },
  },
}
