import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#f5f4f0',
        'bg-surface': '#ebeae5',
        'bg-elevated': '#e2e1dc',
        'bg-divider': '#d1d0cb',
        'text-primary': '#1d1d1f',
        'text-secondary': '#6e6e73',
        'text-muted': '#9a9996',
        accent: '#0066cc',
        'accent-backend': '#4caf50',
        'accent-frontend': '#2563eb',
        'accent-tools': '#f59e0b',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        sans: ['system-ui', '-apple-system', 'Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
