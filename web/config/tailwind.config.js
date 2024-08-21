/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        modalOpen: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        modal: 'modalOpen 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.hover-effect': {
          '@apply hover:bg-gray-600 hover:shadow-md hover:text-green-500 transition-all duration-200':
            {},
        },
      }
      addUtilities(newUtilities, ['hover'])
    },
  ],
}
