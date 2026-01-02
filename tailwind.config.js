module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'dark-bg-start': '#1a1a2e',
        'dark-bg-middle': '#16213e',
        'dark-bg-end': '#0f3460',
        'dark-accent-start': '#667eea',
        'dark-accent-middle': '#764ba2',
        'dark-accent-end': '#f093fb',

        // Light theme colors
        'light-bg-start': '#f0f4f8',
        'light-bg-middle': '#e2e8f0',
        'light-bg-end': '#cbd5e0',
        'light-accent-start': '#667eea',
        'light-accent-middle': '#764ba2',
        'light-accent-end': '#f093fb',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'gradient-light': 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 50%, #cbd5e0 100%)',
        'gradient-accent': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
