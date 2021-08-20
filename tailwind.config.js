const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media'
  theme: {
    typography: (theme) => ({}),
    extend: {
      colors: {
        orange: colors.orange,
        facebook: "#1876f2",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      grim: "#1b1f23",
      facebook: "#1876f2",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
