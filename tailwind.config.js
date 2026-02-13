/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#2A263D',
        'brand-green': '#39b54a',
        'brand-grey': '#38344d',
      },
    },
  },
  plugins: [],
}
