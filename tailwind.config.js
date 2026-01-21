/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F4F9",  // lightest
          100: "#CBF9FF",
          200: "#A8EFF9",
          300: "#79E4F3",
          400: "#02C6E1",
          500: "#009DB3",  // main brand color
          600: "#006B7A",  // darker
          700: "#005561",
          800: "#004049",
          900: "#002B31",
        }
      }
    },
  },
  plugins: [],
}
