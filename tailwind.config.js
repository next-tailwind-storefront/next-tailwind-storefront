module.exports = {
  darkMode: false,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
