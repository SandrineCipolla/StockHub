const config = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5a21b5',
        secondary: '#7e56c2',
        accent: '#49148a',
        background: '#000000',
        text: '#ffffff',
        lightBackground: '#ffffff',
        lightText: '#000000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
