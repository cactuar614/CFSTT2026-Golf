import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a5632',
        'primary-light': '#2d7a4a',
        'primary-dark': '#0e3b21',
        accent: '#c8a951',
        'accent-light': '#e0c96e',
        copper: '#a8612c',
        cream: '#faf6ec',
        parchment: '#f1e7d3',
        linen: '#e6dcc4',
        ink: '#2b2118',
        'ink-soft': '#7c6c59',
        chalk: '#ece2cf',
        char: {
          950: '#140e0b',
          900: '#1b140f',
          800: '#261d15',
          700: '#3a2c1f',
          600: '#564130',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(43, 33, 24, 0.05), 0 6px 20px -10px rgba(43, 33, 24, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
