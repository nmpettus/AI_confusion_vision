/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        friendly: ['Trebuchet MS', 'Verdana', 'sans-serif']
      },
      keyframes: {
        pop: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      animation: {
        pop: 'pop 1.4s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
