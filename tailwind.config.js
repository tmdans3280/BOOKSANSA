/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
