import type { Config } from 'tailwindcss';

/**
 * IntegrateWise OS Tailwind Configuration
 *
 * Semantic color tokens based on the IntegrateWise palette:
 * - Primary Blue: #3F51B5 (indigo-blue)
 * - Light Gray: #F3F4F6 (soft gray for text/surfaces)
 * - Dark Navy: #1E2A4A (deep background)
 * - Accent Pink: #F54476 (action/accent)
 *
 * DISALLOWED: #0A1833 (must not appear anywhere)
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        iw: {
          primary: {
            DEFAULT: '#3F51B5',
            50: '#EEF0FB',
            100: '#E1E4F8',
            200: '#C5CBF1',
            300: '#A8B1EA',
            400: '#8B98E3',
            500: '#6E7EDC',
            600: '#3F51B5',
            700: '#35449A',
            800: '#2B377F',
            900: '#212A64',
          },
          accent: {
            DEFAULT: '#F54476',
            600: '#F54476',
            700: '#CF2C5E',
          },
          bg: {
            DEFAULT: '#FFFFFF',
            muted: '#F3F4F6',
            dark: '#1E2A4A',
          },
          surface: {
            DEFAULT: '#FFFFFF',
            alt: '#F8FAFC',
            dark: '#19243F',
          },
          text: {
            primary: '#1E2A4A',
            secondary: '#4B5563',
            onPrimary: '#FFFFFF',
            inverse: '#F3F4F6',
          },
          border: {
            DEFAULT: '#E5E7EB',
            dark: '#2B3A5F',
          },
          link: {
            DEFAULT: '#3F51B5',
            hover: '#35449A',
            dark: '#8FA1FF',
            darkHover: '#7A8BE6',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
      },
      ringColor: {
        DEFAULT: '#3F51B5',
      },
      borderRadius: {
        iw: '16px',
      },
      boxShadow: {
        iw: '0 12px 40px rgba(0, 0, 0, 0.1)',
        'iw-dark': '0 12px 40px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
