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
        date: "#6E798C",
      },
      fontSize: {
        s: "12px",
      },
      backgroundImage: {
        main: "url('/src/assets/systemImage2.jpg')",
        extra: "url('/src/assets/systemImage.jpg')",
        // profile: "url('/src/assets/bgProfile.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
