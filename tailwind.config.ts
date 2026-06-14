import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0a0a0f',
        'bg-surface': '#12121a',
        'bg-elevated': '#1a1a24',
        'bg-divider': '#2a2a35',
        'text-primary': '#e8e8ed',
        'text-secondary': '#9d9dab',
        'text-muted': '#5c5c6e',
        accent: '#64ffda',
        'accent-backend': '#4caf50',
        'accent-frontend': '#42a5f5',
        'accent-tools': '#ff9800',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        sans: ['system-ui', '-apple-system', 'Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
