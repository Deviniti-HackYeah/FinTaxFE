/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {},
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
          primary: '#015497',
          secondary: '#dc0032',
          accent: '#f7f7fa',

          '--rounded-badge': '.3rem',
          '--rounded-box': '0.3rem',
          '--rounded-btn': '.3rem',
          '--tab-radius': '0.3rem',
          '--btn-focus-scale': '1',

          'base-100': '#ffffff',
        },
      },
    ],
  },
};
