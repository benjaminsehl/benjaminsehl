module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Blanco", "ui-serif"],
      },
      colors: {
        black: "var(--color-black)",
        darkGray: "var(--color-darkGray)",
        gray: "var(--color-gray)",
        lightGray: "var(--color-lightGray)",
        offWhite: "var(--color-offWhite)",
        white: "var(--color-white)",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.slate[900]"),
          },
        },
      }),
    },
  },
};
