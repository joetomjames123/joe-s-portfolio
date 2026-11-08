/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          900: 'var(--bg-primary, #050807)',
          800: 'var(--bg-secondary, #101613)',
          700: '#17221C',
          600: '#213129'
        },
        emerald: {
          glow: 'var(--accent-glow, rgba(0, 201, 135, 0.4))',
          accent: 'var(--accent-color, #00C987)',
          dark: '#008F60',
          light: '#33E6AA'
        },
        silver: {
          metallic: 'var(--secondary-accent, #C7D0CC)',
          highlight: '#E2E8E5',
          subtle: '#8C9A93'
        },
        typography: {
          primary: 'var(--text-primary, #F4F6F4)',
          secondary: 'var(--text-secondary, #A7B3AD)',
          muted: 'var(--text-muted, #66766F)'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'emerald-glow': '0 0 25px -5px var(--accent-glow, rgba(0, 201, 135, 0.3))',
        'emerald-strong': '0 0 45px -5px var(--accent-glow, rgba(0, 201, 135, 0.5))',
        'glass-rim': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

