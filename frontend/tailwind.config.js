// tailwind.config.js
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5a21b5',      // violet foncé
        secondary: '#7e56c2',    // violet plus clair
        accent: '#49148a',        // violet profond
        background: '#000000',    // noir pour le mode sombre
        text: '#ffffff',          // blanc pour le mode sombre
        lightBackground: '#ffffff', // blanc pour le mode clair
        lightText: '#000000',     // noir pour le mode clair
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
