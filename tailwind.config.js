// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      blue: {
        50: '#EBF4FF',
        100: '#D6E8FF',
        400: '#70AEFF',
        600: '#006AF5',
        900: '#004AAD',
      },
      gray: {
        100: '##D1D5DB',
        300: '#B3B3B3',
        500: '#6B7280',
        700: '#374151',
        900: '#1F1F1F',
      },
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      fontFamily: {
        sans: ['Titillium Web', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
