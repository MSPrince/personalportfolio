/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192f",
        secondary: "#f97316",
        tertiary: "#54D6BB",
      },
    },

    screens: {
      lg: { max: "2023px" },
      // => @media (max-width: 1023px) { ... }

      sm: { max: "1000px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
