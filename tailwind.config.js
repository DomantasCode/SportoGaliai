/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
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
        primary: '#AD46FF',      // Acid Purple (Main Brand Color)
        secondary: '#8EFE00',    // Electric Lime (Accents/Shapes)
        accent: '#FD8432',       // Hot Fire (CTA Buttons)
        dark: '#050505',         // Vamp Black (Backgrounds)
        highlight: '#D8F600',    // Neon Yellow (Highlights)
        neutral: '#7A7A7A',      // Dirty Gray (Text)
        neutralDark: '#1a1a1a',  // Dark Gray (Cards/Components)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Roboto Condensed"', 'sans-serif'],
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
}
