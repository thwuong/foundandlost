/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2457C5",
        secondary: "#F3F3F3",
        title: "#000000",
        paragarch: "#333333",
        caption: "#CCCCCC",
      },
    },
  },
  plugins: [],
};
