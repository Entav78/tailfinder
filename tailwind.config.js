/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#D7CCC8",
        header: "#53423C",
        'header-hover': '#6c564f',
        primary: "#53423C",
        'primary-hover': '#6c564f',
        secondary: '#A68B7C',
        'secondary-hover': '#7a5d4c',
        reveal: '#0E1C26',
        'reveal-hover': '#eab308',
        adoptedBadge: '#233511',
        
        dark: {
          background: "#1a1a1a",
          header: "#3a2e2a",
          primary: "#126c16",
        }
      },
    },
  },
  plugins: [],
}


