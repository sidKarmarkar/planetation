/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sky: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          900: "#0c4a6e",
        },
        night: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular", "sans-serif"],
        medium: ["Inter_500Medium", "sans-serif"],
        semibold: ["Inter_600SemiBold", "sans-serif"],
        bold: ["Inter_700Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
