/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: '#0f1c2e',
        gold: '#c8a96e',
        'gold-light': '#e2c98a',
        cream: '#f5f0e8',
        'text-dark': '#1a1a2e',
        'text-muted': '#8a9bb5',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost: ['"Jost"', 'sans-serif'],
      },
      backgroundImage: {
        'diagonal-lines':
          'repeating-linear-gradient(45deg, rgba(200,169,110,0.04) 0px, rgba(200,169,110,0.04) 1px, transparent 1px, transparent 12px)',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'orb-float': 'orbFloat 10s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        orbFloat: {
          '0%,100%': { opacity: '0.15', transform: 'scale(1) translate(0,0)' },
          '50%': { opacity: '0.25', transform: 'scale(1.15) translate(20px,-15px)' },
        },
      },
    },
  },
  plugins: [],
}
