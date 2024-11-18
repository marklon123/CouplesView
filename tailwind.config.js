/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#453939",
        secondary: "#E889A1",
        tertiary: "#fac8d5",
        cta: "#430313",
        cta_hover: "#5f0219c6",
        footer: "#3b3030",
        primary_variant: "#564b4b",
      }
    },
  },
  plugins: [],
}

