/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        light: '#72a1c6',
        lighter: '#e4eef6',
        lightest: '#f7fafc',
        tertiary: '#DC0032',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'dark',
    themeRoot: 'body',
    prefix: 'daisy-',
    styled: true,
    themes: [
      {
        default: {
          primary: '#113694',
          secondary: '#8ac8ef',
          accent: '#f7f7fa',

          '--rounded-badge': '0.3rem',
          '--rounded-box': '0.3rem',
          '--rounded-btn': '1.3rem',
          '--tab-radius': '0.3rem',
          '--btn-focus-scale': '1',

          'base-100': '#ffffff',
        },
      },
    ],
  },
};
