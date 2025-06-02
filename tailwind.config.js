/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: "#53423C",
        primary: "#0f5800",
        secondary: "#ffffff",
        background: "#f7f7f7",
      },
    },
  },
  plugins: [],
}


