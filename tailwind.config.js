/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      cursor: ["hover", "active"],
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "custom-focus": "0px 4px 12.2px 0px #D5ABF7",
      },
      animation: {
        jiggle: "jiggle 0.5s ease-in-out",
      },
      keyframes: {
        jiggle: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  variants: {
    extend: {
      cursor: ["hover", "active"], // Enable `hover` and `active` variants for `cursor`
    },
  },
  plugins: [],
};
