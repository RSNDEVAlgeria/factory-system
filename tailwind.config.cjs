/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#252323',
        accent: '#70798c',
        background: '#f5f1ed',
        surface: '#dad2bc',
        muted: '#a99985',
        danger: '#e66767',
      },
      borderRadius: {
        md: '6px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
