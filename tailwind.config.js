const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./*.html", "./*.js"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {
      const newUtilities = {
        ".writing-mode-horizontal": {
          "writing-mode": "horizontal-tb",
        },
        ".writing-mode-vertical": {
          "writing-mode": "vertical-rl",
        },
        ".writing-mode-vertical-lr": {
          "writing-mode": "vertical-lr",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
