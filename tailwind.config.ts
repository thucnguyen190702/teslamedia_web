import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',   // Mobile landscape
      md: '768px',   // Tablet
      lg: '1024px',  // Desktop
      xl: '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    },
    extend: {
      colors: {
        primary: {
          50: '#E7F3FF',
          100: '#D4E9FF',
          200: '#B0D7FF',
          300: '#7DBEFF',
          400: '#4A9FFF',
          500: '#1877F2', // Main Facebook blue - 4.5:1 contrast ratio on white
          600: '#1565D8', // 5.5:1 contrast ratio on white
          700: '#1153B8', // 7:1 contrast ratio on white
          800: '#0D4298', // 9:1 contrast ratio on white
          900: '#093578', // 12:1 contrast ratio on white
        },
        secondary: {
          50: '#F5F7FA',
          100: '#E4E7EB',
          200: '#CBD2D9',
          300: '#9AA5B1',
          400: '#7B8794',
          500: '#616E7C',
          600: '#52606D',
          700: '#3E4C59',
          800: '#323F4B',
          900: '#1F2933',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        card: '8px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      minHeight: {
        'touch': '44px', // Minimum touch target size for accessibility
      },
      minWidth: {
        'touch': '44px', // Minimum touch target size for accessibility
      },
      // Custom utilities
      utilities: {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // Enable JIT mode and purge unused styles
  mode: 'jit',
  // Optimize for production
  ...(process.env.NODE_ENV === 'production' && {
    purge: {
      enabled: true,
      content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      options: {
        safelist: [
          // Keep animation classes
          /^animate-/,
          // Keep Framer Motion classes
          /^motion-/,
          // Keep dynamic classes that might be generated
          'bg-primary-50',
          'bg-primary-100',
          'text-primary-600',
          'text-primary-700',
          'hover:bg-primary-700',
          'focus:ring-primary-500',
        ],
      },
    },
  }),
}

export default config
