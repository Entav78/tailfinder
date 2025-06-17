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
        background: "#E8E0DC",
        header: "#53423C",
        'header-hover': '#6c564f',
        primary: "#53423C",
        'primary-hover': '#6c564f',
        secondary: '#A68B7C',
        'secondary-hover': '#7a5d4c',
        reveal: '#53423C',
        'reveal-hover': '#8c705f',
        adoptedBadge: '#233511',
      
        // Tekstfarger (flatet ut)
        'text-base': '#1a1a1a',    
        'text-base-dark': '#f5f5f5',
        'text-muted': '#6b4d43', 
        'text-light': '#2b1e1a',
        'text-dark': '#1a1a1a',
        'text-subtle': '#e0dcd9',
        'text-soft': '#f5f5f5',
        'text-placeholder': '#999999',
        'text-button-light': '#ffffff',

          // Traffic-colors 
        'traffic-green': '#065f46',         // Approved (lys modus)
        'traffic-green-dark': '#34d399',    // Approved (dark mode)

        'traffic-yellow': '#92400e',        // Pending (lys modus)
        'traffic-yellow-dark': '#facc15',   // Pending (dark mode)

        'traffic-red': '#b91c1c',           // Declined (lys modus)
        'traffic-red-dark': '#f87171',      // Declined (dark mode)
          
        // Form bakgrunner
        'form-bg': '#fef6f2',
        'form-bg-dark': '#1e1e1e',
      
        // Dark mode bakgrunner osv.
        'dark-bg': '#242424',
        'dark-header': '#3a2e2a',
        'dark-primary': '#126c16',
      
        // Input og border
        'input-light': '#ffffff',
        'input-dark': '#3b3b3b',
        'border-light': '#d6c7bf',
        'border-dark': '#666666',

        // Card
        'card': '#ffffff',
        'darkCard': '#2d2d2d',
      }
    },
  },
  plugins: [],
}


