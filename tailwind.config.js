/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'brand-orange': '#FF4521',
      'brand-orange-hover': '#FF5A3A',
      'brand-black': '#16171F',
      'surface-1': '#191919',
      'surface-2': '#262626',
      border: '#333333',
      'border-strong': '#767783',
      'text-primary': '#FFFFFF',
      'text-muted': '#A3A5AC',
      white: '#FFFFFF',
      error: '#FF8A80',
      // Light sections
      'light-1': '#F8F8F9',
      'light-border': '#E8E8EA',
      ink: '#16171F',
      'ink-muted': '#484A59',
      'ink-placeholder': '#666666',
      'brand-orange-deep': '#DE2400',
      'error-light': '#B3261E',
    },
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', '"Inter Fallback"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '12px',
        control: '10px',
      },
    },
  },
  plugins: [],
}
