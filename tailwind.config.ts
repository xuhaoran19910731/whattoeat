import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        spring: 'hsl(var(--spring))',
        summer: 'hsl(var(--summer))',
        autumn: 'hsl(var(--autumn))',
        winter: 'hsl(var(--winter))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Noto Sans SC', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'soft': '0 4px 20px -4px hsl(var(--primary) / 0.15)',
        'glow': '0 0 30px hsl(var(--primary) / 0.3)',
        'card': '0 10px 40px -10px hsl(var(--foreground) / 0.1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)',
        'gradient-hero': 'linear-gradient(180deg, hsl(var(--primary) / 0.1) 0%, transparent 100%)',
        'gradient-card': 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
        'gradient-spring': 'linear-gradient(135deg, hsl(var(--spring)) 0%, hsl(142 76% 46%) 100%)',
        'gradient-summer': 'linear-gradient(135deg, hsl(var(--summer)) 0%, hsl(35 100% 55%) 100%)',
        'gradient-autumn': 'linear-gradient(135deg, hsl(var(--autumn)) 0%, hsl(25 95% 58%) 100%)',
        'gradient-winter': 'linear-gradient(135deg, hsl(var(--winter)) 0%, hsl(210 90% 60%) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
