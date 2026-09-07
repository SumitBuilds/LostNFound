/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        'text-dark': 'var(--text-dark)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        drama: ['"Cormorant Garamond"', 'serif'],
        data: ['"IBM Plex Mono"', 'monospace'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
