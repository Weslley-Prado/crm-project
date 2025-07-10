/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // Deep blue
        secondary: '#3b82f6', // Lighter blue
        accent: '#10b981', // Green for buttons
        background: '#f9fafb' // Light gray background
      }
    }
  },
  plugins: []
}
