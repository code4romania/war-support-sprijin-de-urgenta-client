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
        950: '#00478F',
      },
      gray: {
        50: '#F3F4F6',
        100: '#D1D5DB',
        300: '#B3B3B3',
        500: '#6B7280',
        700: '#374151',
        900: '#1F1F1F',
      },
      white: '#FFFFFF',
      black: '#000000',
      red: {
        50: '#BB0000',
      },
      green: {
        50: '#00A542',
      },
      yellow: {
        50: '#FFBA0A'
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1350px',
    },
    extend: {
      fontFamily: {
        sans: ['Titillium Web', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'checkbox-selected': 'url("/icons/checkbox_selected.svg")',
        'radio-selected': 'url("/icons/radio_selected.svg")',
      }
    },
    plugins: [require('@tailwindcss/forms')],
  },
}
