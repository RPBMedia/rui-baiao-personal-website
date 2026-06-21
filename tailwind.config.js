/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060D1C',
        'ink-soft': '#0B1928',
        surface: '#0D1E38',
        paper: '#D8E8F8',
        muted: '#6B85A8',
        accent: '#3B9FFF',
        'accent-soft': '#6AB6FF',
        silver: '#9AB2C8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        '6xl': '72rem',
      },
    },
  },
  plugins: [],
}
