/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1620px',
    },
    extend: {
      colors: {
        primary: '#AE46FF',      // Acid Purple
        secondary: '#BEF400',    // Electric Lime
        accent: '#FD8432',       // Hot Fire (CTA)
        dark: '#000000',         // Vamp Black
        highlight: '#D8F600',    // Neon Yellow
        neutral: '#7C7A7A',      // Dirty Gray
        neutralDark: '#1a1a1a',  // Very Dark Gray
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
