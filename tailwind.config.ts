import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-rubik)', 'sans-serif'],
        mono: ['var(--font-inter)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
