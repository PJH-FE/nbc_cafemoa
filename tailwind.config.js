/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hakgyo: ['HakgyoansimAllimjangTTF-B', 'sans-serif'],
      },
      colors: {
        primary01: '#61443A',
        primary02: '#A57454',
        primary03: '#F4EFEB',
      },
    },
    screens: {
      sm: { max: '1023px' },
      lg: { min: '1024px' },
    },
  },
  plugins: [],
};
