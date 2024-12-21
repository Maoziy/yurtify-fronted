/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2b2d42', // Genel arka plan
        secondary: '#16213e', // Tablolar ve grafikler
        accent: '#0f3460', // Vurgu rengi
        text: '#eaeaea', // Genel metin
        white: '#ffffff', // Beyaz
        red: '#e63946', // Hata renkleri
      },
      backgroundImage: {
        'gradient-to-r-primary': 'linear-gradient(to right, #1a202c, #3182ce)',
        'gradient-to-b-secondary': 'linear-gradient(to bottom, #3182ce, #f7fafc)',
        'gradient-radial-accent': 'radial-gradient(circle, #f56565, #3182ce)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Minimal ve premium font
      },
    },
  },
  plugins: [],
};
