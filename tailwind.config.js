/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/public/**/*.html", "./src/public/**/*.js"],
  theme: {
    extend: {
      colors: {
        'aviation-blue': '#0f172a',
        'radar-green': '#22c55e',
      }
    },
  },
  plugins: [],
}