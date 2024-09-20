/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hakgyo: ['HakgyoansimAllimjangTTF-B', 'sans-serif'],
      },
    },
    screens: {
      sm: { min: '390px', max: '1023px' },
      lg: { min: '1024px' },
    },
  },
  plugins: [],
};
