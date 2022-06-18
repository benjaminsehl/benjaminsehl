module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Blanco", "ui-serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate[900]'),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
