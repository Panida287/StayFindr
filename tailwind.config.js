/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        alt: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#D90A52",
        secondary: "#F2994A",
        accent: "#1F71BA",
        subtleAccent: "#E2B93B",
        gray: {
          light: "#F5F5F5",
          DEFAULT: "#BDBDBD",
          dark: "#4F4F4F"
        },
        error: "#EB5757",
        warning: "#E2B93B",
        success: "#27AE60"
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
