/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      grass: '#77C850',
      fire: '#F08030',
      water: '#6890F0',
      ice: '#98D8D8',
      fighting: '#C0241B',
      normal: '#A8A878',
      flying: '#A890F0',
      psychic: '#F85888',
      ground: '#E0C068',
      poison: '#A040A0',
      dragon: '#7038F8',
      electric: '#FFCC33',
      ghost: '#6666BB',
      dark: '#705848',
      rock: '#B8A038',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
      bug: '#A8B821',
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '800px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '722px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}

