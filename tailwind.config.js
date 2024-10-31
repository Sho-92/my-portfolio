/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',  // src内のHTMLおよびJSファイルを監視
    './docs/**/*.html'        // docs内のHTMLファイルを監視
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

