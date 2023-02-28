/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2457C5",
        secondary: "#F3F3F3",
        title: "#000000",
        "paragarph-black": "#333333",
        "paragarph-white": "#FEFEFE",
        caption: "#424680",
      },
      backgroundImage: {
        main: "url('/src/assets/Bg.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};