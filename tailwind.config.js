/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // very important to purge unused CSS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
