/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Tailwindを適用するファイルパス
    "./public/**/*.html",         // 必要に応じてHTMLも含める
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        gray: {
          50: "#F9FAFB",
          800: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
