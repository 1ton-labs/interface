module.exports = {
  safelist: [
    "text-active",
    "text-listed",
    "text-not-listed",
    "bg-active",
    "bg-listed",
    "bg-not-listed",
    "bg-gray-500",
    "bg-accent",
    "h-[40px]",
    "w-auto"
  ],
  theme: {
    extend: {
      colors: {
        "accent": "#52B3D0", //blue
        "info-white": "#E8E5EB",
        "primary-light": "#B56AFF", //purple
        "primary-normal": "#A682FF",
        "primary-dark": "#715AFF",
        "secondary-light": "#776994", //purple gray
        "secondary-normal": "#332E3D",
        "secondary-dark": "#18181B",


        "twitter": "#1d96e8",
        "tiktok": "#FFFFFF",
        "youtube": "#f70000",
        "instagram": "#d02772",
        "listed": "#52B3D0",
        "active": "#AF70FF",
        "not-listed": "#7D8597"
      }
    },
    boxShadow: {
      "purpleShadow": '0 0px 8px 1px rgba(113,90,255,0.5)',
      "grayShadow": '0 0px 8px 1px rgba(30, 29, 29 ,1)',
    },
    fontFamily: {
      main: ["K2D", "Roboto"],
      inter: ["Inter"],
      sans: ["Noto Sans"],
    },
  },
}
