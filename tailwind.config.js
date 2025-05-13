/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 0.5s ease-out",
        slideDownFast: "slideDown 0.1s ease-out",
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#4A5A3E",           // Brand Primary
        secondary: "#F7F1E6",         // Brand Secondary
        info: "#1F71BA",              // State - Info
        success: "#27AE60",           // State - Success
        background: "#DEECD7",        // State - Background
        error: "#EB5757",             // State - Error
        black: "#282828",             // Black
        white: "#FFFFFF",            // White
        gray: {
          1: "#828282",              // Gray 1
          2: "#BDBDBD",              // Gray 2
          3: "#E0E0E0",              // Gray 3
        },
      }
    },
    screens: {
      ph: "480px",
      sm: "500px",
      md: "600px",
      lg: "756px",
      xl: "1200px",
    },
  },
  plugins: [],
}