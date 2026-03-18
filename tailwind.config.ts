import type { Config } from 'tailwindcss'

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
        accent: '#c8a951',
        'accent-light': '#e0c96e',
      },
    },
  },
  plugins: [],
}
export default config
