/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#08080C',
          secondary: '#0E0F14',
          tertiary: '#13141A',
          card: '#16171F',
          elevated: '#1C1D27',
          glass: 'rgba(22, 23, 31, 0.7)',
        },
        gold: {
          50: '#FEF9EC',
          100: '#FBF0CF',
          200: '#F5DC9A',
          300: '#EFC865',
          400: '#E8B430',
          500: '#D4A520',
          600: '#B8891A',
          700: '#966D16',
          800: '#7A5813',
          900: '#644711',
        },
        champagne: {
          DEFAULT: '#F2DFA7',
          light: '#F9EECD',
          dark: '#C9B474',
        },
        text: {
          primary: '#F0EDE6',
          secondary: '#9B97A0',
          muted: '#5F5C66',
        },
        accent: {
          blue: '#3D5A99',
          warm: '#C17F4E',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Plus Jakarta Sans', 'Helvetica Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        hero: [
          'clamp(3.5rem, 7vw, 7rem)',
          { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '600' },
        ],
        section: [
          'clamp(2.2rem, 5vw, 4rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
        subtitle: [
          'clamp(1.05rem, 1.8vw, 1.3rem)',
          { lineHeight: '1.6' },
        ],
      },
      spacing: {
        section: 'clamp(6rem, 14vw, 10rem)',
      },
      borderColor: {
        subtle: 'rgba(212, 165, 32, 0.1)',
        'subtle-strong': 'rgba(212, 165, 32, 0.2)',
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #D4A520 0%, #F2DFA7 40%, #D4A520 70%, #E8C665 100%)',
        'dark-fade': 'linear-gradient(to bottom, transparent 0%, #08080C 100%)',
        'card-shine':
          'linear-gradient(135deg, rgba(212,165,32,0.06) 0%, transparent 40%, rgba(212,165,32,0.03) 100%)',
        'section-glow':
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,165,32,0.06) 0%, transparent 70%)',
        'hero-mesh':
          'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(212,165,32,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 20% 60%, rgba(61,90,153,0.05) 0%, transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'gold-shimmer': 'goldShimmer 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
