
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 80% 60%)',
        accent: 'hsl(120 70% 50%)',
        bg: 'hsl(230 10% 95%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(230 15% 20%)',
        'text-secondary': 'hsl(230 10% 45%)',
        border: 'hsl(230 10% 90%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(230, 10%, 20%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
}
