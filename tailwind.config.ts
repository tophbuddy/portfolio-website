import type { Config } from 'tailwindcss';
import { defaultTheme } from './src/styles/theme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.primary,
        gray: defaultTheme.colors.gray,
        success: defaultTheme.colors.success,
        warning: defaultTheme.colors.warning,
        error: defaultTheme.colors.error,
        info: defaultTheme.colors.info,
      },
      fontFamily: {
        sans: defaultTheme.fonts.sans.split(','),
        mono: defaultTheme.fonts.mono.split(','),
        heading: defaultTheme.fonts.heading.split(','),
      },
      fontSize: defaultTheme.fontSizes,
      spacing: defaultTheme.spacing,
      borderRadius: defaultTheme.borderRadius,
      boxShadow: defaultTheme.shadows,
      transitionDuration: {
        fast: defaultTheme.transitions.fast.split(' ')[0],
        normal: defaultTheme.transitions.normal.split(' ')[0],
        slow: defaultTheme.transitions.slow.split(' ')[0],
      },
      transitionTimingFunction: {
        'theme-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.900'),
              fontWeight: theme('fontWeight.bold'),
            },
            code: {
              color: theme('colors.primary.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.primary.400'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [forms, typography],
};

export default config;
