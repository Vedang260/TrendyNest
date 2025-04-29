/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        light: "#F7FFF7", // Your light color
        dark: "#292F36",  // Your dark color
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        accent: "#FFE66D"
      },
      backgroundColor: { // Specifically for bg- classes
        light: "#F7FFF7",
        dark: "#292F36"
      },
      textColor: { // Specifically for text- classes
        light: "#F7FFF7",
        dark: "#292F36"
      }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
}